---
title: Dashboard
description: What every card, chart and queue on the admin landing page shows, which periods they cover, and how often they refresh.
---

# Dashboard

<span class="sidebar-path">Navigation → Dashboard</span>

The dashboard is the landing page after login. It is built by `admin/dashboard.py` and rendered by `core/templates/admin/index.html`. Everyone with access to the admin sees it.

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
- **Reviews awaiting approval**: product reviews in status New.
- **Contact messages**: the latest enquiries.

### Growth

- **Conversion funnel** over the last 30 days: carts created, orders placed, orders paid, and the three percentages between them.
- **Repeat customers**: paying customers with two or more paid orders in the last 30 days, as a share of all paying customers in that window. Guest orders are excluded.
- **Top products** by all-time view count, with current stock.

### Search insights

Built from the storefront search log over the last 30 days:

- total searches, share of searches that never returned a result, clicks and click-through rate (shown as a dash until click tracking has recorded anything);
- the ten most frequent queries and the ten most frequent zero-result queries (fragments shorter than three characters are ignored);
- a 14-day search volume chart.

Use the zero-result table to spot products people look for under a name you do not use.

### Warnings (platform operators only)

Platform superusers additionally see: missing seller identity fields (**Company name**, **VAT ID (ΑΦΜ)**, **Tax office (ΔΟΥ)**) with a **Fix in Settings** link, myDATA credential and rejected-invoice warnings, up to ten products with stock between 1 and 9, and the number of failed background tasks in the last 24 hours. If you are an Owner and want the seller identity checked, open [Store settings](/admin/settings/store-settings) and search `INVOICE_SELLER_`.

## Things to know

- Everything except the warnings block is cached for five minutes and also refreshed whenever an order, payment or stock write happens (`admin/signals.py`). A figure can therefore lag a few minutes behind a manual edit.
- Revenue counts **paid** orders only. Cash-on-delivery orders join the revenue figure when the courier's payout is reconciled, which is days after delivery. See [Reconciliation](/admin/system/reconciliation).
- The **Average order value** is over all orders of the period, paid or not.
- The low-stock badge on **Catalog → Products** in the sidebar uses the same "stock between 1 and 9" band as the warning list.

## Related

- [Orders](/admin/sales/orders)
- [Reviews](/admin/catalog/reviews)
- [Contact messages & feedback](/admin/sales/contact-and-feedback)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
