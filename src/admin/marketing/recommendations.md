---
title: Recommendations
description: "The suggested-product strips on the product page, in the cart and in the order email: how to turn them on, how to choose suggestions yourself and what each slot controls."
---

# Recommendations

<span class="sidebar-path">Marketing → Recommendations → Slots</span>

Recommendations are a strip of suggested products: on the product page, on the page of an out-of-stock product, in the cart, in an empty cart and in the order email. The store picks them by itself, but whatever you set on the product always comes first.

## What you see

Each **slot** is a place on the storefront where the strip can appear.

| Column | What it shows |
|---|---|
| **Surface** | The place: **Product page**, **Out of stock**, **Cart**, **Empty cart**, **Order email**. |
| **Enabled** | Whether the strip shows in this place. |
| **Chain** | Which ways of suggesting this place uses (see the table below). |
| **Limit** | The most products the strip shows. |
| **Minimum fill** | If fewer than this are found, the strip does not show at all. |
| **Price band ratio** | For example 3: no product more than three times dearer or cheaper is suggested. Empty = no limit. |
| **Learn weights** | On (the default): every night the store adjusts the **Weights** from what sold. Off: the weights stay as you set them. |

Every slot is shown. **Empty cart** shows the store's popular products, since an empty cart has nothing to start from; that slot accepts only `popular`. **Order email** adds a "You might also like" strip, based on the order's products, to the order-received and payment-confirmed emails.

### The chain

The **Strategy chain** is a list of codes. All the codes suggest products at the same time. The store adds up their scores, each counted by its **Weights**, and shows your own picks first, then the best of the rest. The order of the codes makes no difference.

| Code | What it suggests |
|---|---|
| `curated` | The products you set on the product yourself. Always first. |
| `variant_group` | Other variants of the same product (another colour, say). |
| `category` | Products from the same or a related category. |
| `attributes` | Products that share attributes, tags and brand with this one. Needs the Basic plan or above. |
| `co_purchase` | Products often bought in the same order as this one, over the last 180 days. Needs the Pro plan. |
| `popular` | The store's popular products: at most one per strip beside a product, the whole strip in the empty cart. |

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
2. Change **Limit**, **Minimum fill** or **Price band ratio**, or add or remove codes in the **Strategy chain**. Save.
3. To hide the strip in that place, untick **Enabled**.

If something goes wrong, click **Reset to the store's preset** inside the slot, or **Reset all slots to the store's preset** above the list. Your changes are lost.

## Things to know

- **Changes show at once.** Saving a slot, a product or a relation updates the strips by itself.
- **Never suggested:** inactive or out-of-stock products, and anything already in the cart.
- **The starting setup** of each slot depends on the kind of store (fashion, plants, electronics and so on), which the platform team sets.
- **Weights** say how much each code counts (0 to 1, default 1). With **Learn weights** on, every night at 05:00 the store re-weights each slot from the last 30 days: the code whose suggestions sold best per showing gets 1, the others less in proportion, never below 0.05. A code shown fewer than 200 times keeps its weight. Turn **Learn weights** off to keep weights you set by hand.
- **Events.** <span class="sidebar-path">Marketing → Recommendations → Events</span> lists, read-only, every **Impression** of a strip, every **Click** on a suggested product and every **Attach**, meaning a suggested product that ended up in an order. It tells you whether suggestions bring sales.
- **Candidates.** <span class="sidebar-path">Marketing → Recommendations → Candidates</span> lists, read-only, the ready-made suggestions of `attributes` and `co_purchase`. They are rebuilt when you save a product and every night at 04:00. The other codes are worked out when the page opens and do not appear here.

## Related

- [Products](/admin/catalog/products)
- [Variant groups](/admin/catalog/variant-groups)
- [Store settings](/admin/settings/store-settings)
