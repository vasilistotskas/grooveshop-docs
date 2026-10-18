---
title: Reconciliation
description: "ACS pickup lists, ACS cash-on-delivery payouts and the receipt and credit counters — what each is, the daily routine behind it, and how to read the numbers."
---

# Reconciliation

<span class="sidebar-path">System → Reconciliation</span>

**Platform operators only.** These four screens (**ACS Pickup Lists**, **ACS COD Payouts**, **Receipt Counter**, **Credit Counter**) refuse to open for anyone else. Owners see the effect of the routines on their orders and shipments; this page explains what happens behind them and what an operator does when asked.

Pickup lists and cash-on-delivery payouts are explained in depth, from the store's side, in [ACS Courier](/admin/shipping/acs). This page covers the two ledgers themselves and the Receipt and Credit Counters.

## ACS Pickup Lists

A pickup list (manifest) is ACS's daily record of the vouchers it accepted for one pickup date. **It is not what gets a parcel collected:** ACS collects a parcel once its label is printed, whether or not a list was issued, and many collected vouchers never appear on one.

Columns: **Pickup list no**, **Issued at**, **Voucher count**, **Issued by** (a person, or empty when the scheduled job did it). Search by number. Every field is read-only; the detail page also shows the billing code used and ACS's raw answer.

### The routine

1. During the day, ACS vouchers are issued per shipment from [ACS Courier](/admin/shipping/acs) and printed.
2. **Mon–Fri 16:30** the job asks ACS to issue the list for every voucher still waiting for one, and writes a row here when ACS accepts. ACS refuses the whole list while any voucher on it is unprinted, and its interface cannot issue a partial list. That refusal is routine when labels are printed the morning after the order: it is written as a note on each order it held back, and nobody is emailed.
3. If the list must go out earlier, or after printing the missing labels, open <span class="sidebar-path">Shipping → ACS Shipments</span> and click **Issue ACS pickup list now**. That button is deliberately on the shipments screen, not on this one, so the person who prints the labels can reach it.

The messages it can return:

| Message | Meaning |
|---|---|
| "Pickup list … issued for … voucher(s)." | Done. A row appears here. |
| "No vouchers are waiting for a pickup list." | Nothing to collect. No row is written. |
| "ACS did not issue the pickup list: …" | ACS refused; its own wording follows, usually naming a voucher still to be printed. Print it and click again to issue the list, or leave it: the parcels are collected once their labels are printed. |

Issuing is single-flight: a lock is taken for five minutes, so if the scheduled run and a manual click overlap, the second one is skipped rather than double-issuing.

## ACS COD Payouts

A read-only ledger of the cash-on-delivery money ACS has paid out, one row per voucher and payout date.

Columns: **Voucher no**, **Parcel delivery date**, **COD amount total**, **COD payment date**, **Shipment**, **Customer ref no 1** (the order id sent with the voucher). Filters: **Shipment** (**Matches no shipment, not reconciled**), **Reconciliation** (**Reconciled** or **Not reconciled**), payment date, delivery date. Search: voucher, both reference numbers, receiver name. Every field is read-only; the detail page splits the amount into cash and card, keeps the raw ACS record and shows **Reconciled at**, **Reconciled by** and **Reconciliation note** once someone has reconciled the payout.

### The routine

1. **Daily 02:30** the job asks ACS for the previous day's payouts and writes them here. Re-running is harmless: a row is identified by voucher plus payment date, so a repeat updates rather than duplicates.
2. Each row is linked to its **Shipment** by voucher number; failing that, by the order id, and failing that by the order's reference. When the shipment is found, its voucher number is taken as the truthful one for the row.
3. For a linked order still in payment status Pending, the order flips to **Completed**. No email goes to the customer for this flip; they already paid the courier in person. Internally the order history gets a row and the order may auto-advance from Delivered to Completed, also silently.
4. Rows that match no shipment and no order reference are stored all the same, with an empty voucher number when ACS sent none, and an alert email goes to the store's operators: unattributed money must be investigated. They stay counted on the dashboard as **ACS payouts matching no shipment** until someone marks them as reconciled (below).
5. **Daily 03:00** a second job emails a list of delivered COD parcels that ACS has not paid out yet.

To run the import outside the schedule, click **Run COD reconciliation now** at the top of the list; the message "COD reconciliation task dispatched" confirms it was queued. This button is on this screen, so only a platform operator can press it.

Both emails can be switched off per store with `OPS_ALERT_UNATTRIBUTABLE_COD_PAYOUTS_ENABLED` and `OPS_ALERT_UNREMITTED_COD_ENABLED` in [Store settings](/admin/settings/store-settings#operational-alert-emails). The dashboard lines **ACS payouts matching no shipment** and **COD cash ACS has not paid out** keep counting either way.

### Reconcile a payout that matches no shipment

Money ACS paid for a voucher the store never created, or for a line with no readable voucher, can never be linked to an order, so only a person can close it.

1. Set the **Shipment** filter to **Matches no shipment, not reconciled**. Each row shows its voucher, amount, receiver and delivery date.
2. Account for the payout against ACS's COD beneficiary report: usually a sale made outside the store, with a voucher created by hand in the ACS portal.
3. Click **Mark as reconciled** on the row (or on the payout's page), write in **Note** how it was accounted for (the off-system sale, the invoice, the line of the ACS report) and confirm. The message "Payout marked as reconciled." confirms it.

The payout itself is not changed; the note, who reconciled it and when are kept on it, and it stops counting on the dashboard. A payout that is already tied to a shipment, or already reconciled, is refused with the reason.

### Reading the numbers

- **COD amount total** is what the customer handed to the courier; it should equal the order's total.
- **COD payment date** is when ACS credited you; the order's payment stays Pending until this row exists. That gap of several days is expected. See the note in [Orders](/admin/sales/orders).
- A delivered COD order that stays Pending for more than a week has either no payout row (ACS did not pay yet, or the row was skipped) or a row whose voucher did not match. Search the voucher here first.

## Receipt Counter and Credit Counter

One row per year in each, with **Year** and **Next Number**. Every receipt takes the next number of the Receipt Counter, and every credit document the next number of the Credit Counter, under a row lock, so two documents issued at the same moment cannot receive the same number and each sequence has no gaps.

Unlike the two ledgers above, this row **is** editable, and only a platform operator can reach it. The only reason to edit it is to reserve a range, for example when numbers up to a certain point were issued by a previous system. Set **Next Number** to the first free number **before** the first document of the year. Never lower it: two documents would receive the same number, and the tax authority sees the sequence.

## Things to know

- ACS is the cash-on-delivery carrier here; online payments settle through the payment provider, not through this ledger.
- A pickup list row is written only when ACS accepted the list. No row for a working day means nothing was waiting for a list, ACS refused it over unprinted vouchers (noted on each order it held back), or the issue failed for another reason, whose text is in the application log.
- Deleting a receipt or credit document does not give its number back. The counter only moves forward.

## Related

- [ACS Courier](/admin/shipping/acs)
- [Orders](/admin/sales/orders)
- [Receipts and credit documents](/admin/sales/receipts)
- [Background jobs](/admin/help/automatic-tasks)
