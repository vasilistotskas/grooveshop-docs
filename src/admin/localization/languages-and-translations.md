---
title: Languages & translations
description: How product, category and blog translations work in the edit forms, which language the storefront serves, and who can change the admin's own interface strings.
---

# Languages & translations

The platform speaks three languages: Greek (the default), English and German (`LANGUAGES`, `PARLER_LANGUAGES` in `settings.py`). Content you enter is stored per language; the interface of the admin and the storefront have their own translations.

## Content translations

Translatable records (products, categories, blog posts and categories, tags, subscription topics, payment methods, page content and others) show **language tabs** at the top of their edit form, one per language, with a flag. Each tab holds that language's copy of the translatable fields, typically name, description, slug and SEO text. Non-translatable fields (price, stock, dates) are shared and appear once.

Rules that apply everywhere (`admin/base.py`, `BaseTranslatableAdmin`):

- **Greek is required.** It is the default language; the list views and search use it when it exists.
- **English is the fallback.** If a language has no translation, the English one is shown; if that is missing too, whatever language exists is shown. Untranslated records are never hidden.
- Deleting a translation is a separate action on the tab; deleting the record deletes all its translations.

### Tasks

#### Translate a product

1. Open the product in <span class="sidebar-path">Catalog → Products</span>.
2. Click the **English** (or **German**) tab.
3. Fill in name, description and the other text fields, then **Save**.

Saving on one tab does not create the other languages. Repeat per language.

#### Find untranslated records

There is no built-in filter for missing translations. Search the list for the record in Greek and open it; an empty tab means no translation.

## Which languages the storefront shows

Two things decide it:

- The **available locales** and the **default locale** on your store profile. The default is editable by Admin and Owner; the list of available locales is set by the platform and, when non-empty, limits the storefront to those languages and removes the others from the language switcher, the sitemap and the alternate-language tags.
- The storefront application itself has to ship the locale. Ask the platform before promising a language to customers.

Translations you enter in a language the storefront does not show are still stored and served through the API, so they are not lost.

## Admin interface language

The admin has a language switcher in its header (Greek, English, German). It changes only your own view. The URL carries the language: `/admin/` is Greek, `/en/admin/` English, `/de/admin/` German.

## Rosetta: the interface strings

**Rosetta** in the site dropdown is the editor for the interface strings of the admin and the API (labels, messages, email subjects). It edits one platform-wide catalogue shared by every store, so it is restricted to the platform console (`core/rosetta_access.py`, `ROSETTA_ALLOWED_SCHEMAS`). On a store's admin the link leads to a login page and nothing can be changed. If a label is wrong or untranslated, tell the platform which screen and which text.

Storefront interface strings (buttons, menus, checkout text) are not in Rosetta either; they live in the storefront application and change with a release.

## Things to know

- The search engine indexes every language and also understands Greek typed in Latin letters, so a Greek-only product is still found by an English-speaking visitor typing its name phonetically.
- The **Translations (parler)** surface on the [Cache](/admin/system/cache) page clears the per-row translation cache; you do not need it after ordinary edits.

## Related

- [Products](/admin/catalog/products)
- [Categories](/admin/catalog/categories)
- [Posts](/admin/blog/posts)
- [Countries & regions](/admin/localization/countries-and-regions)
