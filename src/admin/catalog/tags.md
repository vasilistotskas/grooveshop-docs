---
title: Tags
description: Free-form labels attached to products - creating, ordering, activating and where they are used.
---

# Tags

<span class="sidebar-path">Catalog → Tags</span>

Tags are short translatable labels that can be attached to products from the product page. They are a lightweight way to mark items for internal grouping or campaigns. Blog posts use their own separate tags; see [Categories, authors & tags](/admin/blog/categories-authors-tags).

## What you see

50 tags per page, in sort order.

| Column | Meaning |
|---|---|
| **Name** | The translated label. |
| **Active** | Editable directly in the list; tick, then **Save** at the bottom. |
| **Usage** | Number of items carrying the tag. |
| **Sort Order** | Drag rows to reorder. |
| **Created** | Timestamp. |

**Search** matches label text and id. **Filters**: **Tag Status** (active, inactive, used, unused, popular with more than 10 uses, created in the last 7 days), **Usage Range**, **Content Type** (which kind of item the tag is attached to), Active, date ranges.

**Bulk actions**:

| Action | Effect |
|---|---|
| **Activate selected tags** | Sets Active on. |
| **Deactivate selected tags** | Sets Active off. |
| **Update sort order** | Renumbers the selected tags by usage, most used first, then by label. |
| **Analyze tag usage** | Shows a message with total, active and in-use counts for the selection. |

The tag form has **Tag Information** (**Label** per language, **Active**), **Organization** (**Sort Order**) and collapsed **System Information**.

## Tasks

### Create a tag and attach it to products
1. Click **Add**, type the Greek **Label** and other languages, save.
2. Open each product from [Products](/admin/catalog/products), go to the **Tags** tab, add a row, pick the tag through the autocomplete, save.

### Merge two tags
Not available as an action. To merge, open the products carrying the tag you want to drop (filter by **Content Type** and check **Usage**, or use the tag autocomplete on each product), attach the surviving tag, then delete the old one. Deleting a tag removes it from every item.

### Retire a tag
Switch **Active** off. The assignments stay in place, so you can re-enable later.

## Things to know

- **Tags are not rendered on the storefront product page**, and the product listing does not filter by them. They are exposed through the API and are otherwise an internal organisation tool today.
- Only products use these tags. The blog has its own tag model with its own list.
- A tag label is per language; the storefront and the admin fall back to any available language when the current one is empty.
- The sort order is global across all tags.

## Related

- [Products](/admin/catalog/products)
- [Categories, authors & tags](/admin/blog/categories-authors-tags)
