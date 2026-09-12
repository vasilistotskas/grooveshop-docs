---
title: Cache
description: Why an edit may not show on the storefront right away, what the Cache page purges, how to use it safely, and what it cannot fix.
---

# Cache

<span class="sidebar-path">Site dropdown → Cache</span>

The storefront keeps rendered pages and API responses in a cache so it can serve visitors fast. Most edits reach the storefront on their own within minutes; the Cache page is for when you need it now. Every admin user can open it (`admin/admin.py`, `clear_cache_view`).

## Why a change does not show

Two caches sit between the admin and a visitor:

1. **The API cache** (Django, Redis). Responses such as product lists and category trees are kept for a while.
2. **The storefront cache** (Nuxt). Both the JSON the storefront fetched and the **rendered HTML** of many pages are kept. Product pages are re-rendered at most every five minutes, blog pages every ten, and the settings payload about once a minute.

Also, your own browser may show a cached page. Reload with the cache bypassed (Ctrl+Shift+R) before assuming the server is stale.

Some writes purge on their own (`core/cache/invalidation.py`, `admin/signals.py`): saving a payment method, a product, a category, a product relation or a suggestion slot purges the surfaces that depend on it, and any order or stock write refreshes the dashboard numbers. Everything else waits for its time to expire or for a manual purge.

## What you see

The page lists **surfaces**, grouped as catalog, commerce, config and content. Each card shows the surface name, a description of what it covers, the live number of keys currently cached, and which other surfaces are related.

| Surface | Purge after you change |
|---|---|
| **Products** | a product, its images, attributes, price or stock. Also refreshes the product feeds for Meta, TikTok and agents. |
| **Categories** | a category, its image or the tree. Also refreshes the feeds. |
| **Payment methods** | a payment method's availability, cost or description. |
| **Shipping options** | a shipping provider, a shipping price, or after a station or locker sync. |
| **Regions & Countries** | rarely needed; the address pickers. |
| **Loyalty** | tiers or loyalty settings shown on the storefront. |
| **Promotions** | a promotion, its codes or schedule. The offers page is covered. |
| **Product recommendations** | curated relations or slots. Purges itself on save. |
| **Blog** | posts, categories, tags, authors, comments. |
| **Pages & navigation** | a page layout, a section's props, a content page, or a menu. |
| **Tags** | tags shared by products and posts. |
| **Sitemap & SEO** | anything that should appear in the sitemap, the RSS feed or the AI-readable index right away. |
| **Site settings** | any Extra Setting, and the seller identity shown in the footer. |
| **Translations (parler)** | marked **Heavy**. Forces every translated row to be re-read from the database. Use only when told to. |

Below the cards: the twenty most recent purges (who, when, which surfaces, how many keys).

If the storefront purge is not configured for the environment, the page says so and only the API half is purged.

## Tasks

### Purge one area

1. Open the site dropdown (store name at the top of the sidebar) and click **Cache**.
2. Tick the surface(s) you edited. **Select all** and **Select none** are above the cards.
3. **Include related surfaces** is ticked by default and also purges the surfaces listed as related (for example Products also purges Categories and Tags). Untick it for a narrower purge.
4. Click **Purge selected**.

A green message reports how many API keys and storefront keys were removed. A red message means the API cache backend did not answer and nothing was removed; a yellow one means the storefront could not be reached.

### Preview before purging

Tick the surfaces and click **Dry run**. The message shows how many keys **would** be removed and nothing is deleted. The live counters update as you tick.

### Purge everything

**Purge all** removes every surface at once except those marked Heavy, after a confirmation prompt. It is safe but makes the next few storefront requests slower while pages are rebuilt. Prefer a targeted purge during business hours.

## Things to know

- Purging does not change data. If the edit itself is wrong, purging will simply show the wrong edit faster.
- Purging does not affect the customer's browser cache or a CDN in front of the site; a customer may still need to reload.
- Search results come from the search engine's index, not from this cache; a product that does not appear in search is re-indexed on save and by a nightly job.
- Product feeds for Meta and TikTok are refreshed by purging Products or Categories.
- Every purge is logged; platform operators can review the full log under <span class="sidebar-path">System → Audit & Logs → Cache Purge Log</span>.
- A full cache reset also runs automatically on the first of every month at 04:00.

## Related

- [Store settings](/admin/settings/store-settings)
- [Products](/admin/catalog/products)
- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Audit & logs](/admin/system/audit-and-logs)
