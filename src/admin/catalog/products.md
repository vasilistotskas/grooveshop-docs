---
title: Products
description: Create and maintain products end to end - translations, pricing, stock and reservations, images, SEO, tags, attributes, variants, publishing and how a change reaches the storefront.
---

# Products

<span class="sidebar-path">Catalog → Products</span>

The product list is where the catalog team creates, prices, stocks and publishes everything the store sells. Every store role (staff, admin, owner) can use it.

## What you see

The sidebar entry carries a red badge with the number of active products whose stock is between 1 and 9. The list shows 25 products per page, newest first, with a date drill-down by creation date above the table.

| Column | Meaning |
|---|---|
| **Product** | Name, main image thumbnail and the first 8 characters of the SKU. |
| **Category** | The product's category. |
| **Variants** | The variant group it belongs to, linked, with the number of siblings. |
| **Pricing** | Base price. When a discount is set: `price -> final price (-N%)`. |
| **Stock** | Colour label: **Out of stock**, **Critical (1-5)**, **Low (6-10)**, **In stock**. |
| **Active** | Whether the product is published on the storefront. |
| **Created** | Creation date and relative time. |

**Search** (box above the list) matches id, SKU, name, description, category name and brand name.

**Filters** open in a slide-out sheet with an Apply button: **Stock Status**, **Reservation Status** (has active reservations, none, reserved more than half the stock), **Price Range**, **Discount Status**, **Popularity** (trending, loved, well reviewed, new arrivals), **Active**, Category, Variant group, Brand, VAT, numeric ranges for stock, price, discount and view count, date ranges, **Likes count**, **Review Rating**, and **Price-drop Alerts Enabled**.

**Bulk actions** (select rows, then pick from the actions menu):

| Action | What it does |
|---|---|
| **Activate selected products** | Sets Active on and re-indexes the products for search. |
| **Deactivate selected products** | Sets Active off and re-indexes. |
| **Apply custom discount to selected products** | Opens a confirmation page where you type a percentage and choose whether inactive products are included. |
| **Clear discount from selected products** | Resets the discount to 0 on each product. |

Each row also has a **Duplicate as draft** row action (see below).

## The product form

The form is split into tabs. Above the tabs, language tabs switch between **Greek** (default), **English** and **German** for the translated fields (name and description).

### Product Information

| Field | Notes |
|---|---|
| **SKU** | Read-only. Generated automatically when empty. |
| **Category** | Autocomplete. See [Categories](/admin/catalog/categories). |
| **Variant Group** | Autocomplete. Links the product to its sibling variations; see [Variant groups](/admin/catalog/variant-groups). |
| **Brand** | Autocomplete. Brand names are not translated. |
| **Active** | Off keeps the product out of the storefront and the search index. |
| **Name** | Per language. The slug is pre-filled from the name on a new product. |
| **Description** | Per language, rich text editor. HTML is sanitised on save. |

### Pricing & Inventory

| Field | Notes |
|---|---|
| **Price** | Net price in EUR. |
| **Discount Percent** | 0 to 100. Rejected when the price is 0. |
| **Vat** | The VAT rate applied on top of the price; see [VAT rates](/admin/sales/vat-rates). |
| **Stock** | Units on hand. Cannot be negative. |
| **Weight** | Value and unit. |
| **Low Stock Threshold** | Alert level for this product; 0 disables the alert. Default 10. |

The storefront price is `price + VAT − discount`, where the discount is a percentage of the net price, rounded to whole cents.

### Loyalty Points

**Points Coefficient** multiplies the store-wide points factor for this product (0 means no calculated points). **Bonus Points** is a fixed amount added on purchase. See [Tiers & points](/admin/loyalty/tiers-and-points).

### Customer Alerts

**Price-drop Alerts Enabled** lets customers subscribe to a one-time email when this product's price falls below their target. It is off by default; opt products in one by one.

### Stock Audit

A read-only summary: current stock, quantity held by active reservations, the resulting available quantity, the count of reserve/release/decrement/increment operations in the last 7 days, and a link **Open full stock history chart**. The chart page shows a stacked bar chart per day for the last 90 days (change the window with `?days=`, between 7 and 365) and the 50 most recent stock log entries.

### SEO

**Slug** (unique, used in the product URL), **Seo Title** (up to 70 characters), **Seo Description** (plain text, up to 300), **Seo Keywords**.

### Performance

Read-only **View Count** and **Likes count** (favourites).

### System Information

Read-only id, uuid, timestamps and **Changed by**, the admin user who last saved the product.

### Inline tabs under the form

| Tab | What it holds |
|---|---|
| **Product Attributes** | One row per attribute value, chosen through autocomplete. See [Attributes & values](/admin/catalog/attributes-and-values). |
| **Product Images** | Thumbnail, image file and **Is Main**. Marking one image as main clears the flag on the others. Accepted files are the usual image formats plus SVG, up to the upload limit (2.5 MB by default). Order is a `sort_order` field managed per product. |
| **Active Stock Reservations** | Read-only rows: reservation id, quantity, who holds it (customer email or guest session), minutes until it expires, and whether it is pending checkout or already tied to an order. |
| **Stock Activity Logs (Recent 20)** | Read-only history of stock operations with before/after levels and the related order. |
| **Tags** | Generic tags attached to this product. See [Tags](/admin/catalog/tags). |
| **Related products** | Merchant-curated links to other products with a **Relation type** (Similar product, Goes well with, Accessory for, Replacement for, Bundle with). Rows are drag-ordered per product. Relations are one-directional: to show A on B and B on A, create both rows. A product cannot relate to itself. |

The **History** button on the form opens the field-level change history.

## Tasks

### Create a product
1. Open <span class="sidebar-path">Catalog → Products</span> and click **Add**.
2. In **Product Information** pick a Category, type the Greek **Name** and **Description**, then switch the language tab to add English and German.
3. In **Pricing & Inventory** set **Price**, **Vat** and **Stock**.
4. Save. Then open the **Product Images** tab, upload images and tick **Is Main** on one.
5. Add attribute values in **Product Attributes** if the product needs filters or specifications.
6. Leave **Active** off until the product is ready; switch it on to publish.

### Put a product on sale
1. Open the product, set **Discount Percent** in **Pricing & Inventory**, save.
2. For many products at once, select them in the list and run **Apply custom discount to selected products**; the confirmation page shows how many are active and inactive and lets you skip the inactive ones.
3. **Clear discount from selected products** ends the sale.

Customers who set a price-drop alert on the product receive their email when the customer-facing price goes down, which includes a discount.

### Adjust stock by hand
1. Change **Stock** on the product and save.
2. The change is recorded in **Stock Activity Logs** as a manual adjustment with your user, so the history explains every movement.

### Duplicate a product
1. In the list, use the row action **Duplicate as draft**.
2. A copy opens with **Active** off, stock 0, no translations, images, attributes or tags, and a slug and SKU suffixed `-copy-1` (or the next free number).
3. Fill in the copy and activate it when ready.

### Take a product off the storefront
- Temporary: switch **Active** off (or use **Deactivate selected products**). The product leaves the listing and the search index but keeps its history, reviews and links.
- Permanent: **Delete** on the product's page marks it as deleted; the row is kept in the database and is excluded from the storefront.

## Things to know

- **What makes a product invisible on the storefront**: **Active** off; a soft-deleted product; no translation at all (it renders without a name). An out-of-stock product still shows, but sorts after in-stock products in listings and search.
- **Search**: only active, non-deleted products are indexed. Saving a product re-indexes it in the background once the save commits; a full re-sync also runs nightly at 02:00. The two bulk activate/deactivate actions re-index explicitly because bulk updates bypass the save hook.
- **Storefront cache**: the product list is cached for 5 minutes and a product page for 10 minutes on the storefront; category data is cached for 1 hour on the storefront and 2 hours in the API by default. Product saves do **not** purge these caches. To see a price change immediately, purge the **Products** surface from the [Cache](/admin/system/cache) tool.
- **Stock reservations** hold units while a customer checks out. Their lifetime is the store setting `STOCK_RESERVATION_TTL_MINUTES` (seeded at 30 minutes; the code default is 15 if the setting is missing). Expired reservations are cleaned up hourly.
- **Low-stock alert**: an hourly task emails the store contact address once per product when stock is at or below the product's **Low Stock Threshold**, and re-arms when stock rises above it. The sidebar badge uses a fixed band of 1 to 9 units, independent of the per-product threshold.
- **Soft delete is not shown in the list**: a product deleted from its page keeps appearing in the admin list, because the list does not filter or flag deleted rows. Deactivate first if you want it to stay visible and obviously off.
- **Bulk Delete selected** removes rows outright; it does not go through the soft-delete path. Prefer deactivation.
- Discount rules enforced on save: percent between 0 and 100, no discount on a zero price, stock never negative.
- **Changed by** is filled from your admin session and feeds the product history.

## Related

- [Categories](/admin/catalog/categories)
- [Attributes & values](/admin/catalog/attributes-and-values)
- [Variant groups](/admin/catalog/variant-groups)
- [Reviews](/admin/catalog/reviews)
- [Tags](/admin/catalog/tags)
- [VAT rates](/admin/sales/vat-rates)
- [Cache](/admin/system/cache)
