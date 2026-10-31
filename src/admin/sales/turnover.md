---
title: Turnover
description: Read your turnover for any period, by quarter, month, week or day, against last year, broken down by payment method, category, product, channel or VAT rate, and download it as a CSV or Excel file.
---

# Turnover

<span class="sidebar-path">Sales → Turnover</span>

The figure your accountant asks for: what you sold without VAT, shipping and payment fees included, less the money you gave back. Only the **Admin** and **Owner** roles see this page; **Staff** do not (see [Roles & team](/admin/getting-started/roles-and-team)).

## What you see

- A filter bar: **From** and **To** dates, **Group by period** (quarter, month, week or day), **Compare with** (nothing, or the same period last year) and **Break down by** (payment method, category, product, channel or VAT rate). The page opens on this year, by month, against last year.
- A **Year** shortcut for each year since your first sale.
- Eight totals for the range: **Net turnover**, **Returns**, **VAT**, **Gross**, **Orders**, **Average order**, **Units sold** and **Awaiting collection**. When you compare, **Net turnover** also shows the change against the same period last year.
- A bar chart of **Net turnover** for each period, with last year's bar beside it when you compare.
- A table with one row for each period and a **Total** row. A period with no sales shows zeros.
- When you break down, a second table with the biggest groups first.
- **Export CSV** and **Export XLSX**, which download what you see as a file for your spreadsheet.

| Column | What it holds |
|---|---|
| **Goods** | What the products sold in the period are worth, without VAT. |
| **Shipping** | The shipping you charged, without VAT. |
| **Fees** | The payment fees you charged (for example cash on delivery), without VAT. |
| **Returns** | What went back to customers in the period, without VAT. |
| **Net turnover** | **Goods** plus **Shipping** plus **Fees**, minus **Returns**. It is negative in a period when more went back than was sold. |
| **VAT** | The VAT on that turnover, after the VAT of returns. |
| **Gross** | **Net turnover** plus **VAT**: what customers paid, after returns. |
| **Orders** | The number of orders sold in the period. |
| **Units** | The number of items sold in the period. |
| **Average order** | What a customer pays on average for an order, VAT and shipping included. |
| **Awaiting collection** | What customers still owe on orders you have already sent, usually cash on delivery on its way to you. |
| **Net turnover last year**, **Change (%)** | Shown when you compare: the same period a year earlier, and the change. |

## Tasks

### Read a month or a quarter
1. Open <span class="sidebar-path">Sales → Turnover</span>.
2. Pick the **Year** shortcut, or set **From** and **To**, and choose **Group by period**.
3. Find the period in the table. **Net turnover** is the figure to report, and **VAT** next to it is the VAT on it.

### Compare with last year
1. Set **Compare with** to **Same period last year** and press **Show**.
2. Read **Net turnover last year** and **Change (%)** in the table, and the paler bars in the chart.

### See what sells through each channel
1. Set **Break down by** to **Payment method**, **Category**, **Product**, **Channel** or **VAT rate** and press **Show**.
2. Read the second table. It shows sales before returns, biggest first. For a product or a category it counts the goods only, because shipping and fees belong to the order, not to one product.

### Send the figures to your accountant
1. Set the range and the periods.
2. Press **Export CSV** or **Export XLSX**. The file is named after the range.
3. Open it in your spreadsheet. Amounts are plain numbers with a decimal point and periods read like `2026-10`, so the file imports cleanly. With a breakdown, the file lists every group, period by period, not only the biggest.

## How the figures are counted

- **When an order counts.** An order is a sale in the period it **left your store**, whatever the payment method. A cash-on-delivery order counts when the parcel is sent, not when the courier pays you. An order that is paid but still being prepared is not a sale yet. An order cancelled before it was sent never is.
- **Past periods stay put.** Because an order counts when it is sent, a period that is over does not grow when a courier pays you late. It changes only when something goes back, in the period that happens.
- **Without VAT.** VAT is taken out of each product at the rate it was sold at, so a basket with 24% and 13% products is exact. Shipping and fees are taxed the way your receipt taxes them, in proportion to the products in the order. Changing a VAT rate later changes nothing in past periods.
- **Shipping and fees are turnover.** They appear on your receipt as separate lines and are part of what you invoice, so they are part of the figure, in their own columns.
- **Discounts reduce it.** Coupons, promotions and loyalty points redeemed lower the sale to what the customer was actually charged for the products.
- **Gift cards.** Selling a gift card is not turnover. When a customer pays with it, the order counts in full, because the gift card is only the way they paid.
- **Returns are counted when they happen.** A refund counts in the period you gave the money back, not in the period of the sale. Value returned to a customer's gift card counts too. A card dispute you lost counts only after you have said that the goods came back (see [Refunds and disputes](/admin/sales/refunds-and-disputes)).
- **A refused parcel.** When a customer refuses cash on delivery and the parcel comes back, the sale is taken out in the period it came back.
- **Refunds are split in proportion.** A refund is spread over the products, the shipping and the fees in proportion to the receipt, so refunding a whole order takes out the whole sale.

## Things to know

- **Periods follow your store's timezone.** An order sent just after midnight on the 1st belongs to the new period.
- **Awaiting collection is today's picture.** It shows what is still owed now on the orders sent in each period, and it falls as couriers pay you.
- **A breakdown has no returns.** A refund is not split by product, category or VAT rate, so a breakdown shows sales before returns. The first table has the returns.
- **Very long ranges by day.** The page shows at most 400 rows. For more, choose longer periods, or export the file, which has no limit.
- **It is not your tax return.** The figures follow the same VAT split as your receipts, but a refund is spread across the order in proportion, so a single refund can differ by a cent from the credit document. Your accountant's books decide.
- **Nothing here can be edited.** If a figure looks wrong, open the order and check it under [Orders](/admin/sales/orders).

## Related

- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Receipts and credit documents](/admin/sales/receipts)
- [Dashboard](/admin/getting-started/dashboard)
- [Roles & team](/admin/getting-started/roles-and-team)
