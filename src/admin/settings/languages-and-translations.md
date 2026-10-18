---
title: Languages & translations
description: How product, category and blog translations work in the edit forms, which language the storefront serves, and who can change the admin's own interface wording.
---

# Languages & translations

The platform speaks three languages: Greek (the default), English and German. Content you enter is stored per language; the admin and the storefront have their own separate interface wording.

## Content translations

Translatable records (products, categories, blog posts and categories, tags, subscription topics, payment methods, content pages and others) show **language tabs** at the top of their edit form, one per language, with a flag. Each tab holds that language's copy of the translatable fields, typically name, description, slug and SEO text. Non-translatable fields (price, stock, dates) are shared and appear once.

Rules that apply everywhere:

- **Greek is the default.** It is what the list views and search show when it exists, and the storefront's own interface is built around it.
- **English is the fallback.** If a language has no translation, the English one is shown; if that is missing too, whatever language exists is shown. Untranslated records are never hidden from customers.
- Deleting a translation is a separate action on the tab; deleting the record deletes all its translations.

### Tasks

#### Translate a product

1. Open the product in <span class="sidebar-path">Catalog → Products</span>.
2. Click the **English** (or **German**) tab.
3. Fill in name, description and the other text fields, then **Save**.

Saving on one tab does not create the other languages. Repeat per language.

#### Find untranslated records

None of your store's screens has a "missing translation" filter. Search the list for the record in Greek, open it, and an empty tab means no translation.

## Which languages the storefront shows

Two things decide it:

- The **available locales** and the **default locale** on your store profile. The default is editable by Admin and Owner; the list of available locales is set by the platform and, when non-empty, limits the storefront to those languages and removes the others from the language switcher, the sitemap and the alternate-language tags.
- The storefront application itself has to ship the language. Ask the platform before promising one to customers.

Translations you enter in a language the storefront does not show are still stored and still served to anything reading your store's data, so they are not lost.

## Admin interface language

The admin has a language switcher in the account menu at the bottom of the sidebar (Greek, English, German) once you are signed in. It changes only your own view, never your storefront. The address carries the language: `/admin/` is Greek, `/en/admin/` English, `/de/admin/` German. The login page itself has no switcher, so open the language-prefixed address directly if you want the form in English or German.

## Translations: the interface wording

<span class="sidebar-path">Settings → Translations</span> is the editor for the wording of the admin itself and of the emails it sends — labels, messages, subjects. It edits one platform-wide catalogue shared by every store, so it is reserved for the platform: the entry is listed only where the platform has opened the editor for your store, and a store's sidebar normally does not show it. If a label is wrong or untranslated, tell the platform which screen and which text.

The storefront's own wording (buttons, menus, checkout text) is not in this editor either; it lives in the storefront application and changes with a release.

## Things to know

- The search engine indexes every language and also understands Greek typed in Latin letters, so a Greek-only product is still found by a visitor typing its name phonetically.
- The **Translations (parler)** surface on the [Cache](/admin/settings/cache) page clears the per-row translation cache. It is marked **Heavy** and you do not need it after ordinary edits.

## Related

- [Products](/admin/catalog/products)
- [Categories](/admin/catalog/categories)
- [Posts](/admin/content/blog/posts)
- [Countries & regions](/admin/localization/countries-and-regions)
