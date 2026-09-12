---
title: Reviews
description: Moderate customer product reviews - who may write one, what the statuses mean, how to approve or reject, and what customers see.
---

# Reviews

<span class="sidebar-path">Catalog → Reviews</span>

Customers rate products they have bought. Nothing they write is public until a member of staff approves it here.

## What you see

The sidebar entry carries a blue badge with the number of reviews still in **New** status. The list shows 25 reviews per page, newest first; the total count is not displayed to keep the page fast.

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

- **Rating rules enforced by the storefront**: the rating is a whole number from 1 to 10; a customer may review a product only after an order containing it reached **Completed**; one review per customer per product; a review's product cannot be changed afterwards. Staff can set any rating and status from the admin.
- **Averages** shown on product cards are computed over every review of the product regardless of status. Reject and then delete a review if it must not count.
- Reviews can be switched off store-wide with the **PRODUCT_REVIEWS_ENABLED** setting under <span class="sidebar-path">Settings → Extra Settings</span>; when off, the storefront hides the review UI and the API answers 404. See [Store settings](/admin/settings/store-settings).
- Deleting a product deletes its reviews; deleting a customer account deletes theirs.
- The badge count and the moderation queue refresh within a minute of a status change.

## Related

- [Products](/admin/catalog/products)
- [Orders](/admin/sales/orders)
- [Store settings](/admin/settings/store-settings)
