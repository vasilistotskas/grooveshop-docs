---
title: Categories
description: Build the product category tree, order it, translate it, attach images and SEO text, and understand where categories appear on the storefront.
---

# Categories

<span class="sidebar-path">Catalog → Categories</span>

Categories group products into a tree of any depth. The catalog team maintains them; every store role can edit them.

## What you see

A flat list ordered by the categories' sort order. Each row shows:

| Column | Meaning |
|---|---|
| **Category** | Name plus `(level N)`, where level 0 is a top-level category. |
| **Active** | The category's Active flag. |
| **Subcategories** | Number of direct children. |
| **Image** | Thumbnail of the main image, if one is set. |
| **Created** | Creation date. |
| **Direct Products** | Products assigned to this exact category. |
| **Total Products** | Products in this category and all of its descendants. |

Rows can be **dragged** to change their order; the order is saved per set of siblings (categories that share the same parent).

**Search** matches the translated name and description. **Filters**: Active, created and updated date ranges, and Parent.

There are no bulk actions on this list beyond the standard delete.

## The category form

| Section | Fields |
|---|---|
| **Category Information** | **Parent** (leave empty for a top-level category), **Slug** (pre-filled from the name), **Active**. |
| **Content** | **Name** and **Description** (rich text), per language via the Greek / English / German tabs. |
| **SEO** (collapsed) | **Seo Title**, **Seo Description**, **Seo Keywords**. |
| **Analytics** (collapsed) | Read-only direct and total product counts. |
| **System Information** (collapsed) | uuid and timestamps. |

**Images** tab: one row per image with **Image**, **Image Type** and **Active**. Types are Main, Banner, Icon, Thumbnail, Gallery, Background, Hero, Feature, Promotional and Seasonal. A category can hold **one image per type**; the Main image is the one the storefront shows in category cards and headers. SVG files are accepted alongside the usual image formats.

## Tasks

### Add a subcategory
1. Click **Add**.
2. Pick the **Parent**, type the Greek **Name** (the slug fills in), then add the other languages.
3. Save. The new category appears after its siblings; drag it to the right place in the list.

### Reorder categories
1. In the list, drag a row up or down.
2. The order is stored automatically. Only siblings of the same parent are renumbered, so moving a top-level category never disturbs the order inside another branch.

### Give a category a picture
1. Open the category, go to the **Images** tab, click add.
2. Upload the file, set **Image Type** to **Main Image**, leave **Active** on, save.

### Move products between categories
Categories do not list their products for editing. Open each product from [Products](/admin/catalog/products) and change its **Category**, or filter the product list by category and edit the products one by one.

## Things to know

- **Deleting a category deletes its whole subtree.** Children are removed with the parent. Products in a deleted category keep existing with no category.
- **Active is not enforced on the storefront's category list.** The public category endpoints return every category regardless of the flag, so switching Active off does not hide a category by itself. Move its products or delete it if it must disappear.
- **Where categories show on the storefront**: the category navigation on the products listing page, category pages at `/products/category/<id>/<slug>`, the category filter on the search page, and the **Product Categories** section when a page layout includes it (see [Page layouts](/admin/storefront/page-layouts)). The header menu does not list categories unless you put them in a navigation menu yourself (see [Navigation](/admin/storefront/navigation)).
- **Cache**: category data is cached for 1 hour on the storefront and 2 hours in the API by default, and edits do not purge it. Purge the **Categories** surface from the [Cache](/admin/system/cache) tool to publish a change immediately.
- The slug is unique across all categories. A blank slug is generated from the name on save.
- The Greek name is the default; when it is empty the storefront falls back to the English name.

## Related

- [Products](/admin/catalog/products)
- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
