---
title: Tiers & points
description: How the loyalty programme earns, redeems and expires points, how levels and tiers are computed, the single on/off switch, the settings behind it, and the admin screens for tiers, the points ledger and manual adjustments.
---

# Tiers & points

<span class="sidebar-path">Customers → Loyalty → Loyalty Tiers</span> and <span class="sidebar-path">Customers → Loyalty → Points Transactions</span>

The loyalty programme rewards signed-in customers with **points** they can spend at checkout, and with **XP** that never decreases through spending and drives a **level** and a **tier**. Everything is recorded in an append-only ledger: a customer's balance is the sum of their transactions.

## Is it on?

Two switches must both be on, and only one of them is yours:

1. The store's plan must include loyalty. That is set by the platform team and you cannot change it here.
2. **LOYALTY_ENABLED** in <span class="sidebar-path">Settings → Store Settings</span>, off by default.

**LOYALTY_ENABLED** is one switch for the whole programme, covering earning and redeeming together. There is no way to let customers earn but not spend, or the other way round. When it is off, no points are earned on completed orders, customers can neither redeem points nor see their balance and history, and AI assistants get no points either. Balances are kept, and the time the programme is off does not count towards expiry: a point that had a month left when you switched loyalty off still has a month left when you switch it back on. Cancelled and refunded orders still give back the points they used and take back the points they earned, so the balances are right when loyalty resumes where it stopped.

The admin follows the same two switches. Without loyalty on your plan, the **Loyalty** menu is not in the sidebar at all. With loyalty on your plan but **LOYALTY_ENABLED** off, the menu stays, marked **Off**, so you can prepare tiers before customers see them.

Wholesale customers have their own single switch, with the same all-or-nothing shape: **B2B_LOYALTY_ENABLED** decides whether orders priced through a customer group both earn and redeem. It is off by default because points are worked out from retail prices, so a negotiated price would earn full retail points. See [Customer groups & price lists](/admin/customers/groups-and-price-lists).

## How points are earned

When an order reaches the status **Completed**, a background job awards points for each line:

```
floor( price basis × LOYALTY_POINTS_FACTOR × product Points Coefficient × quantity [× tier multiplier] )
+ product Bonus Points × quantity
```

- **Price basis** is chosen by **LOYALTY_PRICE_BASIS**: the final sale price (default), the price without VAT and without discount, the discounted price without VAT, or the price with VAT and without discount.
- **LOYALTY_POINTS_FACTOR** is a store-wide multiplier, default 1.
- Each product has a **Points Coefficient** (0 disables calculated points for it) and fixed **Bonus Points**. See [Products](/admin/catalog/products).
- The **tier multiplier** applies only when **LOYALTY_TIER_MULTIPLIER_ENABLED** is on and the customer's tier has a multiplier above 1.

The points awarded are also added to the customer's **Total XP**. A first order can additionally grant a one-off **new customer bonus** when **LOYALTY_NEW_CUSTOMER_BONUS_ENABLED** is on; the amount is **LOYALTY_NEW_CUSTOMER_BONUS_POINTS**, default 100. The bonus does not add XP, and it rides on the first order that actually earns points: an order that earns nothing (every product on it has a **Points Coefficient** of 0) does not trigger the bonus either.

Guest orders earn nothing. Points are awarded once per order; a repeated job run is ignored.

## Levels and tiers

- **Level** = 1 + floor(Total XP ÷ **LOYALTY_XP_PER_LEVEL**). The default is 1000 XP per level.
- **Tier** = the tier with the highest **Required Level** that is at or below the customer's level. A customer below the lowest tier has no tier.
- The tier is recalculated after every award and reversal. A promotion sends the customer an in-app "You're now …" notification; a demotion is silent.

## Redeeming at checkout

- The customer enters how many points to use. **LOYALTY_REDEMPTION_RATIO_EUR** points equal one euro of discount, default 100 points per euro.
- The discount cannot exceed the products total (shipping and payment fees are never covered) and cannot exceed the balance.
- One redemption per order. The points are deducted immediately as a **Redeem** transaction, and the discount and points used are stored on the order.
- Redeeming does not change XP, so it never lowers a level or tier.

## Cancellations and refunds

When an order is cancelled, fully refunded, or moved to **Refunded**, a job reverses it: points spent on the order are given back, and the points earned on it — including the **new customer bonus**, if this was the order that granted it — are taken back as **Adjust** transactions (never below zero). XP is reduced by the earned points only, since the bonus never added any, and the tier is recalculated. Reversal runs once per order. The bonus is not granted again on a later order, and a cancelled or refunded order earns no points even when its earning job runs after the reversal.

A partial refund reverses nothing. Because the reversal happens only once and takes everything, the points stay until the refund that returns the rest of the money, so a small goodwill refund does not wipe the points of an order the customer keeps.

A lost card dispute (a chargeback) counts towards that total too: once refunds and chargebacks together cover the whole payment, the order is reversed the same way, with one difference. The points the customer spent on an order that was charged back are **not** given back, because the customer took the money back through their bank rather than the store undoing the order; only the points earned on it are taken back. To give the spent points back anyway, add them as described in [Add or remove points for a customer](#add-or-remove-points-for-a-customer). See [Card disputes and chargebacks](/admin/sales/orders#card-disputes-and-chargebacks).

## Expiry

A nightly job at 03:00 expires points older than **LOYALTY_POINTS_EXPIRATION_DAYS**. The default is 0, which means points never expire. Each expired earning is recorded as an **Expire** transaction, capped at what the customer still holds, so an already-spent earning does not push the balance negative. An earning that was fully spent still gets a zero **Expire** row, which is how it is not considered again.

## What you see

### Loyalty Tiers

| Column | Meaning |
|---|---|
| **Name** | Tier name in the current language. |
| **Required Level** | Minimum level, unique per tier. The list is sorted by it. |
| **Points Multiplier** | Applied to earned points when the tier multiplier setting is on. Minimum 1.0. |
| **Icon** | Thumbnail of the uploaded badge. |

There are no filters on this list; search matches the translated name. The form holds the translatable **Name** and **Description**, **Required Level**, **Points Multiplier** and **Icon** (PNG, JPG or SVG).

### Points Transactions

A read-only ledger. Rows cannot be added, edited or deleted from the admin.

| Column | Meaning |
|---|---|
| **User** | The customer. |
| **Points** | Positive for Earn and Bonus, negative for Redeem, Expire and most Adjust rows. |
| **Transaction Type** | Earn, Redeem, Expire, Adjust, Bonus. |
| **Reference order** | The order that caused it, when there is one. |
| **Created at** | Date drill-down above the list. |

Filters: **Transaction Type**, **User**, **Created at** range. Search matches the customer's email and the description. Bulk actions export the selected rows as CSV or XML.

## Tasks

### Set up the programme

1. Ask the platform team to confirm loyalty is included in the store's plan.
2. In <span class="sidebar-path">Settings → Store Settings</span> review **LOYALTY_POINTS_FACTOR**, **LOYALTY_PRICE_BASIS**, **LOYALTY_XP_PER_LEVEL**, **LOYALTY_REDEMPTION_RATIO_EUR**, **LOYALTY_POINTS_EXPIRATION_DAYS** and the two new-customer bonus settings. See [Store settings](/admin/settings/store-settings).
3. Create tiers in <span class="sidebar-path">Customers → Loyalty → Loyalty Tiers</span> with rising **Required Level** values. Turn on **LOYALTY_TIER_MULTIPLIER_ENABLED** only if higher tiers should earn faster.
4. Set **LOYALTY_ENABLED** to on. Earning starts with the next completed order.

### Add or remove points for a customer

1. Open the customer in <span class="sidebar-path">Customers → Customers</span> and click **Adjust loyalty points**. Only platform operators see the button.
2. Enter the **Points** (positive adds, negative removes; between minus and plus ten thousand) and a **Reason**, then submit. The change appears at once as an **Adjust** row with your account as creator and the reason as its description, and cannot be undone except by a further adjustment.

Adjustments change the balance only, never XP, level or tier.

### Explain a balance to a customer

1. Open <span class="sidebar-path">Customers → Loyalty → Points Transactions</span>, filter by **User**.
2. Read the rows in order: earnings per order line, bonuses, redemptions with the discount in the description, expiries and reversals. The account page in <span class="sidebar-path">Customers → Customers</span> shows the resulting **Points Balance**, **Total XP**, **Level** and **Tier**.

### Change tier thresholds

1. Edit **Required Level** on the tier. Levels are unique, so reorder by editing values rather than swapping.
2. Existing customers are re-tiered the next time their XP changes, not immediately.

## Things to know

- Points are awarded at **Completed**, not at payment or delivery. For cash-on-delivery orders that is when the courier payout is reconciled, which can be days after delivery. See [Orders](/admin/sales/orders).
- The currency ratio setting exists per currency; the store trades in euro, so **LOYALTY_REDEMPTION_RATIO_EUR** is the one that matters.
- Points balances live in the store's own data. A customer with accounts on two stores of the platform has two separate balances.
- The customer's loyalty summary and history are visible to them in their storefront account.
- Deleting a tier resets affected customers to no tier until their next recalculation. Prefer raising **Required Level** out of reach.

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Products](/admin/catalog/products)
- [Store settings](/admin/settings/store-settings)
- [Customer groups & price lists](/admin/customers/groups-and-price-lists)
- [Orders](/admin/sales/orders)
