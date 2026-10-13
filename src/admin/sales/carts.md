---
title: Carts
description: What the carts list shows, how abandoned carts are identified and cleaned up, and why you should look but rarely touch.
---

# Carts

<span class="sidebar-path">Sales → Carts</span>

A cart is a shopper's basket before checkout. Signed-in customers have exactly one cart that follows their account; guests get one per browser session. This screen is for looking: seeing what people are about to buy, how many baskets were left behind, and whether a customer's "my cart is broken" report has a basis. The sidebar entry carries no count: a basket left behind is not work waiting for you, so it is not counted like orders to process.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Owner** | Customer name and email, or "Guest" and the cart number. |
| **Type** | **User** or **Guest**. |
| **Activity** | **Active** (touched in the last hour), **Recent** (last 24 hours), **Idle** (last 7 days) or **Abandoned** (older). |
| **Items** | Total quantity and number of distinct products. |
| **Total** | Current cart value, with the discount saved when any product carries a markdown. |
| **Last Activity** | Last time the shopper changed the cart. |
| **Created** | When the cart was created. |

### Filters

**Cart Type** (Authenticated Users, Guest Users, Abandoned Carts meaning no activity for 24 hours), **Activity Status** (Active last 24h, Recent last 7 days, Old 7+ days), last activity and creation date ranges, the owning user, and a **Total Items** range. The date drill-down above the table follows last activity.

### Search

Cart ID, and the owner's email, username, first or last name.

### The cart page

**Cart Owner** (the linked user), an **Activity** block with the timestamps, a read-only **Summary** (cart summary and financial summary: items, total, discount, VAT, savings percentage) and a **Cart Items** tab listing product, quantity, unit price, line total and discount. The quantity in the tab is editable.

The unit price is written as "net → price paid" whenever the two differ, which is any product carrying VAT or a markdown. The left figure is the price before VAT; the right one is what the shopper is charged, with VAT added and any markdown taken off. It is not an old price next to a new one.

There is also a separate **Cart Items** screen, not on the sidebar but reachable through the search palette, with bulk actions **Increase quantity by 1**, **Decrease quantity by 1** and **Remove from cart**. **Decrease quantity by 1** deletes any selected line that is already at one, so it can empty a basket.

## Tasks

### Check what a customer has in their basket
1. Search by the customer's email.
2. Open the cart. The **Cart Items** tab shows the lines and the summary shows the totals as the storefront computes them right now.

### Review abandoned baskets
1. Filter **Cart Type → Abandoned Carts** or **Activity Status → Old (7+ days)**.
2. Sort by **Total** to find the valuable ones.

The platform emails signed-in customers about an abandoned checkout on its own; see below. There is no bulk "send recovery email" action on this screen.

## Things to know

- **Prices in a cart are live.** A cart line stores the product and quantity, not a price. The unit price you see is the product's current price, so a price change on the product shows here immediately. The only stored price is the one at the moment the item was added, kept to warn the shopper if it changed.
- **Wholesale carts show retail prices here.** B2B group prices are applied when the storefront loads the cart for an approved business customer; the admin does not apply them, so the totals on this screen are retail for those customers. See [Customer groups & price lists](/admin/b2b/groups-and-price-lists).
- **Do not edit carts to "help" a customer.** The shopper's next click overwrites your change, and nothing tells them you touched it. Removing a line that references a discontinued product is the only edit that makes sense.
- **Guest carts are deleted automatically.** Every day at 04:00 empty guest carts idle for more than `ABANDONED_CART_CLEANUP_DAYS` (7) are deleted; every day at 06:00 all guest carts idle for more than `OLD_GUEST_CART_CLEANUP_DAYS` (30), empty or not, are deleted. Customer carts are never deleted.
- **Abandoned-checkout emails** go out daily at 06:00 to signed-in customers who started checkout (which reserves stock) but never placed the order, once the reservation has been expired for `CHECKOUT_ABANDONMENT_HOURS` (2). Each customer is emailed once per abandoned session. Guests never receive it.
- **Stock is not held by a cart.** Stock is reserved only when checkout starts, for `STOCK_RESERVATION_TTL_MINUTES` (30) minutes, and released every hour when expired. A large abandoned cart does not block stock for other shoppers.
- **A cart survives a hosted payment page.** When a shopper goes off to Viva Wallet or Stripe and comes back without paying, the cart is intentionally still there; it is emptied only when the payment completes. For cash on delivery that happens as soon as the order is placed.
- **Only the ordered lines leave the cart.** Placing an order removes exactly what it contained and deletes the cart only if nothing is left, so anything the shopper added while a payment page was open stays in their basket.
- The storefront cart itself can be hidden for a store that is not selling yet (`CART_ENABLED` under [Store settings](/admin/settings/store-settings)); this screen still works.

## Related

- [Orders](/admin/sales/orders)
- [Products](/admin/catalog/products)
- [Customer groups & price lists](/admin/b2b/groups-and-price-lists)
