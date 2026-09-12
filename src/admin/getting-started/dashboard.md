---
title: Dashboard
description: What every card, chart and queue on the admin landing page shows, which periods they cover, and how often they refresh.
---

# Dashboard

<span class="sidebar-path">Navigation → Dashboard</span>

The dashboard is the landing page after login. Everyone with access to the admin sees it.

## What you see

### Quick actions

Three buttons at the top: **New Product**, **Pending Orders** (the orders list filtered to status Pending) and **Customers**.

### Key figures

| Card | Meaning |
|---|---|
| **Revenue** | Sum of paid amounts of orders with payment status Completed. A switch offers **7d**, **1m**, **3m** and **1y**. Each period shows a trend badge against the immediately preceding period of the same length; no badge means there was nothing to compare against. |
| **Pending orders** | Orders currently in status Pending. |
| **New customers** | Accounts created in the last 30 days, with today's count alongside. |
| **Average order value** | Average paid amount over all orders of the last 30 days. |

### Charts

- **Orders and revenue, last 14 days.** Bars are orders per day, the line is paid revenue per day in euro.
- **Order status distribution.** A doughnut with the count of orders per status (Pending, Processing, Shipped, Delivered, Completed, Canceled, Returned, Refunded).

### Queues

Three lists for triage, each with a **View all** link:

- **Recent orders**: the six newest orders with status and amount.
- **Reviews awaiting approval**: up to five product reviews in status New.
- **Contact messages**: the five latest enquiries.

### Growth

- **Conversion funnel** over the last 30 days: carts created, orders placed, orders paid, and the three percentages between them.
- **Repeat customers**: paying customers with two or more paid orders in the last 30 days, as a share of all paying customers in that window. Guest orders are excluded.
- **Top products**: the five most-viewed active products, by all-time view count, with current stock.

### Search insights

Built from the storefront search log over the last 30 days:

- total searches; the share of them that never returned a result; clicks and click-through rate, shown as a dash until click tracking has recorded anything;
- the ten most frequent queries and the ten most frequent zero-result queries;
- a 14-day search volume chart.

Fragments shorter than three characters are ignored in the two tables and in the zero-result share, because search-as-you-type records one row per keystroke. A query counts as zero-result only if it never returned anything, not merely when one of its lanes came back empty.

Use the zero-result table to spot products people look for under a name you do not use.

### Warnings (platform operators only)

Platform superusers additionally see: missing seller identity fields (**Company name**, **VAT ID (ΑΦΜ)**, **Tax office (ΔΟΥ)**) with a **Fix in Settings** link, myDATA credential and rejected-invoice warnings, and up to ten active products with stock between 1 and 9. If you are an Owner and want the seller identity checked, open [Store settings](/admin/settings/store-settings) and search `INVOICE_SELLER_`.

## Things to know

- Everything except the warnings block is cached for five minutes. It is also refreshed the moment an order, invoice, product, review, customer account or contact message is saved or deleted, so a figure rarely lags a manual edit by more than a few minutes. The warnings block is recomputed on every page load, so fixing a missing setting shows immediately.
- Revenue counts **paid** orders only. Cash-on-delivery orders join the revenue figure when the courier's payout is reconciled, which is days after delivery. See [Reconciliation](/admin/system/reconciliation).
- The **Average order value** is over all orders of the period, paid or not.
- The low-stock badge on **Catalog → Products** in the sidebar uses the same "stock between 1 and 9" band as the warning list.
- There is no failed-job counter here. The count of failed background jobs lives on the platform console's own dashboard, because one list covers every store. See [Background jobs](/admin/system/background-jobs).

## Related

- [Orders](/admin/sales/orders)
- [Reviews](/admin/catalog/reviews)
- [Contact messages & feedback](/admin/sales/contact-and-feedback)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
