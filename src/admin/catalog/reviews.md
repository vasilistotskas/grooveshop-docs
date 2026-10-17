---
title: Reviews
description: Moderate customer product reviews - who may write one, what the statuses mean, how to approve or reject, what happens when a customer edits a review, the email about reviews to approve, and what customers see.
---

# Reviews

<span class="sidebar-path">Catalog → Reviews</span>

Customers rate products they have bought. Nothing they write is public until a member of staff approves it here.

## What you see

The list opens on the reviews in **Waiting for approval** status. The number beside the sidebar entry counts the same reviews, and the dashboard shows that count under **Needs attention** as **Reviews to approve**. The list shows 25 reviews per page, newest first; the total count is not displayed to keep the page fast.

| Column | Meaning |
|---|---|
| **Product** | The product's name and thumbnail, with `Review #id` below. Click it to open the review. |
| **Customer** | The author's first name and last initial (the username or email when the account has no name), linked to the customer's account. |
| **Rating** | Stars out of 5, for example `4.5/5`. The rating is stored from 1 to 10 in half stars, so the stars are half of it. |
| **Comment** | The first 80 characters of the comment; open the review for the rest. |
| **Status** | **Waiting for approval** (blue), **Approved** (green), **Rejected** (red). |
| **Verified purchase** | Ticked when the customer has a **Completed** order containing the product. |
| **Created** | Submission time. |

**Search** matches the customer's email and username only. Comment text and product names are deliberately not searchable, because the table can be very large; use the filters instead.

**Filters** (sheet with an Apply button): **Status**, a dropdown with **Waiting for approval** (the default), **Approved**, **Rejected** and **All**; the rate slider; the creation date range. Choose **All** to see every review whatever its status.

**Bulk actions**: **Approve selected reviews** (sets Approved), **Reject selected reviews** (sets Rejected). The review's own page has the same two as buttons in its header, **Approve** and **Reject**.

The review form has **Review Information** (**Product**, **User**, **Rate**, **Status**), **Content** (**Comment** per language) and collapsed **System Information**, which also shows, read-only, **Is Published** and **Published At**.

## Statuses

| Status | Meaning | Visible on storefront |
|---|---|---|
| **Waiting for approval** | Just submitted, or edited by its author since it was moderated. | Only to its author, as "In review", and to store staff. |
| **Approved** | Approved by staff. | Everyone. |
| **Rejected** | Rejected by staff. | Only to its author and to store staff. |

Approving a review shows it to everyone and stamps its publish date, which is the date the storefront shows on it. A review that was already approved keeps its date. Rejecting it, or setting it back to **Waiting for approval**, hides it and clears the date, so a review approved again later shows the date of that approval. This holds however you change the status: the bulk actions, the buttons on the review's page or the **Status** field on the form.

## Tasks

### Moderate the queue
1. Open <span class="sidebar-path">Catalog → Reviews</span>. The list already shows the reviews waiting for approval.
2. Read each comment; open a review to read all of it.
3. Select the rows and run **Approve selected reviews** or **Reject selected reviews**, or open a review and press **Approve** or **Reject** in its header.

### Fix or remove an abusive review
- Open the review and edit the **Comment**, or press **Reject**. Your edit does not send the review back for approval.
- **Delete** removes it permanently and lets the same customer submit a new review for that product.

### Reply to a review
Not available. There is no reply field or thread on reviews; contact the customer through your usual channels.

## When a customer edits a review

Customers can edit their own reviews from **My reviews** on the storefront. When they change the rating or the comment of a review that is approved or rejected, it goes back to **Waiting for approval**:

- It leaves the storefront and stops counting in the product's average and review count until you approve it again.
- The customer sees it as "In review" on **My reviews**.
- It appears again in the list of reviews waiting for approval, in the sidebar number and on the dashboard, and the store gets the email described below.

A save that changes nothing leaves the review as it is. Editing a review that is still **Waiting for approval** keeps it there and sends no second email. Edits made by staff here never send a review back.

## The email about reviews to approve

Each time a review enters **Waiting for approval**, because a customer submitted it or edited an approved or rejected one, the store gets one email, "Review waiting for approval: *product*", at the contact and owner email addresses on your store profile. It shows the product, the rating in stars out of 5, the customer's first name and last initial, the comment shortened to its first 300 characters, and a link that opens the review here. It is written in the store's default language. A review you approve or reject before the email goes out sends none.

The email is switched by **OPS_ALERT_REVIEW_PENDING_ENABLED** under <span class="sidebar-path">Settings → Store Settings</span>, in the **Operational Alerts** category, and is on by default. With it off, waiting reviews still show on the dashboard and in the number beside **Reviews**. See [Store settings](/admin/settings/store-settings#operational-alert-emails).

## Things to know

- **Rules applied when a customer submits a review**: the rating is a whole number from 1 to 10 (half stars on the storefront); the customer must already have an order containing that product which reached **Completed**; one review per customer per product; and the product a review points at can never be changed afterwards. None of these bind you here. From this screen staff can set any rating and any status.
- **Averages and review counts include approved reviews only.** A review waiting for approval or rejected does not count, and a review its author edited leaves the average until you approve it again. The stars on a product card are the average of the approved ratings, out of 5, like the **Rating** column.
- Reviews can be switched off store-wide with the **PRODUCT_REVIEWS_ENABLED** setting under <span class="sidebar-path">Settings → Store Settings</span>, which ships on. With it off, the review section leaves every product page, new reviews are refused, customers' **My reviews** page and AI assistants get no reviews either, and **Reviews** leaves the admin sidebar and the dashboard. Approved reviews are not erased: they are still attached to their products and come back the moment you switch it on again. See [Store settings](/admin/settings/store-settings).
- Deleting a customer account deletes their reviews. Deleting a product is two different things: **Delete** on the product's own page only marks the product deleted and leaves its reviews intact, while the bulk **Delete selected** action on the product list takes the reviews with it.
- The number beside **Reviews** is refreshed whenever a review is saved or deleted, and at least once a minute otherwise. The list itself is always current.

## Related

- [Products](/admin/catalog/products)
- [Orders](/admin/sales/orders)
- [Store settings](/admin/settings/store-settings)
