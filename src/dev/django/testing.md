---
title: Testing
description: How the Django test suite is laid out and configured, the multi-tenant lane, xdist rules, the local-run rules that keep the machine alive, what to run before a commit, and what CI runs.
---

# Testing

The suite is pytest with pytest-django and pytest-xdist. It is large, it
runs in parallel by default, and it deliberately strips multi-tenancy for
speed, which is why a second, serial lane exists. The rules at the end of
this page are not style: each one closes a failure that happened.

## Layout

```
tests/
  conftest.py        # settings overrides + fixtures for the main suite
  unit/<app>/        # one directory per app, plus admin/, asgi/, config/, helpers/
  integration/<app>/ # API-level tests through the DRF client
  utils/
tests_mt/
  conftest.py        # the multi-tenant lane, real router + middleware
.test_durations      # pytest-split timings for the CI shards
```

`pyproject.toml` sets `testpaths = ["tests"]`, so a bare `uv run pytest`
never collects `tests_mt/`.

## Configuration (`tests/conftest.py`)

Applied at import, before Django starts:

- `PASSWORD_HASHERS` is MD5 only, so every factory user is cheap.
- `DISABLE_CACHE = True` and `MEILISEARCH["OFFLINE"] = True`; index
  signals no-op and no engine is needed. Tests that must talk to a real
  engine carry `@requires_meilisearch`, which skips when none is reachable
  and provisions the indexes once per session when one is.
- `CELERY_TASK_ALWAYS_EAGER = True`: `.delay()` runs inline.
- `DATABASE_ROUTERS = []` and `TenantMainMiddleware` removed: every app's
  tables land in `public` and no `TenantDomain` is needed for
  `testserver`. This is the speed trade that makes schema-binding bugs
  invisible here.

Autouse fixtures reset state between tests: cache clear, DB query reset,
site cache clear, connection close (xdist workers share one Redis and one
Postgres), payment-events Redis client reset, and re-seeding of
`extra_settings` rows and the shipping providers. One autouse fixture
runs `transaction.on_commit` callbacks immediately so signal cascades
complete inside the test.

Fixtures you will reach for:

- `count_queries`: a context manager that fails when a block exceeds
  `max_queries`:

```python
def test_list_is_not_n_plus_one(api_client, count_queries):
    with count_queries(max_queries=6):
        api_client.get("/api/v1/product")
```

- `bind_tenant`, `acs_configured_tenant`, `boxnow_configured_tenant`: put a
  tenant on the connection and fill its carrier credentials, since the
  middleware that would do so is stripped.
- `debug_query_count`, and the `assert_english` marker that pins gettext to
  English for substring assertions on validator messages.

## Factories

Every factory extends `CustomDjangoModelFactory` (`devtools/factories.py`);
see [Base classes & patterns](/dev/django/patterns). Parler models get a
translation per configured language automatically. `SortableModel.save()`
assigns `sort_order` when none is set, so pass one explicitly only if the
test asserts on ordering, and expect the model to renumber on collisions.

## Parallelism and isolation

`addopts` in `pyproject.toml`:

```
--tb=short --maxfail=0 -n auto --dist loadfile --reuse-db
```

- `-n auto` runs one xdist worker per core.
- `--dist loadfile` pins every test in a file to one worker. `worksteal`
  interleaves files on a process and lets module-level singletons
  (translation version tick, extra-settings cache, factory random state)
  and eager signal cascades leak between unrelated tests. It costs about
  30% wall time and removes the random flakes.
- `--reuse-db` keeps each worker's database between runs, so the full
  migration replay only happens on a cold build. **After adding a
  migration, pass `--create-db`** or the reused database is missing your
  column.
- Per-test timeout is 600 seconds (`timeout = 600`).

## The multi-tenant lane (`tests_mt/`)

`tests_mt/` is a sibling of `tests/`, not a subdirectory, so the main
`conftest.py` never applies. It keeps the real `TenantSyncRouter` and
`TenantMainMiddleware`, provisions one tenant schema per session and runs a
small set of smoke tests for the class of bug the main suite cannot see:
cross-schema foreign keys, cache-key leaks between tenants, seed migrations
that stop reaching new tenants. It uses its own test database name
(`test_mt_<db>`) because the two lanes build incompatible table layouts.
Run it explicitly and serially:

```bash
uv run pytest tests_mt -n 0
```

## Query budgets and tenant artifacts

A query count that is off by one from the expected number is usually a
django-tenants artifact, not an N+1: the ContentType cache is cleared on
every schema switch and `SET search_path` is issued lazily on the first
query. Warm the code path once before each measured block, then assert.

## Local rules

1. **Run only new or targeted tests locally.** The whole suite belongs to
   CI; a full local run has been OOM-killed. Target a file or a node id:
   `uv run pytest tests/unit/order/test_services.py::test_confirm`.
2. **Never run two pytest invocations at once.** Workers share the
   `test_<db>_gw<N>` databases; a second run truncates the first one's
   tables mid-test.
3. **`--create-db` after a new migration** (see above).
4. **Before every commit**: `uv run ruff check --fix && uv run ruff format`,
   then `uv run ty check`. `ty` is not in pre-commit; the `.claude`
   PostToolUse hook reports per-file findings but never blocks.
5. **`uv run python manage.py makemigrations --check --dry-run`** whenever
   a model changed; the `/migration-check` skill in the Django repo wraps
   this, and `/migration-safety-audit` reviews a new migration against the
   PreSync deploy model (schema lands before the new code rolls). The
   synced [Migration Safety Rules](/dev/django/reference/migrations) page
   is the reference.

## Coverage

`[tool.coverage.report] fail_under = 70` in `pyproject.toml`. Locally,
coverage needs `-n0`:

```bash
uv run pytest --cov=. --cov-report=term --cov-config=pyproject.toml -n0
```

In CI the four shards upload raw data and the gate job combines them, so
no single shard is expected to reach the threshold on its own.

## CI (`.github/workflows/ci.yml`)

| Job | What it runs |
|---|---|
| Security Scan (Trivy) | filesystem scan; HIGH/CRITICAL fail |
| Code Quality | `ruff format --check`, `ruff check`, `ty check`, OpenAPI schema validation |
| Migration Check | `makemigrations --check --dry-run`, then both django-tenants migration paths on a clean database |
| Testing | four pytest-split shards from `.test_durations`, each `-n auto --dist loadfile` with coverage data upload |
| Testing (multi-tenant lane) | `uv run pytest tests_mt -n 0` |
| Coverage Gate | combines the shards and enforces `fail_under` |
| Release | python-semantic-release on `main`; the published release triggers `docker.yml` |

Refresh `.test_durations` occasionally with
`uv run pytest --store-durations` so the shards stay balanced.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/pyproject.toml` | `[tool.pytest.ini_options]`, `[tool.coverage.report]` |
| `grooveshop-django-api/tests/conftest.py` | Settings overrides, autouse fixtures, `count_queries`, `bind_tenant` |
| `grooveshop-django-api/tests_mt/conftest.py` | Multi-tenant lane |
| `grooveshop-django-api/devtools/factories.py` | `CustomDjangoModelFactory` |
| `grooveshop-django-api/.test_durations` | Shard timings |
| `grooveshop-django-api/.github/workflows/ci.yml` | CI jobs |
| `grooveshop-django-api/.claude/skills/migration-check/`, `migration-safety-audit/` | Migration skills |
