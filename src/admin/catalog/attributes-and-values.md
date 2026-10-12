---
title: Attributes & values
description: Define attributes such as Colour or Size, their values, and assign them to products so they appear as filters, specifications or variant selectors.
---

# Attributes & values

<span class="sidebar-path">Catalog → Attributes</span> and <span class="sidebar-path">Catalog → Attribute Values</span>

An **attribute** is a property type (Colour, Size, Capacity). An **attribute value** is one option of it (Red, Large, 256 GB). Products point at values, not at attributes.

On the storefront each value does up to three jobs:

- Every value attached to a product is listed in the **Specifications** panel of that product's page, whatever else it does.
- Active attributes and active values are offered as filters in the sidebar of the product listing. Inactive ones are left out of the filter list.
- An attribute marked as a variant axis additionally drives the selector that moves a shopper between the siblings of a variant group.

The two lists and [Variant groups](/admin/catalog/variant-groups) share a tab strip at the top of the page, so you can hop between them.

## What you see

### Attributes

| Column | Meaning |
|---|---|
| **Attribute** | Name and id. |
| **Active** | Off keeps the attribute out of the storefront's filter list. Its values stay on every product that carries them and still show as specifications. |
| **Is Variant Axis** | On: the attribute also drives the selector across a product's variant group. It keeps appearing as a specification as well. |
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

- Values are shown in the visitor's own language, with no fallback: a value you never translated renders empty for them. Fill in every language your store serves.
- Deleting an attribute deletes all of its values and removes them from every product. Deleting a value removes it from every product. Neither can be undone, so check the **Usage** column first.
- Deactivating removes nothing. The attribute or value stays on every product it was assigned to and keeps showing in that product's specifications; it only stops being offered as a filter.
- **How shoppers' filter picks combine.** Values ticked under the same attribute are alternatives: Black and White under Colour shows products that are black or white. Picks under different attributes all apply: Black under Colour and 2 m under Length shows only products that are both. The count next to each value is how many of the products left by the shopper's other filters carry it. Picks under the same attribute do not shrink those counts, so after ticking Black the other colours still show their full numbers.
- **Deactivating a variant axis does not switch the selector off.** A variant group keeps rendering its selector from the values its members carry, whether the attribute is active or not. Clear **Is Variant Axis** instead.
- Attribute names and values are part of the product search index, Greeklish spellings included, so assigning values improves search recall. Attaching or removing a value re-indexes that product straight away. Renaming an attribute or a value does not: the nightly re-sync picks that up.
- The **Sort Order** of values is scoped per attribute, so reordering the sizes of one attribute never moves the colours of another.

## Related

- [Products](/admin/catalog/products)
- [Variant groups](/admin/catalog/variant-groups)
