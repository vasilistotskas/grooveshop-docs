---
title: Cache
description: Why an edit may not show on the storefront right away, what the Cache page purges, how to use it safely, and what it cannot fix.
---

# Cache

<span class="sidebar-path">Site dropdown → Cache</span>

The storefront keeps rendered pages and data in a cache so it can serve visitors fast. Most edits reach the storefront on their own within minutes; the Cache page is for when you need it now. Every admin user can open it, Staff included.

## Why a change does not show

Two caches sit between the admin and a visitor:

1. **The data cache.** Answers such as product lists and category trees are kept for a while.
2. **The storefront cache.** Both the data the storefront fetched and the **rendered pages** themselves are kept. Product and catalogue pages are re-rendered at most every five minutes, blog pages every ten, the home page every five, the static brand pages every hour, and the settings payload about once a minute.

Also, your own browser may show a cached page. Reload with the cache bypassed (Ctrl+Shift+R) before assuming the server is stale.

Very little purges on its own. Saving a **payment method**, in any language, purges the payment-methods and shipping-options surfaces, because the checkout renders the text you wrote. Saving a product, a category, a curated product relation or a suggestion slot purges the **Product recommendations** surface. That is the whole list: a product's own price, stock and images are *not* purged by saving the product, because a catalogue import would otherwise sweep the cache once per row. Everything else waits for its time to expire or for a manual purge.

## What you see

The page lists **surfaces**, grouped as catalog, commerce, config and content. Each card shows the surface name, a description of what it covers, the live number of entries currently cached, and which other surfaces are related.

| Surface | Purge after you change | Also purges |
|---|---|---|
| **Products** | a product, its images, attributes, price or stock; also the search endpoint. | Categories, Tags, and the product feeds for Meta, TikTok and AI agents. |
| **Categories** | a category, its image, the tree, or the category map behind the navbar. | the same product feeds. |
| **Payment methods** | a payment method's availability, cost, description or instructions. | Shipping options, which embed the eligible methods. |
| **Shipping options** | a shipping provider, a shipping price, or a station or locker sync. | |
| **Regions & Countries** | rarely needed; the address pickers at checkout. | |
| **Loyalty** | tiers or loyalty settings shown on the storefront. Only the storefront half is cached, so this is a light purge. | |
| **Promotions** | a promotion, its codes or its schedule. The public offers page is covered. | |
| **Product recommendations** | curated relations or slots. Purges itself on save. | |
| **Blog** | posts, categories, tags, authors, comments. | |
| **Pages & navigation** | a page layout, a section's props, a content page, or a menu, and the rendered pages built from them. | |
| **Tags** | tags, which products and posts share. | |
| **Sitemap & SEO** | anything that should appear in the sitemap, the RSS feed or the AI-readable index right away. | |
| **Site settings** | any Extra Setting, and the seller identity shown in the footer. | Payment methods, Shipping options and Loyalty. |
| **Translations (parler)** | marked **Heavy**. Forces every translated row to be re-read from the database. Use only when told to. | |

Below the cards: the twenty most recent purges (who, when, which surfaces, how many entries).

If the storefront purge is not configured for the environment, the page says so and only the data half is purged.

## Tasks

### Purge one area

1. Open the site dropdown (store name at the top of the sidebar) and click **Cache**.
2. Tick the surface or surfaces you edited. **Select all** and **Select none** are above the cards.
3. **Include related surfaces** is ticked by default and also purges everything in the "Also purges" column above. Untick it for a narrower purge.
4. Click **Purge selected**.

A green message reports how many entries were removed on each side. A red message means the data cache did not answer and those entries are still cached; a yellow one means the storefront could not be reached.

### Preview before purging

Tick the surfaces and click **Dry run**. The message shows how many entries **would** be removed and nothing is deleted. The live counters update as you tick.

### Purge everything

**Purge all** asks you to confirm, then removes every surface at once except **Translations (parler)**, which is never swept by **Purge all** or by the related cascade and can only be purged by ticking it yourself. Purging everything is safe but makes the next few storefront requests slower while pages are rebuilt. Prefer a targeted purge during business hours.

## Things to know

- Purging does not change data. If the edit itself is wrong, purging will simply show the wrong edit faster.
- Purging does not affect the customer's browser cache or a CDN in front of the site; a customer may still need to reload.
- Search results come from the search engine's index, not from this cache; a product that does not appear in search is re-indexed on save and by a nightly job.
- Product feeds for Meta, TikTok and AI agents are refreshed by purging Products or Categories.
- Every purge, dry runs included, is recorded. The last twenty appear on this page, and the complete record lives on the platform console rather than in your admin.
- A full cache reset also runs automatically on the first of every month at 04:00.

## Related

- [Store settings](/admin/settings/store-settings)
- [Products](/admin/catalog/products)
- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Audit & logs](/admin/system/audit-and-logs)
