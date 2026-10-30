---
title: Data retention
description: What the platform deletes on a schedule, when, from which setting, and the records it never deletes.
---

# Data retention

Every table that grows without a business reason to keep its history has a
periodic sweep. Each sweep deletes by primary-key batch through
`core/retention.py:delete_in_batches`, so a first run on a large backlog
holds no long lock and loads no table into memory, and it goes through the
ORM so cascades and file-removal signals still run. The code wins over this
page.

Source: `core/retention.py`, `core/tasks.py`, `core/history.py`,
`tenant/tasks.py` (the `fanout_purge_*` wrappers), `settings.py`
(`CELERY_BEAT_SCHEDULE`, the retention constants, `EXTRA_SETTINGS_DEFAULTS`),
`shipping_acs/tasks.py`, `shipping_boxnow/tasks.py`,
`recommendation/tasks.py`, `meta_capi/tasks.py`, `contact/tasks.py`,
`search/tasks.py`, `search/middleware.py`.

## What is deleted

All sweeps run daily at 04:00 Athens unless the table says otherwise. A
per-store sweep fans out to every active store, suspended ones included: a
store's billing state does not pause a deletion the platform promised.

| What is deleted | Scope | Kept for | Setting |
|---|---|---|---|
| Contact enquiries and feedback, with their files | per store | 365 days | store setting `CONTACT_RETENTION_DAYS` (0 keeps) |
| Bytes of contact attachments | per store | 90 days | store setting `CONTACT_ATTACHMENTS_RETENTION_DAYS` |
| Admin history (`django_admin_log`) | per store and public | 730 days | store setting `ADMIN_LOG_RETENTION_DAYS` (0 keeps); the public schema reads its own row of the same setting |
| Search queries: personal columns blanked | per store | 90 days | none (weekly, `anonymize-old-search-queries`) |
| Recommendation events | per store | 90 days | env `RECOMMENDATION_EVENT_RETENTION_DAYS`; startup fails when it is shorter than the learning window or an attribution window |
| Meta Conversions API delivery log | per store | 90 days | env `META_CAPI_EVENT_LOG_RETENTION_DAYS` |
| Cache purge log (`CachePurgeLog`) | public, every store's purges | 90 days | env `CACHE_PURGE_LOG_RETENTION_DAYS` |
| ACS API calls, successful tracking reads | per store | 14 days | env `ACS_API_CALL_POLL_RETENTION_DAYS` |
| ACS API calls, everything else (writes, failed polls) | per store | 90 days | env `ACS_API_CALL_RETENTION_DAYS` |
| ACS tracking events and BoxNow parcel events | per store | 730 days, only for a shipment in a terminal state | env `CARRIER_TRACKING_EVENT_RETENTION_DAYS` |
| Expired Django sessions | public and per store | session expiry | none (weekly Monday 04:00) |
| allauth user-session rows whose Django session is gone | public and per store | by state | none (same task as above) |
| Expired knox API tokens | per store | the token's own expiry | none (same task as above) |
| Notifications | per store | 365 days | code (`fanout_clear_expired_notifications`) |
| Simple-history rows (every audited model) | per store | 365 days, plus a nightly sweep of identical consecutive rows | code (`fanout_clear_old_history`, `fanout_clear_duplicate_history`) |
| Celery task failures | public | 30 days | `CELERY_RESULT_EXPIRES` |

`RETENTION_PURGE_BATCH_SIZE` (env, 1000) sets the rows per delete statement
for every sweep above.

The ACS poll runs every 15 minutes and was 85% of the `AcsApiCall` table, so
its successful calls have the short period: nothing was written to ACS by
them, and a failed poll keeps the 90-day period like every other call.

A carrier checkpoint is deleted when it is older than the period **and** its
shipment is in a terminal state (`shipping_acs.enum.shipment_state.TERMINAL_STATES`,
`shipping_boxnow.models.shipment.TERMINAL_STATES`). A BoxNow webhook event is
also the replay guard for that webhook, so an event older than the period can
be accepted again; a signed event two years old is not a realistic replay.

## Sessions and tokens are swept by state

The sessions task (`core.tasks.clear_expired_sessions_task`) runs
`clearsessions`, then deletes allauth `UserSession` rows with no
`django_session` row (allauth purges them only when the same user signs in
again), then expired knox tokens (knox deletes a user's expired tokens only
when that user authenticates again, and has no sweep). Knox exists in the
store schemas only, so the public pass skips it.

## What is never deleted

Orders and their items, payments and refunds (and refund attempts), invoices,
`OrderHistory`, `StockLog`, COD payouts, gift-card and loyalty ledgers, the
Viva and Stripe webhook events tied to a payment, and the Omnibus price
records. A destroyed store's invoices are kept `TENANT_INVOICE_RETENTION_YEARS`
by the platform. The simple-history sweep above does reach
`HistoricalProduct`; the legal price record is `ProductPriceSpell`, not that
table.

## What is not recorded in the first place

- A request to the product search endpoint with no query text is a listing
  load, not a search, and `SearchAnalyticsMiddleware` does not record it. The
  storefront's category pages and its cache warm-up read that endpoint.
- A save that writes only excluded fields of `AcsShipment` or `BoxNowShipment`
  (the tracking poll) writes no history row: `core.history.ChangeOnlyHistoricalRecords`
  skips it. Any new model with `excluded_fields` and a bookkeeping-only save
  should use it.

## Adding a sweep

1. A task in the owning app, a batched delete through `delete_in_batches`,
   `MonitoredTask` or `TenantTask` as its neighbours.
2. A `fanout_purge_*` wrapper in `tenant/tasks.py` with
   `include_suspended=True` when the table is per store; a public-schema table
   gets its own beat entry and an entry in
   `PUBLIC_SCHEMA_TASKS` (`tests/unit/tenant/test_celery_fanout.py`).
3. A beat entry in `settings.py`, a platform env constant or a store setting
   in `EXTRA_SETTINGS_DEFAULTS`, and a row in the table above (and in the
   admin guide's *Automatic tasks* page when a store owner can see the data).
4. A test for the batch, the boundary and, for a store setting, one store's
   period never reaching another store's rows (`tests_mt/`).
