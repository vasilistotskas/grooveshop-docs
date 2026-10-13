---
title: Posts
description: Write, translate, schedule and publish blog posts, with categories, tags, authors, cover images and SEO.
---

# Posts

<span class="sidebar-path">Content → Blog → Blog Posts</span>

Blog posts are articles shown under `/blog` on the storefront. The whole blog is switched on or off per store by the platform plan; when it is off the Blog link disappears, the pages answer 404, and the **Blog** menu is not shown in the admin sidebar.

## What you see

The number beside the **Blog** menu in the sidebar counts comments waiting for approval, not drafts; see [Comments](/admin/blog/comments). The list has a date drill-down by publication date and shares a tab strip with Categories, Authors, Comments and Tags.

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
| **Publish selected posts** | Sets Is Published on **and overwrites Published At with the current time**, on every post selected, including ones already published. It will re-date your archive; use the form instead unless you mean that. |
| **Unpublish selected posts** | Sets Is Published off. |
| **Reset view count to zero** | Clears the counter. |
| **Export csv** / **Export xml** | Download the selection (up to 10,000 rows). |

## The post form

Language tabs (Greek default, English, German) apply to **Title**, **Subtitle** and **Body**.

| Section | Fields |
|---|---|
| **Content** | **Title**, **Subtitle**, **Body** (rich text; see **Rich text and video** below). |
| **Media** | **Image**: the cover image; usual formats plus SVG. |
| **Organization** | **Slug** (pre-filled from the title), **Category**, **Tags** (blog tags, multi-select). |
| **Publishing** | **Author**, **Featured**, **Is Published**, **Published At**. |
| **Engagement** (collapsed) | Read-only view count and the likes/comments/views summary. |
| **SEO** (collapsed) | **Seo Title**, **Seo Description**, **Seo Keywords**, and a read-only **SEO Score**. |
| **System** (collapsed) | id and timestamps. |

Tabs under the form: **Translations** (one row per language with title and subtitle, with a link to edit) and **Comments** (user, preview, **Approved**, created; see [Comments](/admin/blog/comments)).

**SEO Score** awards 25% each for a title between 11 and 59 characters, a subtitle, a cover image and at least one tag. 75% and above shows green, 50 to 74 amber, below that red. It scores only those four things and never looks at the body, the slug or the SEO fields.

## Tasks

### Write and publish a post
1. Make sure an author exists for you or the writer; see [Categories, authors & tags](/admin/blog/categories-authors-tags).
2. Click **Add**, write the Greek **Title**, **Subtitle** and **Body**, switch language tabs for the others.
3. Upload the cover **Image**, pick **Category** and **Tags**, set **Author**.
4. Tick **Is Published** and save. **Published At** is filled with the current time when you leave it empty. Saving a post with **Is Published** off leaves that field empty instead, so a draft has no date until the day you publish it.

### Schedule a post
1. Tick **Is Published** and set **Published At** to a future date and time.
2. The list shows **Scheduled**. The storefront shows the post from that moment on, with no further action.
3. Do not run **Publish selected posts** on it: the action overwrites **Published At** with now and publishes immediately.

### Add questions and answers (FAQ)
1. In the **Body**, put the cursor where the questions go and choose **Insert → Accordion** (or the accordion button on the toolbar). With the admin in Greek it reads **Εισαγωγή → Ερώτηση & απάντηση**.
2. Replace the placeholder title with the question and the text under it with the answer. The answer can hold any formatting, links or lists.
3. Insert one item per question; items placed one after another show as one list.

On the storefront each question is a bar in the store's accent colour, like the mobile footer's sections, and the answer opens when the reader taps it. Every item is saved closed, whatever state it had in the editor, and the reader opens the one they want.

### Feature a post
Tick **Featured** in the list or on the form. Featured posts are exposed to the storefront for the featured rails and listings that use the flag.

### Take a post down
Untick **Is Published**. Visitors get a 404 at `/blog/post/<id>/<slug>` and so do you, and the post leaves the search index. Purge the **Blog** surface in the [Cache](/admin/system/cache) tool, or a cached listing can keep showing it for a few minutes.

## Things to know

- **Rich text and video.** The body keeps what the editor produces: formatting, links, images and tables. To embed a video, paste a YouTube or Vimeo link into **Insert → Media**; video files and other hosts are refused. Anything the storefront cannot show, including markup pasted through **Source code**, stops the save with a message naming it instead of being removed silently. The same rule applies to every rich-text field: product and category descriptions, author bios, content pages and payment instructions.
- **Storefront visibility** needs Is Published on and Published At not in the future. A draft is invisible to everyone, you included: signing in to the admin does not let you preview one on the storefront, so the only way to see a post as a reader is to publish it.
- **Search index**: only posts with Is Published on are indexed, and the index ignores the date. A scheduled post can therefore turn up in search results before its publication time, even though the blog pages still hide it. Keep long-lead posts as drafts until close to the date.
- **Comments cannot be switched off for one post.** There is no per-post setting; the store-wide **BLOG_COMMENTS_ENABLED** under <span class="sidebar-path">Settings → Store Settings</span> is all or nothing. To close one conversation, unapprove its comments; see [Comments](/admin/blog/comments).
- Deleting a category or an author does not delete posts; the field is simply cleared.
- **Deleting a post does not delete its comments.** They stay behind with no post attached. Clear them from [Comments](/admin/blog/comments) first if you want them gone.
- **Cache**: blog pages and lists are cached on the storefront. Saving a post, category, author or tag purges the **Blog** surface on its own about ten seconds later; if an edit still does not show, purge it from the [Cache](/admin/system/cache) tool.
- The slug is unique and part of the URL; a blank slug is generated on save.
- Likes are given by customers on the storefront; the admin only shows the count.

## Related

- [Categories, authors & tags](/admin/blog/categories-authors-tags)
- [Comments](/admin/blog/comments)
- [Page layouts](/admin/storefront/page-layouts)
- [Cache](/admin/system/cache)
