---
title: Products
description: Create products, set price and discount, manage stock and images, copy a product and take one off the store.
---

# Products

This is where you create and maintain what you sell: name, price, stock, images and publishing. Every store role can open it (Staff, Admin, Owner).

<span class="sidebar-path">Catalog → Products</span>

## What you see

The list shows the newest products first. Each row has the name with a thumbnail and the start of the SKU (product code), the category, the variant group, the price and the stock.

| Label in the **Stock** column | Units |
|---|---|
| **Out of stock** | 0 |
| **Critical** | 1 to 5 |
| **Low** | 6 to 10 |
| **In stock** | more than 10 |

The number next to **Products** in the sidebar counts active products with 1 to 9 units. The Dashboard shows the same number as **Running low on stock**.

Search finds products by SKU, name, description, category or brand. The filters (stock, price, discount, category, brand and more) open in a side panel.

## Tasks

### Add a product
1. Click **Add**.
2. On the **Product Information** tab pick a **Category** and, if you like, a **Brand**. Write the **Name** and **Description** in every language tab your store shows.
3. If the product is not ready to be seen, untick **Active**. A new product is active by default.
4. On the **Pricing & Inventory** tab fill in **Price** (before VAT), **VAT** and **Stock**.
5. Save. Then upload photos on the **Product Images** tab and tick **Is Main** on one.
6. If the product needs filters or specifications (colour, size), add values on the **Product Attributes** tab.
7. When everything is right, tick **Active** and save.

### Put a product on sale
1. Open the product and enter the **Discount Percent** on the **Pricing & Inventory** tab.
2. Save.

For many products at once, select them in the list and choose **Apply custom discount to selected products**. The next page asks for the percentage and whether to include inactive products. **Clear discount from selected products** ends the sale.

Example: price €100, VAT 24%, discount 10%. The discount comes off before VAT: €90 + €21.60 VAT = **€111.60** final price.

### Correct the stock
1. Change the **Stock** on the product and save.
2. The change is recorded on the **Stock activity** tab with your name. Sales show there too, separately, with their order.

The very first save of a new product is not recorded there; later changes are.

### Make a similar product
1. In the list, click **Duplicate as draft** on the product's row.
2. An inactive copy opens with stock 0. It has no name, description, images, attributes or tags.
3. The price, discount, VAT, weight, category, brand and variant group **are copied**. Check them.
4. Fill in the copy and activate it when it is ready.

### Take a product off the store
- **For now**: untick **Active**, or select it in the list and choose **Deactivate selected products**. The product keeps its reviews, history and links, and comes back when you activate it.
- **For good**: the **Delete** button on the product's page removes it from the store but keeps the record and everything linked to it.

### Download a product list
Select products and choose **Export selected to CSV** (for Excel) or **Export selected to XML**.

## The form's tabs

| Tab | What it holds |
|---|---|
| **Product Information** | Category, variant group, brand, **Active**, name and description per language. The SKU is filled in automatically. |
| **Pricing & Inventory** | Price, discount, VAT, stock, weight and **Low Stock Threshold**. Also, read-only, **Effective Price**, **Prior Price** and **Reduction Started At** (see below). The **Owner** also sees **Cost price** here (see below). |
| **Loyalty Points** | **Points Coefficient** (multiplies the points the product earns; 0 = none) and **Bonus Points** (fixed points per purchase). |
| **Customer Alerts** | **Price-drop Alerts Enabled**: tick it so customers can ask for an email when the price drops. Off by default. |
| **Stock Audit** | How many units customers are holding at checkout right now, how many remain available, and the **Open full stock history chart** link. |
| **SEO** | **Slug** (the last part of the page's web address), **Seo Title**, **Seo Description**, **Seo Keywords**. |
| **Performance** | **View Count** and how many customers have the product in their favourites. |
| **System Information** | **Created At**, **Updated At** and **Changed By** (who saved last). |

Below the form there are also the **Product Attributes**, **Product Images**, **Active Stock Reservations**, **Product price spells** (the price history, read-only), **Tags**, **Related products** and **Stock activity** tabs.

## Cost price

Only the **Owner** role sees **Cost price**, under **Price** on the **Pricing & Inventory** tab. It is what one unit costs you, before VAT, in euro. It is optional and it is never shown to customers, Admin or Staff, and it is left out of the exported product files.

- The [Profit](/admin/sales/profit) page uses it. When a product is sold, its current cost price is copied onto the order line. Changing it later does not change past sales, and sales made before you entered one have no cost.
- Leave it empty when you do not know it: such sales are reported as having no cost, they are not counted as free. Enter **0** only for a product that really costs you nothing.
- The cost price is not kept in the product's change history.

## Things to know

- **Effective Price** is what a customer pays now: the price with VAT, minus the discount and any automatic promotion that applies without conditions. It is calculated for you.
- **Prior Price** is the lowest price of the 30 days before the current reduction began. The store shows it struck through, labelled "Lowest price in the last 30 days". When it is empty, no struck-through price is shown.
- **The box under the buy button** lists up to three lines: the delivery time (the **Delivery Days** on your [shipping providers](/admin/settings/shipping-providers), with the free-shipping amount under it), how the customer can pay (the active [payment methods](/admin/settings/payment-methods), worded by how the money is collected, for example "Card or cash on delivery") and the return period (`RETURN_WINDOW_DAYS`). A line shows only when the store has that information, and the box follows `PRODUCT_ASSURANCES_ENABLED`. When the box is on, it states the free-shipping amount instead of the separate free-shipping message on the product page; the cart keeps that message.
- **What hides a product from customers**: only **Active** turned off, or deletion. An out-of-stock product still shows.
- **Languages**: where the name or description is missing in a language, the store shows the store's default language instead.
- **Search**: saving a product updates the store's search shortly after. So do the bulk activate and deactivate actions.
- **Cache**: a change you save to text, price, stock, images or attributes reaches the store on its own within seconds. Stock that moves with orders (sales, cancellations) can take a few minutes to show on the page; checkout always checks the real stock.
- **Stock reservations**: while a customer completes a purchase, their units are held for a while. The length is the `STOCK_RESERVATION_TTL_MINUTES` setting under <span class="sidebar-path">Settings → Store Settings</span> (category **Orders & Checkout**), 30 minutes to start with.
- **Low-stock email**: once an hour, the store's contact email receives one message listing the active products that reached their **Low Stock Threshold** or fell below it (10 to start with). Each product is listed once, until it rises above the threshold again. Set 0 to stop alerts for a product.
- **The two deletes differ.** **Delete** on the product's page keeps the record. Bulk delete from the list erases the product for good, with its reviews and images. Prefer deactivating.
- The **History** button at the top right of the form shows who changed what and when.

## Related

- [Categories](/admin/catalog/categories)
- [Brands](/admin/catalog/brands)
- [Attributes & values](/admin/catalog/attributes-and-values)
- [Variant groups](/admin/catalog/variant-groups)
- [Images](/admin/catalog/images)
- [Reviews](/admin/catalog/reviews)
- [Product alerts](/admin/customers/product-alerts)
- [VAT rates](/admin/settings/vat-rates)
