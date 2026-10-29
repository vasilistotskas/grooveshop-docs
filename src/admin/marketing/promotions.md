---
title: Promotions
description: "How to set up cart discounts: automatic and coupon-code promotions, benefit types, targeting, limits, and stacking."
---

# Promotions

<span class="sidebar-path">Marketing → Promotions → Promotions</span>

A promotion is a discount rule for the cart, such as "10% off orders over €50" or "free shipping". An automatic promotion applies by itself. A code promotion needs a coupon, which you create under [Coupon codes](/admin/marketing/coupon-codes).

## What you see

| Column | What it shows |
|---|---|
| **Name** | The promotion's name and, below it, which products it covers. |
| **Trigger** | **Automatic** or **Coupon code**. |
| **Benefit** | For example `-10%`, `-€5.00`, or the kind of benefit (free shipping, gift and so on). |
| **Status** | **Draft** (inactive), **Scheduled** (starts later), **Live** (running now), **Ended**. |
| **Starts At** / **Ends At** | When it runs. Empty means no limit. |
| **Redemptions** | How many orders used it. |

Below each row a **Redemptions** table opens with the orders that got the discount. Search finds a promotion by its name or by any of its codes.

The promotion page has four tabs:

- **General**: name and description in each language, **Trigger**, **Benefit Type**, **Benefit Value**, **Active**, **Starts At**, **Ends At**.
- **Benefit Details**: the quantities for "buy X get Y" and the gift product.
- **Targeting**: which products or categories it covers and which are excluded.
- **Conditions & Limits**: minimum amount or quantity, first order, stacking, usage limits.

### Benefit types

| Benefit type | What it does |
|---|---|
| **Percentage off** | A percentage off the products the promotion covers. |
| **Fixed amount off** | An amount off, shared across the products it covers. |
| **Free shipping** | Sets shipping to zero. Always combines with other promotions. |
| **Buy X get Y discounted** | For example "buy 2, get 1 free": for every 3 eligible products in the cart, the cheapest one is discounted. |
| **Free gift item** | Adds a gift product to the order at no charge. |

## Tasks

### A store-wide automatic discount

1. Click **Add** and enter a name in each language.
2. Set **Trigger** to **Automatic**, **Benefit Type** to **Percentage off** and **Benefit Value** to, say, 10.
3. On the **Targeting** tab leave **Entire order**, or pick products or categories.
4. On the **Conditions & Limits** tab set a **Minimum Subtotal** (for example €50) if you want one.
5. Set **Starts At** and **Ends At**, tick **Active** and save.

The promotion shows on the storefront within about ten seconds.

### A coupon-code campaign

1. Create the promotion as above, but with **Trigger** set to **Coupon code**. Save.
2. Click **Generate codes** at the top right for many single-use codes, or add one easy code (for example `SUMMER10`) under [Coupon codes](/admin/marketing/coupon-codes).

### Buy 2, get 1 free

1. **Benefit Type**: **Buy X get Y discounted**.
2. On the **Benefit Details** tab: **Buy Quantity** 2, **Get Quantity** 1, **Get Discount Percent** 100 (100 means free, 50 means half price).
3. Leave **Reward Products** empty if the free item comes from the same products; otherwise pick them.

### Stop a promotion right away

1. Tick its row in the list and choose **Deactivate selected promotions**.
2. The cart refuses it immediately and the storefront updates by itself.

### Duplicate a promotion

Open the promotion and click **Duplicate**. The copy has the same settings and products, "(copy)" in its name, and is inactive. Coupon codes are not copied.

## Things to know

- **Two switches.** Promotions work only if your plan includes them and `PROMOTIONS_ENABLED` is on under <span class="sidebar-path">Settings → Store Settings</span> (off by default). While it is off, the menu shows an **Off** badge and you can prepare promotions without shoppers seeing them.
- **New promotions start inactive.** Nothing applies until you tick **Active**.
- **The storefront updates on its own.** Saving, the bulk activate or deactivate actions, changes to coupon codes, and a promotion starting or ending on its dates all refresh the offers within about ten seconds. You do not need to clear the cache.
- **How they combine.** Promotions with **Stackable** ticked add up, applied in **Priority** order (lower number first). A promotion that is not stackable applies alone, and only if it gives at least as much as all the stackable ones together.
- **Free shipping** does not open a new destination: the shipping option must already be available for the order's country and weight.
- **An automatic free-shipping promotion with a minimum** appears in the cart's free-shipping line, not as a separate "add X more" message. When its minimum is closer than your couriers' **Free Shipping Threshold**, the line counts down to the promotion's minimum instead, so the customer never sees two different amounts. See [Shipping providers](/admin/settings/shipping-providers).
- **Gift out of stock.** If the gift product is not available, the order goes through without the gift.
- **Limits count orders.** **Total Usage Limit** and **Per-customer Usage Limit** count orders that got the discount. A canceled order still counts.
- **First order and per-customer limits** are checked by account and by checkout email, so a guest who later opens an account does not get the discount twice.
- **Business customers.** Carts with wholesale prices get no promotions unless you turn on `B2B_ALLOW_PROMOTIONS`. See [Customer groups & price lists](/admin/customers/groups-and-price-lists).
- **What shoppers see.** The offers page and the offers panel on a product page show automatic promotions and those with a public code. Personal and single-use codes never appear there.
- The discount an order got is recorded in **Promotion Discount** on the **Payment Information** tab and does not change if you edit the promotion later.

## Related

- [Coupon codes](/admin/marketing/coupon-codes)
- [Redemptions](/admin/marketing/redemptions)
- [Gift cards](/admin/marketing/gift-cards)
- [Cache](/admin/settings/cache)
- [Store settings](/admin/settings/store-settings)
