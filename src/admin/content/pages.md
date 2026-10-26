---
title: Pages
description: Write and publish your store's text pages (terms, privacy, cookies, returns, FAQ, shipping) and see where they appear.
---

# Pages

Here you write the store's plain text pages: the terms of use, the privacy and cookie policies, the return policy, the FAQ, shipping information. Each page has a title and a text in every language. For pages built from sections, like the home page, see [Page layouts](/admin/content/page-layouts).

<span class="sidebar-path">Content → Pages</span>

## What you see

| Column | What it shows |
|---|---|
| **Title** | The page's title. |
| **Slug** | The last part of the page's address, e.g. `faq`. |
| **Is Published** | Whether the page shows on the store. You can change it straight in the list and click **Save**. |
| **Updated At** | The last change. |

A page's form has:

- **Content**: the **Title** and the **Body**, with one tab per language.
- **Organization**: the **Slug** and **Is Published**.
- **SEO** (collapsed): **Seo Title**, **Seo Description** and **Seo Keywords**, for search engines.

### The pages you start with

Every store starts with seven pages:

| Slug | Title | At the start | Address on the store |
|---|---|---|---|
| `terms` | Όροι Χρήσης (Terms of use) | Published, with the platform's text | `/terms-of-use` |
| `privacy` | Πολιτική Απορρήτου (Privacy policy) | Published, with the platform's text | `/privacy-policy` |
| `cookies` | Πολιτική Cookies (Cookie policy) | Published, with the platform's text | `/cookies-policy` |
| `return-policy` | Πολιτική Επιστροφών (Return policy) | Not published, with a prompt | `/return-policy` |
| `faq` | Συχνές Ερωτήσεις (FAQ) | Not published, with a prompt | `/info/faq` |
| `about` | Σχετικά με εμάς (About us) | Not published, with a prompt | `/info/about` |
| `shipping-info` | Πληροφορίες Αποστολής (Shipping information) | Not published, with a prompt | `/info/shipping-info` |

The titles and texts are in Greek. The three legal texts are published from the start, so the store never runs without them. From the moment they are created they are yours: read them and adapt them to your business. The other four hold a short prompt in place of the text.

## Tasks

### Write and publish a page

Example: the return policy.

1. Open the `return-policy` page.
2. In the **Body**, delete the prompt and write your own policy in Greek. If the store has other languages, fill in their tabs.
3. Tick **Is Published** and click **Save**.

Within about ten seconds the page shows at `/return-policy` and at the bottom of the footer.

### Add a new page

1. Click **Add**.
2. Enter a **Title** and a **Body**.
3. Give a short **Slug** in lowercase Latin letters and hyphens, e.g. `payment-methods`. The page will be at `/info/payment-methods`.
4. Tick **Is Published** when it is ready and save.

The page is added to the footer automatically. To put it in a menu as well, see [Menus](/admin/content/menus).

### Take a page down

Untick **Is Published** and save. Visitors see the "not found" page, and links to it leave the footer and the menus.

The terms of use, the privacy policy and the cookie policy cannot be taken down. The admin refuses to unpublish them, to schedule them for a later date, to empty their text in a language the store serves, to change their slug or to delete them. Without them the store would show "not found" in their place, and checkout refuses every order, card payments included, while the terms of use or the privacy policy cannot be shown. Change their text instead: that is always allowed.

### See what each order accepted

Every order records the exact terms of use and privacy policy its customer accepted. Open the order and find them under **Legal acceptances**, each with the language and the time. The text there stays as it was, even after you edit the page. **Content → Accepted legal texts** lists every version that orders have accepted.

### Review a legal text update from the platform

When the platform changes a legal text:

- If you have never changed the page, it is updated for you.
- If you have changed it, or it has another language, your text stays as it is. The Dashboard then shows **Your legal pages need an update**.

To review it:

1. Open the page from the Dashboard or from <span class="sidebar-path">Content → Pages</span>.
2. In the **Platform update to review** section, read the **Text to add**.
3. Add it to your own text, in every language of the store, and save.
4. In the list, select the page and run **Mark platform legal update as reviewed**.

Marking it only clears the notice; it does not add the text. The first such update adds a section on server logs to the privacy policy. The privacy policy is your responsibility, so it is worth having your legal adviser look at it.

## Things to know

- **A page without a translation** shows in the store's main language, with a note for the visitor. Still, fill in every language you serve.
- **The `/info/` address of the four pages with their own address** (terms, privacy, cookies, returns) redirects to their own address.
- **Two "About" pages.** The `about` page here is at `/info/about`. The `/about` address is a different page, built from a [page layout](/admin/content/page-layouts) of type `about`.
- **Do not change the slug** of a page already published. Its address changes, and links that were shared stop working. Links in your menus follow on their own. The legal pages keep theirs: the admin refuses the change.
- **A starting page you do not need**: leave it unpublished rather than deleting it.
- **If a change does not show** after a minute, clear the **Pages & navigation** cache on the [Cache](/admin/settings/cache) page.

## Related

- [Menus](/admin/content/menus)
- [Page layouts](/admin/content/page-layouts)
- [Cache](/admin/settings/cache)
