---
title: Audit & logs
description: The eight read-only ledgers under System → Audit & Logs on a store's admin — what writes each one, how to read a row, the store-side view of the same data, and the questions they answer.
---

# Audit & logs

The **System → Audit & Logs** menu of a store's admin holds eight ledgers
that only a platform superuser can open. Every one of their `ModelAdmin`s
mixes in `IsSuperuserOnlyModelAdmin` (`admin/mixins.py`), which gates
module, view, add, change and delete on `is_superuser` after the base
admin's own checks, so a store role is refused by URL as well as hidden
from the menu. The **System** group itself is only built when
`is_platform_superuser(user)` holds (`admin/navigation.py: store_sidebar`).

Store roles see a narrower slice of the same data on the record it
belongs to; the table below names it. The owner-facing page that tells a
merchant what to ask for is
[When to contact support](/admin/help/contact-support).

## The ledgers

| Menu entry | Model | Written by | Store-side view |
|---|---|---|---|
| Stock Logs | `order.StockLog` | `order/stock.py: StockManager` (reserve, release, decrement, increment); `product/signals.py` for a manual stock edit | **Stock activity** tab on the product (`product/admin.py: StockLogDataset`) |
| Order History | `order.OrderHistory` | `OrderHistory.log_*` helpers (`order/models/history.py`), called from the order services, webhooks and tasks | **Order History** tab on the order (`order/admin.py: OrderHistoryInline`) |
| Order Item History | `order.OrderItemHistory` | the same module, per line | none |
| BoxNow Events | `shipping_boxnow.BoxNowParcelEvent` | the BoxNow webhook and the tracking poll (`shipping_boxnow/services.py`, `shipping_boxnow/tasks.py`) | events tab on the BoxNow shipment (`BoxNowParcelEventInline`) |
| ACS Tracking Events | `shipping_acs.AcsTrackingEvent` | the tracking poll only (`shipping_acs/services.py`); ACS pushes nothing | events tab on the ACS shipment (`AcsTrackingEventInline`) |
| Viva Webhook Events | `order.VivaWebhookEvent` | `order/views/viva_webhook.py`, one row per applied delivery | none |
| Meta CAPI Event Log | `meta_capi.MetaCapiEventLog` | `meta_capi/tasks.py` | none |
| User Data Exports | `user.UserDataExport` | `user/services/gdpr.py`, `user/tasks.py` | none; the customer downloads from the storefront |

The order changelist also carries **Stock Logs** and **Order History** tabs
in its `UNFOLD["TABS"]` group (`settings.py`), each with
`"permission": "admin.permissions.is_superuser"`, so they render for
platform staff only.

### Stock Logs

Columns **Product**, **Operation type**, **Stock Change** (before → after,
signed delta), **Order**, **Performed by**, **Created at**. Filters:
operation type, created-at range, product category; date hierarchy on
`created_at`. Search: product name, SKU, order id, reason.

| Operation | Meaning |
|---|---|
| Reserve | Held for a checkout in progress (`StockReservation`). |
| Release | A reservation given back. |
| Decrement | Stock permanently reduced when the order is placed. |
| Increment | Stock added back on cancel or return, or a manual increase. |

Expired reservations stop counting against available stock the moment
they expire (`StockManager.get_available_stock` filters
`expires_at__gt=now`); the hourly `cleanup_expired_stock_reservations`
only marks them consumed. "The product shows 3 but I counted 5" is
answered by filtering on the product and reading the sequence.

### Order History and Order Item History

Order History columns **Order**, **Change Type**, **Description**,
**Changed By** ("System" when no user), **IP address**, **Created at**.
Change types: Status Change, Payment Update, Shipping Update, Customer
Info Update, Items Update, Address Update, Note Added, Refund Processed,
Chargeback, Other Change. Each row keeps `previous_value` and `new_value`.
Order Item History has Quantity Change, Price Update, Item Refund, Other
Change.

### BoxNow Events and ACS Tracking Events

BoxNow: **Voucher**, **Event type**, **Parcel State**, **Event time**,
**Display name** (locker or facility), **Received at**; the raw payload is
on the detail page. ACS: **Shipment**, **Event time**, **Checkpoint
action**, **Checkpoint location**, **Received at**. ACS has no push, so
every ACS row comes from the 15-minute poll or a **Re-poll ACS tracking**
click; a lag of up to fifteen minutes is normal. The voucher-state
mapping these events drive is in [Shipping](/dev/flows/shipping).

### Viva Webhook Events

Columns **Transaction ID**, **Event Type ID**, **Outcome**, **Order**,
**Order Code**, **Status ID**, **Received At**. The event type renders as
its choice label: Transaction Payment Created (1796), Transaction Reversal
Created (1797), Transaction Failed (1798), Account Transaction Created
(2054, which is how disputes reach an order). Only identifiers are stored,
no payload.

| Outcome | Meaning |
|---|---|
| Processed | The order was updated. |
| Skipped | Recorded but deliberately not applied: the transaction was not final, did not verify against Viva, or did not belong to the order. The exact rules are in [Checkout & payment](/dev/flows/checkout-and-payment). |
| Failed | A declared choice that no code path writes. A handler exception returns 500 and rolls the row back, so Viva redelivers. |

"The customer says they paid but the order is pending": search the order
id. No row means Viva never delivered the event, or every delivery raised
(check the application log); a Skipped row says why it was not applied.

### Meta CAPI Event Log

Columns **Event name**, **Status** (Pending, Sent, Failed, Skipped),
**Events received**, **Order**, **User**, **fbtrace id**, **Created at**.
Read-only: add and change are refused. `meta_capi/tasks.py` writes only
Pending, Sent and Failed; Skipped is a declared choice nothing writes, and
an event that is never dispatched (no consent, `META_CAPI_ENABLED` off)
leaves no row at all. A run of Failed rows usually means the store's CAPI
access token on its profile expired. The dispatch itself is in
[Analytics & consent](/dev/flows/analytics-and-consent).

### User Data Exports

Columns **User**, **Status** (Pending, Processing, Ready, Failed,
Expired), **File size**, **Expires at**, **Created at**. Add is refused:
only the customer creates an export. `expires_at` is set to seven days
after the file is built (`EXPORT_TTL`, `user/services/gdpr.py`); the
nightly `cleanup_expired_data_exports` deletes the file and marks the row
Expired.

## Invariants

- No store role can open any of the eight, whatever URL is typed
  (`IsSuperuserOnlyModelAdmin`).
- Every ledger is append-only in practice: the admins expose no
  meaningful edit, and only User Data Exports is pruned automatically.
- Who purged the cache is not here: the Cache Purge Log is a
  platform-console screen, see
  [Scheduled work & platform data](/dev/operator/background-jobs#cache-purge-log).

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/admin/navigation.py` | `store_sidebar`, the superuser-only **System** group |
| `grooveshop-django-api/admin/mixins.py` | `IsSuperuserOnlyModelAdmin` |
| `grooveshop-django-api/order/admin.py` | `StockLogAdmin`, `OrderHistoryAdmin`, `OrderItemHistoryAdmin`, `VivaWebhookEventAdmin`, `OrderHistoryInline` |
| `grooveshop-django-api/order/models/stock_log.py` | `StockLog`, operation choices |
| `grooveshop-django-api/order/models/history.py` | `OrderHistory`, `OrderItemHistory`, change types |
| `grooveshop-django-api/order/models/viva_webhook_event.py` | `VivaWebhookEvent`, event-type and outcome choices |
| `grooveshop-django-api/order/views/viva_webhook.py` | Where outcomes are written |
| `grooveshop-django-api/order/stock.py` | `StockManager` |
| `grooveshop-django-api/product/admin.py` | `StockLogDataset` (store-side stock tab) |
| `grooveshop-django-api/shipping_boxnow/admin.py` | `BoxNowParcelEventAdmin`, `BoxNowParcelEventInline` |
| `grooveshop-django-api/shipping_acs/admin.py` | `AcsTrackingEventAdmin`, `AcsTrackingEventInline` |
| `grooveshop-django-api/meta_capi/admin.py` | `MetaCapiEventLogAdmin` |
| `grooveshop-django-api/meta_capi/models.py` | `MetaCapiEventStatus` |
| `grooveshop-django-api/user/admin.py` | `UserDataExportAdmin` |
| `grooveshop-django-api/user/services/gdpr.py` | `EXPORT_TTL` |
| `grooveshop-django-api/user/tasks.py` | `cleanup_expired_data_exports` |
| `grooveshop-django-api/settings.py` | `UNFOLD["TABS"]` superuser-only order tabs |
