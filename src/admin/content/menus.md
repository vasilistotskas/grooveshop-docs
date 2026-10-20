---
title: Menus
description: Replace the menu at the top of your store and the footer columns with your own links, in every language.
---

# Menus

The store comes with a ready-made top menu and a ready-made footer. Here you replace them with your own links. If you build nothing, the store keeps the ready-made ones.

<span class="sidebar-path">Content → Menus → Menus</span> and <span class="sidebar-path">Content → Menus → Menu Columns</span>

## What you see

### The ready-made menus

| Place | What it shows when you have not built your own |
|---|---|
| Top (and the three-line menu on phones) | **Shop**, then **Offers**, **Blog**, **Gift Cards** and **Rewards**, each only while its feature is on. |
| Footer | A column with products, offers, gift cards and rewards, a help column with contact and feedback, and below them a row with the blog and the legal pages. |

### The Menus list

One row for each **Slot** you have built, with its **Entries**. There are three slots:

- **Header**: the menu at the top of the page on a computer.
- **Footer**: the columns at the bottom of the page.
- **Mobile**: the menu behind the burger button on phones. If it has no visible links, phones show the Header's links instead, so a store that never builds a Mobile menu sees no change. If neither has links, phones show the built-in menu.

### The links

Each link points to **one** of the following. You fill in one field and leave the others empty.

| Field | Leads to |
|---|---|
| **Content page** | One of your [Pages](/admin/content/pages). |
| **Custom page** | One of your [Page layouts](/admin/content/page-layouts). |
| **Built-in page** | A page every store has: **Home**, **Products**, **Blog**, **Contact**, **Offers**, **Gift cards**, **Loyalty program**, **Feedback**. |
| **External link** | An address on another website, starting with `https://`. |

The **Label** is the link's text, in each language. On a link to a **Content page** you can leave it empty: the page's title shows in the visitor's language. On every other link, write it.

## Tasks

### Build your own top menu

1. Open <span class="sidebar-path">Content → Menus → Menus</span> and click **Add**.
2. Choose **Slot**: **Header**. Save.
3. Under **Links**, add one link for each item of the menu. Choose where it leads and write a **Label** in every language of the store.
4. Drag the links into the order you want and save.

Within about ten seconds the new menu shows on the store.

### Build your own footer

1. Add a menu with **Slot**: **Footer** and save it before adding anything else. Once it is saved, the form offers columns instead of links.
2. Add one column per heading, with its **Label**. Save.
3. Click **Change** on a column, add its links and save. Do the same for each column.

The first two columns show as the footer's main columns. The links of any further columns go into the row at the bottom.

### Go back to the ready-made menu

Delete the slot's row from the **Menus** list.

## Things to know

- **Your own menu replaces the whole ready-made one.** It is not added to it. If you want **Offers** to stay, add it as a **Built-in page**.
- **The "Products" link at the top** always opens the catalogue with your categories, under the label you gave it.
- **Links that hide themselves:** a link to a page that is not published, or to a feature that is off (e.g. Gift cards), is not shown. It comes back as soon as you publish the page or switch the feature on. A column left with no links is hidden too.
- **Your pages in the footer:** every published [Page](/admin/content/pages) not already in your columns is added to the row at the bottom automatically.
- **Labels are your own text.** Write them exactly as they should appear, in every language.
- **A column's icon** (the **Icon** field) is optional and is written in lowercase Latin letters starting with `i-`, e.g. `i-heroicons-light-bulb`.
- **If a change does not show** after a minute, clear the **Pages & navigation** cache on the [Cache](/admin/settings/cache) page.

## Related

- [Pages](/admin/content/pages)
- [Page layouts](/admin/content/page-layouts)
- [Cache](/admin/settings/cache)
