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
| **Page Type** | The identifier the storefront asks for (`home`, `products`, `blog`, `about`, `contact`, `feedback`, `vision`, and the two microlearning pages). |
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
| Recently Viewed Rail | none; also needs the store setting `RECENTLY_VIEWED_ENABLED` |
| Rich Text Block | content (HTML, up to 20000 characters) |
| Call to Action Banner | heading, description, button_text, button_link, background_color, surface |
| Newsletter Signup | heading, description, placeholder |
| Testimonials | items (name, text, avatar) |
| Spacer (height), Divider (variant) | layout helpers |
| Loyalty Program Hero, Search Bar, Business Hours | none |
| Location Map | embed_url, lat, lng, address |
| Features Grid, Media + Text, Image Gallery, Story Timeline, FAQ Accordion, Partner Strip, Pull Quote, Reference Cards, Page Hero, Feature Lists, Option Selector, Comparison Table, Flow Steps, Project Register, Vendor Cards, Contact Panel | generic marketing blocks; each accepts its own set of text, item and link props |
| About Content, Vision Content, What Is Microlearning, Why Microlearning | brand blocks with no props; the markup lives in the storefront |

Props are validated on save against each block's contract: unknown keys, wrong types and over-long strings are rejected with a message naming the key. Links in props (`cta_link`, `button_link`, `link`) must be internal paths or `https://` URLs.

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
2. Add sections such as **Page Hero**, **Media + Text** and **FAQ Accordion**, fill their props, save.
3. Fill **Seo Title** and **Seo Description**; without them the page uses its built-in title and the store description.
4. Purge the cache. Link the page from a menu with `"to": "/about"`.

## Things to know

- Only **published** layouts are served; visitors never see an unpublished layout or a hidden section.
- **Cache**: layouts and the rendered home, about, contact, feedback and info pages are cached on the storefront. Saving a layout does not purge them. Purge **Pages & navigation** to publish a change.
- Page types are fixed by the storefront. A layout with a page type the storefront never requests is stored but never rendered.
- Recommendation slots are configured elsewhere, not in page layouts.

## Related

- [Navigation](/admin/storefront/navigation)
- [Content pages](/admin/storefront/content-pages)
- [Categories](/admin/catalog/categories)
- [Cache](/admin/system/cache)
