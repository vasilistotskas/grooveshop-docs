---
title: Content pages
description: Write and publish your own policy and information pages - terms, privacy, returns, FAQ, about, shipping - and where they appear on the storefront.
---

# Content pages

<span class="sidebar-path">Not in the sidebar. Open the command palette (Ctrl+K / ⌘K) and type "Content", or go to `/admin/page_config/contentpage/`.</span>

A content page is a slug plus a rich-text body per language. It is meant for the pages a store owns end to end: return policy, terms, privacy, cookies, FAQ, about, shipping information. Page layouts (structured section builders) are a different tool; see [Page layouts](/admin/storefront/page-layouts).

## What you see

| Column | Meaning |
|---|---|
| **Title** | The translated title, or the slug when no title exists. |
| **Slug** | The URL key. |
| **Is Published** | Editable in the list; tick and press **Save**. |
| **Updated at** | Last change. |

**Search** matches title and slug. **Filter**: Is Published.

The form has **Content** (**Title** and **Body** per language through the Greek / English / German tabs; the body is a rich-text editor and HTML is sanitised on save), **Organization** (**Slug**, **Is Published**), collapsed **SEO** (**Seo Title**, **Seo Description**, **Seo Keywords**) and collapsed **System**. A **Translations** tab lists the languages that already have a title.

## Where a page shows on the storefront

- Every published page is served at `/info/<slug>` in the visitor's language. An unpublished page answers 404 on the storefront, and it does so **for everyone**, including you while signed in to the admin. Preview by publishing, or read the page here.
- The footer's automatic **Pages** column lists every published page.
- **Three slugs take over a built-in legal page** instead of only getting an `/info/` link: `terms` on `/terms-of-use`, `privacy` on `/privacy-policy`, `cookies` on `/cookies-policy`. On those three the platform's own boilerplate is shown while your page is unpublished or its body is empty, and your text replaces it the moment you publish. The date at the top then becomes your page's own last-modified date. Because the footer already links those three routes, your `/info/` copy is dropped from the **Pages** column so the same document is not listed twice.
- **`return-policy` is not one of them.** There is a `/return-policy` address, but it shows a heading and nothing else whatever you publish, it is kept out of search engines, and nothing links to it. Your returns policy reaches shoppers at `/info/return-policy`, which the footer's **Pages** column links like any other page. Link to `/info/return-policy`, never to `/return-policy`.

## Seeded pages

Every store starts with seven pages, **unpublished**, with a Greek placeholder body that says where to write the real text:

| Slug | Seeded title |
|---|---|
| `return-policy` | Πολιτική Επιστροφών |
| `terms` | Όροι Χρήσης |
| `privacy` | Πολιτική Απορρήτου |
| `cookies` | Πολιτική Cookies |
| `faq` | Συχνές Ερωτήσεις |
| `about` | Σχετικά με εμάς |
| `shipping-info` | Πληροφορίες Αποστολής |

Deleting one of them and re-provisioning would recreate it; simply leave a page unpublished if you do not need it.

## Tasks

### Publish your terms
1. Open the `terms` page.
2. Replace the placeholder **Body** with your text in Greek; switch language tab to add English and German if the store serves them.
3. Fill **Seo Title** and **Seo Description** if the defaults are not right.
4. Tick **Is Published**, save.
5. Purge **Pages & navigation** in the [Cache](/admin/system/cache) tool so `/terms-of-use` picks up the new text.

### Add a new page
1. Click **Add**, type the Greek **Title** and **Body**, set a short lowercase **Slug**, save.
2. Publish when ready. Link to it from a menu with `"to": "/info/<slug>"` (see [Navigation](/admin/storefront/navigation)); the footer **Pages** column links it automatically.

### Take a page down
Untick **Is Published**. Visitors get a 404 at `/info/<slug>`, and `/terms-of-use`, `/privacy-policy` and `/cookies-policy` go back to the platform's boilerplate. Purge **Pages & navigation** or the old text lingers in the cache.

## Things to know

- **There is no switch for content pages.** Publishing is the only gate. Nothing in your plan or your store settings turns them off.
- **Published At** is filled in automatically the first time you publish. It is not a schedule: a page goes live the moment **Is Published** is on, whatever date sits in that field.
- **Cache**: the page list is kept 10 minutes on the storefront and served stale for up to a day while it refreshes; a single page is kept 10 minutes and served stale for up to two hours. Saving purges neither. Use the Cache tool.
- **There is no language fallback on the storefront.** A visitor sees the text written in their own language and nothing else: where it is missing the page renders with an empty title and an empty body, and the footer shows the raw slug in place of a title. Fill in every language your store serves, not just Greek. This screen is more forgiving and will show you any language it has, so a page that looks complete here can still be blank to a shopper.
- The slug is unique and becomes part of the public URL; changing it breaks existing links.

## Related

- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
