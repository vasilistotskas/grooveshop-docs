---
title: Variant groups
description: How to offer the same product in several colours or sizes, with a selector on the product page.
---

# Variant groups

A variant group joins products that are the same item in different versions, e.g. a cable in five colours. On the page of each product in the group the customer sees buttons to switch to the other versions.

<span class="sidebar-path">Catalog → Attributes → Variant Groups</span>

## What you see

One row per group, with its name and how many **Members** (products) it has. A group's page lists its members with links to the products.

### How variants are organised

- **Each variant is a normal product**, with its own price, stock, images and SKU (product code). Orders record the exact variant.
- **The group just joins the products.** Only you see its name.
- **The buttons come from attributes.** Only attributes with **Is Variant Axis** become selectors, and each member needs its own value, e.g. Colour: Red. See [Attributes & values](/admin/catalog/attributes-and-values).

## Tasks

### One product in several colours
1. In <span class="sidebar-path">Catalog → Attributes → Attributes</span>, make sure **Colour** has **Is Variant Axis** and one value per colour.
2. In <span class="sidebar-path">Catalog → Attributes → Variant Groups</span> click **Add**, write a name (e.g. the product's base name) and save.
3. Open the first product. In **Variant Group** pick the new group. On the **Product Attributes** tab add its colour. Save.
4. For each other colour, click **Duplicate as draft** on the first product. The group is copied with it. Fill in the name, images, stock and its own colour, and activate it.
5. Open the group: **Members** should list every colour.

### Take a product out of the group
Open the product, clear **Variant Group** and save. The group's page cannot add or remove members.

### Retire a group
Delete it. Its products are not deleted; they are simply left without a group and each sells on its own.

## Things to know

- **The group's Active does nothing.** A group cannot be hidden this way. To hide variants, deactivate the products themselves.
- **The selector needs at least two active members.** If only one is left, the selector disappears and the product sells normally.
- Each member shows separately in lists and in search.
- In the product list, the **Variants** column shows the group and the **Variant Group** filter finds all its members.

## Related

- [Products](/admin/catalog/products)
- [Attributes & values](/admin/catalog/attributes-and-values)
