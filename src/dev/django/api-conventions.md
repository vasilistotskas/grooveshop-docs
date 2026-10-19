---
title: API conventions
description: "How every GrooveShop REST endpoint behaves: camelCase bodies, authentication classes, default permissions, pagination, translations, error shape, OpenAPI decorators and the health and WebSocket endpoints."
---

# API conventions

Everything is mounted under `api/v1/` from `core/urls.py`, served by DRF
ViewSets built on `BaseModelViewSet`, and described by drf-spectacular. The
Nuxt storefront never calls Django directly from the browser; its server
routes proxy and validate against the generated contract
(see [OpenAPI contract](/dev/django/openapi-contract)).

## camelCase everywhere

Request and response bodies are camelCase on the wire and snake_case in
Python. `settings.py` wires `djangorestframework-camel-case` at every
layer: `CamelCaseJSONRenderer` and `CamelCaseBrowsableAPIRenderer` in
`DEFAULT_RENDERER_CLASSES`, the three `CamelCase*Parser` classes in
`DEFAULT_PARSER_CLASSES`, `CamelCaseMiddleWare` in `MIDDLEWARE`, and the
`camelize_serializer_fields` post-processing hook in
`SPECTACULAR_SETTINGS`, so the schema is camelCase too. Query parameters
follow through `CamelCaseFilterMixin` and `CamelCaseOrderingFilter`
(`core/filters/`). Write `created_at` in Python; the client sends and
receives `createdAt`.

## Authentication

`REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"]` lists three
authenticators, in this order:

1. `core.api.tokens.BoundedTokenAuthentication`: Knox tokens with the
   `Bearer` keyword. Settings: 7-day TTL, auto-refresh after one day,
   a 30-day absolute wall (`AUTO_REFRESH_MAX_TTL` and
   `KNOX_ABSOLUTE_MAX_AGE`, kept in sync), 10 tokens per user. `knox` is a
   tenant app, so a token is a per-schema row and `request.user` is a
   customer of the store being served.
2. `tenant.api_tokens.PlatformStaffTokenAuthentication`: platform staff
   tokens with the `StaffBearer` keyword. It returns `None` for anything
   else, which is why it can coexist with Knox: two authenticators that
   both claim `Bearer` cannot. It stamps the user as a public-schema
   identity (see the synced
   [API staff identity](/dev/django/reference/api-staff-identity) page).
3. `rest_framework.authentication.SessionAuthentication`: the Django
   session, used by the admin and the browsable API.

Login, signup, email verification, MFA, passkeys and social providers are
django-allauth headless, mounted at `_allauth/` outside `i18n_patterns`
(`core/urls.py`) with `HEADLESS_CLIENTS = ("app",)` and a custom token
strategy (`core/api/tokens.py: SessionTokenStrategy`). Social providers
configured in `TENANT_APPS`: Google, Facebook, GitHub, Discord.

## Permissions

`DEFAULT_PERMISSION_CLASSES` is `IsAuthenticatedOrReadOnly`: anonymous
GET/HEAD/OPTIONS works for catalogue endpoints without per-ViewSet
overrides, writes require a user. Any endpoint that needs an anonymous
write (guest checkout, contact form, cart mutations) sets
`permission_classes = [AllowAny]` explicitly. Store-scoped administrative
routes use `StoreStaffModelPermissions`; object ownership uses
`IsOwnerOrAdmin` and `IsOwnerOrAdminOrGuest`. Details and code in
[Base classes & patterns](/dev/django/patterns).

Throttling is global (`AnonRateThrottle`, `UserRateThrottle`, disabled when
`DEBUG`) plus named scopes for contact, feedback, attachments, payment,
cart mutation and order creation (`DEFAULT_THROTTLE_RATES`, applied by the
classes in `core/api/throttling.py`). `NUM_PROXIES` is 1 because Traefik
is the single trusted hop.

## Pagination

Default paginator: `PageNumberPaginator`, `PAGE_SIZE` 12, `page_size` up to
100. `?pagination_type=` selects `pageNumber` (default), `cursor` or
`limitOffset`; `?pagination=false` disables it. Every paginated response is
the same envelope:

```json
{
  "links": { "next": null, "previous": null },
  "count": 42,
  "totalPages": 4,
  "pageSize": 12,
  "pageTotalResults": 12,
  "page": 1,
  "results": []
}
```

The schema for the envelope comes from each paginator's
`get_paginated_response_schema()` (`core/pagination/`).

## Translations

Translatable models expose a `translations` object keyed by language
code. JSON clients send it as nested JSON; multipart clients (image
uploads) send `translations.<lang>.<field>` keys, which
`TranslationsProcessingMixin.process_translations_data()`
(`core/utils/views.py`) folds back into the nested shape before
validation. The default language translation is required where the
serializer mixes in `RequiredDefaultTranslationMixin`; other languages are
optional.

## Serializer tiering

Each model has separate List, Detail and Write serializers, mapped to
actions through `crud_config(list=..., detail=..., write=...)`. List
serializers stay narrow so `for_list()` querysets stay cheap; Detail adds
the nested relations `for_detail()` prefetches; Write carries only
writable fields. A custom action gets its own `ActionConfig` entry so the
schema and the runtime agree.

## Error shape

`REST_FRAMEWORK["EXCEPTION_HANDLER"]` is
`core/api/exception_handler.py: exception_handler`. It keeps the body DRF
gives an error (`{"detail": "..."}` for a plain error, the field keys for
a validation error) and adds:

- `code`: a stable snake_case string, never passed through `_()`. A plain
  error carries its own; a validation error the one code all its messages
  share, else `invalid`. Left out when the body already has a `code` key
  (a coupon code field, say).
- `fields`, on validation errors below 500 only: the same field keys, each
  a list of `{message, code}`, nested where the serializer nests.

Clients branch on `code` and show `message`; they never compare translated
text, which is why a `ValidationError` is raised with `code=` (for example
the review refusal's `must_have_purchased`). Three things bypass it: a
response a view builds itself (`return Response(..., status=400)`, as
`OrderViewSet.create` does; most of those set a `code` of their own, but
not all: the generic invalid-order 400 still has only `error.type`), a
bare-list body from a `ValidationError`
raised outside a serializer, and any exception that is not an
`APIException`, which Django logs as a 500 with no body of ours. The
OpenAPI schema publishes the shapes as the `ApiError`, `ApiValidationError`,
`ApiFieldError` and `ApiFieldErrors` components
(`core/api/schema.py: publish_error_schemas`, a postprocessing hook), and
the storefront's `describeApiError` reads them.

Per operation, the schema still documents non-2xx responses with
`ErrorResponseSerializer` (`core/api/serializers.py`):

```python
class ErrorResponseSerializer(DetailSerializer):
    error = serializers.CharField(required=False)
```

`create_schema_view_config(..., error_serializer=ErrorResponseSerializer)`
attaches it to 400, 401, 403, 404 and 500 for every action.

## OpenAPI decorators

- `@extend_schema_view(**create_schema_view_config(...))` on a ViewSet
  generates one `@extend_schema` per `serializers_config` key from the
  model's verbose names (`core/utils/serializers.py`).
- `@extend_schema(...)` directly on function views and on actions that need
  a bespoke summary, parameters or a binary response.
- `@extend_schema(exclude=True)` hides infrastructure endpoints such as
  `health/live`.
- `SPECTACULAR_SETTINGS["ENUM_NAME_OVERRIDES"]` pins enum component names
  (`OrderStatus`, `BoxNowParcelState`, `ShippingKind`, ...) so a colliding
  choice set does not get auto-renamed on every regeneration and break
  generated frontend imports.
- `DEFAULT_SCHEMA_CLASS` is `core.api.schema.AutoSchema`; the
  post-processing hook `postprocess_schema_parameters_to_accept_strings`
  lives next to it.

The schema itself is served at `/api/v1/schema`, with Swagger UI at
`/api/v1/schema/swagger-ui` and Redoc at `/api/v1/schema/redoc`
(`core/urls.py`). Outside `DEBUG` these require authentication
(`SERVE_PERMISSIONS`).

## Health endpoints

- `GET /api/v1/health` (`core/api/views.py: health_check`) pings the
  database, Redis and Celery workers and returns
  `{"database": bool, "redis": bool, "celery": bool}`. Suitable for a
  startup gate.
- `GET /api/v1/health/live` (`health_live`) touches no backing service, has
  no authentication and no throttle, and is what the Kubernetes probes use
  so a slow dependency can never de-register a healthy worker.
- The ASGI layer answers `/health/` before Django is involved
  (`asgi/__init__.py`).

## WebSocket

`ws/notifications/` (`asgi/__init__.py`) is the only socket. The client
first calls `POST /api/v1/notification/websocket/ticket`
(`notification/views/websocket.py`, `IsAuthenticated`) and connects with
`?ticket=<token>`; `core/middleware/channels.py: TokenAuthMiddleware`
consumes the ticket atomically from Redis. Knox tokens and session cookies
are not accepted on the socket. Groups are `tenant_{schema}_user_{id}`
(`notification/groups.py`).

## Versioning

There is one version, `api/v1`, as a URL prefix in `core/urls.py`. There is
no DRF versioning class and no header negotiation. Breaking changes are
managed through the OpenAPI contract and a coordinated storefront release,
not a second prefix.

## Invariants

- Two `Bearer` authenticators cannot coexist; platform staff use
  `StaffBearer` (`settings.py`, `tenant/api_tokens.py`).
- Anonymous writes are opt-in per ViewSet with `AllowAny` (`settings.py`,
  comment on `DEFAULT_PERMISSION_CLASSES`).
- The paginated envelope has the same seven keys for all three paginators
  (`core/pagination/`).
- Webhook receivers (`stripe/`, `viva-wallet/webhook/`, `boxnow/webhook/`)
  and allauth headless are mounted at the root, outside the locale prefix,
  on both hosts (`core/urls.py`).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/settings.py` | `REST_FRAMEWORK`, `REST_KNOX`, `HEADLESS_*`, `SPECTACULAR_SETTINGS`, `MIDDLEWARE` |
| `grooveshop-django-api/core/urls.py` | `api/v1/` mounts, schema and health routes, `_allauth/` |
| `grooveshop-django-api/core/api/tokens.py` | `BoundedTokenAuthentication`, `SessionTokenStrategy` |
| `grooveshop-django-api/tenant/api_tokens.py` | `PlatformStaffTokenAuthentication` |
| `grooveshop-django-api/core/api/permissions.py` | Permission classes |
| `grooveshop-django-api/core/api/throttling.py` | Scoped throttles |
| `grooveshop-django-api/core/pagination/` | Envelope |
| `grooveshop-django-api/core/utils/views.py` | Multipart translation folding |
| `grooveshop-django-api/core/api/exception_handler.py` | The one DRF exception handler: `code` and `fields` |
| `grooveshop-django-api/core/api/schema.py` | `ERROR_SCHEMAS`, `publish_error_schemas` |
| `grooveshop-django-api/core/api/serializers.py` | `ErrorResponseSerializer`, `HealthCheckResponseSerializer` |
| `grooveshop-django-api/core/api/views.py` | `health_check`, `health_live` |
| `grooveshop-django-api/notification/views/websocket.py`, `core/middleware/channels.py` | WebSocket ticket and auth |
