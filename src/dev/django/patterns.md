---
title: Base classes and patterns
description: The abstract models, base ViewSet, managers, filters, pagination, permissions, custom fields and factories every Django app in GrooveShop is built from.
---

# Base classes and patterns

Every domain app composes the same small set of base classes from `core/`.
Learn these once and any app's `models.py`, `views.py` and `serializers.py`
reads the same way. Each section below names the file and quotes the real
code.

## Abstract models (`core/models.py`)

Domain models compose several mixins; `Product` is the widest example:
`Product(SoftDeleteModel, TranslatableModel, TimeStampMixinModel, SeoModel,
UUIDModel, MetaDataModel, TaggedModel)`.

**`TimeStampMixinModel`** adds indexed `created_at` / `updated_at`:

```python
class TimeStampMixinModel(models.Model):
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta(TypedModelMeta):
        abstract = True
        indexes = [
            BTreeIndex(fields=["created_at"], name="%(class)s_created_at_ix"),
            BTreeIndex(fields=["updated_at"], name="%(class)s_updated_at_ix"),
        ]
```

**`UUIDModel`** gives a row a stable external identifier, used for guest
access to orders:

```python
class UUIDModel(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
```

**`SeoModel`** adds `seo_title`, `seo_description` and `seo_keywords`.
`seo_description` is a `PlainTextField` (`core/fields/plain_text.py`) because
it lands verbatim inside a `<meta>` tag.

**`SortableModel`** adds `sort_order` plus `move_up()` / `move_down()`.
Concurrent appends are serialised with a transaction-scoped advisory lock
(`_lock_ordering_scope`). The field is editable so the Unfold drag-and-drop
reorder works; every serializer that exposes it must list `sort_order` in
`read_only_fields`. Note that `SortableModel.save()` assigns a value when
none is set, so an explicit `sort_order` passed to a factory can be
overwritten.

**`PublishableModel`** adds `is_published` / `published_at` and a manager
whose `published()` filter is the one rule for "visible now":

```python
class PublishedQuerySet(models.QuerySet):
    def published(self):
        today = timezone.now()
        return self.filter(
            Q(published_at__lte=today, is_published=True)
            | Q(published_at__isnull=True, is_published=True)
        )
```

Saving with `is_published=True` and no `published_at` stamps the current
time.

**`MetaDataModel`** adds `metadata` and `private_metadata` JSON fields with
GIN indexes and a `store_value_in_metadata()` helper that merges with a
set-based UPDATE.

**`SoftDeleteModel`** overrides `delete()` to flag the row and gives the
manager three extra entry points:

```python
class SoftDeleteManager(models.Manager):
    def get_queryset(self) -> SoftDeleteQuerySet:
        return SoftDeleteQuerySet(self.model, using=self._db).exclude(
            is_deleted=True
        )

    def all_with_deleted(self) -> SoftDeleteQuerySet: ...
    def deleted_only(self) -> SoftDeleteQuerySet: ...
```

`SoftDeleteQuerySet` adds `restore()` and `hard_delete()`. Which rows a
soft-delete model exposes is decided in the ViewSet's `get_queryset()`,
not in a filter (see the module docstring of `core/filters/core.py`).

## Base ViewSet (`core/api/views.py`)

`BaseModelViewSet` combines three mixins:

```python
class BaseModelViewSet(
    RequestResponseSerializerMixin,
    TranslationsModelViewSet,
    PaginationModelViewSet,
):
    metadata_class = Metadata
```

- `RequestResponseSerializerMixin` reads `serializers_config`, a dict of
  action name to `ActionConfig`, and exposes `get_request_serializer()` /
  `get_response_serializer()`. `create()` and `update()` validate with the
  request serializer and answer with the response serializer, inside
  `transaction.atomic()`.
- `TranslationsModelViewSet` runs `TranslationsProcessingMixin`
  (`core/utils/views.py`), which folds multipart keys shaped
  `translations.<lang>.<field>` back into a `translations` dict before
  validation.
- `PaginationModelViewSet` picks the paginator from `?pagination_type=`:

```python
paginator_mapping = {
    "pagenumber": PageNumberPaginator,
    "page_number": PageNumberPaginator,
    "limitoffset": LimitOffsetPaginator,
    "limit_offset": LimitOffsetPaginator,
    "cursor": CursorPaginator,
}
self._paginator = paginator_mapping.get(
    pagination_type, PageNumberPaginator
)()
```

`?pagination=false` returns an unpaginated array from
`paginate_and_serialize()`.

## `ActionConfig`, `crud_config`, `create_schema_view_config` (`core/utils/serializers.py`)

`ActionConfig` is a dataclass with `request`, `response`, `responses`
(status-code overrides, including `(status, media_type)` pairs for
non-JSON answers), `operation_id`, `summary`, `description`, `tags`,
`parameters`, `many` and `paginated`. `crud_config()` is the shorthand for
the List/Detail/Write tiering:

```python
def crud_config(*, list, detail, write=None) -> SerializersConfig:
    config: SerializersConfig = {
        "list": ActionConfig(response=list),
        "retrieve": ActionConfig(response=detail),
    }
    if write:
        config["create"] = ActionConfig(request=write, response=detail)
        config["update"] = ActionConfig(request=write, response=detail)
        config["partial_update"] = ActionConfig(request=write, response=detail)
    return config
```

`create_schema_view_config()` iterates every key of `serializers_config`,
including custom actions, and generates the `@extend_schema` entries for
`@extend_schema_view` from the model's verbose names. A typical ViewSet
(`tag/views/tag.py`):

```python
@extend_schema_view(
    **create_schema_view_config(
        model_class=Tag,
        display_config={"tag": "Tags"},
        serializers_config=serializers_config,
        error_serializer=ErrorResponseSerializer,
    )
)
@cache_methods(settings.DEFAULT_CACHE_TTL, methods=["list", "retrieve"])
class TagViewSet(BaseModelViewSet):
    queryset = Tag.objects.all()
    serializers_config = serializers_config
    filterset_class = TagFilter
```

## Optimized managers (`core/managers/base.py`, `core/managers/tree.py`)

ViewSets never hand-build `select_related` chains. Each model's queryset
class overrides `for_list()` and `for_detail()`, and the ViewSet calls
`Model.objects.for_list()` or `.for_detail()` depending on the action:

```python
class OptimizedQuerySet(models.QuerySet):
    def with_translations(self) -> Self:
        if hasattr(self.model, "translations"):
            return self.prefetch_related("translations")
        return self

    def for_list(self) -> Self:
        return self.with_translations()

    def for_detail(self) -> Self:
        return self.for_list()
```

`OptimizedManager.__getattr__` delegates unknown names to the queryset, so
`Product.objects.with_counts()` works without redeclaring it.
`TranslatableOptimizedManager` is the parler variant;
`TreeTranslatableManager` combines MPTT and parler for the two category
models.

## Composable filter sets (`core/filters/`)

A mixin that *declares filters* must be a `FilterSet` subclass, never a
plain class; django-filter only collects declared filters from bases that
already carry `declared_filters`, so a plain-class mixin is silently
dropped. The module docstring of `core/filters/core.py` records that this
happened and that `PublishableFilterMixin`, `SoftDeleteFilterMixin` and
the `Base*FilterSet` classes were deleted rather than repaired. The four
mixins that remain are all `FilterSet` subclasses:

```python
class TimeStampFilterMixin(filters.FilterSet):
    created_after = filters.DateTimeFilter(field_name="created_at", lookup_expr="gte", ...)
    created_before = filters.DateTimeFilter(field_name="created_at", lookup_expr="lte", ...)
    updated_after = ...
    updated_before = ...
```

plus `UUIDFilterMixin`, `SortableFilterMixin` and `MetaDataFilterMixin`.

`CamelCaseFilterMixin` (`core/filters/camel_case_filters.py`) is the one
deliberate plain class in the package, and it is safe because it declares
no filters: it rewrites incoming query keys to snake_case and republishes
`base_filters` under camelCase names. It is always paired with a
`FilterSet` base, which is what `CamelCaseTimeStampFilterSet` and
`CamelCasePublishableTimeStampFilterSet` are for. Both now inherit the
timestamp filters from `TimeStampFilterMixin` instead of restating them.
`CamelCaseOrderingFilter` (`core/filters/camel_case_ordering.py`) does the
same rewrite for `?ordering=`, and decides per action which keys it
honours (`ordering_for`): a standard action uses the viewset's
`ordering_fields` / `ordering`; an extra `@action` sorts nothing unless the
viewset declares its contract in `action_ordering`, because such an action
usually paginates another model (an author's posts, a user's favourites)
and the parent's columns would be wrong there. The OpenAPI extension reads
the same contract, so the storefront's generated query schema forwards
exactly the keys the action accepts — until 2026-09-18 every such action
blanked its fields instead and the storefront's sort controls on author,
category and account pages changed nothing.

## Pagination envelope (`core/pagination/`)

All three paginators return the same shape:

```python
return Response(
    {
        "links": {"next": self.get_next_link(), "previous": self.get_previous_link()},
        "count": page.paginator.count,
        "total_pages": page.paginator.num_pages,
        "page_size": page.paginator.per_page,
        "page_total_results": len(data),
        "page": page.number,
        "results": data,
    }
)
```

`page_size_query_param` is `page_size`, `max_page_size` is 100, and the
default `PAGE_SIZE` in `REST_FRAMEWORK` is 12.

## Translations (`core/api/serializers.py`)

Parler treats translations as optional. A write serializer that needs the
default language present mixes in `RequiredDefaultTranslationMixin` and
names the field that must be non-empty:

```python
class RequiredDefaultTranslationMixin:
    required_translation_field: str | None = None

    def validate_translations(self, value):
        default_language = settings.PARLER_DEFAULT_LANGUAGE_CODE
        default_translation = value.get(default_language)
        if not default_translation:
            raise serializers.ValidationError(...)
```

Never hardcode a language code. The default is `el`
(`PARLER_DEFAULT_LANGUAGE_CODE`) and the locale set is `el`, `en`, `de`;
both can change in `settings.py` without touching serializers.

## Custom fields (`core/fields/`)

- `ImageAndSvgField` (`core/fields/image.py`): an `ImageField` whose form
  field also accepts SVG.
- `MeasurementField` (`core/fields/measurement.py`): a `FloatField` that
  stores a physical measurement with unit conversion; the DRF side is
  `MeasurementSerializerField` in `core/api/serializers.py`, serialised as
  `{"unit": "kg", "value": 1.0}`. A zero value is a real value, not
  absence; treat `0` and `None` differently.
- `PlainTextField` (`core/fields/plain_text.py`): a `TextField` that strips
  markup on save.

## Permissions (`core/api/permissions.py`)

`request.user.is_staff` is never an authorization signal on an API request:
on a tenant-schema row it is customer residue from the id-preserving
cutover. The API's notion of staff is `tenant.membership.is_store_staff`,
a provenance-stamped platform identity with a staff-capable membership in
the current tenant, or a platform superuser.

```python
class IsOwnerOrAdminOrGuest(IsOwnerMixin, BasePermission):
    def has_object_permission(self, request, view, obj):
        if is_store_staff(request.user):
            return True
        if hasattr(obj, "user"):
            if obj.user is None:
                request_uuid = request.query_params.get("uuid") or ...
                return bool(request_uuid and str(obj.uuid) == str(request_uuid))
```

- `IsOwnerOrAdmin`: authenticated, and owner (`user`, `owner` or
  `created_by`) or store staff.
- `IsOwnerOrAdminOrGuest`: as above, plus guest objects (`obj.user is None`)
  are reachable with the matching `uuid`.
- `StoreStaffModelPermissions`: DRF's `DjangoModelPermissions` with `view`
  required on reads; the permission set comes from the tenant role backend,
  the same policy the admin uses (`tenant/role_scopes.py`).
- `StoreStaffChangePermission`: for custom POST actions that change rather
  than add.
- `IsStoreStaff` / `IsPlatformSuperuser`: the plain predicates for
  function-based views.

## Computed properties via `__dict__`

Models that expose counts or averages read an annotation first and only
fall back to a query when it is absent (`product/models/product.py`):

```python
@property
def likes_count(self) -> int:
    if "likes_count" in self.__dict__:
        return self.__dict__["likes_count"]
    return self.favourited_by.count()

@likes_count.setter
def likes_count(self, value):
    self.__dict__["likes_count"] = value
```

The setter lets `annotate(likes_count=...)` populate the property. Pair
this with a `with_counts()` queryset method in the model's manager.

## Meilisearch `IndexMixin` (`meili/models.py`)

A searchable model inherits `IndexMixin` and declares a `MeiliMeta`:

```python
class IndexMixin(models.Model):
    class MeiliMeta:
        displayed_fields: Iterable[str] | None = None
        searchable_fields: Iterable[str] | None = None
        filterable_fields: Iterable[str] | None = None
        sortable_fields: Iterable[str] | None = None
        ranking_rules: Iterable[str] | None = None
        synonyms: dict[str, list[str]] | None = None
        typo_tolerance: dict[str, Any] | None = None
        primary_key: str = "pk"
```

`meili_filter()` decides whether an instance is indexed at all,
`get_additional_meili_fields()` adds computed fields, and
`Model.meilisearch` is a queryset-like search descriptor. Greeklish shadow
fields are produced at index time by `search/transliteration.py`. Keep
`minWordSizeForTypos` identical across indexes; they feed one federated
search. See [Search](/dev/flows/search).

## Factories (`devtools/factories.py`)

Every factory extends `CustomDjangoModelFactory`:

```python
class CustomDjangoModelFactory(
    factory.django.DjangoModelFactory, UniqueFieldMixin, LocaleAwareMixin
):
    auto_translations: bool = True
    unique_model_fields: list[tuple[str, Callable[[], Any]]] = []

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        for field, generator_func in cls.unique_model_fields:
            if field not in kwargs:
                kwargs[field] = cls.get_unique_value(model_class, field, generator_func)
```

`auto_translations` creates a translation for every configured language on
parler models; `unique_model_fields` generates collision-free values;
`@factory.post_generation` hooks add images, reviews and cart items.
`core/helpers/factory.py: get_or_create_instance()` resolves a model or
factory by name.

## Invariants

- A ViewSet never calls a serializer class directly; it goes through
  `serializers_config` so the OpenAPI schema and the runtime agree
  (`core/api/views.py`).
- A filter mixin that declares filters subclasses `FilterSet`
  (`core/filters/core.py`).
- `sort_order` is read-only on the API even though the model field is
  editable (serializer `read_only_fields`).
- Language codes come from `settings.PARLER_DEFAULT_LANGUAGE_CODE`, never
  literals (`core/api/serializers.py`).
- Staff checks go through `is_store_staff`, never `is_staff`
  (`core/api/permissions.py`, `tenant/membership.py`).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/core/models.py` | Abstract models, `Translation` |
| `grooveshop-django-api/core/api/views.py` | `BaseModelViewSet` and its mixins, health views, settings views |
| `grooveshop-django-api/core/utils/views.py` | `TranslationsProcessingMixin`, `cache_methods` |
| `grooveshop-django-api/core/utils/serializers.py` | `ActionConfig`, `crud_config`, `create_schema_view_config` |
| `grooveshop-django-api/core/api/serializers.py` | `RequiredDefaultTranslationMixin`, `ErrorResponseSerializer`, `MeasurementSerializerField` |
| `grooveshop-django-api/core/managers/base.py`, `core/managers/tree.py` | Optimized managers |
| `grooveshop-django-api/core/filters/` | Filter mixins, camelCase filters and ordering |
| `grooveshop-django-api/core/pagination/` | Three paginators, one envelope |
| `grooveshop-django-api/core/fields/` | `ImageAndSvgField`, `MeasurementField`, `PlainTextField` |
| `grooveshop-django-api/core/api/permissions.py`, `tenant/membership.py` | Permission classes and `is_store_staff` |
| `grooveshop-django-api/meili/models.py` | `IndexMixin`, `MeiliMeta` |
| `grooveshop-django-api/devtools/factories.py` | `CustomDjangoModelFactory` |
