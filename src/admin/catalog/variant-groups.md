---
title: Variant groups
description: How product variations are modelled and the admin workflow to offer the same item in several colours or sizes.
---

# Variant groups

<span class="sidebar-path">Catalog → Variant Groups</span>

A variant group links sibling products that are the same item in different variations, for example one cable clip in five colours or a phone in three memory sizes. The storefront shows a selector on each member's page so the customer can jump between siblings.

## How variants are modelled

- **Every variant is a full product.** Each colour or size is its own row in [Products](/admin/catalog/products), with its own SKU, price, stock, images, slug and SEO. Carts and orders reference the specific product.
- **The group is only an identity.** It has a translatable **Name** (an admin label, not shown to customers) and an **Active** flag. Products join it through their own **Variant Group** field.
- **The axes are attributes.** Which selector appears (Colour, Memory) comes from [Attributes & values](/admin/catalog/attributes-and-values): only attributes with **Is Variant Axis** on are rendered as selectors, and each member must carry one value of that attribute so the storefront can tell the siblings apart. Other attributes stay read-only specifications.

## What you see

| Column | Meaning |
|---|---|
| **Group** | Name and id. |
| **Active** | Flag. |
| **Members** | Number of products in the group. |
| **Created** | Timestamp. |

Search matches id and name. Filters: Active and creation date range. There are no bulk actions beyond the standard delete. The tab strip at the top links to Attributes and Attribute Values.

The group form has **Variant Group** (**Name** per language, **Active**), a read-only **Members** section listing the member products with links to their pages (or "No products assigned yet."), and the collapsed **System Information**.

## Tasks

### Offer a product in several colours
1. Under <span class="sidebar-path">Catalog → Attributes</span>, make sure a **Colour** attribute exists with **Is Variant Axis** on, and that it has one value per colour.
2. Under <span class="sidebar-path">Catalog → Variant Groups</span>, click **Add**, give the group a name such as the product's base name, save.
3. Create or open the first product. Set **Variant Group** to the new group. In the **Product Attributes** tab add the Colour value for this variant. Save.
4. For each remaining colour, use **Duplicate as draft** on the first product from the list, then set its name, images, price, stock and its own Colour value, keep the same **Variant Group**, and activate it.
5. Open the group page: **Members** should list every colour.

### Remove a product from a group
Open the product and clear its **Variant Group** field. The group page cannot add or remove members.

### Retire a whole variant family
Deleting the group does not delete the products; their **Variant Group** field is cleared and each keeps selling as a standalone product. Deactivate the products if they should disappear.

## Things to know

- Members of a group are still separate products in listings and search. If you want only one to appear in listings, deactivate the others; the selector on the active product only links to active, non-deleted siblings.
- A product with no variant group and a variant-axis attribute value shows the value as a plain specification, not as a selector.
- The **Variants** column on the product list shows the group name and sibling count, and filters exist there to find every product of a group.
- Group names are per language but customers never see them; a Greek name is enough.

## Related

- [Products](/admin/catalog/products)
- [Attributes & values](/admin/catalog/attributes-and-values)
