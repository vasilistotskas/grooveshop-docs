---
title: Categories, authors & tags
description: The three supporting lists of the blog - the category tree, the author profiles tied to user accounts, and the blog's own tags.
---

# Categories, authors & tags

<span class="sidebar-path">Blog → Blog Categories</span>, <span class="sidebar-path">Blog → Blog Authors</span>, <span class="sidebar-path">Blog → Blog Tags</span>

Posts reference these three lists. All blog pages share a tab strip at the top (Blog Posts, Categories, Authors, Comments, Tags), so you can move between them without the sidebar.

## Blog Categories

Blog categories form a tree, separate from the product categories.

### What you see

15 categories per page, drag-ordered. **The list itself is flat**, however deep the tree goes: a subcategory sits in the ordinary run of rows and the **Parent** column is the only thing that tells you where it belongs. Dragging reorders siblings, so read the **Parent** column before you move anything.

| Column | Meaning |
|---|---|
| **Name** | Translated name. |
| **Parent** | Parent category, or a dash for a top-level one. |
| **Direct Posts** | Posts in exactly this category. |
| **Total Posts (Tree)** | Posts in this category and its descendants. |

**Search** matches name and description. There are no filters on this list.

The form: **Category Information** (**Name**, **Description** per language, **Parent**), **URL** (**Slug**, pre-filled from the name), **Media** (**Image**, usual formats plus SVG), collapsed **Organization** (**Sort Order**) and collapsed **Statistics**.

### Tasks

**Add a category**: click **Add**, type the Greek **Name**, choose a **Parent** if it is a subcategory, upload an **Image** if the category rail on the home page should show one, save.

**Reorder**: drag rows in the list.

### Things to know

- Deleting a category deletes its subcategories. Posts in them keep existing with no category.
- Storefront pages: the category list at `/blog/categories` and each category at `/blog/category/<id>/<slug>`. The **Blog Categories Rail** section of a page layout also lists them; see [Page layouts](/admin/storefront/page-layouts).
- Post counts shown on the storefront include published posts only; the admin columns count drafts too.
- Blog categories have no Active flag; a category exists or it does not.

## Blog Authors

An author is a profile attached to exactly one user account. A post's **Author** must be one of these profiles, so create the profile before the first post.

### What you see

| Column | Meaning |
|---|---|
| **User** | Full name (or username) and email. |
| **Bio** | The biography's first 50 characters, as plain text. |
| **Posts** | Number of posts. |
| **Total likes received** | Likes across the author's published posts. |
| **Website** | Link, if set. |

**Search** matches the user's email, username, first and last name, and the bio. No filters.

The form: **Basic Information** (**User**, **Website**), **Biography** (**Bio** per language), collapsed **Statistics**. **Bio** uses the same rich-text editor as a post body: paragraphs, bold, links and lists show on the author page as written (see [Posts](/admin/blog/posts#things-to-know)).

### Tasks

**Create an author**: click **Add**, pick the **User** (the person needs an account first; see [Users & addresses](/admin/customers/users-and-addresses)), write the **Bio**, save.

### Things to know

- One profile per user, and a user with an author profile cannot be deleted while the profile exists. Delete the profile first.
- **Only Bio and Website come from this form.** The author's name and picture on the storefront are taken from the user account, so correct those on the person's account, not here.
- The public author page is `/blog/author/<id>`, and the count it shows covers published posts only.
- **The two count columns here disagree on purpose.** **Posts** counts everything the author has written, drafts included, while **Total likes received** only adds up likes on their published posts.

## Blog Tags

Blog tags are separate from the product [Tags](/admin/catalog/tags).

### What you see

| Column | Meaning |
|---|---|
| **Name** | Translated name. |
| **Active** | Editable in the list; tick and press **Save**. |
| **Posts** | Number of posts carrying the tag. |
| **Sort Order** | Drag rows to reorder. |

**Filters**: Active, and a **Posts** count range. **Search** matches the name.

The form: **Tag Information** (**Name** per language, **Active**), **Organization** (**Sort Order**).

### Tasks

**Create a tag**: click **Add**, type the Greek **Name** and other languages, save. Then pick it in the **Tags** field of each post.

**Retire a tag**: switch **Active** off. It stays on every post that carries it, and, as the note below explains, readers will not notice the change. Remove it from the posts, or delete it, if it must really go.

### Things to know

- **The tags shown on the blog are not clickable.** The blog landing page has a **Tags** panel, visible on wide screens only, but its entries are plain labels with a text box to search them. A reader cannot click one to narrow the article list, and nothing anywhere links to a tag.
- **That panel ignores Active.** It shows whatever tags it is given, inactive ones included, and only the first page of them. Switching **Active** off changes nothing a reader sees, so treat the flag as an internal marker until tag browsing exists.
- Deleting a tag removes it from every post.
- The **Posts** column counts drafts and scheduled posts along with published ones, so it can be higher than the number of articles a reader can actually reach.
- The post form's **SEO Score** counts a post with at least one tag as better optimised, which is the one place a tag has a visible effect today.

## Related

- [Posts](/admin/blog/posts)
- [Comments](/admin/blog/comments)
- [Tags](/admin/catalog/tags)
- [Users & addresses](/admin/customers/users-and-addresses)
