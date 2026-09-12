---
title: Reconciliation
description: ACS pickup lists, ACS cash-on-delivery payouts and the invoice counter — what each is, the daily routine behind it, and how to read the numbers.
---

# Reconciliation

<span class="sidebar-path">System → Reconciliation</span>

**Platform operators only.** These three screens are gated on the platform superuser flag (`shipping_acs/admin.py`, `order/admin.py`, `IsSuperuserOnlyModelAdmin`). Owners see the effect of the routines on their orders and shipments; this page explains what happens behind them and what an operator does when asked.

Pickup lists and cash-on-delivery payouts are explained in depth, from the store's side, in [ACS Courier](/admin/shipping/acs). This page covers the two ledgers themselves and the Invoice Counter.

## ACS Pickup Lists

A pickup list (manifest) is the daily document that tells ACS which vouchers to collect. **A voucher that is never on a pickup list is never collected.**

Columns: **Pickup list no**, **Issued at**, **Voucher count**, **Issued by** (a person, or empty when the scheduled task did it). Search by number. The detail page also shows the billing code used and ACS's raw response.

### The routine

1. During the day, ACS vouchers are issued per shipment from [ACS Courier](/admin/shipping/acs) and printed.
2. **Mon–Fri 15:45** a task emails the store if any voucher due today is still unprinted, because ACS rejects the whole list if one voucher on it is unprinted, and its API cannot issue a partial list.
3. **Mon–Fri 16:30** the task issues the list for every voucher awaiting collection and stores a row here.
4. If the list must go out earlier, or after fixing an unprinted label, open <span class="sidebar-path">Shipping → ACS Shipments</span> and click **Issue ACS pickup list now**. Messages: "Pickup list … issued for … voucher(s)", "No vouchers are waiting for a pickup list", or ACS's own rejection text naming what has to be printed.

Issuing is single-flight: if the scheduled run and a manual click overlap, the second one is skipped rather than double-issuing.

## ACS COD Payouts

A read-only ledger of the cash-on-delivery money ACS has paid out, one row per voucher and payout date (`shipping_acs/services.py`, `reconcile_cod_payouts`).

Columns: **Voucher no**, **Parcel delivery date**, **COD amount total**, **COD payment date**, **Shipment**, **Customer ref no 1** (the order id sent with the voucher). Filters: payment date, delivery date. Search: voucher, reference numbers, receiver name. The detail page splits the amount into cash and card and keeps the raw ACS row.

### The routine

1. **Daily 02:30** the task asks ACS for the previous day's payouts and upserts them here. Re-running is harmless; the key is voucher plus payment date.
2. Each row is linked to its **Shipment** by voucher number, or by the order references when the voucher is missing.
3. For a linked order still in payment status Pending, the order flips to **Completed**. No email goes to the customer for this flip; they already paid the courier in person. Internally the order history gets a row and the order may auto-advance from Delivered to Completed.
4. Rows that match no shipment and no order reference are counted as skipped and an alert email is sent to the platform administrators: unattributed money must be investigated.
5. **Daily 03:00** a second task emails a list of delivered COD parcels that ACS has not paid out yet.

To run the import outside the schedule, open a payout row and click **Run COD reconciliation now**; the message "COD reconciliation task dispatched" confirms the task was queued.

### Reading the numbers

- **COD amount total** is what the customer handed to the courier; it should equal the order's total.
- **COD payment date** is when ACS credited you; the order's payment stays Pending until this row exists. That gap of several days is expected. See the note in [Orders](/admin/sales/orders).
- A delivered COD order that stays Pending for more than a week has either no payout row (ACS did not pay yet, or the row was skipped) or a row whose voucher did not match. Search the voucher here first.

## Invoice Counter

One row per year with **Year** and **Next Number** (`order/models/invoice.py`). Every invoice takes the next number atomically, so the sequence has no gaps even when invoices are issued at the same moment.

The only reason to edit it is to reserve a range, for example when numbers up to a certain point were issued by a previous system. Set **Next Number** to the first free number **before** the first invoice of the year. Never lower it: two invoices would receive the same number, and the tax authority sees the sequence.

## Things to know

- ACS is used for cash-on-delivery in this platform; online payments settle through the payment provider, not here.
- A pickup list row is written only when ACS accepted the list. No row for a working day means nothing was awaiting collection or the issue failed; the failure text is in the store's email and in the application log.
- Deleting an invoice does not give its number back. The counter only moves forward.

## Related

- [ACS Courier](/admin/shipping/acs)
- [Orders](/admin/sales/orders)
- [Invoices](/admin/sales/invoices)
- [Background jobs](/admin/system/background-jobs)
