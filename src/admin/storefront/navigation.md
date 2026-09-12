---
title: Navigation
description: Replace the storefront's built-in header, footer and mobile menus with your own links, per language, and get the change to show.
---

# Navigation

<span class="sidebar-path">Not in the sidebar. Open the command palette (Ctrl+K / ⌘K) and type "Navigation", or go to `/admin/page_config/navigationmenu/`.</span>

The storefront ships with a built-in header, a built-in burger menu on phones and a built-in footer. A **Navigation Menu** row replaces one of those slots with links you choose. Store staff, admins and owners can edit them.

The built-in header is up to four links: **Shop** always, then **Blog**, **Offers** and **Gift cards**, each appearing only while that feature is switched on for your store.

## What you see

A list with one row per configured **Slot** and its last update. There are at most three rows, because the slot is unique: **Header**, **Footer**, **Mobile**.

The form has three fields:

| Field | What it takes |
|---|---|
| **Slot** | Header, Footer or Mobile. |
| **Items** | The menu as JSON, in the shape below. |
| **Locale Overrides** | The same shape once more, per non-default language, e.g. `{"en": [...]}`. |

The form warns before you leave with unsaved changes.

### Shape of Items

Header and Mobile take a flat list of links:

```json
[
  {"label": "Προϊόντα", "to": "/products", "icon": "i-heroicons-building-storefront"},
  {"label": "Blog", "to": "/blog"},
  {"label": "Οδηγός", "href": "https://example.com/guide"}
]
```

Footer takes columns, each with children:

```json
[
  {
    "label": "Σχετικά με εμάς",
    "icon": "i-heroicons-information-circle",
    "children": [
      {"label": "Ποιοι είμαστε", "to": "/info/about"},
      {"label": "Όροι Χρήσης", "to": "/terms-of-use"}
    ]
  }
]
```

Rules enforced on save (the form shows the exact error):

- Every link has a **label** (up to 100 characters) and exactly one of **to** (an internal path starting with `/`) or **href** (an `https://` URL). Giving both, or neither, is rejected.
- **icon** is optional. It must start with `i-` and be all lower case; a capital letter is rejected.
- A menu holds at most 50 top-level entries. Footer columns count towards that; the children inside them do not.
- A footer column must have at least one child.
- No other keys are accepted. A misspelled key fails the save rather than being ignored.

### Locale Overrides

Menus are translated **whole**, not label by label: the key is the language code and the value is a complete menu in the same shape. The default language (Greek) is not a valid key; its menu is the **Items** field itself. A language with no entry gets the default menu.

## Tasks

### Publish a custom header
1. Open the list and click **Add** (or open the existing Header row).
2. Set **Slot** to Header.
3. Paste the JSON list into **Items**. Use `to` for pages of your own store and `href` for external sites.
4. If the store serves English, add `{"en": [ ... ]}` to **Locale Overrides** with the same links and English labels.
5. Save, then purge the cache (below).

### Link to a content page
Use `"to": "/info/<slug>"` where the slug is the page's slug in [Content pages](/admin/storefront/content-pages). The page must be published or the link leads to a 404.

### Go back to the built-in menu
Delete the row for that slot. An empty **Items** list has the same effect: the storefront treats a slot with no items as unconfigured.

## Things to know

- **A saved row replaces the built-in menu completely.** The moment a Header row exists with even one item, the storefront stops adding Shop, Blog, Offers and Gift cards. It is all or nothing, not a merge, so list every link you still want. This is the usual reason a shop "loses" its Offers link after a menu edit.
- **Cache.** The storefront keeps each language's menu for 5 minutes and goes on serving the old copy for up to an hour while it fetches a new one, and the rendered pages are cached on top of that. Saving the row purges nothing by itself. Open the [Cache](/admin/system/cache) tool and purge **Pages & navigation**, which clears both the menus and the cached pages.
- On the standard footer one column is automatic: **Pages**, listing every published content page. It sits next to your configured columns, and it leaves out a legal page that one of your columns already links so the same document is not listed twice. Some storefront themes drop this column entirely.
- Labels are your content, not translation keys. Write them exactly as they should appear.
- The Header slot feeds both the desktop header and the burger menu on phones. The **Mobile** slot is accepted and stored, but the storefront does not read it yet; configuring it changes nothing on screen today.

## Related

- [Content pages](/admin/storefront/content-pages)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
