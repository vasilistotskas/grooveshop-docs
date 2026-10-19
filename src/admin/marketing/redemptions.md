---
title: Redemptions
description: "The list of every order that got a discount from a promotion or coupon: who got it, with which code and how much."
---

# Redemptions

<span class="sidebar-path">Marketing → Promotions → Redemptions</span>

Every time an order gets a discount from a [promotion](/admin/marketing/promotions), one row is written here. This list tells you what a campaign cost you and who used each code. It is read-only.

## What you see

| Column | What it shows |
|---|---|
| **Promotion** | The promotion that gave the discount. |
| **Promotion Code** | The coupon code used. Empty for an automatic promotion. |
| **Order** | The order that got the discount. |
| **User** | The customer's account. Empty if they shopped as a guest. |
| **Email** | The email the customer gave at checkout. |
| **Amount** | How much discount the order got from this promotion. |
| **Created At** | Date and time of the order. |

A date navigation bar sits above the list. Filters: promotion and date range. Search finds a customer email or a coupon code.

## Tasks

### What a campaign cost

1. Filter by **Promotion** and, if you like, by a date range.
2. Tick all rows and choose **Export selected to CSV**.
3. Open the file in a spreadsheet and add up the amount column.

### Who used a code

1. Type the code in the search box.
2. Each row is one order; click the order to open it.

## Things to know

- **One row per promotion per order.** An order that got two promotions has two rows.
- **Usage limits count these rows.** A promotion's **Total Usage Limit** and **Per-customer Usage Limit**, and a code's **Usage Limit**, are compared with this list.
- **Rows are never removed.** A canceled order keeps its row and still counts towards the limits.
- The same list, for one promotion, opens below each row of the [Promotions](/admin/marketing/promotions) list.

## Related

- [Promotions](/admin/marketing/promotions)
- [Coupon codes](/admin/marketing/coupon-codes)
- [Orders](/admin/sales/orders)
