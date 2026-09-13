---
title: Scheduled work & platform data
description: The control plane's remaining screens — Periodic Tasks and the four schedule types, why Task Results holds only failures, what the Cache Purge Log records, and the Countries, Regions and Sites reference tables every store shares.
---

# Scheduled work & platform data

Everything on this page is a **public-schema** table reached from the
platform console, and that is the point: one Celery schedule drives every
store, one failure list covers the estate, one set of countries and regions
is shared by all of them. None of it is a merchant's to see or change, and
each screen is withheld from a store host by
`WithheldOnTenantHostModelAdmin` (`admin/mixins.py`) as well as by the role
scopes that never grant a store operator a permission on a platform app.

For the mechanics behind the schedule — the app factory, `TenantTask`,
fan-out, the retry policy and the full job table — read
[Celery and background jobs](/dev/django/celery). This page is about the
screens.

## Periodic Tasks

<span class="sidebar-path">Background Jobs → Periodic Tasks</span> is `django_celery_beat`'s
`PeriodicTask` changelist, re-registered through
`core/admin.py: PeriodicTaskAdmin` so it renders in Unfold with
`UnfoldPeriodicTaskForm`.

The scheduler is `django_celery_beat.schedulers:DatabaseScheduler`
(`CELERY_BEAT_SCHEDULER` in `settings.py`), so the rows on this screen are
what beat actually reads at run time. What they are *derived from* is a
different question, and it is the one that matters.

### Where the real schedule is declared

`get_celery_beat_schedule()` in `settings.py` is the source of truth. It
returns a dict of roughly forty entries — each a task path, a schedule and
optional `options` — and most fall back to hourly when `DEBUG` is on.

At beat start-up, `DatabaseScheduler.setup_schedule()` does two things:

```python
def setup_schedule(self):
    self.install_default_entries(self.schedule)
    self.update_from_dict(self.app.conf.beat_schedule)
```

`install_default_entries` adds `celery.backend_cleanup` (it does so because
`result_expires` is set — see below), and `update_from_dict` walks every
declared entry through `ModelEntry.from_entry`, which is a
`PeriodicTask.objects.update_or_create(name=name, defaults=...)`.

**So yes — editing a beat-managed row in the console is overwritten.**
Verified in the installed `django_celery_beat/schedulers.py`: the
`defaults` come from `_unpack_fields()`, which rewrites the row's `task`,
its schedule relation, `args`, `kwargs` and the unpacked `options`
(`queue`, `exchange`, `routing_key`, `priority`, `headers`,
`expire_seconds`) from the Python declaration every time the beat process
starts. Change a crontab here and the next beat restart — a deploy, a pod
reschedule — silently puts it back.

One field is **not** in that set: `enabled`. `_unpack_fields` never writes
it, and `update_from_dict` skips a disabled row when building the in-memory
schedule (`if entry.model.enabled`). Unticking **Enabled** on a row is
therefore the one console edit that survives a restart, which makes it the
correct way to stop a job in an incident. To change *when* a job runs, edit
`get_celery_beat_schedule()` and deploy.

Rows that are not in the declaration are left alone entirely — nothing
prunes them — so a hand-added `PeriodicTask` keeps running until someone
deletes it.

### Running one by hand

The upstream admin ships four actions: **enable**, **disable**, **toggle**
and **run**. `run_tasks` calls `apply_async()` with the row's own args,
kwargs and queue and **no `_schema_name` header**, so the task executes in
`public`.

That is correct for every row this platform declares, because every
store-touching job is scheduled as a `fanout_*` wrapper that runs in
`public` and dispatches into each tenant schema itself. It is *not* correct
for a hand-added row pointing at the underlying per-tenant task: that would
run against the empty public schema and report success. See the fan-out
section of [Celery and background jobs](/dev/django/celery).

### The four schedule types

Beat stores a schedule as a foreign key to one of four tables, each with
its own sidebar entry under **Background Jobs**
(`django_celery_beat/models.py`).

| Screen | Model | What it expresses |
|---|---|---|
| Crontab Schedules | `CrontabSchedule` | minute / hour / day-of-week / day-of-month / month-of-year, plus a timezone |
| Interval Schedules | `IntervalSchedule` | "every N seconds / minutes / hours / days" |
| Solar Schedules | `SolarSchedule` | an event relative to sunrise or sunset at a latitude and longitude |
| Clocked Schedules | `ClockedSchedule` | a single wall-clock instant; the model's own `clean()` requires the task to be `one_off` |

**Every entry in `get_celery_beat_schedule()` uses a crontab** — either a
`SCHEDULE_PRESETS` value or an inline `crontab(...)`. Nothing in this
platform declares an interval, solar or clocked schedule, so those three
changelists are empty unless someone adds a row by hand. The tables exist
because the library ships them, not because anything needs them.

Times are Athens local: `core/celery.py` sets
`timezone=os.getenv("TIME_ZONE", "Europe/Athens")` with `enable_utc=True`.

## Task Results

<span class="sidebar-path">Background Jobs → Task Results</span> is `django_celery_results`' `TaskResult`
changelist. Two facts govern how to read it.

### Only failures are stored

`settings.py` sets:

```python
CELERY_TASK_IGNORE_RESULT = True
CELERY_TASK_STORE_ERRORS_EVEN_IF_IGNORED = True
```

The pair is what makes the split, and neither works alone. The producer
stamps `ignore_result` onto every message (`Task.apply_async` →
`options.setdefault('ignore_result', self.ignore_result)`), so the worker's
success path computes `publish_result = not eager and not ignore_result`
and writes nothing. On the failure path, `TraceInfo.handle_error_state`
falls back to `store_errors_even_if_ignored` *precisely* when a task is
ignored, so the row is still written — with the traceback, and with the
task name and arguments because `CELERY_RESULT_EXTENDED = True`.

The reason is stated in `settings.py`: nothing in this codebase reads a
task's return value — no `AsyncResult`, no `.get()`, no chord, no group —
so every stored success was write amplification nobody consumed, 2,937 rows
a day. Failures are worth keeping durably and queryably, because this
platform has no metrics or alerting stack and a silent failure here is an
order confirmation nobody receives or a courier voucher that never mints.

`tests/integration/core/test_celery_result_storage.py` pins both halves by
driving `build_tracer(..., eager=False)` — the worker's own path — rather
than `.apply()`, which hard-codes `ignore_result: False` and so could never
observe the behaviour.

#### A note for anyone reading `core/celery.py`

`create_celery_app()` passes `task_ignore_result=False` in its
`conf.update()`, under a comment reading "Don't store task results in
database". That line is inert. Under `namespace="CELERY"`,
`ConfigurationView.__getitem__` tries the **prefixed** key across every
map before the bare one, so `CELERY_TASK_IGNORE_RESULT` from Django
settings is found first and wins, whichever order the two were set in. The
integration test asserting `_succeeds.ignore_result is True` is the
authority; the `conf.update()` value never reaches a task.

The result backend is `django-db` — `CELERY_RESULT_BACKEND` defaults to it
in `settings.py` and **no worker Deployment overrides it**. All four
backend containers in
`grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/backend.yaml`
carry an explicit comment saying so. The one place still pointing at Redis
is the PreSync `backend-prepare` Job
(`manifests/app-constructs/grooveshop/prepare-helm/templates/job.yaml`),
which sets Redis DB 1 for its own short life.

### The rows live in `public`, so one list covers every store

`django_celery_results` is in `SHARED_APPS` **only**, and `TENANT_APPS`
carries a comment saying its absence is deliberate: a failure is platform
operations rather than one store's data, it belongs where the control plane
can read every store's in one list, and `celery.backend_cleanup` — which
beat dispatches with no tenant header, so it runs in `public` — can
actually prune it. Per-tenant tables would be written by tenant-context
tasks, invisible here, and never cleaned.
`tenant/migrations/0039_drop_tenant_celery_result_tables.py` drops the ones
an earlier `TENANT_APPS` entry created, and
`tests_mt/test_celery_results_are_public_only.py` asserts a newly
provisioned tenant never grows its own copy.

### What an empty list means

It means **no task has failed inside the retention window**, which is
`CELERY_RESULT_EXPIRES = 30 days`. It does not mean nothing ran: successes
were never written. "Did the nightly job run at all?" is answered by
`PeriodicTask.last_run_at` on the Periodic Tasks screen, or by
`MonitoredTask`'s own success log line (`core/tasks.py`) — never from this
table.

Pruning is `celery.backend_cleanup`, which `DatabaseScheduler` installs on
its own whenever `result_expires` is set, at 04:00 daily. You will see it
on the Periodic Tasks screen even though it is not in
`get_celery_beat_schedule()`.

**Group Results** is the sibling table for `GroupResult` rows. Nothing in
this codebase constructs a `group()` or a `chord()` — the only `chain()` is
in `core/tasks.py` and links an immutable `.si()` signature that celery
dispatches from `task_request.chain` without touching the backend — so that
list stays empty. If a chord or group is ever added it needs real results:
set `ignore_result=False` on that task rather than flipping the global
setting.

## Cache Purge Log

<span class="sidebar-path">Platform → Cache Purge Log</span> is one row per purge, written by
`CacheService.purge()` (`core/cache/service.py: _log_audit`) on every call,
dry runs included.

| Column | From |
|---|---|
| Actor | the authenticated user who ran it, or empty for a command or task |
| Surfaces | the surface codes in the report |
| Dry run | whether anything was actually deleted |
| Django keys / Nuxt keys / Blocked keys | the headline figures for the run |
| Detail | per-surface matched / deleted / blocked counts and any error, for both backends |

`dry_run` sits beside the figures deliberately, so "which one is this" is
never ambiguous — a dry-run row of all zeroes told nobody anything. The
write is wrapped in its own `try/except`: an audit failure logs a warning
and never fails the purge it records.

### Why the log is platform-side and the button is not

The purge itself is a **store** operation. **Cache Management** is reached
from the store console's site dropdown
(`UNFOLD["SITE_DROPDOWN"]` → `admin:clear-cache`, served by
`MyAdminSite.clear_cache_view` in `admin/admin.py`), and that page shows
the twenty most recent log rows inline so the operator sees the effect of
what they just did.

The **log table** is platform-side because `core` is a `SHARED_APPS`-only
app: `core_cachepurgelog` exists in `public` alone, so a purge run from any
store host writes there through the search path, and the changelist is one
list across the whole estate — actor column included. Rendering that on a
store host would show one merchant every other merchant's activity; the
mixin's docstring names this as the concrete case, 146 rows, reported from
production 2026-09-12. On top of the host withholding, `CachePurgeLogAdmin`
is `IsSuperuserOnlyModelAdmin` and read-only (`has_add_permission` and
`has_change_permission` both return `False`).

Which surfaces exist, what each one matches and when to purge is
[Caches & purging](/dev/operations/caches).

## Platform reference data

Three tables under **Platform** are shared by every store. A merchant can
reach none of them: `country`, `region` and `sites` are all in
`PLATFORM_ONLY_APP_LABELS` (`tenant/role_scopes.py`), so no role ever
receives a permission on them, and all three are `SHARED_APPS`-only, so
`WithheldOnTenantHostModelAdmin` also removes them from a store host. The
role-scope comment states the reason for the first two plainly:
"platform-wide reference data shared by every store; one merchant editing
it changes it for all".

### Countries

`country/models.py: Country` — a translatable, sortable model keyed by
**`alpha_2` as the primary key** (uppercased in `save()`), with `alpha_3`,
`iso_cc`, an optional `phone_code`, a flag image and a translated `name`
(el / en / de through django-parler).

What reads it: `user.Address.country` and `Order.country` are foreign keys
into this table from inside every tenant schema
(`user/models/address.py`, `order/models/order.py`), both
`on_delete=SET_NULL`.

What breaks when a row is wrong:

- **Deleting a country blanks it on every existing address and order** in
  every store, silently — `SET_NULL`, not `PROTECT`.
- The translated `name` is what a customer sees in an address form and on
  an order; a missing translation falls back through
  `safe_translation_getter(..., any_language=True)`, so it degrades to
  another language rather than erroring.
- `phone_code` is deliberately **not** unique — calling codes are shared
  (+1 US/CA, +7 RU/KZ) and a unique constraint made those countries
  unrepresentable. Do not re-add one.

### Regions

`region/models.py: Region` — keyed by `alpha`, with a mandatory
`country` foreign key (`on_delete=CASCADE`) and a translated `name`.
`Address.region` and `Order.region` point at it, again `SET_NULL`.

The cascade is the trap: **deleting a country deletes all of its regions**,
and each of those nulls the region on every address and order that used it,
across every store. Region is the surviving half of the old
region-and-place pair on checkout — see
[Checkout & payment](/dev/flows/checkout-and-payment).

### Sites

<span class="sidebar-path">Platform → Sites</span> is `django.contrib.sites`. `django_site` is in
`SHARED_APPS` only, so it holds one row per **store domain** across the
estate — which is exactly why opening it on a store host would show that
merchant every other store's domain, the second case named in the
withholding mixin's docstring.

Rows are minted at provisioning by `tenant/provisioning.py: ensure_site()`,
a `get_or_create` on the tenant's primary domain that never rewrites an
existing row's name (an operator may have set it deliberately) and returns
`None` when the tenant has no primary domain yet.

What it controls: `TenantSocialAccountAdapter.get_app()`
(`tenant/allauth_adapter.py`) resolves a **per-tenant `SocialApp`** by
finding the Site whose `domain` matches the tenant's primary domain, then
filtering `SocialApp` on it.

What breaks when a row is missing or wrong:

- **No Site for the domain** — the lookup always misses and the adapter
  falls back to the platform-wide OAuth credentials from `settings.py`. The
  merchant fills in their own client id and secret and nothing uses them;
  there is no error.
- **A `SocialApp` attached to the auto-created `example.com` (pk 1)** —
  allauth's `list_apps` returns it *alongside* the settings-backed app for
  the same provider and `get_app` raises `MultipleObjectsReturned`,
  breaking social login for that provider on that tenant. `ensure_site`
  exists partly to remove that latent 500.

`SITE_ID` defaults to `1` (`settings.py`), which is the auto-created
`example.com` row — so anything that resolves the "current" site by that
setting gets a row belonging to no store. First-party code never does:
the only two places that query `Site` at all are `ensure_site` and the
adapter above, and both match on the tenant's primary domain.

Domains themselves — routing, TLS, the API twin — are
[Domains & certificates](/dev/operator/domains); Sites is only the allauth
half.

## Failure modes

- **A schedule edit disappeared after a deploy.** It was a beat-managed
  row; `update_from_dict` rewrote it at beat start-up. Edit
  `get_celery_beat_schedule()` instead.
- **A job was disabled in the console and still ran.** Check you unticked
  `enabled` on the row rather than clearing its schedule — a cleared
  schedule is rewritten, the flag is not.
- **Task Results is empty and you expected history.** It only ever holds
  failures, for 30 days. Read `last_run_at` for "did it run".
- **Task Results is empty on a tenant host.** You are looking in the wrong
  place twice over: the screen is withheld there, and the rows live in
  `public`.
- **A "run task" from the admin reported success and did nothing.** The
  row points at a per-tenant task rather than its `fanout_*` wrapper, so it
  executed against the empty public schema.
- **Addresses across several stores lost their country or region.** A
  reference row was deleted; `SET_NULL` is silent and `Region` cascades
  from `Country`.
- **A merchant's own OAuth credentials are ignored.** There is no `Site`
  row for their primary domain — re-run provisioning or add it.

## Related

- [Celery and background jobs](/dev/django/celery) — the schedule itself
- [Caches & purging](/dev/operations/caches) — the surfaces the log records
- [The control plane](/dev/operator/) — the console these screens live in
- [Platform staff & access](/dev/operator/team) — why a store cannot reach them

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/settings.py` | `get_celery_beat_schedule()`, `SCHEDULE_PRESETS`, `CELERY_BEAT_SCHEDULER`, `CELERY_TASK_IGNORE_RESULT`, `CELERY_TASK_STORE_ERRORS_EVEN_IF_IGNORED`, `CELERY_RESULT_EXPIRES`, `CELERY_RESULT_EXTENDED`, `SHARED_APPS`/`TENANT_APPS`, `UNFOLD_PLATFORM["SIDEBAR"]`, `SITE_ID` |
| `grooveshop-django-api/core/admin.py` | `PeriodicTaskAdmin`, the schedule admins, `CachePurgeLogAdmin`, `override_third_party_admins()` |
| `grooveshop-django-api/core/celery.py` | App factory, timezone, the inert `task_ignore_result` line |
| `grooveshop-django-api/core/cache/models.py` | `CachePurgeLog` |
| `grooveshop-django-api/core/cache/service.py` | `CacheService.purge`, `_log_audit` |
| `grooveshop-django-api/admin/admin.py` | `clear_cache_view` (**Cache Management**) and its recent-log panel |
| `grooveshop-django-api/admin/mixins.py` | `WithheldOnTenantHostModelAdmin`, `IsSuperuserOnlyModelAdmin` |
| `grooveshop-django-api/tenant/role_scopes.py` | `PLATFORM_ONLY_APP_LABELS` |
| `grooveshop-django-api/tenant/app_labels.py` | `shared_only_app_labels()` — what "platform-side" is derived from |
| `grooveshop-django-api/country/models.py`, `region/models.py` | `Country`, `Region` |
| `grooveshop-django-api/tenant/provisioning.py` | `ensure_site()` |
| `grooveshop-django-api/tenant/allauth_adapter.py` | `TenantSocialAccountAdapter.get_app()` |
| `grooveshop-django-api/tests/integration/core/test_celery_result_storage.py` | Pins failures-only storage |
| `grooveshop-infrastructure/.../base/backend.yaml` | The four "no `CELERY_RESULT_BACKEND` override" comments |
| `grooveshop-infrastructure/.../prepare-helm/templates/job.yaml` | The PreSync Job's Redis result backend |
