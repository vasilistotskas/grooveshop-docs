---
title: Promotions
description: "Rule-based promotions: benefit types, targeting, conditions and limits, scheduling, stacking and priority, the feature switches, and the cache purge after every change."
---

# Promotions

<span class="sidebar-path">Marketing → Promotions → Promotions</span>

A promotion is a rule the cart evaluates: "10% off the whole order over 50 €", "free shipping", "buy 3 get 1 free in this category", "a free gift with your first order". Automatic promotions apply on their own; code promotions need a coupon code, managed under [Coupon codes](/admin/sales/coupon-codes).

Promotions ship dark. They work only when both switches are on: the platform has enabled promotions for the store, and `PROMOTIONS_ENABLED` is on under [Store settings](/admin/settings/store-settings). With either off, nothing here applies and the storefront's offers page answers "no offers". The sidebar follows the same switches: without promotions on your plan the **Promotions** menu is not shown at all; with them on the plan but the setting off, the menu stays and carries an **Off** badge, so you can prepare promotions and codes before shoppers see them.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Name** | The promotion name with its target scope beneath. |
| **Trigger** | **Automatic** or **Coupon code**. |
| **Benefit** | `-10%`, `-5 €`, or the benefit type name for shipping, BXGY and gifts. |
| **Status** | **Draft** (not active), **Scheduled** (active, starts later), **Live**, **Ended** (past the end date). |
| **Starts At** / **Ends At** | The schedule window, either side optional. |
| **Redemptions** | How many orders used it. |

Filters: trigger, benefit type, target scope, active, stackable, start and end date ranges. Search by name or by any of its coupon codes. Each row expands to a **Redemptions** table: the orders that used that promotion, with the customer and the discount.

Bulk actions: **Activate selected promotions**, **Deactivate selected promotions**.

### The promotion page

Four tabs:

- **General**: name and description per language, **Trigger**, **Benefit Type**, **Benefit Value** (percent for percentage, amount for fixed; ignored for the others), **Active**, **Starts At**, **Ends At**.
- **Benefit Details**: for **Buy X get Y discounted**: **Buy Quantity**, **Get Quantity**, **Get Discount Percent** (100 means free), and the reward pool (empty means the same products as the buy side). For **Free gift item**: exactly one gift product and the gift quantity.
- **Targeting**: **Target Scope** (Entire order, Specific products, Specific categories; subcategories are included), the products or categories, **Excluded products**, **Excluded categories**, and **Exclude Already-discounted Products** to skip products that already carry a markdown.
- **Conditions & Limits**: **Minimum Subtotal** (cart items total including VAT), **Minimum Quantity** (eligible units after scope and exclusions), **First Order Only**, **Stackable**, **Priority**, **Maximum Discount Amount** (ceiling per application), **Total Usage Limit** (orders), **Per-customer Usage Limit**.

Header actions: **Generate codes** (see Coupon codes) and **Duplicate**, which creates an inactive copy named "(copy)" with the same products, categories and limits.

## Benefit types

| Benefit | What it does |
|---|---|
| **Percentage off** | A percent off the eligible lines. |
| **Fixed amount off** | An amount off, spread across the eligible lines. |
| **Free shipping** | Removes the shipping cost. Always combines with other promotions; **Stackable** is ignored. It never opens a destination: the delivery country still needs an active shipping rate. |
| **Buy X get Y discounted** | For every X eligible units, Y units from the reward pool get the given percent off. |
| **Free gift item** | Adds the gift product to the order at no charge when the conditions hold. |

## How promotions combine

- **Stackable** promotions combine with each other, applied in **Priority** order (lower first).
- A **non-stackable** promotion applies alone, and only if its discount beats the combined stackable discount. Otherwise the stackables win and the code is refused with "cannot be combined".
- Free shipping always combines.
- A coupon is refused with a clear reason: unknown code, not started, ended, minimum not met, usage limit reached, cannot be combined, customer not eligible.
- Order-level discounts are spread across the lines before VAT, so invoices show VAT on the amount actually paid.

## Tasks

### Create an automatic sale
1. **Add promotion**. Name it per language, **Trigger → Automatic**, **Benefit Type → Percentage off**, **Benefit Value** 10.
2. **Targeting**: Entire order, or pick categories.
3. **Conditions & Limits**: set a **Minimum Subtotal** if you want one. Leave **Stackable** off if it must not add to other offers.
4. Set **Starts At** / **Ends At** and tick **Active**. Save.
5. Purge the **Promotions** cache under [Cache](/admin/system/cache).

### Run a coupon campaign
1. Create the promotion with **Trigger → Coupon code** and the benefit you want.
2. Save, then **Generate codes** in the header: number of codes, optional prefix, random length, usage limit per code (1 for single-use). Or add a single memorable code under [Coupon codes](/admin/sales/coupon-codes).
3. Purge the **Promotions** cache.

### Stop a promotion now
1. Tick it and run **Deactivate selected promotions**, or set **Ends At** to now.
2. Purge the **Promotions** cache. Until then the offers page may still show it for a few minutes; the cart already refuses it.

## Things to know

- **Purge the cache after every change** to a promotion, its codes or its schedule. The storefront's offers page is cached for five minutes and served stale for up to thirty; a stale entry advertises a discount the cart will refuse. The purge is the **Promotions** entry under [Cache](/admin/system/cache); it is not automatic.
- **Draft is the safe default.** New promotions are inactive until you tick **Active**; a duplicated promotion is always a draft.
- **Wholesale carts ignore promotions** unless `B2B_ALLOW_PROMOTIONS` is on. Wholesale is already a negotiated price. See [Customer groups & price lists](/admin/b2b/groups-and-price-lists).
- **Usage limits are counted on orders.** Every order that used a promotion writes a redemption row while the promotion is locked, so a limit of 100 really is 100 orders even under load. Per-customer limits use the account, or the checkout email for guests, which is best-effort.
- **First Order Only** is checked against the account, or the checkout email for guests, again best-effort.
- **The offers page** lists every live automatic promotion, and code promotions only when they have at least one code a shopper may be shown (active, not personal, not single-use) and have not reached their total usage limit.
- **Redemptions are visible but not editable.** <span class="sidebar-path">Marketing → Promotions → Redemptions</span> is a read-only ledger with CSV and XML export.
- The discount an order received is stamped on the order (**Promotion discount** under Payment Information) and never recalculated.

## Related

- [Coupon codes](/admin/sales/coupon-codes)
- [Gift cards](/admin/sales/gift-cards)
- [Products](/admin/catalog/products)
- [Categories](/admin/catalog/categories)
- [Cache](/admin/system/cache)
- [Store settings](/admin/settings/store-settings)
