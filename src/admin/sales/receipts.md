---
title: Receipts and credit documents
description: The retail receipts and credit documents the platform can issue through AADE's myDATA, how to download, correct or cancel one, and how to issue an invoice for a business customer in timologio.
---

# Receipts and credit documents

<span class="sidebar-path">Sales → Receipts</span> · <span class="sidebar-path">Sales → Credit Documents</span>

By default you issue your retail receipts in your own fiscal device (ΦΗΜ) or e-invoicing provider. Then these two entries are not in the sidebar, and an order has no receipt or credit document tab, because there is nothing to show. In that case this page concerns you only for [invoices to business customers](#issue-an-invoice-for-a-business-customer).

The entries appear when myDATA is switched on in Store Settings, even before the platform is ready to issue, so you can see where receipts will land. A receipt or credit document that already exists keeps its entry after myDATA is switched off, marked **Off**.

The platform issues receipts itself, through AADE's myDATA, only for a business exempt from the fiscal device. Then it issues:

- the **receipt** when an order ships;
- a **credit document** (the retail credit note) for every refund made after the receipt.

Both lists are archives: you can browse, search and download, never edit or add.

## What you see

### The receipts list

| Column | What it shows |
|---|---|
| **Invoice Number** | The receipt number, in sequence within the year, with no gaps. The legal identifier is the MARK AADE assigns. |
| **Order** | A link to the order. |
| **Issue Date** | The date of the receipt. |
| **Total** | The total with VAT. |
| **Document** | **Download** for the PDF, or **Pending** while it is being prepared. |
| **myDATA** | Where the receipt stands with AADE, with the MARK once assigned. |

Filters: issue date, **Has PDF**, **myDATA Status**. The search box finds a receipt by number, order number, customer email or name, or MARK.

The receipt page shows the totals with a **VAT Breakdown** per rate (shipping and the payment fee included), the seller and buyer details as they were on the day, and the **myDATA (AADE)** block.

### The credit documents list

The same columns, with **Credit Number** and **Reason**. The reason is **Refund** for a document issued for one refund. It is **Order closed without a sale** for the single document that credits what is left of the receipt, for example when a cash-on-delivery parcel comes back.

### myDATA statuses

| Status | Meaning |
|---|---|
| **Not sent** | Not submitted yet. |
| **Pending submission** | Waiting to be sent. |
| **Submitted** | Sent, waiting for AADE's answer. |
| **Confirmed (MARK assigned)** | Registered. The PDF carries the MARK and the QR code. |
| **Rejected** | AADE refused it. Fix the cause and resend it from the order. Rejected receipts are counted on the [Dashboard](/admin/getting-started/dashboard) as **Receipts rejected by myDATA**. |
| **Canceled in myDATA** | Cancelled as issued in error. |

The customer is emailed a receipt or credit document only once AADE has registered it.

## Tasks

### Download a receipt or credit document
1. Find it here by number, order number or customer, or open the order: its **Receipts** and **Retail Credit Documents** tabs list them.
2. Click **Download** (list) or **Download PDF** (order page). There is no public link to the file.

Customers receive their copy by email, and can download the receipt from their account once AADE has registered it.

### Issue an invoice for a business customer
At checkout the customer chooses **Receipt** or **Invoice**. For an invoice they give a Greek VAT number (ΑΦΜ), company name, tax office and business activity. The platform does not issue invoices: you issue it in AADE's free timologio app.

1. Open the order, tab **Billing / Invoice**. **To issue in timologio** lists the buyer's details and one line per VAT rate with net, VAT and total.
2. Issue the invoice in timologio with those details.
3. Back on the tab, fill in **Invoice number (timologio)** and **Invoice MARK (timologio)**, and save. The order's **Invoice** card then shows the number.
4. If you later issue a credit invoice, record **Credit invoice number (timologio)** and **Credit invoice MARK (timologio)** the same way.

The invoice option at checkout can be switched off with `B2B_INVOICING_ENABLED` under <span class="sidebar-path">Settings → Store Settings</span> (on by default).

### Fix a wrong receipt PDF
1. Correct the cause: the seller details under **Store Settings** (the keys that start with `INVOICE_SELLER_`), or the VAT rate of an order line (next task).
2. On the order, choose **Invoicing & myDATA → Regenerate receipt (same number)**. The number and date stay; the PDF is made again.
3. If AADE has already registered the receipt, its figures cannot change. A wrong registered receipt is corrected by a credit document, or cancelled only if it never reached the customer (see below).

### Correct the VAT rate of an order line
1. Open the order and, in its products, open the line.
2. Under **Order Item Information**, correct **VAT Rate** and save.
3. Back on the order, choose **Invoicing & myDATA → Regenerate receipt (same number)**.

Once the receipt has a MARK, **VAT Rate** is read-only.

### Resend to myDATA
1. On the order, open **Invoicing & myDATA**.
2. **Send receipt to myDATA** resends a receipt that was rejected or never answered. **Issue credit documents (myDATA)** does the same for the credit documents.
3. Refresh the list to see the new status and the MARK.

### Cancel a document issued in error
Use **Cancel receipt in myDATA (issued in error)** on the order, or **Cancel in myDATA (issued in error)** on the credit documents list. AADE allows it only for a document that never reached the customer. The platform emails each document as soon as AADE registers it, so in practice the right tool is almost always a credit document.

## When documents are issued

- **The receipt**, once a receipt order **ships**, cash on delivery included. It is issued once per order and emailed to the customer in their language.
- **Net of earlier refunds.** If money went back before the receipt (to the card, or onto gift cards and points), the receipt shows only what was finally paid. If everything went back, no receipt is issued.
- **A credit document for each refund after the receipt**, once the receipt is registered. It covers exactly what went back: money to the card, cash you paid back, or value returned onto gift cards and points. A partial refund is split over the VAT rates in proportion. Together the credit documents never exceed the receipt.
- **No credit document for a chargeback**: the bank took the money back, you did not undo the sale.
- **One closing credit document** when an order ends without a sale after its receipt, such as a cash-on-delivery parcel that came back.
- **Orders cancelled before shipping** never get a receipt.

With `MYDATA_AUTO_SUBMIT` off, nothing is issued on its own: use **Issue receipt (myDATA)** and **Issue credit documents (myDATA)** on the order. Pressing them twice never issues twice.

## Set up issuing through myDATA

Only for a business exempt from the fiscal device. Ask your accountant first: selling online does not exempt a business on its own.

1. Fill in the seller details under **Store Settings**: the keys that start with `INVOICE_SELLER_` (legal name, VAT number, tax office, address).
2. Enter your myDATA user ID and subscription key on <span class="sidebar-path">Settings → Store Profile</span>, tab **Invoicing & myDATA**.
3. In **Store Settings**, write the legal ground of your exemption in `MYDATA_FHM_EXEMPTION_GROUND`, as your accountant confirms it.
4. Switch on `MYDATA_ENABLED`, and `MYDATA_AUTO_SUBMIT` if you want documents issued without pressing a button.
5. `MYDATA_ENVIRONMENT` is `dev` (AADE's test system) by default. Set it to `prod` when you are ready to issue real tax documents.

Until myDATA is switched on, with the legal ground and the user ID and key in place, the order page shows no **Invoicing & myDATA** menu. Its **Receipt** card then reads **Issued by the store outside the platform**.

## Things to know

- **Each order line keeps the VAT rate it was sold at.** Changing a rate under [VAT rates](/admin/settings/vat-rates), or a product's rate, never changes an existing order or its documents.
- **Shipping and the payment fee follow the products' VAT rate.** When the order mixes rates, they are split over the rates in proportion to the products.
- **Gift cards are a way of paying, not a discount.** They do not reduce the receipt. The sale of a gift card itself is never sent to myDATA.
- **Discounts from promotions and points** are spread over the lines before VAT, so the receipt shows VAT on what the customer actually paid.
- **Receipt and credit numbers** run in their own yearly sequences. To reserve numbers, [contact support](/admin/help/contact-support).

## Related

- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [VAT rates](/admin/settings/vat-rates)
- [Business customers](/admin/customers/business-customers)
- [Store settings](/admin/settings/store-settings)
- [Store profile](/admin/settings/store-profile)
