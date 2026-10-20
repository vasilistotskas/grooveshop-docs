---
title: Posts
description: Writing, translating, scheduling and publishing blog posts, with a category, tags, an author and an image.
---

# Posts

This is where you write and publish your store's blog posts. If you do not see the **Blog** menu, the blog is not part of your plan; ask the platform team for it.

<span class="sidebar-path">Content → Blog → Blog Posts</span>

## What you see

One row per post, with its title, category, author, **Featured**, **Status**, **Engagement** (likes, comments, views) and **Published At**.

| Status | Meaning |
|---|---|
| **Draft** | Not published. Readers cannot see it. |
| **Scheduled** | Published with a future date. It appears on its own at that moment. |
| **Published** | Readers can see it. |

The number next to the **Blog** menu counts comments waiting for approval, not drafts.

## Tasks

### Write and publish a post
1. Make sure there is an author for whoever signs the post; see [Categories, authors & tags](/admin/content/blog/categories-authors-tags).
2. Click **Add**.
3. On the **Content** tab write the **Title**, **Subtitle** and **Body** in every language tab, and upload the post's **Image**.
4. On the **Publishing** tab pick the **Category**, **Tags** and **Author**.
5. Tick **Is Published** and save. If you leave **Published At** empty, it takes the current date and time.

For a draft, save without ticking **Is Published**.

### Schedule a post
1. Tick **Is Published** and set **Published At** to a future date and time.
2. Save. The list shows **Scheduled** and the post appears on its own at the moment you set.
3. Do not use **Publish selected posts** on it: that publishes at once, with today's date.

### Feature a post
Tick **Featured**, in the list (then click **Save**) or inside the post. A featured post on the blog's first page is shown first, as a large card.

### Add questions and answers
1. In the **Body**, put the cursor where the questions should go and choose **Insert → Accordion**.
2. Write the question in place of the title and the answer below it.
3. Add one item per question.

In the store each question is a bar; the answer opens when the reader taps it.

### Add a video
Choose **Insert → Media** in the **Body** and paste a YouTube or Vimeo link. Video files and other platforms are not accepted. On the store a YouTube video shows as a picture with a play button: the player loads only when the visitor clicks it, so the page opens fast and YouTube sets no cookies before then.

### Take a post down
Untick **Is Published** and save, or select posts and choose **Unpublish selected posts**. The post's page then shows "Not found".

## The form's tabs

| Tab | What it holds |
|---|---|
| **Content** | **Title**, **Subtitle**, **Body** per language and the post's **Image**. |
| **Publishing** | **Slug** (the last part of the page's web address), **Category**, **Tags**, **Author**, **Featured**, **Is Published**, **Published At**. |
| **SEO** | **Seo Title**, **Seo Description**, **Seo Keywords** and the **SEO Score**. |
| **Statistics** | Views, likes, comments, **Created At** and **Updated At**. |
| **Blog Comments** | The post's comments; see [Comments](/admin/content/blog/comments). |

## Things to know

- **SEO Score**: it gets 25% for each of: a title of 11 to 59 characters, a subtitle, an image and at least one tag. It does not read the body or the SEO fields.
- **Text that is refused**: if you paste something the store cannot show, e.g. code from **Source code**, saving stops with a message saying what is wrong.
- **Text pasted from Word**: it keeps its bold, sizes, colours and alignment, but not its font. The store shows every post in its own fonts, so a font set in Word (Roboto, Calibri, ...) does not appear, and Word's hidden comment marks are left out.
- **Search**: the store's search finds a scheduled post before its time, even though the blog pages still hide it. Keep posts with a distant date as drafts.
- **Bulk actions**: **Publish selected posts** puts today's date on every selected post, even ones already published. Changes made by bulk actions reach the store on their own.
- **Comments**: they cannot be closed per post. The `BLOG_COMMENTS_ENABLED` setting under <span class="sidebar-path">Settings → Store Settings</span> closes them for the whole blog; see [Comments](/admin/content/blog/comments).
- **Deleting**: deleting a post does not erase its comments. Erase them first from [Comments](/admin/content/blog/comments) if they should go.
- **A list for Excel**: select posts and choose **Export selected to CSV** or **Export selected to XML**.

## Related

- [Categories, authors & tags](/admin/content/blog/categories-authors-tags)
- [Comments](/admin/content/blog/comments)
- [Page layouts](/admin/content/page-layouts)
- [Cache](/admin/settings/cache)
