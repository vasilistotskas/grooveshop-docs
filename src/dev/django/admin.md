---
title: Admin (Unfold)
description: The two Unfold admin sites, BaseModelAdmin conventions, what each console withholds from the other, action and dialog rules, drag-and-drop ordering, dashboards, sidebar permissions, the site dropdown tools and how to add a new admin section.
---

# Admin (Unfold)

The admin is django-unfold on top of Django's admin, and there are two of
them. The store admin (`admin.site`, class `MyAdminSite`) serves merchants
on their own tenant host and reads tenant-schema tables. The control-plane
admin (`platform_admin_site`, class `PlatformAdminSite`) serves platform
superusers on the platform host and reads only public-schema tables. They
share `BaseModelAdmin` and most `ModelAdmin` classes; they do not share
URLs, dashboards, sidebars or settings blocks.

## Two AdminSites

| | Store admin | Platform admin |
|---|---|---|
| Class | `admin/admin.py: MyAdminSite` | `admin/platform_site.py: PlatformAdminSite` |
| Instance name | `admin` | `platform_admin` |
| Mounted by | `core/urls.py` (`ROOT_URLCONF`, locale-prefixed `admin/`) | `tenant/urls_public.py` (`PUBLIC_SCHEMA_URLCONF`, bare `admin/`) |
| Unfold settings | `UNFOLD` in `settings.py` | `UNFOLD_PLATFORM` (`settings_name = "UNFOLD_PLATFORM"`) |
| Dashboard | `admin/dashboard.py` (`admin/index.html`) | `admin/platform_dashboard.py` (`admin/platform_index.html`) |
| Who passes `has_permission` | a platform-staff session with an active staff-capable `UserTenantMembership` in the current tenant, or a superuser | a platform-staff session that is a superuser |

Both sites use `PlatformAdminAuthenticationForm`, so credentials are always
checked against the public schema's user table. `MyAdminSite.has_permission`
first requires `is_platform_staff_session(request)` (the provenance stamp
from `tenant/auth_backends.py`) and then a membership; `is_staff` alone
never opens a store's admin. `PlatformAdminSite.has_permission` requires
`is_superuser` because the control-plane dashboard renders every store's
name, domain, plan and order count.

`register_platform_models()` (`admin/platform_site.py`), called from
`MyAdminConfig.ready()` in `admin/apps.py`, mirrors the control-plane
models onto the platform site after autodiscovery.

### urlconf pinning

Under django-tenants a request resolves against one urlconf, so a
`reverse_lazy` without an explicit `urlconf` can only be cast on the host
that registers its namespace. Django's technical 500 page casts every lazy
in settings, so an unpinned link turned any local error into
`NoReverseMatch: 'platform_admin' is not a registered namespace`. Every
link in both `UNFOLD` blocks is therefore pinned:

```python
"link": reverse_lazy("admin:order_order_changelist", urlconf=ROOT_URLCONF),
...
"link": reverse_lazy("platform_admin:tenant_tenant_changelist", urlconf=PUBLIC_SCHEMA_URLCONF),
```

`tests/unit/core/test_unfold_links_resolve.py` casts every `link` in
`UNFOLD` and `UNFOLD_PLATFORM` under both urlconfs and runs the debug
page's own settings dump. Add a link without `urlconf=` and that test
fails.

## `BaseModelAdmin` (`admin/base.py`)

Every admin extends `BaseModelAdmin` (or `BaseTranslatableAdmin` /
`BaseTranslatableTabularInline` for parler models). It sets the consensus
defaults once:

```python
compressed_fields = True
warn_unsaved_form = True
list_fullwidth = True
list_filter_submit = True
list_filter_sheet = True
save_on_top = True
list_per_page = 25

formfield_overrides = {
    HTMLField: {"widget": AdminTinyMCE},
}
```

The `formfield_overrides` entry exists because Unfold maps `TextField` to
its own textarea, and Django's MRO walk would apply that to every
`HTMLField` and wipe the TinyMCE editor. A field that must hold HTML
(`PayWay.instructions`, product descriptions) is a `tinymce.models.HTMLField`
on the model; a blanket `TextField` to WYSIWYG override is never used.

Conventions the base enforces or expects:

- **`list_display` is a tuple**, not a list, on every admin.
- **Every action requires `change` by default.** `__init_subclass__`
  stamps `allowed_permissions = ["change"]` on any `actions`,
  `actions_list`, `actions_detail`, `actions_row` or `actions_submit_line`
  entry that declares none, because both Django and Unfold fail open on an
  undeclared action. A read-only action says so with
  `permissions=["view"]`.
- **Tenant-only models are withheld on the platform host.**
  `_withheld_on_public()` answers 403 for any model whose app label is in
  `tenant_only_app_labels()` when `request.tenant` is positively the
  public schema, instead of querying legacy `public.*` tables and 500ing.
- **Platform-only models are withheld on a tenant host.** `BaseModelAdmin`
  is declared `class BaseModelAdmin(WithheldOnTenantHostModelAdmin, ModelAdmin)`,
  so every admin that extends it also carries the mirror guard below.

## Withholding, in both directions

Two guards, same shape, opposite sides. Both derive their set from
`tenant/app_labels.py` rather than enumerating it, so a new app is covered
without editing a list.

| Guard | Declared in | Fires when | Withholds |
|---|---|---|---|
| `BaseModelAdmin._withheld_on_public` | `admin/base.py` | `request.tenant` is positively the public schema | app labels in `tenant_only_app_labels()` — in `TENANT_APPS`, not in `SHARED_APPS` |
| `WithheldOnTenantHostModelAdmin` | `admin/mixins.py` | `request.tenant` is positively a real store | app labels in `shared_only_app_labels()` — in `SHARED_APPS`, not in `TENANT_APPS` |

Each overrides `has_module_permission` **and** the four object permissions.
`has_module_permission` returning `False` is what makes one mechanism close
both paths: Django's `_build_app_dict` drops the model from the app list, and
the typed URL becomes a clean 403 instead of a page of the other side's rows.
Both only withhold on *positive* knowledge of which side they are on — keying
on `connection.schema_name` instead fires during tests, management commands
and Celery work, where no tenant is bound, and once denied 35 valid
changelists.

Three things about the tenant-host direction are easy to get wrong:

- **`role_scopes.PLATFORM_ONLY_APP_LABELS` is not the same set** and must not
  be substituted. It also names `allauth_idp_oidc`, whose tables are
  tenant-only, so using it would hide OIDC clients a store genuinely owns.
  Membership of `TENANT_APPS` is the honest test of "does this store have its
  own copy". The converse also holds: `auth` is dual-listed, so `Group` is
  **not** withheld by this guard — no store role is granted `auth.*` and the
  store sidebar no longer links it, but a superuser who types
  `/admin/auth/group/` on a store host still gets that schema's own (empty)
  `auth_group`.
- **The comparison is on labels, not on `INSTALLED_APPS` entries.**
  `unfold.contrib.simple_history` and `simple_history` sit in opposite lists
  and reduce to the same label; comparing entries put a per-tenant app in the
  withhold set. Collapsing to labels also errs safely — if any tenant entry
  yields a label it is never withheld.
- **`tenant` is exempt**, via `admin/mixins.py: STORE_SELF_SERVICE_APP_LABELS`.
  `TenantAdmin.get_queryset` scopes a store operator to their own row and
  `get_readonly_fields` allowlists `role_scopes.TENANT_SELF_EDITABLE_FIELDS`,
  so hiding the app would remove merchant self-service rather than a leak.

The mixin has to be applied at four places that share no base class —
`BaseModelAdmin`, the five celery-beat admins in `core/admin.py`,
`CachePurgeLogAdmin`, and the `override_third_party_admins()` factory (where
it goes **first** in the bases so its permission overrides win the MRO). "Did
we miss one" therefore cannot be answered by reading the code, so
`tests/integration/admin/test_tenant_host_model_visibility.py` walks the live
registry and asserts every shared-only model is refused on a tenant host, by
module permission and by view permission.

## Actions must return a response

Unfold registers `actions_row`, `actions_list` and `actions_detail` as
real URL patterns, and its `@action` decorator does not convert `None`
into a response. A handler that only calls `message_user()` and falls off
the end raises "The view didn't return an HttpResponse object" after the
side effect has already run. Every URL-backed action returns on every
path, including early guards, typically:

```python
return redirect(reverse(f"admin:{opts.app_label}_{opts.model_name}_changelist"))
```

`actions_submit_line` is the exception: it runs inside `save_model`, so
returning `None` there is correct.
`tests/unit/shipping_acs/test_admin_action_responses.py` scans every
`admin.py` with `ast` and fails on a URL-backed action that can return
`None`.

## `@action(dialog=...)`

Dialog actions (`promotion/admin.py: generate_codes`, `b2b/admin.py`,
`giftcard/admin.py`, `recommendation/admin.py`) declare a `form_class` and
are invoked as `func(request, form, object_id=...)`:

```python
@action(
    description=_("Generate codes"),
    icon="confirmation_number",
    dialog=cast("ActionDialog", {
        "title": _("Bulk-generate coupon codes"),
        "form_class": GenerateCodesForm,
        "form_submit_text": None,
    }),
)
def generate_codes(self, request, form, object_id=None, **kwargs) -> HttpResponse:
```

Two rules follow from Unfold's implementation. The decorator builds its
own form from `request.POST` and only calls the body once
`form.is_valid()`, so a test that passes a stub form never executes the
body; drive dialog actions with a real POST that includes the hidden
`_form_submitted` field. And the body must answer with an `HX-Redirect`
response, because HTMX submits the dialog and follows the redirect
client-side. The `cast("ActionDialog", ...)` is there because Unfold's
TypedDict declares plain `str` keys while lazy strings must be passed so
the admin locale is not frozen at import time.

## Drag-and-drop ordering

Flat `SortableModel` admins enable Unfold's reorder with two attributes
(`blog/admin.py`, `country/admin.py`, `region/admin.py`,
`pay_way/admin.py`, `tag/admin.py`, `product/admin.py`,
`loyalty/admin.py`):

```python
ordering = ("sort_order",)
ordering_field = "sort_order"
hide_ordering_field = True
```

Unfold appends the ordering field to `list_editable`, which is why
`SortableModel.sort_order` is editable on the model. The MPTT category
admins (`ProductCategoryAdmin`, `BlogCategoryAdmin`) use the same flat
reorder rather than `DraggableMPTTAdmin`, whose drag handles render but
do nothing under Unfold's overridden changelist template; the models stay
`MPTTModel` and `parent` stays editable in the form. `OrderItem` is
sortable but deliberately not draggable.

## Dashboards

`UNFOLD["DASHBOARD_CALLBACK"]` is `admin.dashboard.dashboard_callback`. It
serves five zones (hero KPIs, ops charts, queues, growth, search insights)
from one cached payload under `DASHBOARD_CACHE_KEY` and recomputes the
superuser-only configuration zone on every request:

```python
payload = cache.get_or_set(DASHBOARD_CACHE_KEY, _build_cached_zones, DASHBOARD_CACHE_TTL)
context.update(payload)
if context["is_superuser"]:
    context.update(_build_zone_d())
```

`admin/signals.py: _connect_dashboard_invalidation()` deletes that key on
`post_save` / `post_delete` of the models the zones read. The platform
site has its own callback (`admin/platform_dashboard.py`) rendering the
tenant estate table.

## Sidebar and permission callables (`admin/permissions.py`)

Sidebar groups in `UNFOLD["SIDEBAR"]["navigation"]` carry a `permission`
dotted path. The callables are:

- `is_store_section(request)`: true on a tenant host and on an unknown
  schema, false on the platform console; hides the thirty store links that
  would all 403 there.
- `is_platform_section(request)`: the inverse, for tenant and platform
  settings groups.
- `is_staff(request)`, `is_superuser(request)`: plain flag checks for
  groups such as Newsletter.
- `platform_environment(request)`: the `UNFOLD_PLATFORM["ENVIRONMENT"]`
  badge, `["Control plane", "warning"]`, so an operator can tell the two
  consoles apart. The store admin's badge is
  `admin.environment.environment_callback`.

The sidebar titles are what the admin guide names as
`Sales → Orders`; change a title in `settings.py` and the docs change.

### Which console links what

A `permission` callable hides a group; it does not decide which console the
group belongs to. That is a separate, editorial split, and it was wrong until
2026-09-12: the store sidebar linked changelists whose tables exist only in
`public`, which 403'd for every store role and, for a platform superuser,
rendered the platform's rows dressed as that merchant's — reported from
`api.webside.gr/admin` ("should I see five Sites here?").

Moved out of `UNFOLD["SIDEBAR"]` and into `UNFOLD_PLATFORM["SIDEBAR"]`:

| Was | Now | Why |
|---|---|---|
| `Localization` group — Countries, Regions, Sites | `Platform` group on the control plane | Public-schema reference data shared by every store. The `Localization` group is gone; what remained of it is now a `Newsletter` group holding only Subscription Topics |
| `System → Background Jobs` — the five `django_celery_beat` schedule models plus `TaskResult` and `GroupResult` | `Background Jobs` group on the control plane | One public-schema beat schedule drives every store's fan-out tasks |
| `System → Configuration → Groups` | `Identity → Groups` on the control plane | Not a data leak (`auth_group` exists per tenant) but a privilege surface: nothing in this repository creates a `Group`, and a store admin who reached the section could mint themselves any permission |
| `System → Audit & Logs → Cache Purge Log` | `Platform → Cache Purge Log` on the control plane | `core` is `SHARED_APPS`-only, so the section showed one merchant every purge across the estate, actor column included. The store keeps its own Cache Management view |

Two tests in `tests/integration/admin/test_platform_console.py` pin the split
by walking both navigation trees: no changelist of an
`INFRA_LABELS` app (`sites`, `country`, `region`, `django_celery_beat`,
`django_celery_results`, `auth`, `core`) may be linked from the store
sidebar, and every model the platform site registers for those apps must be
linked from the control plane.

## Site dropdown tools

`UNFOLD["SITE_DROPDOWN"]` (`settings.py`) always lists Rosetta
(translations), Cache (`admin:clear-cache`, the purge page from
`MyAdminSite.get_urls`), Email Templates (`email_templates:management`)
and API Swagger (`swagger-ui`). It then appends links only when their
environment variable is set, so production never shows a broken localhost
shortcut:

| Link | Env var |
|---|---|
| Help & Guides | `ADMIN_DOCS_URL` |
| Flower (Celery) | `ADMIN_FLOWER_URL` |
| Mailpit | `ADMIN_MAILPIT_URL` |
| Meilisearch | `ADMIN_MEILISEARCH_URL` |
| RabbitMQ | `ADMIN_RABBITMQ_URL` |

**Help & Guides** is the odd one out: it is the only dropdown entry both
consoles carry. It is expanded once into `_ADMIN_DOCS_LINKS`, spliced into
`UNFOLD["SITE_DROPDOWN"]` ahead of the ops links, and is the *entire*
`UNFOLD_PLATFORM["SITE_DROPDOWN"]` — which did not exist before. It points at
the tenant-admin guide on the documentation site (production sets the Greek
index of `docs.grooveshop.space`; staging its own twin), and it is env-gated
for a different reason from the ops links: a local checkout should render no
link at all rather than one to a site that may not carry this build's pages.

These five are absolute URLs to other hosts, which is why
`tests/unit/core/test_unfold_links_resolve.py` accepts a `link` starting with
`https://` or `http://` as well as `/`. Everything else in either block must
still be a `reverse_lazy` pinned with `urlconf=`.

The Cache tool renders `core/templates/admin/clear_cache.html`, counts keys
per surface with `CacheService.count()`, purges through
`CacheService.purge()` and writes a `CachePurgeLog` row. See
[Caches & purging](/dev/operations/caches).

## Template overrides

- `core/templates/unfold/helpers/app_list.html`, `app_list_item.html`,
  `app_list_badge.html`: the sidebar app list with badges
  (`admin/badges.py`).
- `core/templates/admin/index.html` and `platform_index.html`: the two
  dashboards.
- `core/templates/admin/clear_cache.html`,
  `email_template_management.html`, `platform_billing.html`: the custom
  admin pages.
- `core/templates/admin/product/apply_discount.html`,
  `product/stock_history.html`, `tenant/destroy_confirmation.html`:
  per-model action pages.

## Adding a new admin section

1. Write the `ModelAdmin` in the app's `admin.py`, extending
   `BaseModelAdmin` (or `BaseTranslatableAdmin`). Use a tuple
   `list_display`; give every custom action `permissions=[...]` if
   `change` is wrong for it; make every URL-backed action return a
   response.
2. Register it with `@admin.register(Model)` for the store site. If the
   model is public-schema (tenant, billing, platform settings) add it to
   `register_platform_models()` in `admin/platform_site.py` instead of,
   or as well as, the store site.
3. Add the sidebar entry in `settings.py`: `UNFOLD["SIDEBAR"]["navigation"]`
   for the store admin with `urlconf=ROOT_URLCONF`, or `UNFOLD_PLATFORM`
   with `urlconf=PUBLIC_SCHEMA_URLCONF`. Set the group's `permission`
   callable.
4. If the model's data should invalidate a cache surface, add it to that
   surface's `invalidated_by` in `core/cache/surfaces.py` or the app's
   `AppConfig.ready()`.
5. Run `tests/unit/core/test_unfold_links_resolve.py` and
   `tests/unit/shipping_acs/test_admin_action_responses.py`; then add the
   admin guide page in the docs repo under both locales.

## Failure modes

- **Link without `urlconf=`**: every 500 page on one of the two hosts is
  replaced by `NoReverseMatch`; caught by the resolve test.
- **Action returns `None`**: the side effect runs, the operator sees a 500
  and retries; caught by the AST test.
- **Tenant-only model opened on the platform host**: 403 by design
  (`_withheld_on_public`), not a missing-column 500.
- **Platform-only model opened on a store host**: 403 by design
  (`WithheldOnTenantHostModelAdmin`), except `tenant`, which is the
  merchant's own settings screen. A page that renders instead means the
  admin class does not carry the mixin — add it and let the registry-walking
  test confirm it.
- **Dashboard shows stale numbers**: the cached zones did not invalidate;
  check the model is connected in `admin/signals.py`.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/admin/admin.py` | `MyAdminSite`, cache purge views |
| `grooveshop-django-api/admin/platform_site.py` | `PlatformAdminSite`, `register_platform_models` |
| `grooveshop-django-api/admin/base.py` | `BaseModelAdmin`, `BaseTranslatableAdmin`, action permission stamping, `_withheld_on_public` |
| `grooveshop-django-api/admin/mixins.py` | `WithheldOnTenantHostModelAdmin`, `STORE_SELF_SERVICE_APP_LABELS`, `IsSuperuserOnlyModelAdmin`, `AdminSiteLoginNextMixin` |
| `grooveshop-django-api/tenant/app_labels.py` | `tenant_only_app_labels`, `shared_only_app_labels` — both withhold sets |
| `grooveshop-django-api/tenant/role_scopes.py` | `PLATFORM_ONLY_APP_LABELS`, `TENANT_SELF_EDITABLE_FIELDS` — role scope, not the withhold set |
| `grooveshop-django-api/core/admin.py` | The celery-beat admins, `CachePurgeLogAdmin`, `override_third_party_admins()` — three of the four mixin application points |
| `grooveshop-django-api/admin/permissions.py` | Sidebar permission callables |
| `grooveshop-django-api/admin/dashboard.py`, `admin/platform_dashboard.py`, `admin/signals.py` | Dashboards and invalidation |
| `grooveshop-django-api/admin/apps.py` | `MyAdminConfig.ready()` |
| `grooveshop-django-api/settings.py` | `UNFOLD`, `UNFOLD_PLATFORM`, `SITE_DROPDOWN` |
| `grooveshop-django-api/core/templates/unfold/`, `core/templates/admin/` | Template overrides |
| `grooveshop-django-api/tests/unit/core/test_unfold_links_resolve.py` | Guards urlconf pinning; accepts absolute URLs for the env-gated dropdown entries |
| `grooveshop-django-api/tests/unit/shipping_acs/test_admin_action_responses.py` | Guards action return values |
| `grooveshop-django-api/tests/integration/admin/test_tenant_host_model_visibility.py` | Walks the registry: every shared-only model is refused on a tenant host |
| `grooveshop-django-api/tests/integration/admin/test_platform_console.py` | Pins the store/control-plane sidebar split |
