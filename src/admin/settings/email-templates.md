---
title: Email templates
description: See how every automatic email of your store looks, in every language, with sample data or a real order, and which email is sent when.
---

# Email templates

Here you see exactly what a customer receives in each automatic email of the store: order confirmation, shipping, cancellation and so on. The page is for previewing only. The platform writes the email texts, and from here they are neither changed nor sent.

<span class="sidebar-path">Settings → Email Templates</span>

The page shows only for people who can view orders, because it shows real customer orders.

## What you see

The **Email Templates** page has two parts:

- **Emails**, on the left: the list of all emails your store can send, grouped by area. Each email has its name and a short description. An email your store does not send shows **Off** (you switched it off) or **Off:** with the reason (for example the feature it belongs to is off). **Search emails...** filters the list as you type.
- **Preview**, on the right: the email you picked, with its subject above it. With one of your orders, the subject is the one that order's customer received (or would receive). With sample data, every email shows the subject it has.

Above the preview you choose:

| Option | What it changes |
|---|---|
| **Language** | The email's language: Greek or English. |
| **Data** | **Sample data** (a made-up customer and products) or one of your 10 most recent orders. Only emails about an order can show an order; the rest always show sample data. An order that has nothing the email is about (no refund, no receipt, no shipment) says so instead of showing something else. |
| **Format** | **HTML** (as the customer sees it) or **Text** (the plain version, for email programs without images). |

### Which emails exist

The areas are the same as on the <span class="sidebar-path">Settings → Emails</span> page, where you also switch them on and off:

| Area | What is in it |
|---|---|
| **Orders** | The order was placed, paid, shipped, delivered, completed, canceled, refunded or returned, a payment failed, and the receipt or credit document. With product reviews on, the delivered and completed emails carry a "Write a review" link per product. When customers must have bought a product to review it, orders placed without an account get no link. |
| **Shipping** | The parcel is out for delivery with ACS, or waiting in a BoxNow locker. |
| **Products** | The [product alerts](/admin/customers/product-alerts) and the reminder for a checkout left half-way. |
| **Gift cards** | Gift card delivery, its purchase receipt, an expiry reminder. |
| **Wholesale** | A business customer application approved or rejected. |
| **Customer accounts** | Confirming an email address, the sign-in code, password reset, security notices (password or email changed, two-factor authentication changes, a connected social sign-in), a customer's data export, newsletter confirmation, and the message to a customer who has not signed in for a long time. |
| **To your team** | Emails to you: a new order, a payment dispute, low stock, a new business application, a message from your contact form, feedback, a new review waiting for moderation. |
| **Alerts when something needs a person** | Courier problems (a rejected shipment, a failed carrier update, stuck or unpaid ACS parcels), and payment or refund problems that need you. |

Every email has its own description on the page. The emails a customer gets about their account protect that account, so they cannot be switched off: on the <span class="sidebar-path">Settings → Emails</span> page they show as required. They carry your store's name and logo in your customer's language.

The platform sends a few emails itself, such as the notices about your store's subscription and the link to reset an admin password. They are not on this page.

## Tasks

### See what a customer will receive

1. Open <span class="sidebar-path">Settings → Email Templates</span>.
2. Click the email you want.
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
- **Marketing emails can be unsubscribed from.** The mail program's **Unsubscribe** button stops that kind of email (for example the reminder for a checkout left half-way). The message to a customer who has not signed in for a long time ("We miss you!") also has an unsubscribe link, to a page where the customer stops either these emails or all marketing emails. See [Newsletter subscriptions](/admin/customers/subscriptions).
- **Emails to you** go to the store's contact email, which you set under <span class="sidebar-path">Settings → Store Profile</span>. The review and stuck-shipment alerts also go to the owner's email. The platform's subscription notices go only to the owner's email, which the platform team sets, in the store's default language, from the platform's own sender. Emails to you (new order, business-account application, payment dispute, low stock, stuck ACS shipments, new review, contact form message, feedback) are written in the store's default language, subject included. The contact form and feedback emails carry the customer's email address as the reply address, so pressing **Reply** answers the customer. Customer emails use the customer's language, and the store's default language for a guest or an account with none set.

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/customers/notifications)
- [Product alerts](/admin/customers/product-alerts)
- [Store profile](/admin/settings/store-profile)
