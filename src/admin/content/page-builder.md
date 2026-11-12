---
title: Page builder
description: Your store's pages and menus live in the page builder. What it holds, how a change goes live and comes back, and what to do when a scheduled publish fails.
---

# Page builder

The pages of your store (the home page, About, Contact, Feedback and any page of your own) and its menus (the header, the footer and the mobile menu) are made in the page builder. Each one is built from sections, such as a banner, a product strip or an FAQ, in the order you choose. A change reaches visitors only when it is published. Every publish is kept, so an earlier version can always come back.

The Owner and the Administrator edit and publish. Staff can look at everything here but change nothing.

<span class="sidebar-path">Content → Edit storefront</span> · <span class="sidebar-path">Content → Page builder</span>

## Editing

**Content → Edit storefront** opens the editor on your own store, already signed in as you.

In the editor you can:

- change the text, pictures and links of a section, in every language your store serves;
- add, move, hide and remove sections, and build new pages;
- save your work as you go, and publish a page and its menus together when it is ready, or schedule the publish for a later time;
- go back to any earlier version.

## Choose a picture

A picture lives in your image library, so you store it once and can use it on as many pages as you like.

1. Open **Content → Edit storefront** and click the section in the outline.
2. Under **Image**, press **Choose an image**. The **Image library** opens.
3. Pick a picture, or press **Upload an image**. If that same picture is already in the library, you get the one that is there.
4. Under **Alt text**, describe the picture for people who cannot see it, in each language, and press **Save alt text**. The text belongs to the picture, so it applies wherever the picture is used.
5. Press **Use this image**, and publish.

Some sections have more than one place for a picture:

- **Image on phones** is the crop phones and tablets see. Leave it empty and they see the same picture. Some store designs do not use it.
- **Images**, on the **Hero carousel**, holds several pictures, added one at a time and shown in that order. **Images on phones** goes by position: its first picture stands in for the first of **Images**.

**Decorative image** is for a picture that adds nothing a screen reader user needs. Set it to **On**, and the picture is left out for them. Leaving the alt text empty does not do this: with no alt text the page describes the picture with the section's heading, a badge's label or the person's name.

## Change the colours, corners and fonts

Your store's look is its theme, and you change it in the editor.

1. Open **Content → Edit storefront**.
2. In the outline, click **Theme: colours, corners, fonts**.
3. Change the **Colours**, for the light and the dark scheme. **Same colours as light** copies the light colours to the dark scheme.
4. Under **Shape and fonts**, set the **Corners**, the **Page width** and the fonts.
5. Check **Contrast**: it shows how far each colour stands out from its background. **Fix** corrects a colour for you. A pair marked **Blocks publishing** has to be fixed before you can publish.
6. Publish. The new look shows on every page, and your emails use the new primary colour.

**Button colour** can keep its own colour or, with **Follows the primary colour** on, change along with the primary colour.

## Set a page's title and description for search engines

Every page has its own **Page settings**: how it appears in search results and, on the home page, its main heading.

1. Open **Content → Edit storefront** and open the page.
2. In the outline, click **Page settings: title and description in search**.
3. Fill in the fields you need (each one counts its characters against its limit):

| Field | What it does | Up to |
|---|---|---|
| **Search engine title** | The title on the browser tab and in search results. Empty: the title the page sets itself. | 70 characters |
| **Search engine description** | The text under the title in search results, and when the page is shared. Empty: the description the page sets itself. | 300 characters |
| **Keywords** | Kept with the page but not put on it, because search engines ignore keywords. | 255 characters |
| **Main heading (h1)** | Home page only. The page's main heading, used unless a section on the page supplies it: a **Hero banner**, a **Hero carousel** whose first slide has a heading, or a **Contact** section. A heading in any other section does not count. Empty: the store's name. | 120 characters |

4. Publish. Like any other change, the settings reach visitors only when the page is published.

On the **Blog post** page, which adds sections under every post, these settings do nothing: each post keeps its own title and description.

Each field is written per language. Switch the editor to another language of your store to write that language's text. A field you leave empty there uses the Greek text, which the field shows greyed out. Greek is the language every page is written in first, whatever your store's main language.

The **Main heading (h1)** is not shown on the page, in either store design: the sections at the top of the home page are what visitors see. When it is used, search engines and screen readers read it as the page's main heading; when a section supplies the heading, they read that section's instead.

## Choose what a section lists

Some sections show things from your store rather than words you type: **Product carousel**, **Product grid**, **Featured products**, **Blog post grid**, **Blog post list**, **Blog post carousel**, **Product categories**, **Blog categories** and **Offers**. Under **What it lists** you say what they show. The page reads the items for itself, so names, prices and pictures follow your catalogue within moments, with nothing to publish.

1. Open **Content → Edit storefront** and click the section in the outline.
2. Under **What it lists**, choose how the items are found, and fill in what it asks for (see the table).
3. Publish.

| Section | What you can set |
|---|---|
| **Product carousel**, **Product grid**, **Featured products** | **By a rule**: **Categories** (all of them if you choose none; subcategories are included), **Order** and **How many**. **Hand-picked**: the **Items**, shown in the order you put them. |
| **Blog post grid**, **Blog post list**, **Blog post carousel** | **By a rule**: **Category**, **Featured** (**All**, **Featured only** or **Not featured**), **Order** and **How many**. **Hand-picked**: the **Items**, shown in the order you put them. |
| **Product categories** | **Main categories**, or the **Subcategories** of a **Parent category**, and **How many**. |
| **Blog categories**, **Offers** | **How many**. |

**Order** for products can be **Newest**, **Most viewed**, **Most liked**, **Best rated**, **Biggest discount**, **Price, lowest first** or **Price, highest first**. For blog posts it can be **Newest** or **Most viewed**.

**By a rule** keeps up by itself: a new product in those categories joins the list with nothing to publish. **Hand-picked** shows exactly what you chose, and an item that is deleted or hidden simply drops out.

### Let visitors load more posts

A **Blog post list** can go on past the posts it first shows. Turn on **Load more button**, and publish. Visitors get a button under the posts that adds the next ones of the same list, for as long as it has more.

## What the lists show

**Content → Page builder** has three lists. They are for looking only: nothing is changed from them.

| List | What it shows |
|---|---|
| **Builder documents** | Every page, menu and template of the store: its **Key** (for example `template:home` or `group:footer`), its **Kind**, the **Draft revision** (it goes up with every saved change) and when it was **Updated At**. |
| **Releases** | Every publish, newest first: its **Number**, when it was **Published at** and its **Note**. Going back to an earlier version is a release too. |
| **Scheduled publishes** | Publishes set for a later time: **Scheduled for**, **Status**, **Executed at** and **Acknowledged at**. |

## When a scheduled publish fails

A scheduled publish is checked when you schedule it and again at its time. It fails, and publishes nothing, when something it needs has gone in between, for example a product it shows was deleted. Then:

- the store's contact address and its owner get an email naming the pages and what was wrong (switchable on the [Emails](/admin/settings/emails) page, like the other alerts);
- the store dashboard shows a warning to the Owner and the Administrator until one of them has seen it.

To take the warning away, open **Content → Page builder → Scheduled publishes**, tick the failed one and run **Acknowledge the failure**. Then fix the page and publish again.

## Good to know

- **A deleted product or category leaves an empty section, not a broken page.** If you delete something a published page shows, that section shows nothing until you change it. A publish is refused while a page points at something that no longer exists.
- **A picture a published page uses cannot be deleted.** The library names the pages that use it: change those first. A picture only a draft uses can go, and a section that still holds it shows nothing until you choose another; publishing is refused until you do.
- **A section with nothing to list disappears**, heading included, and comes back by itself when it has something.
- **Stock alone can take a little while to show.** A change to a product's name, price or category reaches your pages within moments. A change only to its stock does not refresh a page straight away, so a page can show the old stock state for a while. The checkout always checks the real stock.
- **Plain text pages are separate.** The terms, the privacy and cookie policies, the return policy, the FAQ and shipping information are written in [Pages](/admin/content/pages), not here.
- **Words on buttons and labels are separate too.** They are changed in [Storefront texts](/admin/content/storefront-texts).
- **A publish shows on the store within moments.** If it does not, purge **Page builder** on the [Cache](/admin/settings/cache) page.

## Related

- [Pages](/admin/content/pages)
- [Storefront texts](/admin/content/storefront-texts)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Cache](/admin/settings/cache)
