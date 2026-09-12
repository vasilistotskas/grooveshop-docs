---
title: Attributes & values
description: Define attributes such as Colour or Size, their values, and assign them to products so they appear as filters, specifications or variant selectors.
---

# Attributes & values

<span class="sidebar-path">Catalog → Attributes</span> and <span class="sidebar-path">Catalog → Attribute Values</span>

An **attribute** is a property type (Colour, Size, Capacity). An **attribute value** is one option of it (Red, Large, 256 GB). Products point at values, not at attributes. The storefront uses them for search filters, the specifications panel on the product page and, for attributes flagged as variant axes, the variant selector.

The two lists and [Variant groups](/admin/catalog/variant-groups) share a tab strip at the top of the page, so you can hop between them.

## What you see

### Attributes

| Column | Meaning |
|---|---|
| **Attribute** | Name and id. |
| **Active** | Inactive attributes stay in the database but are not meant for display. |
| **Is Variant Axis** | On: rendered as a selector across a product's variant group instead of a read-only specification. |
| **Values** | Number of values defined. |
| **Usage** | Number of product assignments across all values. |
| **Sort Order** | Drag rows to reorder. |
| **Created** | Creation date. |

Search matches id and translated name. Filters: Active, Is Variant Axis, date ranges. Bulk actions: **Activate selected attributes**, **Deactivate selected attributes**.

The attribute form has **Attribute Information** (**Name** per language, **Active**, **Is Variant Axis**), collapsed **Statistics** and **System Information**, and a **Values** tab listing the attribute's values with their Active flag, usage count and drag ordering. The value text itself is edited on the value's own page (click the change link on the row).

### Attribute Values

| Column | Meaning |
|---|---|
| **Value** | Translated value and id. |
| **Attribute** | Parent attribute. |
| **Active** | Flag. |
| **Usage** | Number of products carrying this value. |
| **Sort Order** | Drag to reorder within the same attribute. |
| **Created** | Creation date. |

Search matches id, value text and the attribute name. Filters: Active, Attribute, date ranges. Bulk actions: **Activate selected values**, **Deactivate selected values**.

The value form has **Value Information** (**Attribute**, **Value** per language, **Active**) plus the collapsed statistics and system sections.

## Tasks

### Create an attribute with its values
1. Open <span class="sidebar-path">Catalog → Attributes</span>, click **Add**, type the Greek **Name** and the other languages, save.
2. Open <span class="sidebar-path">Catalog → Attribute Values</span>, click **Add**, pick the **Attribute**, type the **Value** in each language, save. Repeat per option.
3. Back on the attribute page, drag the rows of the **Values** tab into the order you want customers to see.

### Assign values to a product
1. Open the product from [Products](/admin/catalog/products) and go to the **Product Attributes** tab.
2. Add a row and pick the value through the autocomplete (it searches value text and attribute name).
3. Save. A product can carry each value only once.

### Turn an attribute into a variant selector
1. Open the attribute and switch **Is Variant Axis** on.
2. Put the sibling products into one variant group and give each its own value of that attribute. See [Variant groups](/admin/catalog/variant-groups).

## Things to know

- Values are shown in the language of the storefront visitor, with English as the fallback for a missing translation.
- Deleting an attribute deletes all of its values and removes them from every product. Deleting a value removes it from every product.
- Deactivating does not remove assignments; it only flags the attribute or value. Check the **Usage** column before deleting anything.
- Attribute names and values are part of the product search index (including Greeklish variants), so assigning values improves search recall. The product is re-indexed when it is saved, not when a value is renamed; a nightly full re-sync catches the rest.
- The **Sort Order** of values is scoped per attribute, so reordering the sizes of one attribute never moves the colours of another.

## Related

- [Products](/admin/catalog/products)
- [Variant groups](/admin/catalog/variant-groups)
