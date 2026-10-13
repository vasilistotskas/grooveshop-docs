---
title: Dashboard
description: What the admin landing page shows for the period you pick, what is waiting for someone, and how quickly each figure follows your edits.
---

# Dashboard

<span class="sidebar-path">Dashboard</span>

The dashboard is the landing page after login and the first entry in the sidebar. It answers three questions: how the store did over a period, what is waiting for someone right now, and where shoppers come from and what they search for. Everyone with access to the admin sees it; a block for a feature your store does not use, or a link to a page your role cannot open, is simply left out.

## What you see

### Header and period

At the top, a greeting with your first name (good morning, afternoon or evening by the store's time) and today's date, followed by the period on display.

On the right, the period switch: **7 days**, **30 days**, **13 weeks** and **12 months**. The dashboard opens on **30 days**. Every figure on the page that covers a period follows this switch, and the choice is kept in the page address (`?period=`), so a link you share or bookmark opens the same view and the browser's back button works.

A period is made of whole days, weeks or months ending with the current one, in the store's time zone: **7 days** is today and the six days before it, **13 weeks** is this week (from Monday) and the twelve before it, **12 months** is this month and the eleven before it. Each period is compared with the stretch of the same length just before it.

Next to the switch, **New product** opens an empty product form. It is shown to anyone who may add products.

### Warnings

Messages that need someone's attention appear below the header, and only when there is something to do:

- **Your legal pages need an update**: the platform added text to its legal documents, and these pages were not changed for you because their text is yours. Each page is listed with a link; open it to see the text to add. Shown to anyone who may edit content pages.
- **Your business's legal details are missing**: the law requires your website to show who is selling, and some of those details are still empty (company name, legal form, GEMI number, VAT ID, address, contact email). The missing ones are listed, with a **Fill in details** link. A reminder, not an error: nothing stops working. Shown to Owners and Admins, who can change the store settings.
- **Details needed to issue receipts are missing**: shown only while myDATA is on, when the company name, **VAT ID (ΑΦΜ)** or **Tax office (ΔΟΥ)** is empty. Receipts cannot be submitted to AADE without them, so this one is red. It has a **Fill in details** link and is shown to the same people.
- **myDATA** (platform operators): credentials missing while myDATA is on, or a reminder that submissions still go to the AADE sandbox. Receipts that myDATA rejected are not a warning here; they are a line under **Needs attention**, below.

These are checked on every page load, so fixing a setting clears its warning at once.

### Headline figures

Four cards for the period on display. Each shows the figure, its change against the period before as a percentage (rising or falling), and a small line of how it moved across the period. No percentage means the period before had nothing to compare against.

| Card | Meaning |
|---|---|
| **Revenue** | Money from paid orders (payment status Completed) placed in the period. Opens the order list filtered to paid orders. |
| **Orders** | Every order placed in the period, whatever its status. Opens the order list. |
| **Average order** | Revenue divided by the number of paid orders. With no paid order in the period it shows **—** and no percentage, since there is nothing to average. |
| **New customers** | Customer accounts created in the period. Underneath, the share of paying customers who ordered again: customers with two or more paid orders in the period, out of all customers with at least one. Guest orders are left out, since a guest has no account to come back to. Opens the customer list. |

### Sales chart

One bar per day (for **7 days** and **30 days**), per week (**13 weeks**) or per month (**12 months**). A switch at the top of the card picks the measure: **Revenue** (paid revenue per bucket, the default) or **Orders** (orders placed per bucket). This choice is kept in the address too (`?metric=`). The bars always add up to the headline figure for the same period.

### Needs attention

Work that is waiting, each line opening the list it counts, already filtered to exactly those records. **New messages** counts the last 7 days, says **In the last 7 days** under its name, and opens the messages list filtered to the same 7 days.

| Line | What it counts | Shown when |
|---|---|---|
| **Orders to process** | Orders in status Pending. | always |
| **Running low on stock** | Active products with fewer than 10 left in stock (and at least one). | always |
| **Receipts rejected by myDATA** | Every receipt still marked Rejected, however old. A rejection does not go away on its own: the line stays until someone corrects the details and sends the receipt again, or cancels it. It reads **Correct the details and send them again** and opens the receipts list filtered to the rejected ones. See [Receipts and credit documents](/admin/sales/receipts). | myDATA is on |
| **Reviews to approve** | Product reviews in status New, hidden from shoppers until approved. | product reviews are on |
| **Blog comments to approve** | Comments not approved yet, hidden from readers until approved. | the blog is on your plan and blog comments are on |
| **New messages** | Contact-form messages received in the last 7 days. | always |
| **Business accounts to verify** | Wholesale applications waiting for review. | wholesale is on your plan and switched on |

A line appears only when its count is above zero and you may open the list it leads to. With nothing waiting, the card says **All caught up: nothing is waiting for you.** Apart from rejected receipts, the same numbers appear beside the matching sidebar entries; see [Welcome](/admin/).

### Latest orders

The six newest orders, whatever the period: order number, customer email (or **Guest**), when it was placed, status and total. A link opens the full order list.

### Best sellers

The five products with the most units paid for in the period: units from orders whose payment is Completed, minus any units refunded. Each name opens the product.

### Checkout funnel

Three bars for the period: **Carts started**, **Orders placed** and **Paid**, each as a share of the carts started, and below them the share of **Carts that ended in a paid order**. A cart turns into its order when the order is placed, so carts started means the orders placed plus the carts that still hold items; a visitor who added nothing does not count.

### Where orders come from

The orders of the period per [order source](/admin/sales/orders#order-source), as shares: the five biggest sources by name, the rest together as **Other**. Orders placed before the store recorded a source are left out rather than counted under a source they did not have.

### Store search

From the storefront's search log, for the period:

- **Searches**: how many searches shoppers ran.
- **Found nothing**: the share of searches that returned nothing.
- **Clicked a result**: clicks on a search result, as a share of the searches. It shows a dash until click tracking has recorded anything, so an unmeasured zero is never mistaken for "nobody clicks".

Below the figures a switch shows one of two lists, five searches each: **Found nothing**, the searches to fix with synonyms, products or content, and **Top searches**, what shoppers look for most. Fragments shorter than three characters are ignored, because search-as-you-type records a row per keystroke, and a search counts as "found nothing" only if it never returned a result in the period.

A card with nothing to show for the period says so in words instead of drawing an empty frame.

## Tasks

### Look at another period

Click **7 days**, **30 days**, **13 weeks** or **12 months** at the top. Every period figure on the page changes together; **Latest orders** and **Needs attention** are not tied to a period and stay as they are.

### Switch the chart between revenue and orders

Click **Revenue** or **Orders** at the top of the sales chart.

### Work through what is waiting

Click a line under **Needs attention**. It opens the list filtered to exactly the records it counts; once they are handled, the line disappears.

## Things to know

- Revenue counts **paid** orders only, on the day each order was placed. A cash-on-delivery order is added to the day it was placed once the courier's payout is reconciled, days after delivery, so recent days can grow after the fact. See [Reconciliation](/admin/system/reconciliation).
- Each figure is kept for a short while: **Needs attention** for one minute; the headline figures, the sales chart and the latest orders for five minutes; best sellers, the funnel, order sources and search for fifteen. A figure is cleared at once when a record it counts is saved or deleted — an order, a receipt, a product, a review, a blog comment, a contact message, a business account — so an edit shows on the next load. Counts that nothing clears, such as new customers, open carts and the search log, can lag by up to that time.
- A widget for a feature your plan does not include, or that you have switched off in [Store settings](/admin/settings/store-settings), is not drawn at all.
- There is no failed-job counter here. Failed background jobs are listed on the platform console, because one list covers every store. See [Background jobs](/admin/system/background-jobs).

## Related

- [Welcome](/admin/)
- [Orders](/admin/sales/orders)
- [Products](/admin/catalog/products)
- [Reviews](/admin/catalog/reviews)
- [Contact messages & feedback](/admin/sales/contact-and-feedback)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
