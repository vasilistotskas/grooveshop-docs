---
title: Reviews
description: Moderate customer product reviews - who may write one, what the statuses mean, how to approve or reject, and what customers see.
---

# Reviews

<span class="sidebar-path">Catalog → Reviews</span>

Customers rate products they have bought. Nothing they write is public until a member of staff approves it here.

## What you see

The number beside the sidebar entry counts reviews still in **New** status; the dashboard shows the same count under **Needs attention** as **Reviews to approve**. The list shows 25 reviews per page, newest first; the total count is not displayed to keep the page fast.

| Column | Meaning |
|---|---|
| **Review** | `Review #id` and the first 100 characters of the comment. |
| **Product** | Linked product name. |
| **User** | Linked customer email. |
| **Rating** | `n/10`. |
| **Status** | **New** (blue), **True** (green, approved), **False** (red, rejected). |
| **Created** | Submission time. |

**Search** matches the customer's email and username only. Comment text and product names are deliberately not searchable, because the table can be very large; use the filters and the product link instead.

**Filters** (sheet with an Apply button): Status, Rate slider, creation date range.

**Bulk actions**: **Approve selected reviews** (sets True), **Reject selected reviews** (sets False).

The review form has **Review Information** (**Product**, **User**, **Rate**, **Status**), **Content** (**Comment** per language) and collapsed **System Information**.

## Statuses

| Status | Meaning | Visible on storefront |
|---|---|---|
| **New** | Just submitted, awaiting moderation. | Only to its author and to store staff. |
| **True** | Approved. | Everyone. |
| **False** | Rejected. | Only to its author and to store staff. |

## Tasks

### Moderate the queue
1. Open <span class="sidebar-path">Catalog → Reviews</span> and filter **Status** to **New**.
2. Read each comment; open the product link if you need context.
3. Select the rows and run **Approve selected reviews** or **Reject selected reviews**.

### Fix or remove an abusive review
- Open the review and edit the **Comment**, or set **Status** to **False**.
- **Delete** removes it permanently and lets the same customer submit a new review for that product.

### Reply to a review
Not available. There is no reply field or thread on reviews; contact the customer through your usual channels.

## Things to know

- **Rules applied when a customer submits a review**: the rating is a whole number from 1 to 10; the customer must already have an order containing that product which reached **Completed**; one review per customer per product; and the product a review points at can never be changed afterwards. None of these bind you here. From this screen staff can set any rating and any status.
- **Averages are computed over every review of the product, whatever its status.** A rejected review still drags the score down, and so does one still sitting in **New**. Delete a review, do not merely reject it, if it must not count. The number on a product card is on the same 1-to-10 scale as the **Rating** column, drawn as five stars.
- Reviews can be switched off store-wide with the **PRODUCT_REVIEWS_ENABLED** setting under <span class="sidebar-path">Settings → Store Settings</span>, which ships on. With it off, the storefront hides the review section on every product page and stops accepting new reviews, and **Reviews** leaves the admin sidebar and the dashboard. Approved reviews are not erased: they are still attached to their products and come back the moment you switch it on again. See [Store settings](/admin/settings/store-settings).
- Deleting a customer account deletes their reviews. Deleting a product is two different things: **Delete** on the product's own page only marks the product deleted and leaves its reviews intact, while the bulk **Delete selected** action on the product list takes the reviews with it.
- The number beside **Reviews** is refreshed whenever a review is saved or deleted, and at least once a minute otherwise. The list itself is always current.

## Related

- [Products](/admin/catalog/products)
- [Orders](/admin/sales/orders)
- [Store settings](/admin/settings/store-settings)
