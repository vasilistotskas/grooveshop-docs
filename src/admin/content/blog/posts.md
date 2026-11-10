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
2. Save. The list shows **Scheduled**.
3. Do not use **Publish selected posts** on it: that publishes at once, with today's date.

Within about a minute of the date you set, the post appears on its own: on the blog, in the store's search and in its feeds. If `INDEXNOW_ENABLED` is on (see [Store settings](/admin/settings/store-settings)), the search engines hear of it in the store's next message to them, sent every half hour. You do not need to save it again or clear any cache.

### Make a link open in a new tab
In the **Body**, when you add or edit a link, choose in the editor's link window that it opens in a new window. The store keeps that choice. To open every link that leads to another site in a new tab, without choosing it link by link, switch on `EXTERNAL_LINKS_NEW_TAB_ENABLED` in [Store settings](/admin/settings/store-settings).

### Feature a post
Tick **Featured**, in the list (then click **Save**) or inside the post. A featured post on the blog's first page is shown first, as a large card.

### Add questions and answers
1. In the **Body**, put the cursor where the questions should go and choose **Insert → Accordion**.
2. Write the question in place of the title and the answer below it.
3. Add one item per question.

In the store each question is a bar; the answer opens when the reader taps it.

### Add a video
Choose **Insert → Media** in the **Body** and paste a YouTube or Vimeo link. Video files and other platforms are not accepted. On the store a video shows as a play button, with the video's picture for YouTube: the player loads only when the visitor clicks it, so the page opens fast and the visitor's browser contacts YouTube or Vimeo only then.

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
- **Fonts and text size come from the store**: when you save, the font and the text size are removed from the text, so every post uses the typography of your store's theme. This also goes for text pasted from Word or from a web page (Roboto, Calibri, 14pt, ...), and Word's hidden formatting and comment marks go with it. Bold, italics, colours, alignment and spacing stay as you set them. The editor does not offer a font or a text size for the same reason; use a heading for larger text.
- **Search**: a scheduled post stays out of the store's search until its time, as it does on the blog pages.
- **Bulk actions**: **Publish selected posts** puts today's date on every selected post, even ones already published. Changes made by bulk actions reach the store on their own.
- **Comments**: they cannot be closed per post. The `BLOG_COMMENTS_ENABLED` setting under <span class="sidebar-path">Settings → Store Settings</span> closes them for the whole blog; see [Comments](/admin/content/blog/comments).
- **Deleting**: deleting a post does not erase its comments. Erase them first from [Comments](/admin/content/blog/comments) if they should go.
- **A list for Excel**: select posts and choose **Export selected to CSV** or **Export selected to XML**.

## Feeds for your readers

Readers can follow your store in a feed reader (RSS). Each feed lists your published posts, newest first, with their full text:

| Address | What it holds |
|---|---|
| `/rss.xml` | Your blog posts and, when your store shows products, your products too. |
| `/blog/rss.xml` | Your blog posts only. |

If your store is also in English, the English feeds are `/en/rss.xml` and `/en/blog/rss.xml`. Add the address to your store's domain, for example `https://your-domain/blog/rss.xml`. The feeds follow your changes by themselves: a new, changed or scheduled post appears in them without any clearing. Without the blog, there are no feeds.

## Related

- [Categories, authors & tags](/admin/content/blog/categories-authors-tags)
- [Comments](/admin/content/blog/comments)
- [Page builder](/admin/content/page-builder)
- [Cache](/admin/settings/cache)
