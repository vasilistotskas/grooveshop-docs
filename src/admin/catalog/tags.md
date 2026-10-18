---
title: Tags
description: Free-form labels attached to products - creating, ordering, activating and where they are used.
---

# Tags

<span class="sidebar-path">Catalog → Tags</span>

Tags are short translatable labels that can be attached to products from the product page. They are a lightweight way to mark items for internal grouping or campaigns. Blog posts use their own separate tags; see [Categories, authors & tags](/admin/content/blog/categories-authors-tags).

## What you see

50 tags per page, in sort order.

| Column | Meaning |
|---|---|
| **Name** | The translated label. |
| **Active** | Editable directly in the list; tick, then **Save** at the bottom. |
| **Usage** | Number of items carrying the tag. |
| **Sort Order** | Drag rows to reorder. |
| **Created** | Timestamp. |

**Search** matches label text and id. **Filters**: **Tag Status** (**Active Tags**, **Inactive Tags**, **Used Tags**, **Unused Tags**, **Popular (>10 uses)**, **Recently Created**, meaning the last seven days), **Usage Range**, **Content Type**, Active, and created and updated date ranges. **Content Type** only ever offers **Product**, because products are the only thing these tags attach to.

**Bulk actions**:

| Action | Effect |
|---|---|
| **Activate selected tags** | Sets Active on. |
| **Deactivate selected tags** | Sets Active off. |

The tag form has **Tag Information** (**Label** per language, **Active**), **Organization** (**Sort Order**) and collapsed **System Information**.

## Tasks

### Create a tag and attach it to products
1. Click **Add**, type the Greek **Label** and other languages, save.
2. Open each product from [Products](/admin/catalog/products), go to the **Tags** tab, add a row, pick the tag through the autocomplete, save.

### Merge two tags
Not available as an action, and there is no undo, so work in this order.

1. Open the **Tagged Items** list, which is not in the sidebar: press **Ctrl+K** (**⌘K** on a Mac) and type its name, or go to `/admin/tag/taggeditem/`. Filter **Tag** to the one you want to drop. It lists every product carrying it.
2. Open each of those products and add the surviving tag in its **Tags** tab.
3. Only when all of them carry the survivor, delete the old tag. That removes it from every product at once.

### Retire a tag
Switch **Active** off. The assignments stay in place, so you can re-enable later.

## Things to know

- **Customers never see these tags.** Nothing on the storefront shows them: not the product page, not the listing, and there is no way for a shopper to filter or browse by one. They are an internal label for your own team, and **Active** and **Sort Order** only affect how this screen presents them.
- Only products can carry these tags. Blog posts have a separate set of tags with their own list, and the two never mix.
- A tag label is per language. Where the current language has none, both the storefront and this screen fall back to whichever language does have one.
- The sort order is global across all tags, not per language and not per kind of item.

## Related

- [Products](/admin/catalog/products)
- [Categories, authors & tags](/admin/content/blog/categories-authors-tags)
