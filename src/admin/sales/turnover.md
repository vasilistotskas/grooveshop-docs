---
title: Monthly turnover
description: Read each month's turnover without VAT and shipping, less refunds, for any year, and download it as a spreadsheet.
---

# Monthly turnover

<span class="sidebar-path">Sales → Turnover</span>

The month-by-month figure your accountant asks for: what you sold without VAT and without shipping, less the money you gave back. Only the **Admin** and **Owner** roles see this page; **Staff** do not (see [Roles & team](/admin/getting-started/roles-and-team)).

## What you see

- Four totals for the year: **Net sales**, **Returns**, **Net turnover** and **Orders**.
- A table with one row for each month of the year and a **Total** row. A month with no sales shows zeros.
- A **Year** selector, from the year of your first sale to this year.
- **Export CSV**, which downloads the same table as a spreadsheet file.

| Column | What it holds |
|---|---|
| **Net sales** | What the orders placed that month are worth, without VAT and without shipping. |
| **Returns** | What went back to customers that month, without VAT and without shipping. |
| **Net turnover** | **Net sales** minus **Returns**. It is negative in a month when more went back than was sold. |
| **Orders** | The number of orders placed that month that count as sales. |

## Tasks

### Read a month
1. Open <span class="sidebar-path">Sales → Turnover</span>.
2. Pick the year in the **Year** selector.
3. Find the month in the table. **Net turnover** is the figure to report.

### Send the year to your accountant
1. Pick the year.
2. Press **Export CSV**. The file is named after the year.
3. Open it in your spreadsheet. Amounts are plain numbers with a decimal point and months read like `2026-10`, so the file imports cleanly.

## How the figures are counted

- **Without VAT.** VAT is taken out of each product at the rate it was sold at, so a basket with 24% and 13% products is exact. Changing a VAT rate later changes nothing in past months.
- **Without shipping.** Shipping and any fee for the payment method are not part of the figure.
- **Discounts reduce it.** Coupons, promotions and loyalty points redeemed lower the sale to what the customer was actually charged for the products.
- **Gift cards.** Selling a gift card is not turnover. When a customer pays with it, the order counts in full, because the gift card is only the way they paid.
- **Which orders count.** An order counts once its payment has been collected, in the month it was placed. Orders that are cancelled, unpaid or failed do not count. A cash-on-delivery order counts when the courier has paid you for it, not when it ships.
- **Returns are counted when they happen.** A refund counts in the month you gave the money back, not in the month of the sale, so past months never change because of a later refund. Value returned to a customer's gift card counts too. A card dispute you lost counts only after you have said that the goods came back (see [Refunds and disputes](/admin/sales/refunds-and-disputes)).
- **Refunds that included shipping.** When a refund also paid back the shipping, only the share that belongs to the products is taken out.

## Things to know

- **A past month can still grow.** A cash-on-delivery order placed at the end of a month is counted in that month once the courier pays you, even if that is a few days into the next one.
- **Months follow Greek time.** An order placed just after midnight on the 1st belongs to the new month.
- **It is not your tax return.** The figures follow the same VAT split as your receipts, but a refund is spread across the order in proportion, so a single refund can differ by a cent from the credit document. Your accountant's books decide.
- **Nothing here can be edited.** If a figure looks wrong, open the order and check its payment under [Orders](/admin/sales/orders).

## Related

- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Receipts and credit documents](/admin/sales/receipts)
- [Dashboard](/admin/getting-started/dashboard)
- [Roles & team](/admin/getting-started/roles-and-team)
