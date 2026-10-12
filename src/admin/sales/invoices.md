---
title: Invoices
description: The invoice archive, the gapless per-year numbering and its counter, when an invoice is generated, invoice-at-checkout for businesses, download and the myDATA (AADE) submission.
---

# Invoices

<span class="sidebar-path">Sales → Invoices</span>

An invoice (Τιμολόγιο) is a legal document with a sequential number, so this screen is an archive: you can browse, search and download, but never edit or add. Invoices are created from the order page. The number sequence is kept by a per-year counter that superusers can inspect under <span class="sidebar-path">System → Reconciliation → Invoice Counter</span>.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Invoice Number** | `INV-YYYY-NNNNNN`, sequential within the year, no gaps. |
| **Order** | Link to the order. |
| **Issue Date** | Fiscal date of issue, fixed once rendered. |
| **Total** | Total including VAT. |
| **Currency** | Always the store currency. |
| **Document** | **Download** when the PDF exists, **Pending** when the row was written but the PDF has not been rendered. |
| **myDATA** | The AADE submission state, with the MARK in brackets once assigned. |

Filters: issue date range, **Has PDF** (Rendered / Pending render), **myDATA Status**. Search: invoice number, order ID, customer email, first and last name, myDATA MARK and UID. A date drill-down by issue date sits above the table.

### The invoice page

Read-only, in four blocks: **Invoice** (number, issue date, order link, document, timestamps), **Totals** (subtotal excluding VAT, total VAT, total, currency and the **VAT breakdown**, one row per rate with net, VAT and gross, shipping and the payment fee included), **Snapshots** (the seller and buyer details exactly as they were at issue time) and **myDATA (AADE)** (status, invoice type, series, serial number, UID, MARK, QR URL, authentication code, cancellation MARK, last error code and message, submitted and confirmed timestamps).

Only superusers can delete an invoice, and doing so leaves a gap in the sequence; it is not something to do casually.

## myDATA statuses

| Status | Meaning |
|---|---|
| **Not sent** | myDATA is off, or this invoice was never submitted. The resting state for stores without the integration. |
| **Pending submission** | Queued for sending; nothing has gone to AADE yet. |
| **Submitted** | Sent, waiting for AADE. |
| **Confirmed (MARK assigned)** | Registered. The PDF was regenerated with the MARK and the QR code. |
| **Rejected** | AADE returned a validation error. The customer's PDF is still the pre-submission version. Fix the master data (seller details, VAT rates, buyer VAT ID) and resend from the order page. |
| **Canceled in myDATA** | A cancellation succeeded; the cancellation MARK is on the row. |

## When an invoice is created

- **Automatically**, when an order whose **Document type** is **Invoice** reaches **Completed**. The PDF is rendered in the customer's order language and, once ready, emailed to the buyer. If myDATA is enabled with auto-submit, the invoice is submitted first and the email goes out after the MARK is on the PDF.
- **Manually**, from the order page, **Invoicing & myDATA → Generate invoice**. This works for any order; for a Receipt order you get a warning and the invoice is generated anyway as an explicit override.

Generation is idempotent: asking again for an order that already has a rendered invoice returns the same invoice and consumes no number.

## Invoice at checkout for businesses

At checkout the shopper chooses **Receipt** or **Invoice**. Choosing Invoice requires a Greek ΑΦΜ of nine digits that passes its check digit, an EL or GR prefix being stripped for you, plus company name, tax office and business activity. The registered address is optional: left blank it is copied from the delivery address, and a half-filled one is refused rather than mixed with the delivery address. All of it is snapshotted onto the order in the **Billing / Invoice** tab. The option is controlled by `B2B_INVOICING_ENABLED` (on by default) under [Store settings](/admin/settings/store-settings) and does not depend on the wholesale program: any shopper can ask for an invoice. Approved business customers have these details on their profile; see [Business customers](/admin/b2b/business-customers).

## Tasks

### Download or print an invoice
1. Find it here by number, order ID or customer, or open the order and look at the invoice row.
2. Click **Download** (list) or **Download PDF** (order page). The file streams through the admin login; there is no public link.

Customers download their own copy from their account or from the invoice email.

### Fix a wrong invoice PDF
1. Correct the source: the seller details under Store settings (every key whose name starts with `INVOICE_SELLER_`), the order's billing fields, or the VAT rate of one of its lines (see the next task). Changing a product's VAT rate does not change an order that was already placed.
2. On the order page choose **Invoicing & myDATA → Regenerate invoice (same number)**. The number and issue date are kept; the PDF, the snapshots and the totals are recomputed.
3. If the invoice was already confirmed in myDATA, a regenerated PDF does not change what AADE holds, and its totals stay the ones AADE registered. Use **Cancel invoice in myDATA** while the cancellation window is open, or issue a credit note through your accountant.

### Correct the VAT rate of an order line
1. Open the order and, in its order items, open the line from its row.
2. Under **Order Item Information**, correct **VAT Rate** and save. Only the rates myDATA accepts are allowed.
3. Back on the order, choose **Invoicing & myDATA → Regenerate invoice (same number)**.

Once the order's invoice has a myDATA MARK, **VAT Rate** is shown read-only: the registered document can no longer change, so cancel it in myDATA or issue a credit note instead.

### Submit or cancel in myDATA by hand
1. On the order page open **Invoicing & myDATA**.
2. **Send invoice to myDATA** queues the submission (the invoice must already be rendered; the button tells you if myDATA is not configured). Refresh this list to see the status change and the MARK.
3. **Cancel invoice in myDATA** queues a cancellation for an invoice that has a MARK.

### Reserve invoice numbers
Superusers only. Under <span class="sidebar-path">System → Reconciliation → Invoice Counter</span> there is one row per year with **Year** and **Next Number**. Raising Next Number reserves the numbers below it, for example for invoices imported from a previous system. Lowering it produces duplicates and is never right. See [Reconciliation](/admin/system/reconciliation).

## Things to know

- **Numbering is allocated under a lock**, so two invoices generated at the same moment can never share a number. The counter is the only source of truth; the count of invoices in the archive is not.
- **Each order line keeps the VAT rate it was sold at.** Editing or deleting a rate under [VAT rates](/admin/sales/vat-rates), or moving a product to another rate, never changes an existing order or its invoice. Regenerating an invoice recomputes it from the order's lines at their own rates; once the invoice has a myDATA MARK, regenerating keeps the totals AADE registered.
- **Shipping and the payment fee take the products' VAT rate.** When all the products in the order carry one rate, shipping and the fee are taxed at that rate. When the order mixes rates, each charge is split over the rates in proportion to the value of the products at each rate. The PDF lists shipping and the fee with VAT included above the net subtotal, and their VAT is part of the VAT breakdown. The PDF and the myDATA submission always show the same figures, to the cent.
- **An order with shipping or a fee but no products left cannot be invoiced**: there is no rate for the charge to follow. The generate action shows the error; add the products back or correct the order first.
- **Seller details come from Store settings**, not from the store record the platform team keeps: legal name, legal form, VAT ID, tax office, address and so on, under the keys whose names start with `INVOICE_SELLER_`. Fill them before the first invoice.
- **myDATA settings** live under Store settings too: `MYDATA_ENABLED`, `MYDATA_AUTO_SUBMIT`, `MYDATA_ENVIRONMENT` (dev or prod), `MYDATA_INVOICE_SERIES_PREFIX`, `MYDATA_ISSUER_BRANCH`. The credentials from the myDATA developer portal (user ID and subscription key) are not settings: you enter them on your store profile, on the **Invoicing & myDATA** tab (see [Roles & team](/admin/getting-started/roles-and-team) for where the profile lives). The subscription key is stored encrypted. Submission is refused while the integration is off or credentials are missing.
- **Only VAT rates AADE recognises are accepted** on [VAT rates](/admin/sales/vat-rates); an invoice with an unrecognised rate would be rejected by myDATA.
- **Gift-card amounts are payment, not a discount.** They never reduce the invoiced value; the invoice shows the full goods value and VAT. The sale of a gift card itself is never submitted to myDATA.
- **Order-level discounts** (promotions, loyalty points) are spread across the lines before VAT is computed, so the invoice shows VAT on what the customer actually paid.
- The invoice PDF is stored in the store's private file area and is never served from a public URL.

## Related

- [Orders](/admin/sales/orders)
- [VAT rates](/admin/sales/vat-rates)
- [Business customers](/admin/b2b/business-customers)
- [Store settings](/admin/settings/store-settings)
- [Reconciliation](/admin/system/reconciliation)
