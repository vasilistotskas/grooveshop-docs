---
title: Dashboard
description: What the admin's home page shows for the period you choose, and what work is waiting.
---

# Dashboard

<span class="sidebar-path">Dashboard</span>

The first page after you sign in. It shows how the store did over a period and what is waiting for someone to handle. A section for a feature you do not have, or for a page your role cannot open, is not shown.

## What you see

### Top of the page

A greeting with your name and today's date. On the right you pick the period: **7 days**, **30 days** (the starting choice), **13 weeks** or **12 months**. The **New product** button opens an empty product form.

Every period ends today and is compared with the same length of time just before it. For example, **7 days** is today and the six days before.

### Alerts

They appear under the greeting, only when something needs fixing:

- **Your legal pages need an update**: the platform added text to its legal documents. Your pages did not change by themselves, because their text is yours. Open each one to see what to add.
- **Your business's legal details are missing**: the law requires the store to show who is selling. The alert lists what is missing and has a **Fill in details** link.
- **Details needed to issue receipts are missing**: only while myDATA is on. Without the company name, VAT ID and tax office, receipts cannot reach AADE.

Owners and Admins see the last two. Once you fill the details in, the alert goes away.

### Headline figures

Four cards for the period. Each shows the change against the previous period and a small line with its trend.

| Card | What it counts |
|---|---|
| **Revenue** | What the orders sent in the period are worth without VAT, shipping and fees included, less the refunds made in the period: the same figure as [Turnover](/admin/sales/turnover). |
| **Orders** | Every order in the period, whatever its status. |
| **Average order** | Revenue divided by the orders sent in the period. Shows **—** if none was sent. |
| **New customers** | New customer accounts. Underneath, how many of the customers who paid ordered again. |

### Sales chart

One bar per day, week or month, depending on the period. Above the chart you choose **Revenue** or **Orders**.

### Needs attention

Work that is waiting. Each row opens its list already filtered to those records. When nothing is waiting, it reads **All caught up: nothing is waiting for you.**

| Row | What it counts |
|---|---|
| **Orders to process** | Orders in **Pending**. |
| **Orders to follow up** | Orders placed `ORDER_FOLLOW_UP_DAYS` or more calendar days ago that are still **Pending**, **Processing** or **Shipped**: the customer is still waiting for the parcel. |
| **Canceled orders to refund** | Paid, then canceled, and the customer has not had the money back. |
| **COD cash ACS has not paid out** | Cash-on-delivery parcels delivered more than 10 days ago with no payout from ACS. |
| **Stale ACS shipments** | Parcels with no movement for three days, or orders still without a voucher (the courier's shipping label) one day on. |
| **Running low on stock** | Active products with 1 to 9 in stock. |
| **Receipts rejected by myDATA** | Receipts to correct and send again. |
| **Reviews to approve** | Reviews customers cannot see yet. |
| **Blog comments to approve** | Comments readers cannot see yet. |
| **New messages** | Contact-form messages from the last 7 days. |
| **Business accounts to verify** | Business-customer applications waiting for review. |

A row appears only when it has something to count and you can open its list.

### The other cards

- **Latest orders**: the six most recent, whatever the period.
- **Best sellers**: the five products with the most units sent in the period, minus those returned.
- **Checkout funnel**: how many carts started, how many became orders and how many were paid.
- **Where orders come from**: the five biggest order sources, and the rest together as **Other**. See [Order source](/admin/sales/order-source).
- **Store search**: how many searches were made, how many found nothing, and the lists **Found nothing** and **Top searches**.

## Tasks

### See another period

Click **7 days**, **30 days**, **13 weeks** or **12 months**. Every period figure changes. **Latest orders** and **Needs attention** stay the same.

### Clear what is waiting

Click a row in **Needs attention**. Once you have dealt with its records, the row goes away.

### Improve search

Look at the **Found nothing** list. For each word customers search without a result, add the product they want, or put the word in the right product's name.

## Things to know

- Revenue counts an order on the day it was sent, whatever the payment method, so a cash-on-delivery order counts when the parcel ships, not when the courier pays you. A day that is over only changes when a refund is made. See [Turnover](/admin/sales/turnover) for the full rule.
- Order figures update as soon as an order changes, and new customers within 5 minutes. **Store search** and the carts in **Checkout funnel** update within 15 minutes.
- Guest orders (no account) do not count towards customers who ordered again.

## Related

- [Welcome](/admin/)
- [Orders](/admin/sales/orders)
- [Reviews](/admin/catalog/reviews)
- [Messages & feedback](/admin/customers/messages-and-feedback)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
