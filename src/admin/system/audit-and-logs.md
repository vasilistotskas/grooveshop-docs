---
title: Audit & logs
description: "The eight read-only ledgers under System → Audit & Logs, what each one records, how to read a row, and the questions they answer."
---

# Audit & logs

<span class="sidebar-path">System → Audit & Logs</span>

**Platform operators only.** These eight lists refuse to open for anyone else, whatever address is typed. They are read-only ledgers: nothing here can be added, almost nothing can be edited, and rows are written by the system as things happen. Owners who need one of these answers can ask the platform to look.

## Stock Logs

Every stock movement of every product, with the level before and after.

Columns: **Product**, **Operation type**, **Stock Change** (before → after, with the signed difference), **Order**, **Performed by**, **Created at**. Filters: operation type, date range, product category. Date drill-down above the table. Search: product name, SKU, order id, reason.

| Operation | Meaning |
|---|---|
| **Reserve** | Stock held for a checkout in progress. |
| **Release** | A reservation given back (checkout expired or cancelled). |
| **Decrement** | Stock permanently reduced (order confirmed). |
| **Increment** | Stock added back (order cancelled or returned), or a manual increase. |

Question it answers: "why does this product show 3 in stock when I counted 5?" Filter by product and read the sequence.

## Order History

One row per change to an order.

Columns: **Order**, **Change Type**, **Description**, **Changed By** (a person or "System"), **IP address**, **Created at**. Filters: change type, order, user, date range. Search: order id, description, the person's email or username, IP address.

Change types: Status Change, Payment Update, Shipping Update, Customer Info Update, Items Update, Address Update, Note Added, Refund Processed, Other Change. The row keeps the previous and the new value.

The same history is shown inline at the bottom of each order in [Orders](/admin/sales/orders); this list is the cross-order view.

## Order Item History

Changes to individual order lines: Quantity Change, Price Update, Item Refund, Other Change. Columns: **Order Item** (with its order), **Change Type**, **Description**, **Changed By**, **Created at**. The row keeps the previous and the new value.

## BoxNow Events

Every notification BoxNow sent about a parcel. Columns: **Voucher**, **Event type**, **Parcel State**, **Event time**, **Display name** (the locker or facility), **Received at**. Filters: event type, parcel state, event time. Search: parcel id, message id. The raw message is in a collapsed block on the detail page.

The same events are shown inline on each shipment in [BoxNow](/admin/shipping/boxnow). Use this list when a customer asks where a parcel is and the shipment page is not enough.

## ACS Tracking Events

Every checkpoint ACS reported for a voucher. Columns: **Shipment**, **Event time**, **Checkpoint action**, **Checkpoint location**, **Received at**. Filters: checkpoint action, received date. Search: voucher number, action, location. The raw record is on the detail page.

**ACS does not push.** Unlike BoxNow, it has no notifications at all, so every row here was fetched by the quarter-hourly polling job or by someone clicking **Re-poll ACS tracking**. A gap of up to fifteen minutes behind reality is normal.

The same events are shown inline on each shipment in [ACS Courier](/admin/shipping/acs), which also explains the voucher states they drive.

## Viva Webhook Events

Every payment notification Viva Wallet sent. Columns: **Transaction ID**, **Event Type ID**, **Outcome**, **Order**, **Order Code**, **Status ID**, **Received At**. Filters: event type, outcome, received date. Search: transaction id, order code, order id.

| Event type | Meaning |
|---|---|
| 1796 | Transaction Payment Created (a payment succeeded) |
| 1797 | Transaction Reversal Created (a refund or reversal) |
| 1798 | Transaction Failed |
| 2054 | Account Transaction Created (money moved on the Viva account; a row appears only when it concerns one of your payments, which is how disputes reach the order, see [Card disputes and chargebacks](/admin/sales/orders#card-disputes-and-chargebacks)) |

| Outcome | Meaning |
|---|---|
| **Processed** | The order was updated. |
| **Skipped** | A duplicate delivery, ignored on purpose. |
| **Failed** | The handler raised; the order may need a manual check. |

Question it answers: "the customer says they paid but the order is still pending". Search the order id. No row means Viva never delivered the event; a Failed row means it arrived but could not be applied.

## Meta CAPI Event Log

Every server-side event sent to Meta's Conversions API. Columns: **Event name**, **Status** (Pending, Sent, Failed, Skipped), **Events received** (Meta's count), **Order**, **User**, **fbtrace id**, **Created at**. Filters: status, event name, date, with a date drill-down. Search: event id, trace id, order id, user email.

A run of Failed rows usually means the access token on the store profile expired. Skipped means the event was not sent, typically because consent or the switch was off. See `META_CAPI_ENABLED` in [Store settings](/admin/settings/store-settings).

## User Data Exports

Data-export requests customers make from their storefront account. Only a customer can create one; this list is read-only. Columns: **User**, **Status** (Pending, Processing, Ready, Failed, Expired), **File size**, **Expires at**, **Created at**. Filters: status, created date, expiry date. Search: user email, username, token. A ready file is downloadable by the customer for seven days, then a nightly job deletes it. See [Data exports (GDPR)](/admin/customers/data-exports) for the customer-facing flow.

## Things to know

- A missing row is itself information: a notification that never arrived, or a stock change made outside the store.
- **Cache purges are not here.** Who purged what is recorded, but the record is platform-wide — one list covering every store, with the name of whoever ran each purge — so it lives on the platform console, and on a store's address the list refuses to open at all, platform operators included. The twenty most recent purges shown at the bottom of the [Cache](/admin/settings/cache) page come from that same record, filtered to your store; purging itself is unchanged, and Owners and Admins can still do it.
- Order pages show a **Stock Logs** and **Order History** tab to platform operators only; store staff see the inline history on the order instead.
- Nothing in these lists is deleted automatically except expired data exports.

## Related

- [Orders](/admin/sales/orders)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Cache](/admin/settings/cache)
- [Reconciliation](/admin/system/reconciliation)
