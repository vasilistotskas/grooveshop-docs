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
- **Three slugs are served at their own legal address** instead of only getting an `/info/` link: `terms` on `/terms-of-use`, `privacy` on `/privacy-policy`, `cookies` on `/cookies-policy`. There is no other copy behind them: while the page is unpublished or its body is empty, that address answers 404. The date at the top is the page's own last-modified date. Because the footer already links those three routes, your `/info/` copy is dropped from the **Pages** column so the same document is not listed twice.
- On those three addresses, a visitor whose language the page has not been translated into is shown the page in your store's main language, with a note saying so, rather than a blank page.
- **`return-policy` is not one of them.** There is a `/return-policy` address, but it shows a heading and nothing else whatever you publish, it is kept out of search engines, and nothing links to it. Your returns policy reaches shoppers at `/info/return-policy`, which the footer's **Pages** column links like any other page. Link to `/info/return-policy`, never to `/return-policy`.

## Seeded pages

Every store starts with seven pages. The three legal documents (`terms`, `privacy`, `cookies`) are **published** with the platform's Greek text, so the store never goes live without them; read them and adapt them to your business, because they are yours from the moment they are created. The other four are **unpublished**, with a Greek placeholder body that says where to write the real text:

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

## When the platform updates its legal text

The platform improves the text it provides, for example when it starts or changes some processing of your visitors' data that your privacy policy must describe. How the update reaches your store depends on whether you have changed the page:

- **You never changed the page:** it is updated for you. The new text is added in Greek, and the date at the top of the page moves to the day of the update.
- **You changed the page, or it has another language:** your text is left exactly as it is. The platform writes its text only in Greek, so any other language, English included, is always treated as yours. The page is then flagged:
  - the dashboard shows **Your legal pages need an update**, with a link to each page;
  - the list of content pages shows a warning naming them;
  - the page's own form opens with a **Platform update to review** section showing the **Text to add**, in Greek and in English.

The flag stays until you mark the page reviewed. Nothing is ever overwritten.

### The server logs section

The first such update adds a **Server logs** section to the privacy policy. Every request to your store is recorded in a server log: the visitor's IP address and country, the date and time, the page or file requested, the response and how long it took, and the browser's own description of itself. The part of the address after the "?" (such as search terms), cookies, sign-in details and the page the visitor came from are not recorded, and the one-time codes that some links carry (password reset, email confirmation, guest orders, unsubscribe, basket recovery, data exports) are removed before anything is stored. The logs are used only for security and for fixing faults, only the platform's technical staff can read them, and they are deleted automatically after **14 days**. The section says this to your visitors, names the companies involved (the platform's hosting provider in Germany, and Cloudflare in the USA, which carries all or part of the traffic), and explains their right to object.

**Your part.** Your store is the one your visitors deal with, so the privacy policy is yours and you answer for it. The platform provider hosts your store and handles your visitors' data for you; your agreement with the platform should include a data processing agreement (GDPR Article 28). If you do not have one, ask for it. Have your own legal adviser review the section before you adopt it, especially if your store uses services the platform text does not mention.

## Tasks

### Publish your terms
1. Open the `terms` page.
2. Replace the placeholder **Body** with your text in Greek; switch language tab to add English and German if the store serves them.
3. Fill **Seo Title** and **Seo Description** if the defaults are not right.
4. Tick **Is Published**, save.
5. Purge **Pages & navigation** in the [Cache](/admin/system/cache) tool so `/terms-of-use` picks up the new text.

### Review a platform update
1. Open the page from the dashboard warning, or from **Content Pages**.
2. Read the **Text to add**. Add it to your page in every language your store serves, in the place that fits your document, and adjust it if your store works differently.
3. Save, and purge **Pages & navigation** in the [Cache](/admin/system/cache) tool.
4. In the list of content pages, tick the page, choose **Mark platform legal update as reviewed** from the actions and run it. The warnings disappear.

Marking a page reviewed only records that you have dealt with the update; it does not change the text. Marking it without adding the text leaves your privacy policy incomplete.

### Add a new page
1. Click **Add**, type the Greek **Title** and **Body**, set a short lowercase **Slug**, save.
2. Publish when ready. Link to it from a menu with `"to": "/info/<slug>"` (see [Navigation](/admin/storefront/navigation)); the footer **Pages** column links it automatically.

### Take a page down
Untick **Is Published**. Visitors get a 404 at `/info/<slug>`, and for a legal document at its own address too: unpublishing `terms`, `privacy` or `cookies` takes that document off your store, so replace the text rather than unpublishing it. Purge **Pages & navigation** or the old text lingers in the cache.

## Things to know

- **There is no switch for content pages.** Publishing is the only gate. Nothing in your plan or your store settings turns them off.
- **Published At** is filled in automatically the first time you publish. It is not a schedule: a page goes live the moment **Is Published** is on, whatever date sits in that field.
- **Cache**: the page list is kept 10 minutes on the storefront and served stale for up to a day while it refreshes; a single page is kept 10 minutes and served stale for up to two hours. Saving purges neither. Use the Cache tool.
- **There is no language fallback on the storefront, except on the three legal addresses** (see above). Elsewhere a visitor sees the text written in their own language and nothing else: where it is missing the page renders with an empty title and an empty body, and the footer shows the raw slug in place of a title. Fill in every language your store serves, not just Greek. This screen is more forgiving and will show you any language it has, so a page that looks complete here can still be blank to a shopper.
- The slug is unique and becomes part of the public URL; changing it breaks existing links.

## Related

- [Navigation](/admin/storefront/navigation)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
