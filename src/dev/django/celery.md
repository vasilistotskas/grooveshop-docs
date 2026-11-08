---
title: Celery and background jobs
description: The Celery app, MonitoredTask and TenantTask, the retry policy, every scheduled job and its cadence, tenant fan-out, RabbitMQ and the result backend, Flower, on_commit dispatch and how to add a task.
---

# Celery and background jobs

Every deferred side effect in GrooveShop is a Celery task: transactional
email, invoice PDFs, carrier calls, Meilisearch indexing, backups and the
nightly housekeeping. The one rule that shapes all of it is multi-tenancy:
Celery Beat runs in the `public` schema, so anything that touches store
data is dispatched into each tenant schema by a fan-out wrapper.

## The app (`core/celery.py`)

`create_celery_app()` builds `Celery("core")` and loads the `CELERY_*`
namespace from `settings.py`, where every Celery option lives. Add options
there, because a `conf.update()` here would not win: `config_from_object` with
`namespace="CELERY"` resolves the prefixed key from every configuration source
before a bare lowercase one, whatever the call order. The task time limits are
`CELERY_TASK_SOFT_TIME_LIMIT` and `CELERY_TASK_TIME_LIMIT`.

Signal handlers in the same function are connected with `weak=False`, because
closures defined inside a function are otherwise garbage-collected before they
ever fire. They: close stale DB connections at worker start, apply the
DB-backed translation overlay so workers see Rosetta edits, refresh it when
another pod bumps the version tick, and propagate the request's correlation id into task headers and back
into the worker's log context.

## Base task classes

`tenant/celery.py: TenantTask` propagates the schema. `apply_async()`
stamps a `_schema_name` header from `connection.schema_name` unless the
caller set one; `__call__()` wraps the body in that schema's context.

`core/tasks.py: MonitoredTask(TenantTask)` adds `on_success` / `on_failure`
logging with redacted arguments. A failure is logged once, at ERROR, with
the traceback (`exc_info=exc`: Celery's `einfo.exception` is a wrapper
with no traceback frames):

```python
class MonitoredTask(TenantTask):
    def on_success(self, retval, task_id, args, kwargs):
        logger.info(f"Task {self.name} completed successfully. Task ID: {task_id}")

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        safe_args = [_safe_repr(a) for a in (args or [])]
        ...
        logger.error("Task %s failed. ...", self.name, ..., exc_info=exc)
```

Domain tasks are declared as `@celery_app.task(base=MonitoredTask, ...)`
or `@shared_task(base=MonitoredTask, ...)`.

## Retry policy

Retry policy is per task, never global: Celery has no setting for
`autoretry_for`, backoff or `max_retries`, so each decorator sets its own.
`autoretry_for` names a transient set from `core/retry.py`, never `Exception`,
because a deterministic failure retried only repeats itself, and
`tests/unit/core/test_celery_tasks_do_not_retry_everything.py` fails for a task
that breaks this. The ACS pickup list, for example, retries only
`AcsRetryableError`: an unprinted-voucher refusal returns `blocked_unprinted`
and notes the orders, and any other ACS refusal fails the task without a retry
(`shipping_acs/tasks.py`).
`task_acks_late=True` plus `CELERY_TASK_REJECT_ON_WORKER_LOST = True` means
a task killed mid-run is redelivered, so bodies must be idempotent.

## Broker and result backend

- Broker: RabbitMQ. `CELERY_BROKER_URL` is required in production
  (`ImproperlyConfigured` otherwise); the dev compose default is
  `amqp://guest:guest@rabbitmq:5672//`. In Kubernetes it is assembled from
  the operator-generated `backend-message-broker-default-user` secret
  (`grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/backend.yaml`).
  Workers consume the `celery` and `meilisearch` queues.
- Results: `CELERY_RESULT_BACKEND` is fixed in `settings.py` to
  `core.result_backend.TenantDatabaseBackend`, the database backend plus the
  store a failure belongs to. `django_celery_results` is in `SHARED_APPS` **only**, and `TENANT_APPS`
  carries a comment saying it is deliberately absent: task results are
  platform operations rather than one store's data, and
  `celery.backend_cleanup` is dispatched by beat with no tenant header, so
  it runs in `public` and could never prune per-tenant tables.
  `tenant/migrations/0039` drops the ones an earlier `TENANT_APPS` entry
  created.
  **No Deployment overrides the backend** — `base/backend.yaml` carries an
  explicit comment saying so on all four backend containers, because the
  results used to go to Redis DB 1 and shared one `allkeys-lru` budget
  with the Django cache. `settings.py` then narrows what gets
  written: `CELERY_TASK_IGNORE_RESULT` with
  `CELERY_TASK_STORE_ERRORS_EVEN_IF_IGNORED` keeps failures and drops
  successes.
- Scheduler: `scheduler.beat:CodeOwnedScheduler`. The `CELERY_BEAT_SCHEDULE`
  dict is the whole schedule, plus the `celery.backend_cleanup` entry Celery
  adds itself, and a `scheduler.PeriodicTask` row holds only its state. Beat
  deletes any row neither declares when it starts. The rows
  are in the platform admin under Background Jobs. See the Django repository's
  `docs/scheduler.md`.

Flower runs as its own Deployment (`backend.yaml`, port 5555) and refuses
to start without `FLOWER_BASIC_AUTH`; the admin's site dropdown links to
it, for platform superusers, only when `ADMIN_FLOWER_URL` is set.

## Tenant fan-out

Beat fires in `public`. A task that reads store tables is registered under
a `fanout_*` wrapper in `tenant/tasks.py`:

```python
@celery_app.task(base=TenantTask)
def fanout_cleanup_abandoned_carts():
    return run_for_all_tenants("core.tasks.cleanup_abandoned_carts")
```

`run_for_all_tenants()` (`tenant/celery.py`) iterates active,
non-suspended tenants (suspended ones are skipped except for the wrappers
passed `include_suspended=True`: the retention sweeps, and the money jobs
`reconcile-pending-refunds` and `allocate-credit-sources`, because a
suspended store's open refunds still hold its customers' money) and calls `send_task` with a
`_schema_name` header per tenant. It returns plain dicts, not
`AsyncResult` objects, because the JSON result serializer cannot encode
those. Calling the underlying task directly from beat would run it against
the empty public schema and report success.

## Scheduled jobs

From `settings.py: get_celery_beat_schedule()`, one row per entry in the
order the settings declare them. Times are Athens local. A cadence marked
† falls back to hourly when `DEBUG` is on; the others run on the same
schedule everywhere. **Runs in** says where the work happens: `public` (beat
calls the task directly), every store (a `fanout_*` wrapper in
`tenant/tasks.py` re-dispatches the task named in the notes into each active,
non-suspended store), or every store including suspended ones
(`include_suspended=True`).

| Beat entry | Task | Runs in | Cadence | Notes |
|---|---|---|---|---|
| `monitor-system-health` | `core.tasks.monitor_system_health` | `public` | every 30 min † | Emails `ADMINS` and raises on any failed check, including Redis persistence status |
| `scheduled-database-backup` | `core.tasks.scheduled_database_backup` | `public` | daily 03:00 † | `pg_dump` into `backups/scheduled` on the backups PVC; see [Backups](/dev/operations/backups). Dropped when `DATABASE_BACKUPS_ENABLED` is off (staging) |
| `cleanup-old-backups` | `core.tasks.cleanup_old_backups` | `public` | Sun 05:00 † | 30-day retention on `backups/` (`kwargs`). Dropped with the entry above |
| `clear-duplicate-history` | `tenant.tasks.fanout_clear_duplicate_history` | every store | daily 05:00 † | `core.tasks.clear_duplicate_history_task`: simple-history pruning |
| `clear-old-history` | `tenant.tasks.fanout_clear_old_history` | every store | Sun 03:00 † | `core.tasks.clear_old_history_task`, 365 days |
| `clear-expired-sessions` | `core.tasks.clear_expired_sessions_task` | `public` | Mon 04:00 † | Platform-staff sessions |
| `clear-expired-sessions-tenants` | `tenant.tasks.fanout_clear_expired_sessions` | every store | Mon 04:00 † | The same task, for each store's customer sessions |
| `update-search-click-scores` | `tenant.tasks.fanout_update_click_scores` | every store | daily 03:00 † | `search.tasks.update_click_scores` |
| `reevaluate-price-episodes` | `tenant.tasks.fanout_reevaluate_price_episodes` | every store | daily 03:00 † | `product.tasks.reevaluate_price_episodes`: reconciles every product with its live price (EU Omnibus price records) |
| `recompute-recommendation-candidates` | `tenant.tasks.fanout_recompute_recommendation_candidates` | every store | daily 04:00 † | `recommendation.tasks.recompute_all_candidates` |
| `learn-recommendation-weights` | `tenant.tasks.fanout_learn_recommendation_weights` | every store | daily 05:00 † | `recommendation.tasks.learn_slot_weights` |
| `reindex-offer-window-changes` | `tenant.tasks.fanout_reindex_offer_window_changes` | every store | every 5 min | `promotion.tasks.reindex_offer_window_changes_task`: reindexes `on_offer` when a promotion window opens or closes; `expires: 240` |
| `anonymize-old-search-queries` | `tenant.tasks.fanout_anonymize_old_search_queries` | every store | Sun 03:00 † | `search.tasks.anonymize_old_search_queries`, 90 days, set in the wrapper |
| `reap-unclaimed-contact-attachments` | `tenant.tasks.fanout_reap_unclaimed_attachments` | every store, suspended too | hourly | `contact.tasks.reap_unclaimed_attachments`: uploads whose enquiry was never sent |
| `purge-expired-contact-attachment-files` | `tenant.tasks.fanout_purge_expired_attachment_files` | every store, suspended too | daily 04:00 † | `contact.tasks.purge_expired_attachment_files`: drops bytes, keeps rows |
| `purge-expired-acs-api-calls` | `tenant.tasks.fanout_purge_expired_acs_api_calls` | every store, suspended too | daily 04:00 † | `shipping_acs.tasks.purge_expired_acs_api_calls` |
| `purge-expired-acs-tracking-events` | `tenant.tasks.fanout_purge_expired_acs_tracking_events` | every store, suspended too | daily 04:00 † | `shipping_acs.tasks.purge_expired_acs_tracking_events` |
| `purge-expired-boxnow-parcel-events` | `tenant.tasks.fanout_purge_expired_boxnow_parcel_events` | every store, suspended too | daily 04:00 † | `shipping_boxnow.tasks.purge_expired_boxnow_parcel_events` |
| `purge-expired-recommendation-events` | `tenant.tasks.fanout_purge_expired_recommendation_events` | every store, suspended too | daily 04:00 † | `recommendation.tasks.purge_expired_recommendation_events` |
| `purge-expired-pending-payment-fees` | `tenant.tasks.fanout_purge_expired_pending_payment_fees` | every store, suspended too | daily 04:00 † | `order.tasks.purge_expired_pending_payment_fees` |
| `purge-expired-meta-capi-event-logs` | `tenant.tasks.fanout_purge_expired_meta_capi_event_logs` | every store, suspended too | daily 04:00 † | `meta_capi.tasks.purge_expired_meta_capi_event_logs` |
| `purge-expired-admin-log-entries` | `core.tasks.purge_expired_admin_log_entries` | `public` | daily 04:00 † | Platform staff's admin log, under the public schema's `ADMIN_LOG_RETENTION_DAYS` |
| `purge-expired-email-logs` | `emails.tasks.purge_expired_email_logs` | `public` | daily 04:00 † | The platform email types' `EmailLog` |
| `purge-expired-email-logs-tenants` | `tenant.tasks.fanout_purge_expired_email_logs` | every store, suspended too | daily 04:00 † | The same task, for each store's `EmailLog` |
| `purge-expired-admin-log-entries-tenants` | `tenant.tasks.fanout_purge_expired_admin_log_entries` | every store, suspended too | daily 04:00 † | The same task, for each store's admin log |
| `purge-expired-cache-purge-logs` | `core.tasks.purge_expired_cache_purge_logs` | `public` | daily 04:00 † | `CachePurgeLog` exists only in `public` |
| `redispatch-deferred-tasks` | `tenant.tasks.redispatch_deferred_tasks` | `public` | every minute | Publishes again the tasks whose publish failed after their change committed (`tenant.celery.dispatch_on_commit`) |
| `run-due-builder-publishes` | `tenant.tasks.fanout_run_due_builder_publishes` | every store | every minute | `builder.tasks.run_due_publishes`: a scheduled page-builder publish goes live within its minute |
| `purge-expired-builder-preview-links` | `tenant.tasks.fanout_purge_expired_builder_preview_links` | every store, suspended too | daily 04:00 † | `builder.tasks.purge_expired_preview_links` |
| `rescan-pending-contact-attachments` | `tenant.tasks.fanout_rescan_pending_contact_attachments` | every store | every 30 min | `contact.tasks.rescan_pending_attachments`: a scan whose publish was lost is found by its `PENDING` state |
| `purge-expired-contact-records` | `tenant.tasks.fanout_purge_expired_contact_records` | every store, suspended too | daily 04:00 † | `contact.tasks.purge_expired_contact_records`, the store's `CONTACT_RETENTION_DAYS` |
| `purge-unconfirmed-guest-subscriptions` | `tenant.tasks.fanout_purge_unconfirmed_guest_subscriptions` | every store, suspended too | daily 04:00 † | `user.tasks.purge_unconfirmed_guest_subscriptions`: guest newsletter sign-ups unconfirmed after 30 days |
| `purge-unconfirmed-guest-alerts` | `tenant.tasks.fanout_purge_unconfirmed_guest_alerts` | every store, suspended too | daily 04:00 † | `product.tasks.purge_unconfirmed_guest_alerts` |
| `cleanup-expired-data-exports` | `tenant.tasks.fanout_cleanup_expired_data_exports` | every store | daily 03:00 † | `user.tasks.cleanup_expired_data_exports` |
| `send-inactive-user-notifications` | `tenant.tasks.fanout_send_inactive_user_notifications` | every store | 1st of month 06:00 † | `core.tasks.send_inactive_user_notifications` |
| `clear-all-cache` | `core.tasks.clear_all_cache_task` | `public` | 1st of month 04:00 | Deliberately no `DEBUG` override, so development does not clear the whole cache hourly |
| `reset-demo-stores` | `tenant.tasks.fanout_reset_demo_stores` | demo stores only | daily 04:00 | Not `run_for_all_tenants`: dispatches `devtools.tasks.reset_demo_store_task` only to active, non-suspended stores with `is_demo`, because it deletes orders, reviews, comments and carts |
| `cleanup-abandoned-carts` | `tenant.tasks.fanout_cleanup_abandoned_carts` | every store | daily 04:00 † | `core.tasks.cleanup_abandoned_carts` |
| `cleanup-old-guest-carts` | `tenant.tasks.fanout_cleanup_old_guest_carts` | every store | daily 06:00 † | `core.tasks.cleanup_old_guest_carts` |
| `clear-expired-notifications` | `tenant.tasks.fanout_clear_expired_notifications` | every store | 1st and 15th 06:00 † | `core.tasks.clear_expired_notifications_task`, 365 days |
| `sync-meilisearch-indexes` | `tenant.tasks.fanout_sync_meilisearch_indexes` | every store | daily 02:00 † | `core.tasks.sync_meilisearch_indexes` |
| `cleanup-expired-stock-reservations` | `tenant.tasks.fanout_cleanup_expired_stock_reservations` | every store | hourly | `order.tasks.cleanup_expired_stock_reservations` |
| `purge-expired-tenant-archives` | `tenant.tasks.purge_expired_tenant_archives` | `public` | daily 03:00 | `TenantArchive` rows live in `public` because their schemas were dropped |
| `process-tenant-billing` | `tenant.tasks.process_tenant_billing` | `public` | daily 06:00 † | Billing terms and dunning are public `Tenant` rows |
| `process-loyalty-points-expiration` | `tenant.tasks.fanout_process_points_expiration` | every store | daily 03:00 † | `loyalty.tasks.process_points_expiration` |
| `expire-gift-cards` | `tenant.tasks.fanout_expire_gift_cards` | every store | daily 03:00 † | `giftcard.tasks.expire_gift_cards` |
| `deliver-scheduled-gift-cards` | `tenant.tasks.fanout_deliver_scheduled_gift_cards` | every store | daily 06:00 † | `giftcard.tasks.deliver_scheduled_gift_cards`: cards bought with a future `deliver_at` |
| `send-gift-card-expiry-reminders` | `tenant.tasks.fanout_send_gift_card_expiry_reminders` | every store | daily 06:00 † | `giftcard.tasks.send_gift_card_expiry_reminders` |
| `auto-cancel-stuck-pending-orders` | `tenant.tasks.fanout_auto_cancel_stuck_pending_orders` | every store | every 15 min | `order.tasks.auto_cancel_stuck_pending_orders`: the only place failed-payment stock is released |
| `complete-paid-delivered-orders` | `tenant.tasks.fanout_complete_paid_delivered_orders` | every store | hourly | `order.tasks.complete_paid_delivered_orders`: DELIVERED and paid → COMPLETED for what the carrier poll and the COD reconcile did not advance inline |
| `reconcile-pending-refunds` | `tenant.tasks.fanout_reconcile_pending_refunds` | every store, suspended too | hourly | `order.tasks.reconcile_pending_refunds`: asks the provider about every refund attempt `PENDING` past `REFUND_RECONCILE_AFTER_MINUTES` and settles or declines only on an unambiguous answer (`order/refund_reconciliation.py`; see [Order lifecycle](/dev/flows/order-lifecycle#unknown-outcomes)) |
| `allocate-credit-sources` | `tenant.tasks.fanout_allocate_credit_sources` | every store, suspended too | every 5 min | `order.tasks.allocate_credit_sources`: decides every credit source with no allocation and issues receipts deferred on them (`order/credit_allocation_backfill.py`; see [Order lifecycle](/dev/flows/order-lifecycle#credit-allocation)) |
| `check-low-stock-products` | `tenant.tasks.fanout_check_low_stock_products` | every store | hourly | `product.tasks.check_low_stock_products` |
| `refresh-tenant-stats` | `tenant.tasks.fanout_refresh_stats_snapshots` | every store | every 30 min | `tenant.tasks.refresh_stats_snapshot`: the control plane's per-store figures (`TenantStatsSnapshot`); a suspended store keeps its last snapshot |
| `send-review-request-emails` | `tenant.tasks.fanout_send_review_request_emails` | every store | daily 12:00 † | `order.tasks.send_review_request_emails`: one reminder per order `REVIEW_REQUEST_DELAY_DAYS` days after delivery (`order/review_request.py`) |
| `submit-indexnow-urls` | `tenant.tasks.fanout_submit_indexnow_urls` | every store | every 30 min | `indexnow.tasks.submit_pending_urls`: one IndexNow POST per store with the product and blog pages that changed (`indexnow/`, `docs/indexnow.md` in the Django repository) |
| `send-checkout-abandonment-emails` | `tenant.tasks.fanout_send_checkout_abandonment_emails` | every store | daily 06:00 † | `order.tasks.send_checkout_abandonment_emails` |
| `sync-boxnow-lockers` | `tenant.tasks.fanout_sync_boxnow_lockers` | every store | daily 02:00 † | `shipping_boxnow.tasks.sync_boxnow_lockers` |
| `poll-boxnow-tracking` | `tenant.tasks.fanout_poll_boxnow_tracking_batch` | every store | every 15 min | `shipping_boxnow.tasks.poll_boxnow_tracking_batch`: defence against a missed webhook; `expires: 300` |
| `sync-acs-stations` | `tenant.tasks.fanout_sync_acs_stations` | every store | daily 03:00 † | `shipping_acs.tasks.sync_acs_stations` |
| `issue-acs-pickup-list` | `tenant.tasks.fanout_issue_daily_acs_pickup_list` | every store | Mon-Fri 16:30 | `shipping_acs.tasks.issue_daily_acs_pickup_list`: an unprinted-voucher refusal returns `blocked_unprinted` and notes each held-back order, no email; only other refusals fail |
| `poll-acs-tracking` | `tenant.tasks.fanout_poll_acs_tracking_batch` | every store | every 15 min | `shipping_acs.tasks.poll_acs_tracking_batch`: staggered under the ACS rate cap; `expires: 300` |
| `check-stale-acs-shipments` | `tenant.tasks.fanout_check_stale_acs_shipments` | every store | daily 09:00 | `shipping_acs.tasks.check_stale_acs_shipments` |
| `reconcile-acs-cod-payouts` | `tenant.tasks.fanout_reconcile_acs_cod_payouts` | every store | daily 02:30 † | `shipping_acs.tasks.reconcile_acs_cod_payouts`: idempotent on `(voucher_no, cod_payment_date)` |
| `alert-unremitted-acs-cod` | `tenant.tasks.fanout_alert_unremitted_cod_payouts` | every store | daily 03:00 † | `shipping_acs.tasks.alert_unremitted_cod_payouts` |
| `clear-development-logs` | `core.tasks.clear_development_log_files_task` | `public` | daily 04:00 † | Only inside Docker Compose (`/.dockerenv` and no `KUBERNETES_SERVICE_HOST`), never in Kubernetes; `kwargs` 7 days |

The retention periods behind the `purge-*` entries are listed in
[Data retention](/dev/operations/data-retention).

## Task modules by domain

| Module | What lives there |
|---|---|
| `core/tasks.py` | health monitor, backups, cache clear, session and history cleanup, abandoned carts, Meilisearch sync, inactive-user mail |
| `tenant/tasks.py` | every `fanout_*` wrapper, `process_tenant_billing`, `flush_tenant_media_task`, `purge_expired_tenant_archives` |
| `order/tasks.py` | confirmation, status, shipping, payment-failed, refund and invoice emails (each guarded so a duplicate signal cannot send twice: a flag on the order's metadata, plus a short Redis lock for the confirmation email, and for the refund email a `RefundNotification` row per refund), invoice PDF, myDATA submit and cancel, `check_pending_orders`, `auto_cancel_stuck_pending_orders`, `reconcile_pending_refunds`, `allocate_credit_sources`, checkout abandonment, `push_order_event_to_gateway` |
| `order/notifications.py` | the `notify_*_live` tasks that push order-created, status-changed, payment-confirmed, payment-failed and refunded events over the WebSocket |
| `shipping_acs/tasks.py` | voucher creation, station sync, tracking polls, pickup list (and the order notes for a refused one), COD reconciliation and alerts, arrival notification |
| `shipping_boxnow/tasks.py` | shipment creation, locker sync, webhook processing, tracking polls, arrival notification |
| `product/tasks.py` | back-in-stock, price-drop and low-stock alerts |
| `giftcard/tasks.py` | delivery, receipts, expiry, reminders, refund-to-card |
| `loyalty/tasks.py` | award, reverse, expire points; tier-up notification |
| `notification/tasks.py` | `send_notification_task` (WebSocket push) |
| `user/tasks.py` | avatar download, subscription confirmation, data export, account deletion |
| `contact/tasks.py` | contact and feedback mail, attachment scanning and retention |
| `b2b/tasks.py` | business-profile status and admin notification mail |
| `meta_capi/tasks.py` | purchase, initiate-checkout, refund and registration events |
| `search/tasks.py` | query and click logging, click scores, anonymisation |
| `recommendation/tasks.py` | candidate recompute, impression and attach events |
| `meili/tasks.py` | `index_document_task`, `delete_document_task`, `reindex_model_task` |
| `blog/tasks.py` | comment-liked notification |

## Dispatch on commit

A task that reads a row the request just wrote must be queued after the
transaction commits, and with the schema pinned at registration time,
because a commit hook can run after the request's schema context has
unwound. `tenant/celery.py: dispatch_on_commit()` is the one idiom:

```python
if settings.AGENT_GATEWAY_INTERNAL_URL and (
    status_changed or payment_status_changed or tracking_dispatched
):
    dispatch_on_commit(push_order_event_to_gateway, [instance.id])
```

(`order/signals/handlers.py`). The same handler defers the
`order_shipment_dispatched` signal, and therefore the carrier voucher
creation and the shipping email, with `transaction.on_commit` inside a
`schema_context`. Never call `.delay()` inside the transaction that
creates the order.

## Eager mode in tests

`tests/conftest.py` sets `CELERY_TASK_ALWAYS_EAGER = True`, so `.delay()`
runs the body inline, and an autouse fixture runs `transaction.on_commit`
callbacks immediately. A test therefore sees the full signal cascade of an
`OrderFactory` call, which is why files are pinned to one xdist worker
(`--dist loadfile`). See [Testing](/dev/django/testing).

## Adding a task

1. Put it in the owning app's `tasks.py` with
   `@celery_app.task(base=MonitoredTask)` (or `@shared_task(base=...)`),
   keyword arguments only, JSON-serialisable, idempotent.
2. If it reads store tables and should run on a schedule, add a
   `fanout_<name>` wrapper in `tenant/tasks.py` that calls
   `run_for_all_tenants("<app>.tasks.<name>")`, and schedule the wrapper in
   `get_celery_beat_schedule()`, not the task.
3. If a request triggers it, dispatch with `dispatch_on_commit()` from a
   signal handler or service, never inline.
4. Write the unit test against the task function; eager mode means no
   broker is needed.
5. For anything user-visible, declare the email as an email type in the app's
   `emails.py`, send it through `send_email`, and follow [Notifications & email](/dev/flows/notifications-and-email).

## Failure modes

- **A beat task runs but nothing happens**: it was scheduled directly
  instead of through a fan-out and ran against `public`.
- **Every fan-out shows FAILED**: the wrapper returned `AsyncResult`
  objects; return dicts (`run_for_all_tenants` already does).
- **`DoesNotExist` inside a task fired from a webhook or command**: the
  schema snapped back to `public` before the commit hook ran; use
  `dispatch_on_commit`.
- **Task history thinner than expected**: read `TaskResult` in `public`,
  not in a tenant schema. `tests_mt/test_celery_results_are_public_only.py`
  asserts a newly provisioned tenant never grows its own copy of the
  tables, because a tenant copy would sit ahead of `public` on the search
  path and hide the row from both the control plane and
  `celery.backend_cleanup`.
- **Worker stays in English after a Rosetta edit**: the overlay handlers
  were connected without `weak=False`; the AST test
  `tests/unit/core/test_celery_handlers_are_connected.py` guards this.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/core/celery.py` | App factory, signal handlers |
| `grooveshop-django-api/scheduler/beat.py` | The beat scheduler |
| `grooveshop-django-api/core/retry.py` | The transient error sets `autoretry_for` names |
| `grooveshop-django-api/settings.py` | `CELERY_*`, `SCHEDULE_PRESETS`, `get_celery_beat_schedule()` |
| `grooveshop-django-api/tenant/celery.py` | `TenantTask`, `run_for_all_tenants`, `dispatch_on_commit` |
| `grooveshop-django-api/tenant/tasks.py` | Fan-out wrappers |
| `grooveshop-django-api/core/tasks.py` | `MonitoredTask`, system tasks |
| `grooveshop-django-api/order/signals/handlers.py` | On-commit dispatch of order side effects |
| `grooveshop-django-api/tests/conftest.py` | Eager mode, immediate on_commit |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/backend.yaml` | Worker, beat and Flower Deployments; broker URL assembly |
