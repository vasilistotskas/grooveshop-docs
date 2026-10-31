---
title: Profit
description: See what your store earns after the cost of the products, the payment fees, the shipping you pay and your other expenses, and how much of it is based on costs you have entered.
---

# Profit

<span class="sidebar-path">Sales → Profit</span>

What is left after the costs: your net revenue, minus what the products cost you, minus payment fees and shipping, minus your other expenses. Only the **Owner** role sees this page, the products' cost prices and the expenses. **Admin** and **Staff** do not (see [Roles & team](/admin/getting-started/roles-and-team)).

This is **management profit**, a figure to run the shop by. It is not the profit in your tax return: that comes from your accountant's books, with stock, payroll, depreciation and more that the store does not know.

## What you see

- Totals for the period: **Net revenue**, **Cost of goods sold**, **Gross profit**, **Contribution** and **Operating profit**, and two coverage figures (see below).
- A chart of the operating profit for each period, and a table with one row for each period and a **Total** row.
- A **Year** shortcut, a **From** and **To** date, **Group by period** (quarter, month, week or day), **Compare with** (the same period last year) and **Break down by** (payment method, category, product, channel or VAT rate).
- **Export CSV** and **Export XLSX**, which download the same figures as a spreadsheet.

| Column | What it holds |
|---|---|
| **Net revenue** | What you sold without VAT, shipping and payment fees you charged customers included, less what went back. It is the same figure as **Net turnover** on [Turnover](/admin/sales/turnover). |
| **Cost of goods sold** | What the products you shipped cost you, from the cost price each product had when it was sold, less the cost of returned units you put back in stock. |
| **Gross profit** | **Net revenue** minus **Cost of goods sold**. |
| **Gross margin (%)** | **Gross profit** as a share of **Net revenue**. |
| **Payment fees** | What Viva Wallet and Stripe charged you for the card payments, as they reported it. |
| **Delivery costs** | Your shipping invoices from the couriers (the **Shipping** expenses you entered). |
| **Contribution** | **Gross profit** minus **Payment fees** and **Delivery costs**. |
| **Other expenses** | Your other expenses: marketing, software, rent, payroll and so on. |
| **Operating profit** | **Contribution** minus **Other expenses**. |
| **Cost coverage (%)** | The share of the goods you sold that has a cost price recorded. |
| **Fee coverage (%)** | The share of your card payments, by value, whose provider has reported a fee. |

## Tasks

### Read how the shop is doing
1. Open <span class="sidebar-path">Sales → Profit</span>.
2. Check **Cost coverage** and **Fee coverage** first. Below 100% the profit shown is higher than the real one (see below).
3. Read **Operating profit** for the period, or pick a **Year**.

### Compare with last year
1. Set **Compare with** to **Same period last year** and press **Show**.
2. The table gets two more columns: the operating profit a year earlier and the change in per cent.

### See which products make money
1. Set **Break down by** to **Product** (or **Category**) and press **Show**.
2. A second table lists the biggest groups first, with the cost, the profit and the margin of the sales that have a cost price.

### Send it to your accountant
1. Choose the range and the period.
2. Press **Export CSV** or **Export XLSX**. The spreadsheet has plain numbers with a decimal point and periods like `2026-10`.

## What you must enter for the figures to be complete

| Figure | Where it comes from |
|---|---|
| Cost of goods sold | The **Cost price** of each product, which you type in [Products](/admin/catalog/products). It is copied onto each order line when the product is sold, so changing a cost price later never changes a past sale. |
| Payment fees | Viva Wallet and Stripe report them to the store on their own. For Viva Wallet you must turn on one notification, see below. |
| Delivery costs and other expenses | You enter them in [Expenses](/admin/sales/expenses). |

### Turn on the Viva Wallet fee notification
Viva Wallet tells the store what it charged for each payment only if you subscribe to it. Do this once for your Viva Wallet account:
1. In Viva Wallet, open the account (live, and the demo one if you test), then **Settings → API Access → Webhooks**.
2. Press **Create Webhook**, paste the same address you used for your payment notifications, and press **Verify**.
3. Choose **Transaction Price Calculated** as the event type, tick **Active** and save.

Fees of payments made before you subscribed stay unreported. Stripe needs nothing.

## How the figures are counted

- **Same sales as the turnover.** A sale counts when the order leaves the store, and returns count in the month they were given back.
- **Costs are never guessed.** A product sold without a cost price adds nothing to **Cost of goods sold**: it is not counted as free, it lowers **Cost coverage**. A payment whose fee the provider has not reported adds nothing to **Payment fees** and lowers **Fee coverage**. Until both read 100%, **Gross profit**, **Contribution** and **Operating profit** are higher than the truth. Sales made before you entered cost prices never get one.
- **Returns.** A return you put back in stock gives its cost back in the month you restocked it. A return you did not restock keeps its cost: those goods are lost.
- **Fees and expenses by date.** Payment fees count in the month of the payment, expenses on the date you entered.
- **A breakdown is simpler.** It shows the goods only, before returns, and only the sales that have a cost price. Payment fees and expenses belong to the store, not to a product.

## Things to know

- **The cost price is VAT-free.** Enter what one unit costs you without VAT, in euro, the way **Price** is entered.
- **Nothing here can be edited.** If a figure looks wrong, check the cost price of the product, the order, or the expense.
- **Months follow your store's timezone.**

## Related

- [Expenses](/admin/sales/expenses)
- [Turnover](/admin/sales/turnover)
- [Products](/admin/catalog/products)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Roles & team](/admin/getting-started/roles-and-team)
