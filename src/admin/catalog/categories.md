---
title: Categories
description: The product category tree - adding, ordering, images, hiding a category and where categories show in the store.
---

# Categories

Categories arrange products in a tree, e.g. Accessories → Cables. Customers see them in the menu, in the filters and on category pages.

<span class="sidebar-path">Catalog → Categories</span>

## What you see

One row per category, in the order you set. Under the name you see the **Level**: **Level 0** is a top-level category, **Level 1** one of its subcategories, and so on.

| Column | Meaning |
|---|---|
| **Active** | Whether the category shows in the store. |
| **Subcategories** | How many direct subcategories it has. |
| **Direct Products** | Products that belong to exactly this category. |
| **Total Products** | Products in it and in all its subcategories. |

## Tasks

### Add a category or subcategory
1. Click **Add**.
2. For a subcategory, pick a **Parent**. Leave it empty for a top-level category.
3. Write the **Name** in every language tab your store shows. The **Slug** (the last part of the page's web address) is filled in from the name.
4. Save. The new category goes last among its siblings.

### Change the order
Drag a row up or down in the list. The order changes only among categories with the same parent.

### Add an image
1. Open the category and its **Product Category Images** tab.
2. Add a row, upload the file and leave **Image Type** on **Main Image**.
3. Save.

The store shows only the **Main Image**, as long as it is **Active**. The other types (**Banner Image**, **Icon Image**, **Thumbnail Image**, **Hero Image**, **Feature Image** and so on) are stored but not shown in the store. Each category takes one image per type.

### Hide a category
Untick **Active** and save. The category and all its subcategories leave the menu, the filters and the sitemap. Its products are not deactivated.

### Move products to another category
The category page does not change products. In [Products](/admin/catalog/products) filter by category, open each product and change its **Category**.

## Things to know

- **Deleting a category also deletes its subcategories.** Their products are left without a category. To hide a category, prefer **Active**.
- **Languages**: where the name is missing in a language, the store shows a blank in that language. Name every category in all your store's languages.
- **Cache**: saving a category or its image reaches the store on its own within seconds. If something still does not show after a few minutes, clear **Categories** from [Cache](/admin/settings/cache).
- The form also has a **Description** per language, an **SEO** section and an **Analytics** section with the product counts.

## Related

- [Products](/admin/catalog/products)
- [Images](/admin/catalog/images)
- [Menus](/admin/content/menus)
- [Page layouts](/admin/content/page-layouts)
