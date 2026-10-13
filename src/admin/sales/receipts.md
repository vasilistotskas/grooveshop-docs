---
title: Receipts and credit documents
description: The retail receipt the platform registers with myDATA when an order ships, the credit document it issues for every refund, the gapless numbering, and how to issue an invoice for a business customer by hand in AADE's timologio app.
---

# Receipts and credit documents

<span class="sidebar-path">Sales → Receipts</span> · <span class="sidebar-path">Sales → Credit Documents</span>

Two tax documents are issued by the platform itself, both for retail customers, both registered with AADE through myDATA:

- the **receipt** (Απόδειξη Λιανικής Πώλησης), issued when an order **ships**;
- the **credit document** (Πιστωτικό Στοιχείο Λιανικής), issued for **every refund** of an order whose receipt was registered, for exactly the amount refunded.

**The platform does not issue invoices (Τιμολόγια).** Since 2.11.2026 AADE requires invoices to come from a licensed provider or from its free timologio app; an invoice sent over the integration counts as not issued. A customer who asks for an invoice at checkout therefore gets a request, and you issue the invoice yourself in timologio: see [Issue an invoice for a business customer](#issue-an-invoice-for-a-business-customer).

Both screens are archives: you can browse, search and download, never edit or add. Receipts take their number from a per-year counter and credit documents from a counter of their own, which superusers can inspect under <span class="sidebar-path">System → Reconciliation → Receipt Counter</span> and <span class="sidebar-path">System → Reconciliation → Credit Counter</span>.

## What you see

### The receipts list

| Column | Meaning |
|---|---|
| **Invoice Number** | `INV-YYYY-NNNNNN`, sequential within the year, no gaps. This is the platform's own number; the legal identifier is the MARK. |
| **Order** | Link to the order. |
| **Issue Date** | Fiscal date of issue, fixed once rendered. |
| **Total** | Total including VAT. |
| **Currency** | Always the store currency. |
| **Document** | **Download** when the PDF exists, **Pending** when the row was written but the PDF has not been rendered. |
| **myDATA** | The AADE submission state, with the MARK in brackets once assigned. |

Filters: issue date range, **Has PDF**, **myDATA Status**. Search: number, order ID, customer email and name, MARK and UID.

The receipt page is read-only: the number and date, the totals with the **VAT breakdown** (one row per rate with net, VAT and gross, shipping and the payment fee included), the seller and buyer details as they were at issue time, and the **myDATA (AADE)** block (status, type, series, serial number, UID, MARK, QR address, cancellation MARK, last error, timestamps).

### The credit documents list

Same shape: **Credit Number** (`CRD-YYYY-NNNNNN`), order, **Reason**, issue date, total, document, myDATA state. **Reason** is **Refund** for a document issued for one refund, or **Order closed without a sale** for the single document that credits whatever the receipt still holds when an order ends without a sale (a cash-on-delivery parcel that came back, or the gift-card share of a fully refunded order). The page also shows the receipt it credits and, for a refund, the refund it belongs to.

## myDATA statuses

| Status | Meaning |
|---|---|
| **Not sent** | Not submitted yet. |
| **Pending submission** | Queued for sending; nothing has gone to AADE yet. |
| **Submitted** | Sent, waiting for AADE. After the automatic retries are used up it stays here until you resend. |
| **Confirmed (MARK assigned)** | Registered. The PDF carries the MARK and the QR code. |
| **Rejected** | AADE returned a validation error. Fix the cause and resend from the order page. While myDATA is on, receipts rejected in the last 7 days are counted on the dashboard under **Needs attention** as **Receipts rejected by myDATA**, for anyone who may open this list. |
| **Canceled in myDATA** | A cancellation succeeded; the cancellation MARK is on the row. |

A receipt or credit document that AADE has not registered is **never emailed to the customer**: the email goes out once the document carries its MARK.

## When documents are issued

- **The receipt**, when a receipt order **ships** (the carrier reports the parcel moving; cash-on-delivery orders included), if myDATA is enabled with automatic issuing. The law dates it to the delivery or the start of the shipment. It is issued once per order, emailed to the customer in their language with the PDF attached, and the order's **Receipt** card shows its number and myDATA state. Orders that are canceled before they ship never get a receipt.
- **A credit document**, for each refund (a refund from the order page, a refund made in the Stripe or Viva dashboard, a refund that comes with a cancellation), once the order's receipt is registered. A partial refund credits only what was refunded, split over the VAT rates in proportion to what the receipt holds at each rate; several partial refunds give several credit documents, and together they can never pass the receipt. A refund made before the receipt existed needs no credit document.
- **Settlement credit**: when an order closes without a sale after its receipt was issued, one more credit document covers what is still uncredited: the full receipt of a returned cash-on-delivery parcel, or the gift-card share of an order refunded in full.
- **By hand**, from the order page, <span class="sidebar-path">Invoicing & myDATA</span> menu: **Issue receipt (myDATA)** and **Issue credit documents (myDATA)**. These are the way to issue when automatic issuing is off, and **Issue credit documents (myDATA)** also resends a credit AADE refused. Both are safe to press again: nothing is issued twice.

With **MYDATA_ENABLED** off nothing is issued at all. With **MYDATA_AUTO_SUBMIT** off nothing happens by itself and you use the two actions above.

## Issue an invoice for a business customer

At checkout the shopper chooses **Receipt** or **Invoice**. Choosing Invoice requires a Greek ΑΦΜ of nine digits that passes its check digit, an EL or GR prefix being stripped for you, plus company name, tax office and business activity. The registered address is optional: left blank it is copied from the delivery address, and a half-filled one is refused. The option is controlled by `B2B_INVOICING_ENABLED` (on by default) under [Store settings](/admin/settings/store-settings); approved business customers have these details on their profile (see [Business customers](/admin/b2b/business-customers)).

The platform submits nothing for such an order and sends no invoice document; the order confirmation says an invoice was requested. To issue it:

1. Open the order and go to the **Billing / Invoice** tab. **To issue in timologio** lists the company, ΑΦΜ, tax office, activity, address and email, and one line per VAT rate with net, VAT and gross: the figures the platform itself would have used.
2. Issue the invoice in AADE's timologio app with those details.
3. Back on the tab, record the **Invoice number (timologio)** and **Invoice MARK (timologio)** and save. If you later issue a credit invoice for the order, record **Credit invoice number (timologio)** and **Credit invoice MARK (timologio)** the same way. The order's **Invoice** card then shows the number.

## Tasks

### Download or print a receipt or credit document
1. Find it here by number, order ID or customer, or open the order: its **Receipts** and **Retail Credit Documents** tabs list them.
2. Click **Download** (list) or **Download PDF** (order page). The file streams through the admin login; there is no public link.

Customers get their copy by email once it is registered, and download the receipt from their account.

### Fix a wrong receipt PDF
1. Correct the source: the seller details under Store settings (every key whose name starts with `INVOICE_SELLER_`) or the VAT rate of one of the order's lines (next task). Changing a product's VAT rate does not change an order that was already placed.
2. On the order page choose **Invoicing & myDATA → Regenerate receipt (same number)**. The number and issue date are kept and the PDF is rendered again.
3. If the receipt is already registered, the PDF cannot change what AADE holds and its figures stay the registered ones. A wrong registered receipt is corrected by the credit documents that follow refunds; **Cancel receipt in myDATA (issued in error)** is only for a receipt that should never have been issued, and your accountant tells you how long that stays possible.

### Correct the VAT rate of an order line
1. Open the order and, in its order items, open the line from its row.
2. Under **Order Item Information**, correct **VAT Rate** and save. Only the rates myDATA accepts are allowed.
3. Back on the order, choose **Invoicing & myDATA → Regenerate receipt (same number)**.

Once the receipt has a myDATA MARK, **VAT Rate** is shown read-only: the registered document can no longer change.

### Resend to myDATA by hand
1. On the order page open **Invoicing & myDATA**.
2. **Send receipt to myDATA** queues the submission of a receipt that was refused or never answered (the receipt must already be rendered; the button tells you if myDATA is not configured). **Issue credit documents (myDATA)** does the same for credit documents. Refresh the list to see the status change and the MARK.

### Cancel a document issued in error
**Cancel receipt in myDATA (issued in error)** on the order page, or **Cancel in myDATA (issued in error)** on the Credit Documents list. This is for a document that should never have existed; a sale that did not happen is undone by a credit document, not by cancelling the receipt.

### Reserve numbers
Superusers only. Under <span class="sidebar-path">System → Reconciliation → Receipt Counter</span> or <span class="sidebar-path">System → Reconciliation → Credit Counter</span> there is one row per year with **Year** and **Next Number**. Raising Next Number reserves the numbers below it. Lowering it produces duplicates and is never right. See [Reconciliation](/admin/system/reconciliation).

## Things to know

- **Numbering is allocated under a lock**, so two documents issued at the same moment can never share a number. The counter is the only source of truth.
- **Each order line keeps the VAT rate it was sold at.** Editing or deleting a rate under [VAT rates](/admin/sales/vat-rates), or moving a product to another rate, never changes an existing order or its documents.
- **Shipping and the payment fee take the products' VAT rate.** When all the products carry one rate, shipping and the fee are taxed at that rate; when the order mixes rates, each charge is split over the rates in proportion to the value of the products at each. The PDF and the myDATA submission always show the same figures, to the cent.
- **An order with shipping or a fee but no products left cannot get a receipt**: there is no rate for the charge to follow. Add the products back or correct the order first.
- **Seller details come from Store settings**: legal name, legal form, VAT ID, tax office, address and so on, under the keys whose names start with `INVOICE_SELLER_`. Fill them before the first receipt.
- **myDATA settings** live under Store settings too: `MYDATA_ENABLED`, `MYDATA_AUTO_SUBMIT`, `MYDATA_ENVIRONMENT` (dev or prod), `MYDATA_INVOICE_SERIES_PREFIX`, `MYDATA_CREDIT_SERIES_PREFIX`, `MYDATA_ISSUER_BRANCH`. The credentials from the myDATA developer portal (user ID and subscription key) are not settings: you enter them on your store profile, on the **Invoicing & myDATA** tab (see [Roles & team](/admin/getting-started/roles-and-team)). The subscription key is stored encrypted.
- **Only VAT rates AADE recognises are accepted** on [VAT rates](/admin/sales/vat-rates); a document with an unrecognised rate would be rejected by myDATA.
- **Gift-card amounts are payment, not a discount.** They never reduce the documented value. The sale of a gift card itself is never submitted to myDATA.
- **Order-level discounts** (promotions, loyalty points) are spread across the lines before VAT is computed, so the documents show VAT on what the customer actually paid.
- The PDFs are stored in the store's private file area and are never served from a public URL.
- **Open questions for your accountant**: whether an online shop also needs a fiscal cash register for receipts issued this way, the deadline for issuing a credit document, and how long a registered document can be cancelled. The platform does not decide these for you.

## Related

- [Orders](/admin/sales/orders)
- [VAT rates](/admin/sales/vat-rates)
- [Business customers](/admin/b2b/business-customers)
- [Store settings](/admin/settings/store-settings)
- [Reconciliation](/admin/system/reconciliation)
