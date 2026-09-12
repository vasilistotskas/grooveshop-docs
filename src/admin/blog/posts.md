---
title: Posts
description: Write, translate, schedule and publish blog posts, with categories, tags, authors, cover images and SEO.
---

# Posts

<span class="sidebar-path">Blog → Blog Posts</span>

Blog posts are articles shown under `/blog` on the storefront. The whole blog is switched on or off per store by the platform plan; when it is off the Blog link disappears and the pages answer 404.

## What you see

The sidebar entry carries a yellow badge with the number of unpublished posts. The list has a date drill-down by publication date and shares a tab strip with Categories, Authors, Comments and Tags.

| Column | Meaning |
|---|---|
| **Title** | Translated title. |
| **Category** | Blog category. |
| **Author** | Author name and email. |
| **Featured** | Editable in the list; tick and press **Save**. |
| **Status** | **Draft** (not published), **Scheduled** (published with a future date), **Published**. |
| **Engagement** | Likes, approved comments and views. |
| **Published at** | Publication timestamp. |

**Search** matches title, subtitle, slug, body and the author's email or username. **Filters**: Featured, **Publish Status**, published and created date ranges, Category, Author, Tags, View Count slider, and numeric ranges for **Likes**, **Comments** (approved only) and **Tags** (active only).

**Bulk actions**:

| Action | Effect |
|---|---|
| **Mark selected posts as featured** / **Remove featured mark from selected posts** | Toggle the Featured flag. |
| **Publish selected posts** | Sets Is Published on **and Published At to now**. |
| **Unpublish selected posts** | Sets Is Published off. |
| **Increment view count by 100** / **Reset view count to zero** | Adjust the counter. |
| **Export csv** / **Export xml** | Download the selection (up to 10,000 rows). |

## The post form

Language tabs (Greek default, English, German) apply to **Title**, **Subtitle** and **Body**.

| Section | Fields |
|---|---|
| **Content** | **Title**, **Subtitle**, **Body** (rich text, sanitised on save). |
| **Media** | **Image**: the cover image; usual formats plus SVG. |
| **Organization** | **Slug** (pre-filled from the title), **Category**, **Tags** (blog tags, multi-select). |
| **Publishing** | **Author**, **Featured**, **Is Published**, **Published At**. |
| **Engagement** (collapsed) | Read-only view count and the likes/comments/views summary. |
| **SEO** (collapsed) | **Seo Title**, **Seo Description**, **Seo Keywords**, and a read-only **SEO Score**. |
| **System** (collapsed) | id and timestamps. |

Tabs under the form: **Translations** (one row per language with title and subtitle, with a link to edit) and **Comments** (user, preview, **Approved**, created; see [Comments](/admin/blog/comments)).

**SEO Score** awards 25% each for a title between 11 and 59 characters, a subtitle, a cover image and at least one tag. 75% and above shows green.

## Tasks

### Write and publish a post
1. Make sure an author exists for you or the writer; see [Categories, authors & tags](/admin/blog/categories-authors-tags).
2. Click **Add**, write the Greek **Title**, **Subtitle** and **Body**, switch language tabs for the others.
3. Upload the cover **Image**, pick **Category** and **Tags**, set **Author**.
4. Tick **Is Published** and save. **Published At** is filled with the current time when left empty.

### Schedule a post
1. Tick **Is Published** and set **Published At** to a future date and time.
2. The list shows **Scheduled**. The storefront shows the post from that moment on, with no further action.
3. Do not run **Publish selected posts** on it: the action overwrites **Published At** with now and publishes immediately.

### Feature a post
Tick **Featured** in the list or on the form. Featured posts are exposed to the storefront for the featured rails and listings that use the flag.

### Take a post down
Untick **Is Published**. Visitors get a 404 at `/blog/post/<id>/<slug>`; staff can still open it. The post is removed from the search index.

## Things to know

- **Storefront visibility** needs Is Published on and Published At not in the future. Store staff see drafts on the storefront too.
- **Search index**: only posts with Is Published on are indexed. The index does not look at the date, so a scheduled post can surface in search results before its publication time; keep long-lead posts as drafts until close to the date.
- **Comments on a post cannot be switched off per post.** The store-wide setting `BLOG_COMMENTS_ENABLED` under <span class="sidebar-path">Settings → Extra Settings</span> hides comments everywhere.
- Deleting a category or an author does not delete posts; the field is cleared. Deleting a post deletes its comments.
- **Cache**: blog pages and lists are cached on the storefront; purge the **Blog** surface from the [Cache](/admin/system/cache) tool to show an edit immediately.
- The slug is unique and part of the URL; a blank slug is generated on save.
- Likes are given by customers on the storefront; the admin only shows the count.

## Related

- [Categories, authors & tags](/admin/blog/categories-authors-tags)
- [Comments](/admin/blog/comments)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
