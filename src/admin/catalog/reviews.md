---
title: Reviews
description: Approving and rejecting product reviews, what customers see, who may write a review and the related settings.
---

# Reviews

Customers write reviews of your products. No review shows in the store until you approve it here.

<span class="sidebar-path">Catalog → Reviews</span>

## What you see

The list opens on the reviews waiting for approval. The number next to **Reviews** in the sidebar and **Reviews to approve** on the Dashboard count the same reviews.

| Column | Meaning |
|---|---|
| **Product** | The product, with the review's number below it. |
| **Customer** | First name and last initial, or the username if the account has no name. |
| **Rating** | Stars out of 5, e.g. `4.5/5`. |
| **Comment** | The start of the comment. |
| **Status** | **Waiting for approval**, **Approved** or **Rejected**. |
| **Verified purchase** | The customer has an order with this product in status **Completed**. |

Search finds reviews by the customer's email or username. The **Status** filter also has an **All** option.

| Status | Who sees it in the store |
|---|---|
| **Waiting for approval** | Only the customer who wrote it, labelled "In review". |
| **Approved** | Everyone. |
| **Rejected** | Only the customer who wrote it, labelled "Not published". |

## Tasks

### Approve or reject reviews
1. Open <span class="sidebar-path">Catalog → Reviews</span>. You already see the ones waiting.
2. Read the comment. Open the review if you want to see all of it.
3. Select rows and choose **Approve selected reviews** or **Reject selected reviews**. Inside a review, the **Approve** and **Reject** buttons at the top right do the same.

An approved review gets a publication date, the one customers see. It can take a few minutes to show on the product page.

### Hide or correct a review
- Click **Reject**: it leaves the store, and you can approve it again later.
- Or correct the **Comment** and save. Your own correction does not send it back for approval.
- **Delete** erases it for good, and the customer can then write a new review of the same product.

### Reply to a review
Not possible here: reviews have no replies. Contact the customer by email or phone.

### Choose who may write a review
Open <span class="sidebar-path">Settings → Store Settings</span> and the **Storefront UI** category.

| Setting | What it does | Starts as |
|---|---|---|
| `PRODUCT_REVIEWS_ENABLED` | Turns reviews on or off for the whole store. Off, it hides reviews and stars from product cards and pages, and **Reviews** from the sidebar. | on |
| `PRODUCT_REVIEWS_PURCHASE_REQUIRED` | On: only customers who bought the product may review it. Off: every signed-in customer may. | on |
| `ACCOUNT_REVIEWS_ENABLED` | Shows the "My reviews" page in the customer's account. Does not change reviews on product pages. | on |

Turn `PRODUCT_REVIEWS_PURCHASE_REQUIRED` off if you have few purchases and want more reviews. With it off, a review from a buyer still shows the "Verified purchase" badge in the store.

## Things to know

- **When a customer changes their review**: if they change the rating or comment of an approved or rejected review, it goes back to **Waiting for approval**. It leaves the store until you approve it again.
- **The email**: each time a review waits for approval, the store's contact and owner emails receive the message "Review waiting for approval", with a link to the review. Turn it off with `OPS_ALERT_REVIEW_PENDING_ENABLED` (category **Operational Alerts**, on to start with). With it off, reviews still show on the Dashboard and in the sidebar.
- **The average counts only approved reviews.** A product's stars are the average of the approved ratings.
- **Rules for customers**: one review per customer per product, rated from half a star to 5 stars. These rules apply to customers only; here you can set any rating and status.
- When a customer's account is deleted, their reviews are erased too.

## Related

- [Products](/admin/catalog/products)
- [Orders](/admin/sales/orders)
- [Store settings](/admin/settings/store-settings)
- [Dashboard](/admin/getting-started/dashboard)
