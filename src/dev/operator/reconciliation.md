---
title: Reconciliation
description: The four superuser-only screens under System → Reconciliation on a store's admin — ACS Pickup Lists, ACS COD Payouts with its reconcile action, and the Receipt and Credit Counters — and when an operator touches each.
---

# Reconciliation

The **System → Reconciliation** menu of a store's admin holds four
screens, all `IsSuperuserOnlyModelAdmin` (`admin/mixins.py`), so only a
platform superuser can open them and a store role is refused by URL too.
Merchants see the effect of these routines on their orders and shipments;
they ask the platform for anything here through
[When to contact support](/admin/help/contact-support).

How the pickup list and the nightly COD import work is in
[Shipping → Labels and the pickup list](/dev/flows/shipping#labels-and-the-pickup-list)
and [Shipping → COD payout reconciliation](/dev/flows/shipping#cod-payout-reconciliation).
This page covers the screens.

## ACS Pickup Lists

`shipping_acs/admin.py: AcsPickupListAdmin`. One row per list ACS
accepted: **Pickup list no**, **Issued at**, **Voucher count**, **Issued
by** (empty when the 16:30 task issued it). Search by number; every field
is read-only, and the detail page adds the billing code and ACS's raw
answer in `metadata`.

A row exists only when ACS accepted a list. No row for a working day
means nothing was waiting, ACS refused the list over unprinted vouchers
(noted on each held-back order, no email), or the call failed (task
failure and application log). The merchant's **Issue ACS pickup list
now** button is on the store-visible **ACS Shipments** changelist, not
here, so the person printing labels can reach it.

## ACS COD Payouts

`shipping_acs/admin.py: AcsCodPayoutAdmin`, a read-only ledger of
`AcsCodPayout` rows, one per voucher and payout date.

- Columns: **Voucher no**, **Parcel delivery date**, **COD amount total**,
  **COD payment date**, **Shipment**, **Customer ref no 1** (the order id
  sent at mint).
- Filters: `UnattributedPayoutFilter` (**Shipment** → **Matches no
  shipment, not reconciled**, the same rule as the dashboard's
  unattributed-payout counter), `ReconciledPayoutFilter`
  (**Reconciled** / **Not reconciled**), payment-date and delivery-date
  ranges.
- Search: voucher, both customer references, receiver name.
- Detail page: cash and card split, POD, raw payload, and **Reconciled
  at**, **Reconciled by**, **Reconciliation note** once reconciled.

### Actions

| Action | Kind | Effect |
|---|---|---|
| **Run COD reconciliation now** | list action | Queues `reconcile_acs_cod_payouts` for the current schema (yesterday's date). Idempotent: rows are keyed on voucher plus payment date. A missed older date needs `manage.py reconcile_acs_cod --days N --silent`, see the flow page. |
| **Mark as reconciled** | row and detail action, dialog with a required **Note** | `AcsService.reconcile_cod_payout` stamps `reconciled_at`, `reconciled_by` and the note under a row lock. Refuses a blank note, a payout tied to a shipment, and one already reconciled, with the reason shown verbatim. The payout amounts are never changed. |

Use **Mark as reconciled** only for money no shipment of the store can
explain, typically a voucher created by hand in the ACS portal, after
matching it against ACS's COD beneficiary report. It stops the row
counting on the store dashboard.

A delivered COD order that stays payment-pending is the merchant's side
of the same question. The store-side **Record COD received outside ACS**
action on an ACS shipment settles an order paid some other way; the
unremitted-COD email (03:00, after `ACS_COD_REMITTANCE_ALERT_DAYS`, default
10) lists the vouchers to chase with ACS.

## Receipt Counter and Credit Counter

`order/admin.py: InvoiceCounterAdmin` and `CreditCounterAdmin`, over
`order/models/invoice.py: InvoiceCounter` and
`order/models/retail_credit.py: CreditCounter`. One row per year with
**Year** (unique) and **Next Number**. `allocate()` takes the row with
`select_for_update()` (creating it on the year's first document), returns
the current number and stores the next, so concurrent documents never
share a number and a deleted document never returns its number.

These rows **are** editable, superusers only. The one legitimate edit is
reserving a range before the year's first document, for example when a
store's earlier numbers came from a previous system: create or edit the
year's row and set **Next Number** to the first free number. Never lower
it; two documents would share a number in a series AADE requires to be
gapless.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/admin/navigation.py` | `store_sidebar`, the **System → Reconciliation** menu |
| `grooveshop-django-api/admin/mixins.py` | `IsSuperuserOnlyModelAdmin` |
| `grooveshop-django-api/shipping_acs/admin.py` | `AcsPickupListAdmin`, `AcsCodPayoutAdmin`, `UnattributedPayoutFilter`, `ReconciledPayoutFilter`, the shipment actions |
| `grooveshop-django-api/shipping_acs/services.py` | `reconcile_cod_payout`, `issue_daily_pickup_list` |
| `grooveshop-django-api/shipping_acs/tasks.py` | `reconcile_acs_cod_payouts`, `alert_unremitted_cod_payouts`, `issue_daily_acs_pickup_list` |
| `grooveshop-django-api/shipping_acs/attention.py` | `cod_remittance_days`, the dashboard rules |
| `grooveshop-django-api/order/admin.py` | `InvoiceCounterAdmin`, `CreditCounterAdmin` |
| `grooveshop-django-api/order/models/invoice.py` | `InvoiceCounter.allocate` |
| `grooveshop-django-api/order/models/retail_credit.py` | `CreditCounter.allocate` |
