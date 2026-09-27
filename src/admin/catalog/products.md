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
| **Stock** | Colour label carrying the unit count: **Out of stock** at 0, **Critical** at 1-5, **Low** at 6-10, **In stock** above that. |
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
| **SKU** | Read-only. Every new product is given one automatically. |
| **Category** | Autocomplete. See [Categories](/admin/catalog/categories). |
| **Variant Group** | Autocomplete. Links the product to its sibling variations; see [Variant groups](/admin/catalog/variant-groups). |
| **Brand** | Autocomplete. Brand names are not translated. |
| **Active** | Off keeps the product out of the storefront and the search index. |
| **Name** | Per language. The slug is pre-filled from the name on a new product. |
| **Description** | Per language, rich text editor; what it accepts is described under [Blog posts](/admin/blog/posts). |

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

A read-only summary: current stock, quantity held by active reservations, the resulting available quantity, the count of reserve/release/decrement/increment operations in the last 7 days, and a link **Open full stock history chart**. The chart page shows a stacked bar chart per day for the last 90 days and the 50 most recent stock entries. To widen or narrow the window, add `?days=180` to that page's address; anything below 7 or above 365 is clamped.

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
| **Product Images** | Thumbnail, image file and **Is Main**. Marking one image as main clears the flag on the others, so a product always has at most one. Accepted files are the usual image formats plus SVG, up to 2.5 MB each. Images keep the order in which they were added, and that order cannot be changed from this tab. To reorder them, open the separate **Product Images** list at `/admin/product/productimage/`, filter it to the product and drag the rows. |
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
2. The change is recorded in **Stock Activity Logs** as **Manual stock adjustment via admin panel**, attributed to you, so the history explains every movement. Sales and reservations are logged separately with their order, and never as a manual adjustment.
3. A brand-new product is the one exception: the very first save has nothing to compare against, so its opening stock is not logged. Later edits are.

### Duplicate a product
1. In the list, use the row action **Duplicate as draft**.
2. A copy opens with **Active** off, stock 0 and views 0, no translations, images, attributes or tags, a slug ending `-copy-1` and an SKU ending `-COPY-1` (or the next free number).
3. Price, discount, VAT, weight, category, brand, variant group and the alert settings **are** carried over, so check them before you publish.
4. Fill in the copy and activate it when ready.

### Take a product off the storefront
- Temporary: switch **Active** off (or use **Deactivate selected products**). The product leaves the listing and the search index but keeps its history, reviews and links.
- Permanent: **Delete** on the product's page marks it as deleted. The product is kept, with its reviews, images and history intact, and is excluded from the storefront.

## Things to know

- **What makes a product invisible on the storefront**: only two things. **Active** is off, or the product has been deleted. Nothing else hides it. A product with no name in any language still appears, with an empty name where the title should be. An out-of-stock product also still appears. Listings prefer in-stock items when ranking, but that is a tie-breaker applied after how well a product matches what the shopper typed, so an out-of-stock product can still come first on a close match.
- **Search**: only active, non-deleted products are indexed. Saving a product re-indexes it in the background once the save goes through, and so does adding or removing one of its attribute values. Renaming an attribute value does not re-index the products carrying it; a full re-sync runs nightly at 02:00 and catches those. The two bulk activate/deactivate actions re-index explicitly, because a bulk change never runs the per-product save that normally triggers it.
- **Storefront cache**: the product listing and each product page are held for 5 minutes on the storefront; category data is held for 1 hour there and 2 hours behind it. Product saves purge **none** of it. To see a price change immediately, purge the **Products** surface from the [Cache](/admin/system/cache) tool.
- **Stock reservations** hold units while a customer checks out. Their lifetime is the store setting **STOCK_RESERVATION_TTL_MINUTES** under <span class="sidebar-path">Settings → Extra Settings</span>, seeded at 30 minutes; if it is removed or set to anything other than a positive whole number, 15 minutes is used instead. Expired reservations are cleaned up hourly.
- **Low-stock alert**: once an hour the store contact address receives a single email listing every **active** product that has just reached or fallen below its **Low Stock Threshold**. A product is listed once and becomes eligible again only after its stock rises back above the threshold. Products that are inactive, or whose threshold is 0, are never alerted. The sidebar badge is a different measure: a fixed band of 1 to 9 units, whatever the per-product threshold says.
- **A deleted product is not marked as deleted in the list**: one you deleted from its own page keeps appearing here, looking like any other row, because the list neither hides nor flags them. Deactivate instead if you want the state to be obvious at a glance.
- **The two kinds of delete differ.** **Delete** on a product's own page only marks it deleted and keeps everything attached to it. The bulk **Delete selected** action erases the rows for good, taking their reviews, images and attribute assignments with them. Prefer deactivation to either.
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
