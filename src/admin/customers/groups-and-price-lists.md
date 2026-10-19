---
title: Customer groups & price lists
description: Wholesale customer groups, their discount, fixed prices per product, the minimum order, and how they combine with promotions and loyalty points.
---

# Customer groups & price lists

A customer group sets wholesale prices: a discount percentage, optionally a minimum order, and, if you want, a fixed price for specific products. Every approved [business customer](/admin/customers/business-customers) belongs to one group.

<span class="sidebar-path">Customers → Wholesale → Customer Groups</span> and <span class="sidebar-path">Customers → Wholesale → B2B Price Lists</span>

## What you see

### Customer Groups

| Column | Meaning |
|---|---|
| **Name** | The group's name. Customers only see it in their own account. |
| **Discount percent** | Discount on the retail price without VAT. |
| **Minimum order value** | The smallest product total (with VAT) for an order at wholesale prices. 0 means no minimum. |
| **Active** | An inactive group gives its members retail prices. |
| **Businesses** | How many business customers are in the group. |
| **Created At** | When the group was made. |

Each row opens a **Price list** panel with the group's fixed prices. On the group's page, top right, is the **Import prices** button.

### B2B Price Lists

One row per group and product: **Customer group**, **Product**, **Net price override**, **Updated At**. Filters: group and date updated. Search finds a product name or SKU (product code). The bulk actions **Export selected to CSV** and **Export selected to XML** download the selected rows.

## Tasks

### Create a group

1. In **Customer Groups**, click add.
2. Fill in **Name**, **Discount percent** and, if you want, **Minimum order value**. Leave **Active** ticked. Save.
3. Put customers in the group from their page in [Business customers](/admin/customers/business-customers): with **Approve**, or by changing **Customer group**.

### Import fixed prices

1. Open the group and click **Import prices**.
2. In **Price lines**, paste one product per line, with the product code and the price without VAT: `SKU-001;12,50`. A comma works instead of the semicolon, and as the decimal mark.
3. Confirm. The message says how many prices were added and how many updated. Lines with an unknown code or a wrong price are shown as warnings and skipped.

A price the group already has is updated. A single price can also be added under **B2B Price Lists**, by picking the group and the product.

### Set a minimum order

Fill in **Minimum order value** on the group. Below that amount the customer's cart says so, and payment and the order do not go ahead.

## Things to know

- **How the wholesale price comes out.** Example: a product at €10.00 without VAT and 24% VAT, so €12.40 retail. With **Discount percent** 20%, the price without VAT becomes €8.00 and the customer pays €9.92. If the group has a fixed price of €7.50 for the product, that applies instead of the percentage, and the customer pays €9.30.
- **Prices here are always without VAT.** The product's VAT is added at the end.
- **A fixed price replaces the percentage**; it is never added to it.
- **The product's retail discount is not added** on top of the wholesale price.
- **A wholesale price never exceeds the retail price.** If it would, the customer pays the retail price.
- **The price is worked out every time** the customer looks at the cart or checkout. A change to the group or its prices applies at once. Every order keeps the group and discount it was placed with.
- **Promotions and coupons** do not apply to a wholesale cart, unless you turn on the `B2B_ALLOW_PROMOTIONS` setting under <span class="sidebar-path">Settings → Store Settings</span>. It is off by default, because the wholesale price is already reduced.
- **Loyalty points:** the `B2B_LOYALTY_ENABLED` setting turns on both earning and redeeming points on wholesale orders. It is off by default, because points are counted on the retail price. While it is off, a wholesale cart does not redeem points. See [Loyalty](/admin/customers/loyalty).
- **Gift cards** work as normal: they are a way to pay, not a discount.
- **An inactive group** means retail prices for its members, with no message. Use it to pause a group without moving any customer.
- **Do not delete a group.** Its fixed prices are lost and its members are left with no group, so retail prices. Make it inactive instead.

## Related

- [Business customers](/admin/customers/business-customers)
- [Products](/admin/catalog/products)
- [VAT rates](/admin/settings/vat-rates)
- [Promotions](/admin/marketing/promotions)
- [Loyalty](/admin/customers/loyalty)
- [Orders](/admin/sales/orders)
