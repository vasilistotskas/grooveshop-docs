---
title: Recommendations
description: "The suggested-product strips on the product page and in the cart: how to turn them on, how to choose suggestions yourself and what each slot controls."
---

# Recommendations

<span class="sidebar-path">Marketing → Recommendations → Slots</span>

Recommendations are a strip of suggested products: on the product page, on the page of an out-of-stock product and in the cart. The store picks them by itself, but whatever you set on the product always comes first.

## What you see

Each **slot** is a place on the storefront where the strip can appear.

| Column | What it shows |
|---|---|
| **Surface** | The place: **Product page**, **Out of stock**, **Cart**, **Empty cart**, **Order email**. |
| **Enabled** | Whether the strip shows in this place. |
| **Chain** | The order in which suggestions are looked for (see the table below). |
| **Limit** | The most products the strip shows. |
| **Minimum fill** | If fewer than this are found, the strip does not show at all. |
| **Price band ratio** | For example 3: no product more than three times dearer or cheaper is suggested. Empty = no limit. |

Today the storefront shows a strip only on the **Product page**, **Out of stock** and **Cart**. The **Empty cart** and **Order email** slots are in the list but are not shown anywhere yet.

### The chain

The **Strategy chain** is a list of codes. Each code fills the places still empty, in turn.

| Code | What it suggests |
|---|---|
| `curated` | The products you set on the product yourself. Always first. |
| `variant_group` | Other variants of the same product (another colour, say). |
| `category` | Products from the same or a related category. |
| `popular` | One popular product of the store, at most one per strip. |

The other codes you may see in the starting setup (`attributes`, `semantic`, `co_purchase`, `co_view`) do not suggest anything yet and are simply skipped.

## Tasks

### Turn recommendations on

1. Ask the platform team to confirm your plan includes recommendations.
2. Under <span class="sidebar-path">Settings → Store Settings</span> turn on `PRODUCT_SUGGESTIONS_ENABLED` (off by default).

### Choose the suggestions for a product yourself

1. Open the product under <span class="sidebar-path">Catalog → Products</span> and go to the **Related products** tab.
2. Add products and pick a **Relation type**: **Similar product**, **Goes well with**, **Accessory for**, **Replacement for** or **Bundle with**.
3. Drag the rows to change their order. Save.

A relation works in one direction: the case on the phone's page does not put the phone on the case's page. If you want both, add the relation on both products.

### Change a slot

1. Open the slot, for example **Cart**.
2. Change **Limit**, **Minimum fill** or **Price band ratio**, or reorder the codes in the **Strategy chain**. Save.
3. To hide the strip in that place, untick **Enabled**.

If something goes wrong, click **Reset to the store's preset** inside the slot, or **Reset all slots to the store's preset** above the list. Your changes are lost.

## Things to know

- **Changes show at once.** Saving a slot, a product or a relation updates the strips by itself.
- **Never suggested:** inactive or out-of-stock products, and anything already in the cart.
- **The starting setup** of each slot depends on the kind of store (fashion, plants, electronics and so on), which the platform team sets.
- **Weights** say how much each code counts (0 to 1, default 1). You rarely need to change them.
- **Events.** <span class="sidebar-path">Marketing → Recommendations → Events</span> lists, read-only, every **Impression** of a strip, every **Click** on a suggested product and every **Attach**, meaning a suggested product that ended up in an order. It tells you whether suggestions bring sales.
- **Candidates.** <span class="sidebar-path">Marketing → Recommendations → Candidates</span> is usually empty: the ways of suggesting that work today are worked out when the page opens.

## Related

- [Products](/admin/catalog/products)
- [Variant groups](/admin/catalog/variant-groups)
- [Store settings](/admin/settings/store-settings)
