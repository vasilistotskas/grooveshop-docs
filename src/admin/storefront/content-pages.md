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

- Every published page is served at `/info/<slug>` in the visitor's language. An unpublished page answers 404 for visitors; store staff can still open it.
- The footer's automatic **Pages** column lists every published page.
- Four slugs replace the platform's built-in legal text on its own routes instead of getting an `/info/` link: `terms` on `/terms-of-use`, `privacy` on `/privacy-policy`, `cookies` on `/cookies-policy`, `return-policy` on `/return-policy`. The built-in text is used while the page is unpublished or its body is empty. The page's own last-modified date is shown as the document date.

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
Untick **Is Published**. Visitors get a 404 at `/info/<slug>`; the legal routes fall back to the built-in text.

## Things to know

- **There is no feature flag for content pages.** Publishing is the only gate. Nothing in the tenant plan or the store settings switches them off.
- **Published At** is set automatically the first time you publish and is not scheduled: a page is live as soon as **Is Published** is on.
- **Cache**: page lists are cached for 10 minutes on the storefront and served stale for up to a day while refreshing. Saving does not purge; use the Cache tool.
- The Greek text is the default. A visitor on another language sees that language's text if it exists, otherwise English, otherwise Greek.
- The slug is unique and becomes part of the public URL; changing it breaks existing links.

## Related

- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
