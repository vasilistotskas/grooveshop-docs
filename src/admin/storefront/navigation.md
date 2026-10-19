---
title: Navigation
description: Replace the storefront's built-in header, footer and mobile menus with your own links, per language, and get the change to show.
---

# Navigation

<span class="sidebar-path">Content → Menus → Menus</span> and <span class="sidebar-path">Content → Menus → Menu Columns</span>

The storefront ships with a built-in header, a built-in burger menu on phones and a built-in footer. A **Navigation Menu** row replaces one of those slots with links you choose. Store staff, admins and owners can edit them.

The built-in header is up to four links: **Shop** always, then **Blog**, **Offers** and **Gift cards**, each appearing only while that feature is switched on for your store.

## What you see

### Menus

A list with one row per configured **Slot**, the number of **Entries** in it and its last update. There are at most three rows, because the slot is unique: **Header**, **Footer**, **Mobile**.

The menu form holds the **Slot** and, below it, what the slot contains:

- **Header** and **Mobile** take a flat list of **Links**, in the order you drag them into.
- **Footer** takes **Navigation Columns**: a heading per column (**Label**, one per language, and an optional **Icon**), also in drag order. The links inside a column are edited on the column itself: follow **Change** on the column's row.

### Menu Columns

The footer columns of every menu, with their **Menu**, the number of **Links** and the sort order, filterable by slot. A column's page has **Menu**, **Label** (per language, up to 100 characters), **Icon** and the column's own **Links**.

An **Icon** must start with `i-` and be all lower case, for example `i-heroicons-light-bulb`; a capital letter is rejected. Links themselves carry no icon.

### Links

Every link points at exactly one destination. Fill in one of these four fields and leave the other three empty; saving with none, or with two, is refused.

| Field | Points at |
|---|---|
| **Content page** | One of your [content pages](/admin/storefront/content-pages). The link follows the page if you change its slug. |
| **Custom page** | One of your [page layouts](/admin/storefront/page-layouts). |
| **Built-in page** | A storefront page every store has: Home, Products, Blog, Contact, Offers, Gift cards, Loyalty program, Feedback. |
| **External link** | A full address on another site. |

**Label** is per language and up to 100 characters. Leave it empty on a content-page or custom-page link and the menu shows the page's own title, already translated. A built-in page or an external link has no title to borrow, so write its label; a label written in one language only is shown in every language.

## Tasks

### Publish a custom header
1. Open <span class="sidebar-path">Content → Menus → Menus</span> and click **Add** (or open the existing Header row).
2. Set **Slot** to Header.
3. Under **Links** add one link per entry, pick its destination and, where needed, a label in every language your store serves. Drag the rows into order.
4. Save.

### Build the footer
1. Add the menu with **Slot** Footer and save it before adding anything else: until the row is saved the form offers plain links, which a footer does not show. Once saved it offers **Navigation Columns** instead.
2. Add a column per heading: its **Label** and, if you like, an **Icon**. Save.
3. Follow **Change** on a column, add its links, save. Repeat for each column. All columns of all menus are also listed under <span class="sidebar-path">Content → Menus → Menu Columns</span>.

### Link to a content page
Add a link and pick the page under **Content page**. Leave **Label** empty to use the page's title. While the page is unpublished the link is left out of the menu rather than leading to a 404, and it comes back when you publish the page.

### Go back to the built-in menu
Delete the row for that slot. A menu with nothing visible in it has the same effect: the storefront treats a slot with no entries as unconfigured.

## Things to know

- **A saved row replaces the built-in menu completely.** The moment a Header row exists with even one visible link, the storefront stops adding Shop, Blog, Offers and Gift cards. It is all or nothing, not a merge, so add every link you still want, for example as **Built-in page** links. This is the usual reason a shop "loses" its Offers link after a menu edit.
- **Hidden links.** A link to an unpublished content page or page layout is left out, and a footer column with no visible link is left out with it, so the menu never advertises a page that answers "not found".
- **Cache.** The storefront keeps each language's menu for 5 minutes and goes on serving the old copy for up to an hour while it fetches a new one, and the rendered pages are cached on top of that. Saving a menu, a column or a link purges both on its own about ten seconds later. If a change still does not show, purge **Pages & navigation** on the [Cache](/admin/system/cache) page.
- On the standard footer one column is automatic: **Pages**, listing every published content page. It sits next to your configured columns, and it leaves out a legal page that one of your columns already links so the same document is not listed twice. Some storefront themes drop this column entirely.
- Labels are your content, not translation keys. Write them exactly as they should appear.
- The **Header** slot feeds the desktop header. The burger menu on phones lists the **Mobile** slot's links when it has visible ones, and the Header slot's links when it does not, so a store that never sets up a Mobile menu sees no change on phones. If neither slot has links, the phone menu is the built-in one.

## Related

- [Content pages](/admin/storefront/content-pages)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
