---
title: Page builder
description: Your store's pages and menus live in the page builder. What it holds, how a change goes live and comes back, and what to do when a scheduled publish fails.
---

# Page builder

The pages of your store (the home page, About, Contact, Feedback and any page of your own) and its menus (the header, the footer and the mobile menu) are made in the page builder. Each one is built from sections, such as a banner, a product strip or an FAQ, in the order you choose. A change reaches visitors only when it is published. Every publish is kept, so an earlier version can always come back.

The Owner and the Administrator edit and publish. Staff can look at everything here but change nothing.

<span class="sidebar-path">Content → Edit storefront</span> · <span class="sidebar-path">Content → Page builder</span>

## Editing

**Content → Edit storefront** opens the editor on your own store, already signed in as you. The editor is still being finished: until it opens, the page says so, and your pages and menus stay exactly as they are.

What the editor will let you do:

- change the text, pictures and links of a section, in every language your store serves;
- add, move, hide and remove sections, and build new pages;
- save your work as you go, and publish a page and its menus together when it is ready, or schedule the publish for a later time;
- go back to any earlier version.

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
- **Plain text pages are separate.** The terms, the privacy and cookie policies, the return policy, the FAQ and shipping information are written in [Pages](/admin/content/pages), not here.
- **Words on buttons and labels are separate too.** They are changed in [Storefront texts](/admin/content/storefront-texts).
- **A publish shows on the store within moments.** If it does not, purge **Page builder** on the [Cache](/admin/settings/cache) page.

## Related

- [Pages](/admin/content/pages)
- [Storefront texts](/admin/content/storefront-texts)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Cache](/admin/settings/cache)
