---
title: Dashboard
description: What every card, chart, list and warning on the admin landing page shows, which period each covers, and how quickly it follows your edits.
---

# Dashboard

<span class="sidebar-path">Navigation → Dashboard</span>

The dashboard is the landing page after login. Everyone with access to the admin sees it; a few blocks are shown to platform operators only, as noted below.

## What you see

### Shortcuts

Three buttons at the top: **New product**, **Orders** and **Customers**.

### Warnings

Messages that need someone's attention appear above the figures, and only when there is something to do:

- **Your legal pages need an update**: the platform added text to its legal documents, and these pages were not changed for you because their text is yours. Each page is listed with a link; open it to see the text to add. Shown to anyone who may edit content pages.
- **Your business's legal details are missing**: the law requires your website to show who is selling, and some of those details are still empty (company name, legal form, GEMI number, VAT ID, address, contact email). The missing ones are listed, with an **Fill in details** link. A reminder, not an error: nothing stops working. Shown to Owners and Admins, who can change the store settings.
- **Details needed to issue receipts are missing**: shown only while myDATA is on, when the company name, **VAT ID (ΑΦΜ)** or **Tax office (ΔΟΥ)** is empty. Receipts cannot be submitted to AADE without them, so this one is red. It has a **Fill in details** link and is shown to the same people.
- **myDATA** (platform operators): credentials missing while myDATA is on, invoices rejected in the last 7 days, or a reminder that submissions still go to the AADE sandbox.

These are checked on every page load, so fixing a setting clears its warning at once.

### Key figures

| Card | Meaning |
|---|---|
| **Revenue** | Sum of paid orders (payment status Completed). A switch offers **7d**, **1m**, **3m** and **1y**, and the browser remembers your choice. A trend badge compares each period with the one before it of the same length; no badge means there was nothing to compare against. |
| **Pending orders** | Orders currently in status Pending. The card opens the order list filtered to them. |
| **New customers** | Accounts created in the last 30 days, with today's count alongside. |
| **Average order value** | Average over the paid orders of the last 30 days. |

### Charts

- **Revenue and orders, last 14 days.** Bars are orders per day, the line is paid revenue per day.
- **Order status.** Every order by its current status.
- **Orders by source, last 30 days.** The orders of the last 30 days per [order source](/admin/sales/orders#order-source): the six biggest sources by name, the rest together as **Other**. Orders placed before the store recorded a source are left out.

A chart with no data says so in words instead of drawing an empty frame.

### Lists

Each with a link to the full list:

- **Recent orders**: the six newest orders with status and amount.
- **Reviews awaiting approval**: up to five product reviews in status New.
- **Contact messages**: the five latest enquiries.

### Growth

- **Conversion** over the last 30 days: **Carts started**, **Orders placed** and **Paid**. A cart turns into its order when the order is placed, so carts started means the orders placed plus the carts that still hold items; a visitor who added nothing does not count.
- **Repeat customers**: paying customers with two or more paid orders in the last 30 days, as a share of all paying customers in that window. Guest orders are left out.
- **Most viewed products**: the five active products with the most views of all time.

### Running low (platform operators)

Up to ten active products with fewer than ten items left in stock (and at least one). The number beside **Catalog → Products** in the sidebar counts the same band.

### Search

From the storefront's search log, last 30 days:

- **Searches**, **Found nothing** (the share of searches that returned nothing) and **Result clicks** (shown as a dash until click tracking has recorded anything);
- **Search volume** per day over the last 14 days;
- **Top searches** and **Searches that found nothing**, ten each.

Fragments shorter than three characters are ignored, because search-as-you-type records a row per keystroke. A search counts as "found nothing" only if it never returned a result.

Use **Searches that found nothing** to spot products people look for under a name you do not use.

## Things to know

- Each figure is kept for a few minutes (the conversion, repeat-customer, product and search blocks for fifteen), and a figure is refreshed as soon as a record it counts is saved or deleted — an order, a review, a contact message. An edit therefore shows on the next load; only counts that nothing invalidates, such as new customers or open carts, can lag by a few minutes.
- Revenue counts **paid** orders only. Cash-on-delivery orders join it when the courier's payout is reconciled, days after delivery. See [Reconciliation](/admin/system/reconciliation).
- The numbers beside sidebar entries (pending orders, reviews to approve, new messages and similar) refresh at least every minute.
- There is no failed-job counter here. Failed background jobs are listed on the platform console, because one list covers every store. See [Background jobs](/admin/system/background-jobs).

## Related

- [Orders](/admin/sales/orders)
- [Reviews](/admin/catalog/reviews)
- [Contact messages & feedback](/admin/sales/contact-and-feedback)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
