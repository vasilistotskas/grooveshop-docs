---
title: Layout and guardrails
description: Where the Django API's code lives under src/, which modules were split into packages, the guards that keep the layout from drifting (import contracts, the locked Celery task names, the doc-reference test, the client-IP test), and which splits are still planned.
---

# Layout and guardrails

The Django API went through an architecture programme (Django epic #558):
the behaviour stays, the shape changes so that people and agents can work
in small modules. This page records what has landed and the rules that hold
it. The code wins over this page; the per-app map is
[App map](/dev/django/reference/app-map).

## Where things live

- **Source is in `src/`.** Every app, `src/settings/` and `src/asgi/` are on
  the Python path, so an import names the app (`from order.services import
  ...`), never `src`. A file is cited by its path, a module by its dotted
  name.
- **Settings are a package.** `src/settings/` has one module per concern
  (`env`, `application`, `auth`, `cache`, `celery`, `schedule`, `security`,
  `store_settings`, `integrations`, `domain`, ...), which
  `src/settings/__init__.py` imports in the order the settings are
  evaluated. `DJANGO_SETTINGS_MODULE` is `settings`. The merchant-editable
  defaults are `EXTRA_SETTINGS_DEFAULTS` in `src/settings/store_settings.py`.
- **Big modules became packages**, one module per resource:
  `src/search/views/` (`product`, `blog`, `click`, `report`, `trending`),
  `src/builder/views/` (`documents`, `publish`, `schedules`, `links`,
  `previews`, `presence`, `features`, `public`), `src/product/admin/`
  (one module per admin, plus `stock_history`).
- **`order` is one Django app split into subpackages**: `accounting`,
  `checkout` (`quote.py`: `OrderQuoteService`), `communications`, `enum`,
  `inventory`, `lifecycle`, `payments`, `refunds`, `reporting`, `models`,
  `serializers`, `signals`, `views`. `src/order/services.py`,
  `src/order/tasks.py` and `src/order/admin.py` are still single modules;
  the programme splits them next (Django #568 to #574), and the pages that
  cite them change with each split.
- **Carriers share one HTTP policy.** `src/shipping/carrier_http.py` builds
  the session both `shipping_acs.client.AcsClient` and
  `shipping_boxnow.client.BoxNowClient` send through: a request that never
  connected is retried, a GET is also retried after a 5xx, and a POST or PUT
  is never sent again once it may have reached the courier.
- **One label and one cancel endpoint for every carrier.**
  `GET /api/v1/order/{id}/shipment_label` and `POST
  .../shipment_cancel` (`OrderViewSet.shipment_label`, `shipment_cancel` in
  `src/order/views/order.py`) dispatch through the shipping registry
  (`ShippingService.fetch_label_bytes`); the per-carrier order endpoints are
  gone.

## What keeps it from drifting

| Guard | Where | What it enforces |
|---|---|---|
| Import contracts | `[tool.importlinter]` in `pyproject.toml`, run with `PYTHONPATH=src uv run lint-imports` | `core` imports no domain app (a short ignore list); `shipping_acs` and `shipping_boxnow` never import each other; a carrier app is reached only through `shipping`; inside `order`, views and receivers are imported only by the URL confs and the app config, and the subpackages keep their layer order. A contract's `ignore_imports` only shrinks: fix the import, delete its line. |
| Locked Celery task names | `tests/unit/core/test_celery_task_names_are_locked.py`, list in `tests/unit/core/celery_task_names.txt` | A task's name is an address held by queued messages, the beat schedule and `DeferredDispatch` rows. A task that moves keeps its name with `name=`; adding a task adds a line; removing or renaming one edits the list by hand, after checking the queue, the schedule and the deferred rows. |
| Doc references | `tests/unit/test_doc_references.py` | Every path in backticks in the Django repository's docs and agent files exists, every app under `src/` is in the app map, and no doc cites a private memory note. |
| Client IP | `tests/unit/core/test_client_ip_only_through_the_helper.py` | No code reads `REMOTE_ADDR` or `X-Forwarded-For` directly: the visitor's address comes from `edge_client_ip` or `client_ip_or_peer` (`src/core/client_ip.py`, see [Security](/dev/platform/security)). The one allowed exception, log lines in the Viva webhook, only shrinks. |

## Rules for a change that moves code

A move only moves: no fix rides along. What is addressed by a dotted string
keeps its address (task names, paths a migration imports, the dotted paths of
`EXTRA_SETTINGS` validators). A move needs no new migration and leaves
`schema.yml` unchanged. A doc that names a moved module changes in the same
pull request.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/pyproject.toml` | `[tool.importlinter]` contracts |
| `grooveshop-django-api/src/settings/__init__.py` | The settings package |
| `grooveshop-django-api/src/order/checkout/quote.py` | `OrderQuoteService` |
| `grooveshop-django-api/src/shipping/carrier_http.py` | `carrier_session`, the carriers' retry policy |
| `grooveshop-django-api/src/order/views/order.py` | `shipment_label`, `shipment_cancel` |
| `grooveshop-django-api/src/core/client_ip.py` | `edge_client_ip`, `client_ip_or_peer` |
| `grooveshop-django-api/tests/unit/core/test_celery_task_names_are_locked.py` | The task-name lock |
| `grooveshop-django-api/tests/unit/test_doc_references.py` | The doc-reference rules |
| `grooveshop-django-api/tests/unit/core/test_client_ip_only_through_the_helper.py` | The client-IP rule |
