---
title: App map
description: Every Django app in grooveshop-django-api, what it owns, where its entry points are, and which flow page covers it.
---

# App map

Every app is a top-level package in `src/` of the Django repository, next to
`src/settings.py` and `src/core/urls.py`; `src/` is on the Python path, so an
import is `order.services`, never `src.order.services`. `manage.py`,
`pyproject.toml`, `tests/`, `tests_mt/`, `docs/` and `api-contract/` stay at the
repository root.
Apps split into two lists in `settings.py` because the platform is
multi-tenant: `SHARED_APPS` migrate into the `public` schema, `TENANT_APPS`
into every store's own schema, and `INSTALLED_APPS` is the union
(`src/settings.py`, `SHARED_APPS` / `TENANT_APPS` / `INSTALLED_APPS`). Which list
an app is in decides where its tables live, and therefore which host can
serve it. See [Multi-tenancy](/dev/platform/multi-tenancy).

## Settings, URLs and ASGI

- **`src/settings.py`** is a single file; there is no
  settings package. `DJANGO_SETTINGS_MODULE` is `settings`. The
  `SYSTEM_ENV` variable (`dev`, `production`, `ci`) switches
  environment-specific behaviour: `production` refuses to start without
  `SECRET_KEY` and `CELERY_BROKER_URL`, `ci` swaps in a local Redis for
  `CACHES`. Everything else comes from `.env` through python-dotenv.
- **`src/core/urls.py`** is `ROOT_URLCONF` and mounts every app under
  `api/v1/`. It is split into named groups so two hosts can compose
  different subsets: `_root_shared_patterns` (webhooks, allauth headless,
  OIDC discovery), `_shared_i18n_patterns` (admin infrastructure, country,
  region, tenant, health, settings, schema), `_storefront_i18n_patterns`
  (the commerce API) and `_storefront_admin_i18n_patterns` (the store
  admin). `public_shared_urlpatterns` is the subset the platform host
  serves; `src/tenant/urls_public.py` (`PUBLIC_SCHEMA_URLCONF`) prepends the
  platform admin to it. A store's catalogue API is structurally absent on
  the platform host, not merely empty.
- **`src/asgi/__init__.py`** builds the Channels `ProtocolTypeRouter`: HTTP goes
  to Django wrapped in a bare `/health/` responder, WebSocket goes through
  `AllowedHostsOriginValidator` → `TenantWebsocketMiddleware` →
  `TokenAuthMiddlewareStack` → `ws/notifications/` →
  `NotificationConsumer`. The service is ASGI-only: Gunicorn with Uvicorn
  workers in production, `PYTHONPATH=src uvicorn asgi:application --reload` locally.
  Daphne is not a dependency, so `manage.py runserver` falls back to
  Django's default WSGI handler and serves no WebSocket.

## Core and tenant

### `src/core/`

Shared infrastructure, no domain models of its own except `Translation`
(DB-backed Rosetta overlay) and `CachePurgeLog`. Owns the abstract models
(`src/core/models.py`), `BaseModelViewSet` (`src/core/api/views.py`), permissions
(`src/core/api/permissions.py`), Knox token authentication
(`src/core/api/tokens.py`), throttles, the OpenAPI helpers
(`src/core/utils/serializers.py`, `src/core/api/schema.py`), filters, pagination,
managers, custom fields, the Celery app (`src/core/celery.py`), system tasks
(`src/core/tasks.py`), the cache backend (`src/core/caches.py`) and the cache
surface registry (`src/core/cache/`), middleware (`src/core/middleware/`), and the root URL conf. Covered by [Base classes & patterns](/dev/django/patterns),
[API conventions](/dev/django/api-conventions),
[Celery](/dev/django/celery) and [Caches](/dev/operations/caches).

### `src/tenant/`

The multi-tenancy control plane. Models: `Tenant` (the django-tenants
`TenantMixin`, plus branding, plan flags and every per-merchant credential
field), `TenantDomain`, `UserTenantMembership` (staff roles),
`TenantArchive`. Entry points: `src/tenant/urls.py` (`/api/v1/tenant/resolve`
and memberships, served on every host), `src/tenant/urls_public.py` (the
platform host's urlconf), `src/tenant/middleware.py`, `src/tenant/auth_backends.py`
(`PlatformStaffBackend`, the provenance stamp), `src/tenant/api_tokens.py`
(`StaffBearer` tokens), `src/tenant/membership.py` (`is_store_staff`),
`src/tenant/role_scopes.py`, `src/tenant/credentials.py` (per-tenant secrets, no
platform fallback), `src/tenant/provisioning.py`, `src/tenant/lifecycle.py`,
`src/tenant/billing.py`, `src/tenant/cache.py` (`make_tenant_key`,
`tenant_resolve_key`), `src/tenant/celery.py` (`TenantTask`,
`run_for_all_tenants`, `dispatch_on_commit`) and `src/tenant/tasks.py` (every
beat fan-out). Covered by [Multi-tenancy](/dev/platform/multi-tenancy) and
the synced [API staff identity](/dev/django/reference/api-staff-identity)
reference.

## Domain apps

### `src/product/`

Catalogue. Models under `src/product/models/`: `Product`, `ProductCategory`
(MPTT), `ProductImage`, `ProductCategoryImage`, `Brand`,
`ProductAttribute`, `ProductAttributeValue`, `ProductVariantGroup`,
`ProductReview`, `ProductFavourite`, `ProductAlert`, `ProductRelation`
(curated recommendations). Views under `src/product/views/`, one module per
model; `src/product/tasks.py` sends price-drop, restock and low-stock alerts;
`src/product/signals.py` keeps counters and caches in step. Stock quantity is
a column on `Product`, but the reservation logic is not here: it lives in
`src/order/stock.py`. Flow pages: [Search](/dev/flows/search),
[Recommendations](/dev/flows/recommendations).

### `src/order/`

Orders, invoices and stock reservations. Models under `src/order/models/`:
`Order`, `OrderItem`, `OrderHistory`, `OrderItemHistory`, `Invoice`,
`InvoiceCounter`, `StockReservation`, `StockLog`, `VivaWebhookEvent`.
`src/order/services.py` holds the creation paths and state machine;
`src/order/stock.py` holds `StockManager`, whose `reserve_stock()` and
`release_stock()` take `select_for_update()` on the product row and the
reservations; `src/order/signals/handlers.py` fires the email, WebSocket and
gateway side-effects on commit; `src/order/tasks.py` holds every order email,
invoice generation, myDATA submission,
`auto_cancel_stuck_pending_orders` and the abandonment mailer;
`src/order/notifications.py` holds the live WebSocket push tasks;
`src/order/views/viva_webhook.py` receives Viva Wallet. Read the synced
[Order / Payment / Shipping / Notification System](/dev/django/reference/order-system)
reference before touching it. Flow pages:
[Checkout & payment](/dev/flows/checkout-and-payment),
[Order lifecycle](/dev/flows/order-lifecycle).

### `src/cart/`

`Cart` and `CartItem` (`src/cart/models/`), `src/cart/services.py` for
materialisation and pricing (the B2B price list and promotions bind on
every materialisation), `src/cart/views/` for the guest and customer cart API.
Flow pages: [Checkout & payment](/dev/flows/checkout-and-payment),
[B2B](/dev/flows/b2b).

### `src/user/`

`UserAccount` (`AUTH_USER_MODEL`, in both app lists so the public schema
holds platform staff and each tenant holds its customers), `UserAddress`,
`UserSubscription` / `SubscriptionTopic`, `UserDataExport`. `src/user/tasks.py`
handles social avatar download, data export and account deletion. Auth
itself is django-allauth headless, mounted at `_allauth/` in
`src/core/urls.py`. Flow page:
[Notifications & email](/dev/flows/notifications-and-email).

### `src/blog/`

`BlogPost`, `BlogCategory` (MPTT), `BlogAuthor`, `BlogComment`, `BlogTag`
under `src/blog/models/`, views per model under `src/blog/views/`,
`src/blog/tasks.py` for the comment-liked notification. Indexed in
Meilisearch alongside products. Flow page: [Search](/dev/flows/search).

### `src/promotion/`, `src/giftcard/`, `src/b2b/`

- `src/promotion/`: `Promotion`, `PromotionCode`, `PromotionRedemption`,
  `CartPromotionCode`; rule evaluation in `src/promotion/services.py`; the
  admin bulk code generator is a dialog action in `src/promotion/admin.py`.
- `src/giftcard/`: `GiftCard`, `GiftCardPurchase`, `GiftCardTransaction` (a
  ledger); delivery, expiry and reminder tasks in `src/giftcard/tasks.py`.
- `src/b2b/`: `BusinessProfile`, `CustomerGroup`, `PriceListItem`; VIES
  validation and approval emails in `src/b2b/services.py` and `src/b2b/tasks.py`.

All three ship dark behind tenant flags. Flow pages:
[Promotions & gift cards](/dev/flows/promotions-and-gift-cards),
[B2B](/dev/flows/b2b).

### `src/loyalty/`

`LoyaltyTier` (translatable) and `PointsTransaction`; `src/loyalty/services.py`
awards and reverses points, `src/loyalty/tasks.py` expires them. One switch
controls both earning and redeeming. Flow page: [Loyalty](/dev/flows/loyalty).

### `src/shipping/`, `src/shipping_acs/`, `src/shipping_boxnow/`

`src/shipping/` holds the carrier abstraction (`src/shipping/interfaces.py`), the
`ShippingProvider` row, the per-tenant `ShippingRate` table
(`src/shipping/models/rate.py`, the only source of shipping price,
availability and weight cap) and the shipping-options endpoint. `src/shipping_acs/`
(`AcsShipment`, `AcsPickupList`, `AcsCodPayout`, `AcsStation`,
`AcsTrackingEvent`) and `src/shipping_boxnow/` (`BoxNowShipment`,
`BoxNowLocker`, `BoxNowParcelEvent`) each carry a `services.py` client and
a `tasks.py` with voucher creation, tracking polls, station or locker sync
and, for ACS, the daily pickup list and COD reconciliation. The BoxNow
webhook view is in `src/shipping_boxnow/views/webhook.py`. Flow page:
[Shipping](/dev/flows/shipping).

### `src/pay_way/`, `src/vat/`, `src/country/`, `src/region/`, `src/tag/`, `src/contact/`

Reference and supporting data. `PayWay` (payment methods, with
`PayWayShippingExclusion`), `Vat`, `Country` and `Region` (the last two are
shared, identical across tenants), `Tag` / `TaggedItem` (generic tagging
through `TaggedModel`), and `src/contact/` (`Contact`, `ContactAttachment`,
`Feedback`, with attachment scanning and retention tasks). Flow pages:
[Checkout & payment](/dev/flows/checkout-and-payment),
[Notifications & email](/dev/flows/notifications-and-email).

### `src/page_config/`

Translatable `ContentPage` (policies, FAQ, information pages) and the
legal documents: the platform's texts and their rollout
(`legal_documents.py`, `legal_guard.py`), the version each order accepted
(`LegalDocumentVersion`) and the content pages a new store is seeded with
(`content_pages.py`; the non-legal ones seed unpublished). Pages and menus
are the page builder's (`src/builder/`).

### `src/builder/`

The storefront page builder: `BuilderDocument` (theme, section groups,
templates, pages, each with a draft), immutable `BuilderVersion` and
`BuilderRelease`, and the derived `BuilderReference` index. The block
catalogue is the storefront's; `src/builder/services.py` is the only writer and a
release moves the cache generation and the `builder` surface. Flow page:
[Page builder: documents and releases](/dev/flows/page-builder-data); reference:
[Storefront page builder](/dev/django/reference/builder).

### `src/recommendation/`

`RecommendationSlot`, `RecommendationCandidate`, `RecommendationEvent`; the
strategy registry and two-stage retrieval are described in the synced
[Product Recommendations Engine](/dev/django/reference/recommendations-engine)
reference. Flow page: [Recommendations](/dev/flows/recommendations).

### `src/notification/`

`Notification` and `NotificationUser`, the Channels `NotificationConsumer`
(`src/notification/consumers.py`), the per-user group naming
(`src/notification/groups.py`) and the single-use WebSocket ticket endpoint
(`src/notification/views/websocket.py`). Flow page:
[Notifications & email](/dev/flows/notifications-and-email).

### `src/agent/`

No models. An OAuth-scoped surface at `/api/v1/agent/*` consumed through the
Go agent gateway; Django is the OAuth 2.1 authorization server via
`allauth.idp`. Mounted outside `i18n_patterns` in `src/core/urls.py`. Flow
page: [Agentic commerce](/dev/flows/agentic-commerce).

## Integrations

### `src/search/` and `src/meili/`

`src/meili/` is the Meilisearch integration layer: `IndexMixin` with a
`MeiliMeta` inner class (`src/meili/models.py`), the client
(`src/meili/_client.py`), index and delete tasks (`src/meili/tasks.py`) and the
management commands. `src/search/` is the product-facing side: product and
blog search views, Greeklish transliteration at index time
(`src/search/transliteration.py`), `SearchQuery` / `SearchClick` analytics and
the click-score task. Flow page: [Search](/dev/flows/search); reference:
[Search API](/dev/django/reference/api/search) and
[Meilisearch management commands](/dev/django/reference/search/management-commands).

### `src/meta_capi/`

Meta Conversions API dispatch: `MetaCapiEventLog`, signal receivers on
order and registration events, and `src/meta_capi/tasks.py` which posts the
events. Flow page: [Analytics & consent](/dev/flows/analytics-and-consent).

### `src/indexnow/`

IndexNow notifications to search engines: signal receivers
(`src/indexnow/signals.py`) queue a published product or blog post that was
created, changed or unpublished as an `indexnow.PendingUrl` row, and
`src/indexnow/tasks.py: submit_pending_urls` (beat, every 30 minutes, fanned
out per store) sends one POST per store. The per-store switch is
`INDEXNOW_ENABLED`; the key is `Tenant.indexnow_key`, served to the
storefront on `tenant/resolve`. Reference: `docs/indexnow.md` in the Django
repository.

### Payments

There is no `payments/` app. Stripe is dj-stripe (`djstripe` in
`TENANT_APPS`, webhook under `stripe/` in `src/core/urls.py`); Viva Wallet is
`src/order/views/viva_webhook.py` plus `src/order/payment_events.py`. Both read
credentials from the `Tenant` row through `src/tenant/credentials.py`.

## Supporting

### `src/admin/`

The Unfold admin app: `MyAdminSite` (store admin) and `PlatformAdminSite`
(control plane), `BaseModelAdmin`, dashboards, sidebar permission callables
and the third-party admin patches. Covered in full by
[Admin (Unfold)](/dev/django/admin).

### `src/devtools/`

`CustomDjangoModelFactory`, the base class for every test factory, and the
seeding strategy registry (`src/devtools/factories.py`). Covered by
[Testing](/dev/django/testing).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/src/settings.py` | `SYSTEM_ENV`, `SHARED_APPS`, `TENANT_APPS`, `INSTALLED_APPS` |
| `grooveshop-django-api/src/core/urls.py` | `ROOT_URLCONF`; URL groups per host; `api/v1/` mounts |
| `grooveshop-django-api/src/tenant/urls_public.py` | `PUBLIC_SCHEMA_URLCONF` for the platform host |
| `grooveshop-django-api/src/asgi/__init__.py` | Channels routing, `ws/notifications/` |
| `grooveshop-django-api/src/tenant/` | Control plane: models, middleware, membership, celery helpers |
| `grooveshop-django-api/src/core/` | Base classes, cache, celery app, email registry |
| `grooveshop-django-api/*/models/`, `*/views/`, `*/tasks.py` | Per-app entry points named above |
