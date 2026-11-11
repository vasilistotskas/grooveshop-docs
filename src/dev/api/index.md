---
title: REST API reference
description: Where the generated OpenAPI documentation lives, how to authenticate, and the wire conventions every endpoint follows.
---

# REST API reference

The REST API is described by an OpenAPI schema that drf-spectacular
generates from the Django serializers and views. The schema is the
reference; this page tells you where to read it and the conventions it
assumes.

## Interactive documentation

Served by the API itself on every tenant's API host:

| Document | URL |
|---|---|
| OpenAPI JSON/YAML | `https://<api-host>/api/v1/schema` |
| Swagger UI | `https://<api-host>/api/v1/schema/swagger-ui` |
| ReDoc | `https://<api-host>/api/v1/schema/redoc` |

Outside `DEBUG` the schema endpoints require an authenticated session or
token (`src/settings.py: SPECTACULAR_SETTINGS["SERVE_PERMISSIONS"]`). The
committed copy is `grooveshop-django-api/schema.yml`, regenerated with:

```bash
uv run python manage.py spectacular --color --file schema.yml
```

Every endpoint is mounted under `/api/v1/` (`src/core/urls.py`). Storefront
and commerce endpoints exist only on tenant hosts; the platform host serves
the shared subset plus the tenant-admin API (`src/tenant/urls_public.py`).

## Authentication

```
Authorization: Bearer <knox token>
```

Customer tokens come from the allauth headless login flow
(`/_allauth/app/v1/auth/login`) and are valid for the tenant that minted
them. Store operators use `Authorization: StaffBearer <token>` from the
platform login; AI agents use OAuth bearers on `/api/v1/agent/*` only. The
full picture is in [Security model](/dev/platform/security).

The tenant is chosen by the host you call (or `X-Forwarded-Host` from
inside the cluster). There is no tenant parameter.

## Conventions

- **camelCase bodies and query parameters.** Django works in snake_case;
  `djangorestframework-camel-case` renders, parses and converts filter
  names on the way in and out (`src/settings.py: REST_FRAMEWORK`
  renderer and parser classes; `src/core/filters/` camel-case mixins).
- **Pagination.** `?paginationType=` selects `pageNumber` (default),
  `cursor` or `limitOffset` (`src/core/pagination/`). Every strategy returns
  the same envelope:

  ```json
  {
    "links": { "next": null, "previous": null },
    "count": 0,
    "totalPages": 0,
    "pageSize": 12,
    "pageTotalResults": 0,
    "page": 1,
    "results": []
  }
  ```

  Default page size is 12, maximum 100. `links.next` is absolute and built
  from `X-Forwarded-Host`.

  `?pagination=false` returns the whole list as a plain array only where an
  operation documents the parameter: the country list and
  `/giftcard/mine`, the actions their views name in `unpaginated_actions`.
  Every other list ignores it and keeps the envelope and the maximum.
- **Translations.** Translatable models expose a `translations` object
  keyed by language code. In multipart requests (uploads) send them as
  dotted form fields, `translations.el.name`, which
  `src/core/utils/views.py: process_translations_data` reassembles into the
  nested object. The default language must be present and non-empty; other
  locales are optional.
- **Errors.** DRF's standard shapes: `{"detail": "..."}` for
  authentication, permission and not-found errors, optionally with an
  `error` code (`src/core/api/serializers.py: ErrorResponseSerializer`), and a
  field-to-messages object with status 400 for validation failures. The
  Nuxt proxy forwards Django's status; it answers 422 only when a Django
  response fails the generated Zod schema, which means the contract has
  drifted. Disabled features answer 404.
- **Idempotency.** Mutating requests may send `Idempotency-Key`; the
  middleware replays the stored response for a repeated key
  (`src/core/middleware/idempotency.py`). A key belongs to the caller as the
  view authenticates it (decided in `process_view`, so Knox, staff and
  agent tokens all count); an anonymous key to the cart it names
  (`X-Cart-Token`, else `X-Cart-Id`), else the session, else the client
  address. A repeat of a request still running answers
  `409 idempotency_in_flight`, an oversized key
  `400 idempotency_key_too_long`, and each caller has a key budget
  (`MAX_KEYS_PER_CALLER`).
- **Guest access.** Anonymous carts identify themselves with the
  `X-Cart-Id` header; a guest reads their order with `?uuid=<order uuid>`, for
  `GUEST_ORDER_ACCESS_DAYS` after it was placed (`403 guest_order_requires_uuid`
  afterwards).
- **Currency** is EUR throughout; there is no per-request currency.
- **Health.** `GET /api/v1/health` checks the database, Redis and Celery;
  `GET /api/v1/health/live` is dependency-free and is what the probes use.

## How the storefront types are made

The Nuxt repository fetches `schema.json` from a **local** Django with
`pnpm generate:schema`, generates `shared/openapi/types.gen.ts` and
`shared/openapi/zod.gen.ts` with `pnpm openapi-ts`, and rewrites the
derived YAML copies with `pnpm sync:schema`. Server routes validate both
directions with the generated Zod schemas, so a contract change is always
a Django change followed by a regeneration; see
[OpenAPI contract](/dev/django/openapi-contract).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/src/core/urls.py` | Schema, Swagger UI, ReDoc, health, every `/api/v1/` mount |
| `grooveshop-django-api/src/settings.py` | `SPECTACULAR_SETTINGS`, `REST_FRAMEWORK`, `REST_KNOX` |
| `grooveshop-django-api/src/core/pagination/` | The three paginators and the envelope |
| `grooveshop-django-api/src/core/api/views.py` | `BaseModelViewSet`, `paginate_and_serialize` and `unpaginated_actions`, settings endpoints |
| `grooveshop-django-api/src/core/utils/serializers.py` | `create_schema_view_config`, `PAGINATION_PARAMETER` |
| `grooveshop-django-api/src/core/utils/views.py` | `process_translations_data` for multipart translations |
| `grooveshop-django-api/src/core/api/serializers.py` | `ErrorResponseSerializer`, `RequiredDefaultTranslationMixin` |
| `grooveshop-django-api/src/core/middleware/idempotency.py` | `Idempotency-Key` replay |
| `grooveshop-storefront-ui-node-nuxt/openapi-ts.config.ts` | Type and Zod generation |
| `grooveshop-storefront-ui-node-nuxt/scripts/fetch-schema.mjs`, `scripts/sync-schema-yml.mjs` | Schema fetch and sync |
