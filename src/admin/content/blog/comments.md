---
title: Comments
description: Readers' comments on the blog - hiding or erasing a comment, replying, and closing comments.
---

# Comments

Signed-in customers comment on posts and reply to each other. New comments are published at once; here you hide or erase the ones you do not want, afterwards.

<span class="sidebar-path">Content → Blog → Blog Comments</span>

## What you see

One row per comment, with the start of the text, the **User**, the **Post**, **Approved** and **Engagement** (likes and replies). Replies sit right below the comment they answer. When the commenter's account has been deleted, it shows **Anonymous**.

Search looks in the comment text, the commenter's name and email, and the post title.

| **Approved** | What readers see |
|---|---|
| ticked | The comment shows under the post and counts in its comments. |
| not ticked | The comment and its replies do not show. |

## Tasks

### Hide a comment
1. Find it with search.
2. Untick **Approved** and click **Save**. For several at once, select them and choose **Unapprove selected comments**.
3. Its replies are hidden with it. They all come back if you approve it again.

The change can take a few minutes to show on the post. To make it immediate, clear **Blog** from [Cache](/admin/settings/cache).

### Erase spam
Select the comments and choose **Mark as spam and delete**. They are erased for good, with all their replies. This cannot be undone; if in doubt, just hide the comment.

### Bring a hidden comment back
Filter **Approved** to "No", select the comment and choose **Approve selected comments**.

### Reply as the store
1. Click **Add**.
2. In **Post** pick the post and in **Parent Comment** the comment you are answering.
3. In **User** pick your own account and write the **Content**.
4. Tick **Approved** in the **Moderation** section and save. The reply shows with your account's name.

### Close comments on the whole blog
Under <span class="sidebar-path">Settings → Store Settings</span>, category **Storefront UI**, turn off `BLOG_COMMENTS_ENABLED` (on to start with). Readers no longer see comments or can write one, and **Blog Comments** leaves the sidebar. Comments are not erased and come back if you turn it on again. They cannot be closed per post.

## Things to know

- **Likes**: when someone likes a comment, its author gets a notification inside the store, not an email. See [Notifications](/admin/customers/notifications).
- **Do not rewrite a customer's words.** A change to the **Content** shows under their name. Prefer hiding the comment.
- **Deleting a post does not erase its comments.** They stay here with an empty **Post** column. Erase them first if they should go too.
- Deleting a customer's account keeps their comments, as **Anonymous**.

## Related

- [Posts](/admin/content/blog/posts)
- [Categories, authors & tags](/admin/content/blog/categories-authors-tags)
- [Notifications](/admin/customers/notifications)
- [Store settings](/admin/settings/store-settings)
