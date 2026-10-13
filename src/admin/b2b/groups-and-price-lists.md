---
title: Customer groups & price lists
description: Wholesale tiers, percentage discounts and per-product net prices, how group pricing binds to a cart on every load, and how it interacts with promotions and loyalty points.
---

# Customer groups & price lists

<span class="sidebar-path">Customers → Wholesale → Customer Groups</span> and <span class="sidebar-path">Customers → Wholesale → B2B Price Lists</span>

A customer group is a wholesale tier: a name, a percentage off the retail net price, an optional minimum order value, and, per product, an optional fixed net price that overrides the percentage. Approved business customers are assigned to one group and their cart is priced with it. See [Business customers](/admin/b2b/business-customers) for the approval side.

## What you see

### Customer Groups

| Column | Meaning |
|---|---|
| **Name** | Internal label. Customers only ever see it as a badge on their own account. |
| **Discount percent** | Percent off the retail net (VAT-exclusive) price. |
| **Minimum order value** | Cart items total (VAT-inclusive) required to check out at this group's prices; 0 disables the check. |
| **Active** | An inactive group prices its members at retail. |
| **Businesses** | How many profiles are in the group. |
| **Created** | Timestamp. |

Filter by active; search by name. The group page has the same fields, a **Price list** panel listing the group's fixed prices, and an **Import prices** header action.

### B2B Price Lists

One row per group and product: **Group**, **Product**, **Net price override**, **Updated**. Filters: group, updated date. Search by product name or SKU. Bulk actions export the selection as CSV or XML.

## How a wholesale price is computed

For each product in an approved customer's cart:

1. If the group has a **Net price override** for the product, that net price is used. Otherwise the retail net price is reduced by the group's **Discount percent**.
2. The product's own VAT rate is applied on top to get the final price. See [VAT rates](/admin/sales/vat-rates).
3. The product's retail markdown, if any, is never stacked on top of the wholesale price.
4. The result is capped at the retail final price: a wholesale tier can never charge more than a retail sale would.

A price-list row whose net price cannot be honoured is ignored and the percentage applies instead. That means a row in another currency, or a negative amount, both of which would otherwise be charged wrongly rather than not at all.

## When pricing applies

Group pricing is not stored on the cart. It is resolved and attached every time the cart is read (the storefront cart page, checkout, payment start) and again inside order creation, from the customer's profile as it is at that moment. Consequences:

- Approving, changing or suspending a customer, or editing a group or a price row, takes effect on the customer's next request. Nothing has to be resynchronised.
- An order stamps the group name and discount percent it was priced with; later changes never touch it. The order page shows this under **Wholesale pricing**, and the orders list has a **Wholesale** filter.
- The admin cart screen does not apply group pricing, so wholesale carts show retail figures there. See [Carts](/admin/sales/carts).

## Tasks

### Create a tier
1. **Add customer group**: **Name**, **Discount percent**, optionally **Minimum order value**, **Active** on. Save.
2. Assign customers to it from their business profile (**Approve** with this group, or edit **Customer group**).

### Load a per-product price list
1. Open the group and click **Import prices**.
2. Paste one product per line as `SKU;net price` (VAT-exclusive). A comma works as separator and as decimal mark, so `SKU-001,12,50` is read as `12.50`. Existing rows for this group are updated in place; unknown SKUs are reported as warnings.
3. Confirm. The message tells you how many rows were created and updated.

Single rows can also be added under **B2B Price Lists** by picking the group and product.

### Enforce a minimum order
1. Set **Minimum order value** on the group. Below it, the cart shows a "below minimum" state, the payment step refuses to start and order creation is rejected, all against the same figure.

## Promotions and loyalty

- **Promotions and coupons do not apply to wholesale carts** unless `B2B_ALLOW_PROMOTIONS` is on under [Store settings](/admin/settings/store-settings). Wholesale is already a negotiated price; stacking retail promotions on it double-discounts silently. Off by default.
- **Loyalty points**: `B2B_LOYALTY_ENABLED` is one switch for both earning and redeeming on wholesale orders. Off by default, because points are calculated on the retail price and would otherwise let a wholesale buyer earn full points and spend them on already-discounted prices. When off, a wholesale cart silently drops any points redemption. See [Tiers & points](/admin/loyalty/tiers-and-points).
- Gift cards work as normal; they are a payment, not a discount.

## Things to know

- **Percent and override are both net figures.** Enter prices without VAT everywhere on these screens; the shopper sees VAT-inclusive prices.
- **An inactive group is the same as no group.** Members are priced at retail with no message. Use it to pause a tier without unassigning anyone.
- **Deleting a group** removes its price-list rows and leaves its members with no group, hence retail pricing. Prefer deactivating.
- **A price-list row overrides the percent, never adds to it.**
- **Wholesale needs the feature on** at both tiers (platform and `B2B_WHOLESALE_ENABLED`); with it off, groups can still be prepared but nobody is priced with them. While only the setting is off, the **Wholesale** menu stays in the sidebar marked **Off**; without B2B on your plan it is not shown at all.

## Related

- [Business customers](/admin/b2b/business-customers)
- [Products](/admin/catalog/products)
- [VAT rates](/admin/sales/vat-rates)
- [Promotions](/admin/sales/promotions)
- [Tiers & points](/admin/loyalty/tiers-and-points)
- [Orders](/admin/sales/orders)
