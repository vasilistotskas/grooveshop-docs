---
title: Page layouts
description: Compose the home page and the branded bands of other storefront pages from sections, set per-page SEO text, and publish.
---

# Page layouts

<span class="sidebar-path">Content → Page Layouts</span>

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

The **Page Sections** tab lists the sections in render order, each in its own collapsible panel with:

| Field | Meaning |
|---|---|
| **Component Type** | Which block to render (list below). |
| **Title** | Optional heading, shown by blocks that have one. |
| **Is Visible** | Untick to hide a section without deleting it. |
| **Props** | The block's settings. On a saved section this is a form listing exactly the settings that block accepts, with their limits; on a new one it is plain JSON until you save it with its type. |
| **Locale Overrides** | Per-language copy: for another language, a title and any of the block's settings, filled only where that language differs; the default language is the fields themselves. A form too, once the section is saved. |
| **Sort Order** | Read-only here; new sections go to the end. |

### Section types

The **Props** form of a saved section lists every setting its type accepts, so this table only says what the form cannot.

| Type | Good to know |
|---|---|
| Hero Banner, Hero Carousel | The carousel takes slides, or a list of images with an optional list for phones. When the first slide has a heading, that heading is the page's main title. |
| Products Slider, Products Grid, Featured Products, Product Categories | Product rails pick by ordering and an optional category. Products Grid and Featured Products both draw a grid of four across; Products Slider is the one that scrolls sideways. Product Categories draws square photo tiles, up to six in a row. |
| Blog Categories Rail, Blog Posts Carousel, Blog Posts Grid, Blog Posts List | |
| Recently Viewed Rail | Also needs the **RECENTLY_VIEWED_ENABLED** setting on. |
| Rich Text Block | HTML, up to 20000 characters. |
| Call to Action Banner | |
| Newsletter Signup | An email form with a consent box, shown only when a default Newsletter topic exists (see [Subscriptions](/admin/customers/subscriptions)). |
| Testimonials, Trust Badges, Stats Strip | Trust Badges is a row of reassurance badges (how you pay, who delivers); Stats Strip is a band of key figures. |
| Offers Preview | The running promotions, on a page other than the offers page, always on a dark band whatever surface the section is set to. Its link counts the running offers unless you give it your own text. Renders nothing when promotions are off or none is running. |
| Spacer, Divider | Layout helpers. |
| Loyalty Program Hero, Search Bar, Business Hours | A visitor who is not signed in sees the programme: points per euro, what points are worth, the first-order bonus and the tiers, with a link to sign up. A signed-in member sees their own points and tier instead. Business Hours reads its opening times from the **BUSINESS_HOURS** setting. |
| Location Map | With coordinates the map loads only when a visitor asks for it. Under it, two buttons open the place in Google Maps and in Apple Maps; they show with an address alone too. |
| Features Grid, Media + Text, Image Gallery, Story Timeline, FAQ Accordion | Generic marketing blocks. The FAQ opens on its first answer, and the line under its heading points to your contact page unless you write your own. |
| Partner Strip, Pull Quote, Reference Cards, Page Hero, Feature Lists, Option Selector, Comparison Table, Flow Steps, Project Register, Vendor Cards, Contact Panel, About Content, Vision Content, What Is Microlearning, Why Microlearning | **Built for specific storefront designs only** — see the warning below. |

### Two warnings about this list

**Fifteen of these blocks render nothing on an ordinary store.** The eleven from **Partner Strip** to **Contact Panel**, plus the four content blocks from **About Content** to **Why Microlearning**, were written for particular storefront designs. Pick one on a store that does not use that design and the section saves, shows as visible, and then simply does not appear on the page: no error, no gap, no warning. Before you build a page around one, add it to a test layout, publish, purge the cache and check it actually shows. The blocks in every other row of the table work on every store.

**A section that saves can still look wrong.** Saving checks every setting against its type: an unknown setting, a number where text belongs, an oversized text, a count outside its range or a link that is neither an internal path starting with `/` nor an `https://` address is refused with the setting named. What it cannot check is how the block looks with your content, so change one section at a time and check the result.

## Seeded layouts

Every store starts with a published `home` layout of four sections: Blog Categories Rail, Hero Carousel (no images), Recently Viewed Rail, Blog Posts List. Other page types are not seeded: `products`, `blog`, `contact` and `feedback` render their normal page and show a layout only as a band above it, while `about`, `vision` and the microlearning pages show nothing until a layout is published.

## Tasks

### Put a banner on the home page
1. Open the `home` layout and find the **Hero Carousel** section.
2. In **Props**, set `{"images": ["/img/banner.png"], "mobile_images": ["/img/banner-mobile.png"], "link": "/products/123/my-product"}`. The images must already be reachable on the storefront.
3. Save. The **Pages & navigation** cache is purged on its own about ten seconds later (see [Cache](/admin/system/cache)).

### Add a section
1. In **Page Sections** click add, pick the **Component Type** and fill **Title**.
2. Save. The section is appended last, and its **Props** now open as a form for its type: fill them and save again. Sort order is not editable in this table; to reorder, delete and re-add sections in the order you want.

### Translate a section
Open the section's **Locale Overrides**, add the other language and fill its title and texts. Leave structural settings (counts, columns, links) empty there, so they stay in **Props** and cannot drift between languages.

### Build an About page
1. Click **Add**, set **Page Type** to `about`, a **Title**, and tick **Is Published**.
2. Add sections and fill their props. Stay with blocks that work on every store, such as **Media + Text**, **Image Gallery**, **Story Timeline**, **FAQ Accordion**, **Rich Text Block** and **Call to Action Banner**. Do not reach for **Page Hero** or **About Content** unless you have confirmed your storefront design renders them.
3. Fill **Seo Title** and **Seo Description**; without them the page uses its built-in title and the store description.
4. Save, give the cache the ten seconds it takes to clear itself, then open `/about` and check every section you added is actually on the page.
5. Link the page from a menu: add a link and pick the layout under **Custom page** (see [Navigation](/admin/storefront/navigation)).

## Things to know

- Only **published** layouts are served, and a section with **Is Visible** off is never sent to the browser at all. Neither is merely hidden with styling.
- **Cache**: layouts and the rendered home, about, contact, feedback and info pages are cached on the storefront. Saving a layout or a section purges them on its own about ten seconds later; purge **Pages & navigation** by hand only if a change still does not show.
- **Sections cannot be reordered.** New ones always go last and **Sort Order** is read-only, so getting a different order means deleting the sections below the insertion point and adding them back in sequence. Plan the order before you build a long page.
- The **Recently Viewed Rail** also needs the **RECENTLY_VIEWED_ENABLED** setting on, and **Business Hours** reads its opening times from **BUSINESS_HOURS**, both under <span class="sidebar-path">Settings → Store Settings</span>. Neither block warns you when its setting is missing.
- Recommendation slots are configured under <span class="sidebar-path">Marketing → Recommendations → Slots</span>, not in page layouts. That menu is there only when your plan includes product suggestions.

## Related

- [Navigation](/admin/storefront/navigation)
- [Content pages](/admin/storefront/content-pages)
- [Categories](/admin/catalog/categories)
- [Cache](/admin/system/cache)
