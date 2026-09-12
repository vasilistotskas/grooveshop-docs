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

`create_celery_app()` builds `Celery("core")`, loads the `CELERY_*`
namespace from `settings.py`, then overrides a few values explicitly:

```python
tasker.conf.update(
    enable_utc=True,
    timezone=os.getenv("TIME_ZONE", "Europe/Athens"),
    worker_pool_restarts=True,
    task_ignore_result=False,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_soft_time_limit=300,
    task_time_limit=600,
)
```

Note the time limits: `settings.py` says 1500/1800 seconds but
`core/celery.py` wins with 300/600. Signal handlers in the same function
are connected with `weak=False`, because closures defined inside a function
are otherwise garbage-collected before they ever fire. They: close stale DB
connections at worker start, apply the DB-backed translation overlay so
workers see Rosetta edits, refresh it when another pod bumps the version
tick, and propagate the request's correlation id into task headers and
back into the worker's log context.

## Base task classes

`tenant/celery.py: TenantTask` propagates the schema. `apply_async()`
stamps a `_schema_name` header from `connection.schema_name` unless the
caller set one; `__call__()` wraps the body in that schema's context.

`core/tasks.py: MonitoredTask(TenantTask)` adds `on_success` / `on_failure`
logging with redacted arguments:

```python
class MonitoredTask(TenantTask):
    def on_success(self, retval, task_id, args, kwargs):
        logger.info(f"Task {self.name} completed successfully. Task ID: {task_id}")

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        safe_args = [_safe_repr(a) for a in (args or [])]
        ...
```

Domain tasks are declared as `@celery_app.task(base=MonitoredTask, ...)`
or `@shared_task(base=MonitoredTask, ...)`.

## Retry policy

`settings.py` sets the defaults every task inherits:
`CELERY_TASK_AUTORETRY_FOR = (Exception,)`, exponential backoff
(`CELERY_TASK_RETRY_BACKOFF = True`, max 600 seconds), jitter on, and
`CELERY_TASK_MAX_RETRIES = 5`. Individual tasks tighten this where a retry
would be wrong, for example `max_retries=3` on the system tasks in
`core/tasks.py`, and some deliberately raise non-retryable errors (the ACS
pickup list raises when a voucher is unprinted so an operator fixes it).
`task_acks_late=True` plus `CELERY_TASK_REJECT_ON_WORKER_LOST = True` means
a task killed mid-run is redelivered, so bodies must be idempotent.

## Broker and result backend

- Broker: RabbitMQ. `CELERY_BROKER_URL` is required in production
  (`ImproperlyConfigured` otherwise); the dev compose default is
  `amqp://guest:guest@rabbitmq:5672//`. In Kubernetes it is assembled from
  the operator-generated `backend-message-broker-default-user` secret
  (`grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/backend.yaml`).
  Workers consume the `celery` and `meilisearch` queues.
- Results: `CELERY_RESULT_BACKEND` defaults to `django-db`.
  `django_celery_results` is in `SHARED_APPS` **only**, and `TENANT_APPS`
  carries a comment saying it is deliberately absent: task results are
  platform operations rather than one store's data, and
  `celery.backend_cleanup` is dispatched by beat with no tenant header, so
  it runs in `public` and could never prune per-tenant tables.
  `tenant/migrations/0039` drops the ones an earlier `TENANT_APPS` entry
  created.
  **No worker Deployment overrides the backend** — `base/backend.yaml` carries an
  explicit comment saying so on all four backend containers, because the
  results used to go to Redis DB 1 and shared one `allkeys-lru` budget
  with the Django cache. The one place that still points at Redis is the
  PreSync `backend-prepare` Job, which sets `CELERY_RESULT_BACKEND` to
  Redis DB 1 for its own short life. `settings.py` then narrows what gets
  written: `CELERY_TASK_IGNORE_RESULT` with
  `CELERY_TASK_STORE_ERRORS_EVEN_IF_IGNORED` is meant to keep failures and
  drop successes. Read that intent against `core/celery.py`, which passes
  `task_ignore_result=False` in the same `conf.update()` that wins the
  time limits above.
- Scheduler: `django_celery_beat.schedulers:DatabaseScheduler`. The
  `CELERY_BEAT_SCHEDULE` dict is seeded into `PeriodicTask` rows, visible
  in the platform admin under Background Jobs.

Flower runs as its own Deployment (`backend.yaml`, port 5555) and refuses
to start without `FLOWER_BASIC_AUTH`; the admin's site dropdown links to
it only when `ADMIN_FLOWER_URL` is set.

## Tenant fan-out

Beat fires in `public`. A task that reads store tables is registered under
a `fanout_*` wrapper in `tenant/tasks.py`:

```python
@celery_app.task(base=TenantTask)
def fanout_cleanup_abandoned_carts():
    return run_for_all_tenants("core.tasks.cleanup_abandoned_carts")
```

`run_for_all_tenants()` (`tenant/celery.py`) iterates active,
non-suspended tenants (suspended ones are skipped except for retention
sweeps passed `include_suspended=True`) and calls `send_task` with a
`_schema_name` header per tenant. It returns plain dicts, not
`AsyncResult` objects, because the JSON result serializer cannot encode
those. Calling the underlying task directly from beat would run it against
the empty public schema and report success.

## Scheduled jobs

From `settings.py: get_celery_beat_schedule()`. Times are Athens local.
Most entries fall back to hourly when `DEBUG` is on.

| Beat entry | Task | Cadence | Notes |
|---|---|---|---|
| `monitor-system-health` | `core.tasks.monitor_system_health` | every 30 min | Emails `ADMINS` and raises on any failed check, including Redis persistence status |
| `scheduled-database-backup` | `core.tasks.scheduled_database_backup` | daily 03:00 | `pg_dump` into `backups/scheduled` on the backups PVC; see [Backups](/dev/operations/backups) |
| `cleanup-old-backups` | `core.tasks.cleanup_old_backups` | Sun 05:00 | 30-day retention on `backups/` |
| `clear-duplicate-history` / `clear-old-history` | `tenant.tasks.fanout_clear_*_history` | daily 05:00 / Sun 03:00 | simple-history pruning |
| `clear-expired-sessions` | `core.tasks.clear_expired_sessions_task` | Mon 04:00 | public schema (platform staff) |
| `clear-expired-sessions-tenants` | `tenant.tasks.fanout_clear_expired_sessions` | Mon 04:00 | per-schema customer sessions |
| `update-search-click-scores` | `tenant.tasks.fanout_update_click_scores` | daily 03:00 | |
| `anonymize-old-search-queries` | `tenant.tasks.fanout_anonymize_old_search_queries` | Sun 03:00 | 90 days, set in the wrapper |
| `reap-unclaimed-contact-attachments` | `tenant.tasks.fanout_reap_unclaimed_attachments` | hourly | |
| `purge-expired-contact-attachment-files` | `tenant.tasks.fanout_purge_expired_attachment_files` | daily 04:00 | drops bytes, keeps rows |
| `cleanup-expired-data-exports` | `tenant.tasks.fanout_cleanup_expired_data_exports` | daily 03:00 | |
| `send-inactive-user-notifications` | `tenant.tasks.fanout_send_inactive_user_notifications` | 1st of month 06:00 | |
| `clear-all-cache` | `core.tasks.clear_all_cache_task` | 1st of month 04:00 | no `DEBUG` override |
| `cleanup-abandoned-carts` / `cleanup-old-guest-carts` | `tenant.tasks.fanout_cleanup_*` | daily 04:00 / 06:00 | |
| `clear-expired-notifications` | `tenant.tasks.fanout_clear_expired_notifications` | bimonthly 06:00 | |
| `sync-meilisearch-indexes` | `tenant.tasks.fanout_sync_meilisearch_indexes` | daily 02:00 | |
| `cleanup-expired-stock-reservations` | `tenant.tasks.fanout_cleanup_expired_stock_reservations` | hourly | |
| `purge-expired-tenant-archives` | `tenant.tasks.purge_expired_tenant_archives` | daily 03:00 | public schema, not a fan-out |
| `process-tenant-billing` | `tenant.tasks.process_tenant_billing` | daily 06:00 | public schema, not a fan-out |
| `check-pending-orders` | `tenant.tasks.fanout_check_pending_orders` | daily 07:00 | |
| `auto-cancel-stuck-pending-orders` | `tenant.tasks.fanout_auto_cancel_stuck_pending_orders` | every 15 min | the only place failed-payment stock is released |
| `process-loyalty-points-expiration` | `tenant.tasks.fanout_process_points_expiration` | daily 03:00 | |
| `expire-gift-cards` / `deliver-scheduled-gift-cards` / `send-gift-card-expiry-reminders` | `tenant.tasks.fanout_*` | 03:00 / 06:00 / 06:00 | |
| `check-low-stock-products` | `tenant.tasks.fanout_check_low_stock_products` | hourly | |
| `send-checkout-abandonment-emails` | `tenant.tasks.fanout_send_checkout_abandonment_emails` | daily 06:00 | |
| `sync-boxnow-lockers` | `tenant.tasks.fanout_sync_boxnow_lockers` | daily 02:00 | `expires: 300` |
| `poll-boxnow-tracking` | `tenant.tasks.fanout_poll_boxnow_tracking_batch` | every 15 min | defence against a missed webhook |
| `sync-acs-stations` | `tenant.tasks.fanout_sync_acs_stations` | daily 03:00 | |
| `warn-unprinted-acs-vouchers` | `tenant.tasks.fanout_warn_unprinted_acs_vouchers` | Mon-Fri 15:45 | 45 min before the manifest |
| `issue-acs-pickup-list` | `tenant.tasks.fanout_issue_daily_acs_pickup_list` | Mon-Fri 16:30 | raises if any voucher is unprinted |
| `poll-acs-tracking` | `tenant.tasks.fanout_poll_acs_tracking_batch` | every 15 min | staggered under the ACS rate cap |
| `check-stale-acs-shipments` | `tenant.tasks.fanout_check_stale_acs_shipments` | daily 09:00 | `expires: 3600` |
| `reconcile-acs-cod-payouts` | `tenant.tasks.fanout_reconcile_acs_cod_payouts` | daily 02:30 | idempotent on `(voucher_no, cod_payment_date)` |
| `alert-unremitted-acs-cod` | `tenant.tasks.fanout_alert_unremitted_cod_payouts` | daily 03:00 | |
| `clear-development-logs` | `core.tasks.clear_development_log_files_task` | daily 04:00 | only inside Docker Compose, never in Kubernetes |

## Task modules by domain

| Module | What lives there |
|---|---|
| `core/tasks.py` | health monitor, backups, cache clear, session and history cleanup, abandoned carts, Meilisearch sync, inactive-user mail |
| `tenant/tasks.py` | every `fanout_*` wrapper, `process_tenant_billing`, `flush_tenant_media_task`, `purge_expired_tenant_archives` |
| `order/tasks.py` | confirmation, status, shipping, payment-failed, refund and invoice emails (each with a Redis reservation key so a duplicate signal cannot send twice), invoice PDF, myDATA submit and cancel, `check_pending_orders`, `auto_cancel_stuck_pending_orders`, checkout abandonment, `push_order_event_to_gateway` |
| `order/notifications.py` | the `notify_*_live` tasks that push order-created, status-changed, payment-confirmed, payment-failed and refunded events over the WebSocket |
| `shipping_acs/tasks.py` | voucher creation, station sync, tracking polls, pickup list, unprinted warning, COD reconciliation and alerts, arrival notification |
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
5. For anything user-visible, register the email in `core/email/registry.py`
   and follow [Notifications & email](/dev/flows/notifications-and-email).

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
| `grooveshop-django-api/core/celery.py` | App factory, signal handlers, time limits |
| `grooveshop-django-api/settings.py` | `CELERY_*`, `SCHEDULE_PRESETS`, `get_celery_beat_schedule()` |
| `grooveshop-django-api/tenant/celery.py` | `TenantTask`, `run_for_all_tenants`, `dispatch_on_commit` |
| `grooveshop-django-api/tenant/tasks.py` | Fan-out wrappers |
| `grooveshop-django-api/core/tasks.py` | `MonitoredTask`, system tasks |
| `grooveshop-django-api/order/signals/handlers.py` | On-commit dispatch of order side effects |
| `grooveshop-django-api/tests/conftest.py` | Eager mode, immediate on_commit |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/backend.yaml` | Worker, beat and Flower Deployments; broker URL assembly |
