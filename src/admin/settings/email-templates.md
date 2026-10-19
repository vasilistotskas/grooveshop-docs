---
title: Email templates
description: See how every automatic email of your store looks, in every language, with sample data or a real order, and which email is sent when.
---

# Email templates

Here you see exactly what a customer receives in each automatic email of the store: order confirmation, shipping, cancellation and so on. The page is for previewing only. The platform writes the email texts, and from here they are neither changed nor sent.

<span class="sidebar-path">Settings → Email Templates</span>

The page shows only for people who can view orders, because it shows real customer orders.

## What you see

The **Email Template Management** page has two parts:

- **Templates**, on the left: the list of all emails, grouped into categories. Each email has its name, an **Active** badge and a short description. **Search templates...** filters the list as you type.
- **Preview**, on the right: the email you picked, with its subject above it.

Above the preview you choose:

| Option | What it changes |
|---|---|
| **Language** | The email's language: Greek, English or German. |
| **Data** | **Sample data** (a made-up customer and products) or one of your 10 most recent orders. |
| **Format** | **HTML** (as the customer sees it) or **Text** (the plain version, for email programs without images). |

### Which emails exist

| On screen | What it is |
|---|---|
| `order_received` | The order was placed. |
| `order_payment_confirmed` | The payment was confirmed. |
| `payment_failed` | The payment failed. |
| `order_pending_reminder` | A reminder for an order still waiting for payment. |
| `order_shipped` | The order was shipped. |
| `acs_out_for_delivery` | ACS is out for delivery. |
| `boxnow_parcel_at_locker` | The parcel is in the BoxNow locker. |
| `order_delivered`, `order_completed` | The order was delivered / completed. |
| `order_canceled` | The order was canceled. |
| `order_refunded`, `order_returned` | Money refunded / products returned. |
| `order_status_generic` | Any other status change. |
| `retail_document_issued` | The receipt or credit document was issued. |
| `dispute_notification` | A payment dispute, to you. |
| `admin_new_order` | A new order, to you. |
| `checkout_abandoned` | A reminder for a checkout left half-way. |
| `restock_alert`, `price_drop_alert` | The [product alerts](/admin/customers/product-alerts). |
| `low_stock_alert` | Low stock, to you. |
| `review_pending` | A new review waiting for moderation, to you. |
| `gift_card_delivery`, `gift_card_purchase_receipt`, `gift_card_expiry_reminder` | Gift card delivery, its purchase receipt, an expiry reminder. |
| `business_profile_approved`, `business_profile_rejected` | A business customer application approved or rejected. |
| `admin_new_business_profile` | A new business customer application, to you. |
| `stale_shipments_alert` | ACS shipments that are stuck, to you. |
| `confirmation` | Newsletter subscription confirmation. |
| `data_export_ready` | The customer's data export is ready. |
| `inactive_user_email_template` | A message to a customer who has not signed in for a long time. |
| `expiring`, `expired`, `suspended` | Notices from the platform to you about the store's subscription. |

Ten emails have their own description. The rest just say "Email template". That does not mean they are not sent.

## Tasks

### See what a customer will receive

1. Open <span class="sidebar-path">Settings → Email Templates</span>.
2. Click the email, e.g. `order_shipped`.
3. Under **Language**, choose the customer's language.
4. Under **Data**, choose their order.
5. Switch the **Format** to see the plain version too.

Nothing is sent and nothing changes on the order.

### Check the translations

Open the same email in every language of the store and read it. If something is missing or wrong, send the platform team the email's name, the language and what you want changed.

## Things to know

- **You do not change the texts here.** A change to an email is a request to the platform team. See [When to contact support](/admin/help/contact-support).
- **Only the 10 most recent orders** appear under **Data**. You cannot view an older order here.
- **Customer emails** go out in the customer's language.
- **Emails to you** go to the store's contact email, which you set under <span class="sidebar-path">Settings → Store Profile</span>. The new-order email has an English subject, e.g. "New order — #123".

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/customers/notifications)
- [Product alerts](/admin/customers/product-alerts)
- [Store profile](/admin/settings/store-profile)
