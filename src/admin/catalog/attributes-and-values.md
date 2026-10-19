---
title: Attributes & values
description: Attributes such as Colour or Size and their values - creating them, giving them to products, filters, specifications and variant selectors.
---

# Attributes & values

An **attribute** is a kind of property, e.g. Colour. A **value** is one of its options, e.g. Red. You give a product values (Red), not attributes.

<span class="sidebar-path">Catalog → Attributes → Attributes</span> and <span class="sidebar-path">Catalog → Attributes → Attribute Values</span>

## What you see

In the store a value does up to three things:

- It shows in the specifications on the page of every product that has it.
- It is offered as a filter on the product list, if the value and its attribute are active.
- It becomes a button for choosing between variants, if its attribute has **Is Variant Axis**.

The **Attributes** list shows for each attribute whether it is **Active**, whether it **Is Variant Axis**, how many **Values** it has and its **Usage** (on how many products). The **Attribute Values** list shows each value with its attribute, **Active** and **Usage**.

## Tasks

### Create an attribute and its values
1. Open <span class="sidebar-path">Catalog → Attributes → Attributes</span>, click **Add**, write the **Name** in every language and save.
2. Open <span class="sidebar-path">Catalog → Attributes → Attribute Values</span> and click **Add**.
3. Pick the **Attribute**, write the **Value** in every language and save. Repeat for each option.
4. Back on the attribute's page, drag the rows of the **Values** tab into the order customers should see.

### Give a product values
1. Open the product from [Products](/admin/catalog/products) and its **Product Attributes** tab.
2. Add a row and type the first letters of the value or the attribute to find it.
3. Save. Each value goes on a product once.

### Make an attribute a variant selector
1. Open the attribute and tick **Is Variant Axis**.
2. Put the products in one variant group and give each its own value. See [Variant groups](/admin/catalog/variant-groups).

### Stop offering a value as a filter
Select it and choose **Deactivate selected values** (or, for a whole attribute, **Deactivate selected attributes**). The value stays on the products and in their specifications.

## Things to know

- **How filters combine.** Two values of the same attribute mean "or": Black and White shows products that are black or white. Values of different attributes mean "and": Black and 2 metres shows only products that are both.
- **Languages**: a value shows in the visitor's language. If the translation is missing it shows blank, with no other language put in its place.
- **Deleting cannot be undone.** Deleting an attribute erases all its values and removes them from every product. Deleting a value removes it from every product. Check the **Usage** column first.
- **Search**: attribute names and values help the store's search find products, Greeklish spellings included. Adding or removing a value on a product updates search at once. Renaming a value reaches search with the nightly update.
- Values are ordered per attribute: reordering sizes never moves colours.

## Related

- [Products](/admin/catalog/products)
- [Variant groups](/admin/catalog/variant-groups)
