---
title: Carts
description: See what shoppers have in their carts, which carts were left behind, and what the platform cleans up and emails on its own.
---

# Carts

<span class="sidebar-path">Sales → Carts</span>

A cart holds what a shopper has picked before they place the order. This screen is for looking: what people are about to buy, how many carts were left behind, and whether a customer's "my cart is wrong" has a basis.

Signed-in customers have one cart that follows their account. Guests get one per browser.

## What you see

### The list

| Column | What it shows |
|---|---|
| **Owner** | The customer's name and email, or "Guest" and the cart number. |
| **Type** | **User** or **Guest**. |
| **Order source** | Where the shopper came from when they started the cart. See [Order source](/admin/sales/order-source). |
| **Checkout** | A link to the order, when the shopper has reached checkout and has not paid by card yet. |
| **Activity** | **Active** (changed in the last hour), **Recent**, or **Abandoned** (untouched for longer than `CART_ABANDONED_HOURS`, 24 hours by default). |
| **Items** | Total quantity and number of different products. |
| **Total** | The cart's value now, and the saving when a product is on sale. |
| **Last Activity** | The last time the shopper changed the cart. |
| **Created at** | When the cart was created. |

### Filters and search

- **Cart Type**: **Authenticated Users**, **Guest Users** or **Abandoned Carts** (the same rule as the **Abandoned** badge).
- **Activity Status**: last 24 hours, last 7 days, or older than 7 days.
- **Source type** and **Order source**: where the cart was started.
- **Checkout**: **Checkout started, awaiting payment**.
- Dates, the customer, and a range for **Total Items**.

The search box finds a cart by number, or by the customer's email, username or name.

### The cart page

**Cart Owner**, an **Activity** block with the dates, a **Summary** with the totals, and a **Cart Items** tab with each product, quantity, unit price, total and discount.

A **Unit Price** written as "€10.00 → €12.40" is the price before VAT, then what the shopper pays with VAT and any discount. It is not an old price next to a new one.

## Tasks

### See what a customer has in their cart
1. Search by the customer's email.
2. Open the cart. The **Cart Items** tab shows the products, and **Summary** shows the totals as the store calculates them right now.

### Review abandoned carts
1. In the filters choose **Cart Type → Abandoned Carts**.
2. Sort by **Total** to find the most valuable ones.

The platform emails signed-in customers about an abandoned checkout on its own (see below). There is no "send a reminder" button here.

### Find shoppers stuck at the card payment
1. In the filters choose **Checkout → Checkout started, awaiting payment**.
2. The **Checkout** column links to each order waiting for its payment.

### Change when a cart counts as abandoned
1. Open <span class="sidebar-path">Settings → Store Settings</span> and search for `CART_ABANDONED_HOURS`.
2. Enter the number of hours without activity, and save. The **Activity** column and the **Abandoned Carts** filter follow it.

## Things to know

- **Prices in a cart are live.** The unit price is the product's price right now, so a price change shows here at once.
- **Wholesale carts show retail prices here.** Customer-group prices are applied when the store loads the cart for an approved business customer, not on this screen. See [Customer groups & price lists](/admin/customers/groups-and-price-lists).
- **Avoid editing a customer's cart.** The customer is not told about your change. Removing a product you no longer sell is the only edit worth making.
- **Guest carts are deleted automatically.** Empty guest carts are deleted after `ABANDONED_CART_CLEANUP_DAYS` days without activity (7), and every guest cart after `OLD_GUEST_CART_CLEANUP_DAYS` days (30). Customer carts are never deleted.
- **Abandoned-checkout emails** go once a day to signed-in customers who reached checkout but never ordered, `CHECKOUT_ABANDONMENT_HOURS` hours later (2). Each customer gets one per abandoned checkout. Guests never get it.
- **A cart does not hold stock.** Stock is held only once checkout starts, for a limited time (see [Orders](/admin/sales/orders#what-happens-automatically)).
- **A cart survives the card payment page.** If a shopper goes to Viva Wallet or Stripe and comes back without paying, the cart is still there. It empties only once the payment succeeds, or straight away for cash on delivery.
- **Hiding the cart.** A store that is not selling yet can hide the cart from its storefront with `CART_ENABLED`. This screen keeps working.
- A separate **Cart Items** screen, not in the menu, lists every cart line. Open it from the [command palette](/admin/getting-started/search-and-command-palette) with **Ctrl+K** (**⌘K** on a Mac).

## Related

- [Orders](/admin/sales/orders)
- [Order source](/admin/sales/order-source)
- [Products](/admin/catalog/products)
- [Customer groups & price lists](/admin/customers/groups-and-price-lists)
