---
title: Navigation
description: Replace the storefront's built-in header, footer and mobile menus with your own links, per language, and get the change to show.
---

# Navigation

<span class="sidebar-path">Not in the sidebar. Open the command palette (Ctrl+K / ⌘K) and type "Navigation", or go to `/admin/page_config/navigationmenu/`.</span>

The storefront ships with a default header (Shop, Blog, Offers when promotions are on), a default burger menu on mobile and a default footer (legal pages, contact, feedback, gift cards). A **Navigation Menu** row replaces one of those slots with links you choose. Store staff, admins and owners can edit them.

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

- Every link has a **label** (up to 100 characters) and exactly one of **to** (an internal path starting with `/`) or **href** (an `https://` URL).
- **icon** is optional and must be an icon name starting with `i-`.
- A menu holds at most 50 entries; a footer column must have at least one child.
- No other keys are accepted.

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

- **A saved row shadows the code default.** As soon as a Header row exists with items, the storefront stops adding its own Shop/Blog/Offers links and the feature-gated items with them. Include every link you still want.
- **Cache.** The storefront caches the navigation payload per language for 5 minutes and keeps serving the stale copy for up to an hour while it refreshes, and the rendered pages are cached too. After saving a menu, open the [Cache](/admin/system/cache) tool and purge **Pages & navigation** (this purges the `pageConfigNavigation` entries and the page HTML). Saving the row does not purge anything by itself.
- The footer keeps one automatic column: **Pages**, listing every published content page. It appears next to your configured columns and drops a legal page that your columns already link, so the same document is not listed twice.
- Labels are your content, not translation keys. Write them exactly as they should appear.
- The Header slot feeds both the desktop header and the burger menu on phones. The **Mobile** slot is accepted and stored, but the storefront does not read it yet; configuring it changes nothing on screen today.

## Related

- [Content pages](/admin/storefront/content-pages)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
