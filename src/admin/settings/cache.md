---
title: Cache
description: What to do when a change does not show on your storefront, and how to clear the stored copy (cache) of one area.
---

# Cache

Your storefront keeps ready-made pages in a cache, a stored copy that makes them open fast. Most of your changes show on their own within about a minute. This page is for the few times a change is slow to appear.

<span class="sidebar-path">Settings → Cache</span>

Owners and Admins can open this page. Staff cannot.

## What you see

The **Cache Management** page shows one card for each area of the storefront, in four groups: **Catalog**, **Commerce**, **Content** and **Configuration**. Each card shows a name, a short description, how many stored items it holds now and, after the arrow, which other areas it clears along with it.

| Area | Clear it when a change does not show in… |
|---|---|
| **Products** | products, images, attributes, brands, search results. It also refreshes the feeds (the product files for Meta, TikTok and Google). |
| **Categories** | categories, their images and the categories in the menu. |
| **Tags** | product and blog tags. |
| **Payment methods** | a payment method's availability, cost or instructions. |
| **Shipping options** | shipping prices, providers, the lists of lockers and ACS stations. |
| **Regions & Countries** | the country and region lists of the checkout address. |
| **Loyalty** | loyalty tiers and rules as the customer sees them. |
| **Promotions** | promotions, the offers page and the offer badge on products. |
| **Product recommendations** | the recommended products the storefront shows. |
| **Blog** | blog posts, categories, tags and authors. |
| **Pages & navigation** | content pages, page layouts, menus and the home page. |
| **Storefront pages** | every page of the storefront at once. |
| **Sitemap & SEO** | the sitemap (the site map for search engines) and RSS. |
| **Site settings** | values in Store Settings and the seller details at the bottom of the page. |
| **Translations (parler)** | Marked **Heavy**. Clear it only if the platform team asks you to. |

At the bottom, the **Recent activity** table shows your store's last twenty clears: who, when and which areas.

## Tasks

### My change does not show on the storefront

1. Wait a minute.
2. Reload the storefront page with **Ctrl+Shift+R** (on a Mac **Cmd+Shift+R**), so your browser does not show its own old stored copy.
3. If it still does not show, clear the area you changed (see the next task).
4. If it does not show even after clearing, check the change itself. For example, that the product is active and that you clicked **Save**.

### Clear one area

1. Open <span class="sidebar-path">Settings → Cache</span>.
2. Tick the card of the area you changed. You can tick more than one.
3. Leave **Include related surfaces** ticked, so the areas after the arrow are cleared too.
4. Click **Purge selected**.

A green message confirms the clear. A red or yellow message means something was not cleared. Try again in a few minutes. If it happens again, send a screenshot to [support](/admin/help/contact-support).

### See what would be cleared, without clearing

Tick the cards and click **Dry run**. The message says how many items would go. Nothing is deleted.

### Clear everything

Click **Purge all** and confirm. Every area is cleared except **Translations (parler)**. Right after, the storefront is a little slower until its pages are built again, so prefer clearing only the area you need.

## Things to know

- **Updated on their own** as soon as you save: products, categories, tags, payment methods, shipping providers and prices, VAT rates, promotions (also when one starts or ends on its dates), coupon codes, reviews you approve or reject, blog posts and comments, pages, layouts and menus. The same goes for bulk actions on a list, such as activating many products at once.
- When you switch a feature on or off in [Store settings](/admin/settings/store-settings), every storefront page is updated on its own.
- **Need a few minutes or a clear:** the other Store Settings values, loyalty, the sitemap, and a sync of lockers or ACS stations.
- When an order lowers the stock, the product page is not refreshed right away. Checkout always checks the real stock, though, so you never sell something that ran out.
- Clearing changes none of your data. If the change itself is wrong, clearing only shows the mistake sooner.
- If a product is missing from search, save it again. Search is updated on every save and again every night.
- A visitor who already has the page open may need to reload it.

## Related

- [Store settings](/admin/settings/store-settings)
- [Products](/admin/catalog/products)
- [Menus](/admin/content/menus)
- [Page layouts](/admin/content/page-layouts)
- [When to contact support](/admin/help/contact-support)
