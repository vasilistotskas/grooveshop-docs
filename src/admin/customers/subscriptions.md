---
title: Subscriptions
description: Newsletter and notification topics, each customer's subscription status and consent trail, and how to activate, deactivate and export subscriptions.
---

# Subscriptions

<span class="sidebar-path">Customers → Subscriptions</span> and <span class="sidebar-path">Newsletter → Subscription Topics</span>

A **topic** is something a customer can opt in to: the weekly newsletter, product updates, promotions. A **subscription** is one customer's relationship to one topic, with a status and timestamps. Customers manage their own subscriptions from their account page on the storefront; these screens are for support and for shaping the topic catalogue.

## What you see

### Subscription Topics

| Column | Meaning |
|---|---|
| **Topic** | Name and slug. |
| **Category** | Marketing Campaigns, Product Updates, Account Updates, System Notifications, Newsletter, Promotional, Other. |
| **Active** | Whether customers can subscribe right now. |
| **Default Subscription** | New accounts are subscribed automatically. |
| **Requires Confirmation** | Subscribing sends a confirmation email; the subscription stays Pending until the link is clicked. |
| **Subscribers** | Active over total. |
| **Created at** | |

Filters: **Category**, **Active**, **Default Subscription**, **Requires Confirmation**, **Created at** range. Search matches the translated name, the slug and the description.

The form has **Topic Information** (name, slug, description, category; name and description are translatable per language) and **Settings** (the three switches above). The slug is the stable identifier the storefront uses; do not change it once customers have subscribed.

### Subscriptions

| Column | Meaning |
|---|---|
| **Subscription** | Number and creation date. |
| **User** | Name and email. |
| **Topic** | Name and category. |
| **Status** | See below. |
| **Dates** | Subscribed at, and unsubscribed at when set. |
| **Created at** | |

Statuses:

| Status | Meaning |
|---|---|
| Active | Receives the topic. |
| Pending Confirmation | Opted in on a topic that requires confirmation; the email link has not been clicked. |
| Unsubscribed | Opted out; **Unsubscribed At** records when. |
| Bounced | Delivery to the address failed. |

Filters: **Status**, **Topic Category**, **Topic**, **Subscribed at** and **Unsubscribed at** ranges. Search matches the customer's email, username and name, and the topic name.

The form shows **Subscription Details** (user, topic, status), **Timestamps** (subscribed, unsubscribed, created, updated, all read-only) and **Additional Data** (the confirmation token, read-only, and a metadata field).

Bulk actions: **Activate selected subscriptions** and **Deactivate selected subscriptions**.

## Tasks

### Create a topic

1. Open <span class="sidebar-path">Newsletter → Subscription Topics</span> and add a topic with a slug, a category and a name in each language.
2. Decide the three switches. **Requires Confirmation** on gives you a double opt-in record for marketing topics. **Default Subscription** on subscribes every new account without asking, so keep it for account and system notices, not marketing.
3. Leave **Active** on. Turning it off later hides the topic from the storefront without touching existing subscriptions.

### Unsubscribe a customer on request

1. Open <span class="sidebar-path">Customers → Subscriptions</span>, search the email.
2. Select the rows and run **Deactivate selected subscriptions**. Only Active rows change; they become Unsubscribed with the current time recorded.

### Re-activate a subscription

1. Select the rows and run **Activate selected subscriptions**. Pending and Unsubscribed rows become Active and the unsubscribed timestamp is cleared.
2. Do this only with the customer's consent on record, for example a written request. Activating a Pending row skips the confirmation email, so it replaces the double opt-in with your own record of consent.

### Handle bounces

A Bounced subscription is set when the mail system reported the address as undeliverable. Ask the customer for a working address, update it on the account, then activate the subscription again.

## Consent and export

- The consent trail for a subscription is the row itself: **Subscribed At**, the Pending-to-Active transition for confirmed topics, and **Unsubscribed At**. Do not delete rows to "clean up"; deactivate instead so the history survives.
- Subscriptions are included in the customer's own data export bundle, see [Data exports (GDPR)](/admin/customers/data-exports).
- The subscription list has no export button. To pull a mailing list, filter the user list by **Users with Subscriptions** in <span class="sidebar-path">Customers → Users</span> and use its CSV or XML export, or read the subscriber counts per topic here.
- A topic set as **Default Subscription** subscribes new accounts at registration. Under marketing law that is only defensible for service notices; for marketing, use **Requires Confirmation**.

## Things to know

- Each customer can hold one subscription per topic. Re-subscribing reuses the existing row.
- Activating or deactivating in bulk does not send any email.
- The confirmation email for a Pending subscription is sent by a background task when the customer subscribes on the storefront; it is retried on mail failures.
- Deleting a topic deletes every subscription to it. Deactivate the topic instead.

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Data exports (GDPR)](/admin/customers/data-exports)
- [Email templates](/admin/storefront/email-templates)
