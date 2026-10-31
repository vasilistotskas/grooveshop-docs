---
title: Page layouts
description: Build the home page and other store pages from ready-made sections, in the order you want, and publish them.
---

# Page layouts

A layout is a row of sections (a banner, a product strip, an FAQ and so on) that make up a page of the store. With layouts you change the home page, add a band above other pages or build new pages.

<span class="sidebar-path">Content → Page Layouts</span>

## What you see

The list shows each layout's **Page Type**, **Title**, whether it **Is Published** and when it was **Updated At**.

The **Page Type** says which page the layout belongs to:

| Page Type | What the layout does |
|---|---|
| `home` | It is the whole home page. |
| `products`, `blog`, `contact`, `feedback` | It adds a band above that page's normal content. |
| `blog-post` | It adds bands under every blog post, e.g. a promo banner with a link. |
| `about` | It is the whole `/about` page. Without a published layout, the page does not exist. |
| Anything else, e.g. `our-shops` | A new page at the address `/our-shops`. Use lowercase Latin letters, numbers and hyphens. |

The form has:

- **Page**: the **Page Type** and the **Title**. The title is mainly for you, in the list. Visitors see it only as the text of a **Custom page** menu link that has no **Label** (see [Menus](/admin/content/menus)).
- **Publishing**: **Is Published**. Only published layouts show on the store.
- **SEO**: the page's **Seo Title** and **Seo Description** for search engines. Left empty, the page keeps its own title and the store's description.
- The **Page Sections** tab, with the sections in the order they appear.

Each section has:

| Field | What it is |
|---|---|
| **Component Type** | What kind of section it is (see the table below). |
| **Title** | An optional heading for the section. |
| **Is Visible** | Untick to hide the section without deleting it. |
| **Props** | The section's settings, e.g. how many products it shows. They become a form once you save the section. |
| **Locale Overrides** | The section's texts for the store's other languages. |
| **Sort Order** | The section's position. It cannot be changed here. |

### The home page you start with

Every new store has a published `home` layout with eleven sections: **Hero Carousel**, **Trust Badges**, **Product Categories**, **Products Grid** (the newest), **Offers Preview**, **Featured Products** (the most popular), **Loyalty Program Hero**, **Stats Strip**, **Blog Posts Grid**, **Testimonials** and **FAQ Accordion**.

A section with no content does not show. For example, the carousel shows once you give it slides, and the offers only while an offer is running.

### Section types

| Sections | What they show |
|---|---|
| **Hero Banner**, **Hero Carousel** | A large image or slides at the top, with a heading and a button. |
| **Products Slider**, **Products Grid**, **Featured Products** | Products in a scrolling row or a grid, e.g. the newest or the most popular, from the whole catalogue or one category. |
| **Product Categories** | Your categories with their photo. |
| **Blog Categories Rail**, **Blog Posts Carousel**, **Blog Posts Grid**, **Blog Posts List** | Blog categories and posts. |
| **Recently Viewed Rail** | The products the visitor viewed recently. Needs the `RECENTLY_VIEWED_ENABLED` setting on. |
| **Offers Preview** | The offers running now. |
| **Loyalty Program Hero** | The loyalty programme for visitors, or the customer's own points when signed in. |
| **Rich Text Block**, **Media + Text**, **Image Gallery**, **Features Grid**, **Story Timeline** | Text, images and your story. |
| **FAQ Accordion**, **Testimonials**, **Trust Badges**, **Stats Strip** | Questions, customer opinions, assurances (e.g. payment methods) and key figures. |
| **Call to Action Banner** | A band with text and a button. |
| **Newsletter Signup** | The newsletter form. See [Newsletter subscriptions](/admin/customers/subscriptions). |
| **Search Bar** | A product search box. |
| **Business Hours** | Your opening hours, from the `BUSINESS_HOURS` setting. |
| **Location Map** | Your shop on a map, from the `STORE_GEO_LAT` and `STORE_GEO_LNG` settings. |
| **Spacer**, **Divider** | Space or a line between sections. |

The settings `RECENTLY_VIEWED_ENABLED`, `BUSINESS_HOURS`, `STORE_GEO_LAT` and `STORE_GEO_LNG` are under <span class="sidebar-path">Settings → Store Settings</span>.

**Sections that do not show on your store.** Fifteen types were made for particular stores' designs: **Partner Strip**, **Pull Quote**, **Reference Cards**, **Page Hero**, **Feature Lists**, **Option Selector**, **Comparison Table**, **Flow Steps**, **Project Register**, **Vendor Cards**, **Contact Panel**, **About Content**, **Vision Content**, **What Is Microlearning** and **Why Microlearning**. Unless the platform team has set them up for you, they save normally but show nothing, without any message.

## Tasks

### Add a slide to the home page carousel

1. Open the `home` layout and, under **Page Sections**, the **Hero Carousel** section.
2. In **Props**, add a slide. Fill in the image address and, if you like, a second image for phones, the heading, the button text and where it leads.
3. Click **Save**.

Within about ten seconds the slide shows on the home page. A link is either a store path starting with `/`, e.g. `/products`, or a full address starting with `https://`.

### Add a section

1. Under **Page Sections**, add a new section and choose a **Component Type**.
2. Save. The section goes to the end of the page and its **Props** become a form.
3. Fill in the **Props** and save again.

If a setting is not valid (e.g. a text that is too long, or a link without `/` or `https://`), the save does not go through and you see which setting is wrong.

### Translate a section

1. Open the section's **Locale Overrides**.
2. For each other language, write the section's heading and texts.
3. Leave empty anything that is not text (counts, links), so it applies as in **Props**.

### Build the "About us" page

1. Click **Add**, enter **Page Type** `about` and a **Title**.
2. Add sections, for example **Media + Text**, **Image Gallery** and **Story Timeline**, and fill them in.
3. Fill in **Seo Title** and **Seo Description**.
4. Tick **Is Published** and save.
5. Open `/about` on the store and check that every section shows.
6. To put it in the menu, add a **Custom page** link (see [Menus](/admin/content/menus)).

You build a brand-new page the same way: give another **Page Type**, e.g. `our-shops`, and the page will be at `/our-shops`.

## Things to know

- **Sections do not change order.** A new section always goes to the end. For another order you have to delete the sections below the point you want and add them again. Plan the order before building a long page.
- **Change one section at a time** and look at the result on the store. Saving checks the settings, not how the section looks with your content.
- **A new page** (a Page Type not in the table above) is added to the sitemap for search engines automatically.
- **Product recommendations** are not set up here but under <span class="sidebar-path">Marketing → Recommendations → Slots</span>, when your plan includes them.
- **If a change does not show** after a minute, clear the **Pages & navigation** cache on the [Cache](/admin/settings/cache) page.

## Related

- [Menus](/admin/content/menus)
- [Pages](/admin/content/pages)
- [Categories](/admin/catalog/categories)
- [Cache](/admin/settings/cache)
