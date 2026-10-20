---
title: App map
description: Every Django app in grooveshop-django-api, what it owns, where its entry points are, and which flow page covers it.
---

# App map

The Django repository is flat: every app is a top-level package next to
`settings.py`, `manage.py` and `core/urls.py`. There is no `src/` directory.
Apps split into two lists in `settings.py` because the platform is
multi-tenant: `SHARED_APPS` migrate into the `public` schema, `TENANT_APPS`
into every store's own schema, and `INSTALLED_APPS` is the union
(`settings.py`, `SHARED_APPS` / `TENANT_APPS` / `INSTALLED_APPS`). Which list
an app is in decides where its tables live, and therefore which host can
serve it. See [Multi-tenancy](/dev/platform/multi-tenancy).

## Settings, URLs and ASGI

- **`settings.py`** is a single file at the repository root; there is no
  settings package. `DJANGO_SETTINGS_MODULE` is `settings`. The
  `SYSTEM_ENV` variable (`dev`, `production`, `ci`) switches
  environment-specific behaviour: `production` refuses to start without
  `SECRET_KEY` and `CELERY_BROKER_URL`, `ci` swaps in a local Redis for
  `CACHES`. Everything else comes from `.env` through python-dotenv.
- **`core/urls.py`** is `ROOT_URLCONF` and mounts every app under
  `api/v1/`. It is split into named groups so two hosts can compose
  different subsets: `_root_shared_patterns` (webhooks, allauth headless,
  OIDC discovery), `_shared_i18n_patterns` (admin infrastructure, country,
  region, tenant, health, settings, schema), `_storefront_i18n_patterns`
  (the commerce API) and `_storefront_admin_i18n_patterns` (the store
  admin). `public_shared_urlpatterns` is the subset the platform host
  serves; `tenant/urls_public.py` (`PUBLIC_SCHEMA_URLCONF`) prepends the
  platform admin to it. A store's catalogue API is structurally absent on
  the platform host, not merely empty.
- **`asgi/__init__.py`** builds the Channels `ProtocolTypeRouter`: HTTP goes
  to Django wrapped in a bare `/health/` responder, WebSocket goes through
  `AllowedHostsOriginValidator` → `TenantWebsocketMiddleware` →
  `TokenAuthMiddlewareStack` → `ws/notifications/` →
  `NotificationConsumer`. The service is ASGI-only in production (Gunicorn
  with Uvicorn workers); Daphne only backs `runserver`.

## Core and tenant

### `core/`

Shared infrastructure, no domain models of its own except `Translation`
(DB-backed Rosetta overlay) and `CachePurgeLog`. Owns the abstract models
(`core/models.py`), `BaseModelViewSet` (`core/api/views.py`), permissions
(`core/api/permissions.py`), Knox token authentication
(`core/api/tokens.py`), throttles, the OpenAPI helpers
(`core/utils/serializers.py`, `core/api/schema.py`), filters, pagination,
managers, custom fields, the Celery app (`core/celery.py`), system tasks
(`core/tasks.py`), the cache backend (`core/caches.py`) and the cache
surface registry (`core/cache/`), middleware (`core/middleware/`), the
email template registry and preview (`core/email/`), and the root URL
conf. Covered by [Base classes & patterns](/dev/django/patterns),
[API conventions](/dev/django/api-conventions),
[Celery](/dev/django/celery) and [Caches](/dev/operations/caches).

### `tenant/`

The multi-tenancy control plane. Models: `Tenant` (the django-tenants
`TenantMixin`, plus branding, plan flags and every per-merchant credential
field), `TenantDomain`, `UserTenantMembership` (staff roles),
`TenantArchive`. Entry points: `tenant/urls.py` (`/api/v1/tenant/resolve`
and memberships, served on every host), `tenant/urls_public.py` (the
platform host's urlconf), `tenant/middleware.py`, `tenant/auth_backends.py`
(`PlatformStaffBackend`, the provenance stamp), `tenant/api_tokens.py`
(`StaffBearer` tokens), `tenant/membership.py` (`is_store_staff`),
`tenant/role_scopes.py`, `tenant/credentials.py` (per-tenant secrets, no
platform fallback), `tenant/provisioning.py`, `tenant/lifecycle.py`,
`tenant/billing.py`, `tenant/cache.py` (`make_tenant_key`,
`tenant_resolve_key`), `tenant/celery.py` (`TenantTask`,
`run_for_all_tenants`, `dispatch_on_commit`) and `tenant/tasks.py` (every
beat fan-out). Covered by [Multi-tenancy](/dev/platform/multi-tenancy) and
the synced [API staff identity](/dev/django/reference/api-staff-identity)
reference.

## Domain apps

### `product/`

Catalogue. Models under `product/models/`: `Product`, `ProductCategory`
(MPTT), `ProductImage`, `ProductCategoryImage`, `Brand`,
`ProductAttribute`, `ProductAttributeValue`, `ProductVariantGroup`,
`ProductReview`, `ProductFavourite`, `ProductAlert`, `ProductRelation`
(curated recommendations). Views under `product/views/`, one module per
model; `product/tasks.py` sends price-drop, restock and low-stock alerts;
`product/signals.py` keeps counters and caches in step. Stock quantity is
a column on `Product`, but the reservation logic is not here: it lives in
`order/stock.py`. Flow pages: [Search](/dev/flows/search),
[Recommendations](/dev/flows/recommendations).

### `order/`

Orders, invoices and stock reservations. Models under `order/models/`:
`Order`, `OrderItem`, `OrderHistory`, `OrderItemHistory`, `Invoice`,
`InvoiceCounter`, `StockReservation`, `StockLog`, `VivaWebhookEvent`.
`order/services.py` holds the creation paths and state machine;
`order/stock.py` holds `StockManager`, whose `reserve_stock()` and
`release_stock()` take `select_for_update()` on the product row and the
reservations; `order/signals/handlers.py` fires the email, WebSocket and
gateway side-effects on commit; `order/tasks.py` holds every order email,
invoice generation, myDATA submission,
`auto_cancel_stuck_pending_orders` and the abandonment mailer;
`order/notifications.py` holds the live WebSocket push tasks;
`order/views/viva_webhook.py` receives Viva Wallet. Read the synced
[Order / Payment / Shipping / Notification System](/dev/django/reference/order-system)
reference before touching it. Flow pages:
[Checkout & payment](/dev/flows/checkout-and-payment),
[Order lifecycle](/dev/flows/order-lifecycle).

### `cart/`

`Cart` and `CartItem` (`cart/models/`), `cart/services.py` for
materialisation and pricing (the B2B price list and promotions bind on
every materialisation), `cart/views/` for the guest and customer cart API.
Flow pages: [Checkout & payment](/dev/flows/checkout-and-payment),
[B2B](/dev/flows/b2b).

### `user/`

`UserAccount` (`AUTH_USER_MODEL`, in both app lists so the public schema
holds platform staff and each tenant holds its customers), `UserAddress`,
`UserSubscription` / `SubscriptionTopic`, `UserDataExport`. `user/tasks.py`
handles social avatar download, data export and account deletion. Auth
itself is django-allauth headless, mounted at `_allauth/` in
`core/urls.py`. Flow page:
[Notifications & email](/dev/flows/notifications-and-email).

### `blog/`

`BlogPost`, `BlogCategory` (MPTT), `BlogAuthor`, `BlogComment`, `BlogTag`
under `blog/models/`, views per model under `blog/views/`,
`blog/tasks.py` for the comment-liked notification. Indexed in
Meilisearch alongside products. Flow page: [Search](/dev/flows/search).

### `promotion/`, `giftcard/`, `b2b/`

- `promotion/`: `Promotion`, `PromotionCode`, `PromotionRedemption`,
  `CartPromotionCode`; rule evaluation in `promotion/services.py`; the
  admin bulk code generator is a dialog action in `promotion/admin.py`.
- `giftcard/`: `GiftCard`, `GiftCardPurchase`, `GiftCardTransaction` (a
  ledger); delivery, expiry and reminder tasks in `giftcard/tasks.py`.
- `b2b/`: `BusinessProfile`, `CustomerGroup`, `PriceListItem`; VIES
  validation and approval emails in `b2b/services.py` and `b2b/tasks.py`.

All three ship dark behind tenant flags. Flow pages:
[Promotions & gift cards](/dev/flows/promotions-and-gift-cards),
[B2B](/dev/flows/b2b).

### `loyalty/`

`LoyaltyTier` (translatable) and `PointsTransaction`; `loyalty/services.py`
awards and reverses points, `loyalty/tasks.py` expires them. One switch
controls both earning and redeeming. Flow page: [Loyalty](/dev/flows/loyalty).

### `shipping/`, `shipping_acs/`, `shipping_boxnow/`

`shipping/` holds the carrier abstraction (`shipping/interfaces.py`), the
`ShippingProvider` row, the per-tenant `ShippingRate` table
(`shipping/models/rate.py`, the only source of shipping price,
availability and weight cap) and the shipping-options endpoint. `shipping_acs/`
(`AcsShipment`, `AcsPickupList`, `AcsCodPayout`, `AcsStation`,
`AcsTrackingEvent`) and `shipping_boxnow/` (`BoxNowShipment`,
`BoxNowLocker`, `BoxNowParcelEvent`) each carry a `services.py` client and
a `tasks.py` with voucher creation, tracking polls, station or locker sync
and, for ACS, the daily pickup list and COD reconciliation. The BoxNow
webhook view is in `shipping_boxnow/views/webhook.py`. Flow page:
[Shipping](/dev/flows/shipping).

### `pay_way/`, `vat/`, `country/`, `region/`, `tag/`, `contact/`

Reference and supporting data. `PayWay` (payment methods, with
`PayWayShippingExclusion`), `Vat`, `Country` and `Region` (the last two are
shared, identical across tenants), `Tag` / `TaggedItem` (generic tagging
through `TaggedModel`), and `contact/` (`Contact`, `ContactAttachment`,
`Feedback`, with attachment scanning and retention tasks). Flow pages:
[Checkout & payment](/dev/flows/checkout-and-payment),
[Notifications & email](/dev/flows/notifications-and-email).

### `page_config/`

Merchant-editable storefront layouts, `NavigationMenu` and translatable
`ContentPage`. A saved navigation row shadows the storefront's code
default, and its Nitro cache key is `pageConfigNavigation`
(`core/cache/surfaces.py`). Content pages seed unpublished.

### `recommendation/`

`RecommendationSlot`, `RecommendationCandidate`, `RecommendationEvent`; the
strategy registry and two-stage retrieval are described in the synced
[Product Recommendations Engine](/dev/django/reference/recommendations-engine)
reference. Flow page: [Recommendations](/dev/flows/recommendations).

### `notification/`

`Notification` and `NotificationUser`, the Channels `NotificationConsumer`
(`notification/consumers.py`), the per-user group naming
(`notification/groups.py`) and the single-use WebSocket ticket endpoint
(`notification/views/websocket.py`). Flow page:
[Notifications & email](/dev/flows/notifications-and-email).

### `agent/`

No models. An OAuth-scoped surface at `/api/v1/agent/*` consumed through the
Go agent gateway; Django is the OAuth 2.1 authorization server via
`allauth.idp`. Mounted outside `i18n_patterns` in `core/urls.py`. Flow
page: [Agentic commerce](/dev/flows/agentic-commerce).

## Integrations

### `search/` and `meili/`

`meili/` is the Meilisearch integration layer: `IndexMixin` with a
`MeiliMeta` inner class (`meili/models.py`), the client
(`meili/_client.py`), index and delete tasks (`meili/tasks.py`) and the
management commands. `search/` is the product-facing side: federated
search views, Greeklish transliteration at index time
(`search/transliteration.py`), `SearchQuery` / `SearchClick` analytics and
the click-score task. Flow page: [Search](/dev/flows/search); reference:
[Search API](/dev/django/reference/api/search) and
[Meilisearch management commands](/dev/django/reference/search/management-commands).

### `meta_capi/`

Meta Conversions API dispatch: `MetaCapiEventLog`, signal receivers on
order and registration events, and `meta_capi/tasks.py` which posts the
events. Flow page: [Analytics & consent](/dev/flows/analytics-and-consent).

### Payments

There is no `payments/` app. Stripe is dj-stripe (`djstripe` in
`TENANT_APPS`, webhook under `stripe/` in `core/urls.py`); Viva Wallet is
`order/views/viva_webhook.py` plus `order/payment_events.py`. Both read
credentials from the `Tenant` row through `tenant/credentials.py`.

## Supporting

### `admin/`

The Unfold admin app: `MyAdminSite` (store admin) and `PlatformAdminSite`
(control plane), `BaseModelAdmin`, dashboards, sidebar permission callables
and the third-party admin patches. Covered in full by
[Admin (Unfold)](/dev/django/admin).

### `devtools/`

`CustomDjangoModelFactory`, the base class for every test factory, and the
seeding strategy registry (`devtools/factories.py`). Covered by
[Testing](/dev/django/testing).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/settings.py` | `SYSTEM_ENV`, `SHARED_APPS`, `TENANT_APPS`, `INSTALLED_APPS` |
| `grooveshop-django-api/core/urls.py` | `ROOT_URLCONF`; URL groups per host; `api/v1/` mounts |
| `grooveshop-django-api/tenant/urls_public.py` | `PUBLIC_SCHEMA_URLCONF` for the platform host |
| `grooveshop-django-api/asgi/__init__.py` | Channels routing, `ws/notifications/` |
| `grooveshop-django-api/tenant/` | Control plane: models, middleware, membership, celery helpers |
| `grooveshop-django-api/core/` | Base classes, cache, celery app, email registry |
| `grooveshop-django-api/*/models/`, `*/views/`, `*/tasks.py` | Per-app entry points named above |
