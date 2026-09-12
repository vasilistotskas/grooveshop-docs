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

15 categories per page, drag-ordered.

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
| **Bio** | First 50 characters of the biography. |
| **Posts** | Number of posts. |
| **Total likes received** | Likes across the author's published posts. |
| **Website** | Link, if set. |

**Search** matches the user's email, username, first and last name, and the bio. No filters.

The form: **Basic Information** (**User**, **Website**), **Biography** (**Bio** per language), collapsed **Statistics**.

### Tasks

**Create an author**: click **Add**, pick the **User** (the person needs an account first; see [Users & addresses](/admin/customers/users-and-addresses)), write the **Bio**, save.

### Things to know

- One profile per user, and a user with an author profile cannot be deleted while the profile exists. Delete the profile first.
- The author's name and picture on the storefront come from the user account, not from this form.
- The public author page is `/blog/author/<id>`; its post count includes published posts only.

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

**Retire a tag**: switch **Active** off. It stays on the posts but stops being offered as a filter.

### Things to know

- On the storefront the blog listing offers active tags as filters, and `/blog?tags=<id>` narrows the list to one tag.
- Deleting a tag removes it from every post.
- The post form's **SEO Score** counts a post with at least one tag as better optimised.

## Related

- [Posts](/admin/blog/posts)
- [Comments](/admin/blog/comments)
- [Tags](/admin/catalog/tags)
- [Users & addresses](/admin/customers/users-and-addresses)
