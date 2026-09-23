---
title: Page layouts
description: Compose the home page and the branded bands of other storefront pages from sections, set per-page SEO text, and publish.
---

# Page layouts

<span class="sidebar-path">Not in the sidebar. Open the command palette (Ctrl+K / ⌘K) and type "Page Layout", or go to `/admin/page_config/pagelayout/`.</span>

A page layout is a list of **sections** the storefront renders in order for one page type. The home page is built entirely from its layout; other page types only get an optional branded band above their own content.

## What you see

| Column | Meaning |
|---|---|
| **Page Type** | Which page the layout belongs to. The storefront asks for nine by name: `home`, `products`, `blog`, `about`, `contact`, `feedback`, `vision`, `what-is-microlearning` and `why-microlearning`. Any other value you type becomes a page of its own at `/<that value>`. |
| **Title** | Admin display name. |
| **Is Published** | Editable in the list; tick and press **Save**. |
| **Updated at** | Last change. |

**Search** matches page type and title. **Filters**: Is Published, Page Type.

The layout form:

| Section | Fields |
|---|---|
| **Page** | **Page Type** (unique), **Title**. |
| **Publishing** | **Is Published**. |
| **SEO** | **Seo Title**, **Seo Description**, **Seo Keywords**. Left empty, the page keeps its built-in title and the store description. |
| **Metadata** (collapsed) | Free JSON, not used by the storefront. |
| **System** (collapsed) | ids and timestamps. |

Below the form, the **Page Sections** table lists the sections in render order with:

| Field | Meaning |
|---|---|
| **Component Type** | Which block to render (list below). |
| **Title** | Optional heading, shown by blocks that have one. |
| **Is Visible** | Untick to hide a section without deleting it. |
| **Props** | Block-specific settings as JSON. |
| **Locale Overrides** | Per-language copy: `{"en": {"title": "...", "props": {...}}}`. Only the keys that differ; the default language is the fields themselves. |
| **Sort Order** | Read-only here; new sections go to the end. |

### Section types

| Type | Props it accepts |
|---|---|
| Hero Banner | heading, subheading, eyebrow, image_url, cta_text, cta_link, secondary_cta_text, secondary_cta_link, stats, overlay_opacity, decor |
| Hero Carousel | images, mobile_images, link |
| Products Slider | page_size (1-24) |
| Products Grid | page_size (1-48) |
| Featured Products | page_size (1-24), columns (1-6) |
| Product Categories | none |
| Blog Categories Rail, Blog Posts Carousel (count 1-12), Blog Posts Grid (count 1-24), Blog Posts List (page_size 1-24) | as listed |
| Recently Viewed Rail | none; also needs the **RECENTLY_VIEWED_ENABLED** setting on |
| Rich Text Block | content (HTML, up to 20000 characters) |
| Call to Action Banner | heading, description, button_text, button_link, background_color, surface |
| Newsletter Signup | heading, description, placeholder, button_text, surface; an email form with a consent box, shown only when a default Newsletter topic exists (see [Subscriptions](/admin/customers/subscriptions)) |
| Testimonials | items (name, text, avatar) |
| Spacer (height), Divider (variant) | layout helpers |
| Loyalty Program Hero, Search Bar, Business Hours | none; Business Hours reads its opening times from the **BUSINESS_HOURS** setting |
| Location Map | embed_url, lat, lng, address |
| Features Grid, Media + Text, Image Gallery, Story Timeline, FAQ Accordion | generic marketing blocks; each accepts its own set of text, item and link props |
| Partner Strip, Pull Quote, Reference Cards, Page Hero, Feature Lists, Option Selector, Comparison Table, Flow Steps, Project Register, Vendor Cards, Contact Panel, About Content, Vision Content, What Is Microlearning, Why Microlearning | **built for specific storefront designs only** — see the warning below |

### Two warnings about this list

**Fifteen of these blocks render nothing on an ordinary store.** The eleven from **Partner Strip** to **Contact Panel**, plus the four content blocks from **About Content** to **Why Microlearning**, were written for particular storefront designs. Pick one on a store that does not use that design and the section saves, shows as visible, and then simply does not appear on the page: no error, no gap, no warning. Before you build a page around one, add it to a test layout, publish, purge the cache and check it actually shows. The blocks in every other row of the table work on every store.

**Props are not checked when you save them here.** Type a key that does not exist, a number where text belongs or an oversized string, and the section is stored exactly as typed. You find out by loading the page. Links in props (`cta_link`, `button_link`, `link`) must be internal paths starting with `/` or `https://` addresses, and page counts must stay inside the ranges above, but nothing on this screen will stop you breaking either rule. Change one section at a time and check the result.

## Seeded layouts

Every store starts with a published `home` layout of four sections: Blog Categories Rail, Hero Carousel (no images), Recently Viewed Rail, Blog Posts List. Other page types are not seeded: `products`, `blog`, `contact` and `feedback` render their normal page and show a layout only as a band above it, while `about`, `vision` and the microlearning pages show nothing until a layout is published.

## Tasks

### Put a banner on the home page
1. Open the `home` layout and find the **Hero Carousel** section.
2. In **Props**, set `{"images": ["/img/banner.png"], "mobile_images": ["/img/banner-mobile.png"], "link": "/products/123/my-product"}`. The images must already be reachable on the storefront.
3. Save, then purge **Pages & navigation** in the [Cache](/admin/system/cache) tool.

### Add a section
1. In **Page Sections** click add, pick the **Component Type**, fill **Title** and **Props**.
2. Save. The section is appended last. Sort order is not editable in this table; to reorder, delete and re-add sections in the order you want.

### Translate a section
Put the other language's copy under **Locale Overrides**: `{"en": {"title": "Our story", "props": {"heading": "..."}}}`. Structural props (counts, columns, links) stay in **Props** so they cannot drift between languages.

### Build an About page
1. Click **Add**, set **Page Type** to `about`, a **Title**, and tick **Is Published**.
2. Add sections and fill their props. Stay with blocks that work on every store, such as **Media + Text**, **Image Gallery**, **Story Timeline**, **FAQ Accordion**, **Rich Text Block** and **Call to Action Banner**. Do not reach for **Page Hero** or **About Content** unless you have confirmed your storefront design renders them.
3. Fill **Seo Title** and **Seo Description**; without them the page uses its built-in title and the store description.
4. Save, purge the cache, then open `/about` and check every section you added is actually on the page.
5. Link the page from a menu with `"to": "/about"`.

## Things to know

- Only **published** layouts are served, and a section with **Is Visible** off is never sent to the browser at all. Neither is merely hidden with styling.
- **Cache**: layouts and the rendered home, about, contact, feedback and info pages are cached on the storefront. Saving a layout does not purge them. Purge **Pages & navigation** to publish a change.
- **Sections cannot be reordered.** New ones always go last and **Sort Order** is read-only, so getting a different order means deleting the sections below the insertion point and adding them back in sequence. Plan the order before you build a long page.
- The **Recently Viewed Rail** also needs the **RECENTLY_VIEWED_ENABLED** setting on, and **Business Hours** reads its opening times from **BUSINESS_HOURS**, both under <span class="sidebar-path">Settings → Extra Settings</span>. Neither block warns you when its setting is missing.
- Recommendation slots are configured elsewhere, not in page layouts.

## Related

- [Navigation](/admin/storefront/navigation)
- [Content pages](/admin/storefront/content-pages)
- [Categories](/admin/catalog/categories)
- [Cache](/admin/system/cache)
