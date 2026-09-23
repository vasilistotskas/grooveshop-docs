---
title: Subscriptions
description: Newsletter and notification topics, each subscriber's status and consent record, the storefront newsletter form, and how to resend confirmations, deactivate and export subscriptions.
---

# Subscriptions

<span class="sidebar-path">Customers → Subscriptions</span> and <span class="sidebar-path">Newsletter → Subscription Topics</span>

A **topic** is something a customer can opt in to: the weekly newsletter, product updates, promotions. A **subscription** is one subscriber's relationship to one topic, with a status and timestamps. A subscriber is either a customer account or, for signups from the storefront's newsletter form, a guest known only by an email address. Customers manage their own subscriptions from their account page on the storefront; these screens are for support and for shaping the topic catalogue.

## What you see

### Subscription Topics

| Column | Meaning |
|---|---|
| **Topic** | Name and slug. |
| **Category** | Marketing Campaigns, Product Updates, Account Updates, System Notifications, Newsletter, Promotional, Other. |
| **Active** | Whether customers can subscribe right now. |
| **Default Subscription** | On a **Newsletter** topic: the topic the storefront's newsletter form subscribes to, one per store. On an **Account Updates** or **System Notifications** topic: every new account is subscribed at registration. No effect on the other categories. The topic must also be **Active**. |
| **Requires Confirmation** | Subscribing sends a confirmation email; the subscription stays Pending until the subscriber confirms. |
| **Subscribers** | Active over total. |
| **Created at** | |

Filters: **Category**, **Active**, **Default Subscription**, **Requires Confirmation**, **Created at** range. Search matches the translated name, the slug and the description.

The form has **Topic Information** (name, slug, description, category; name and description are translatable per language), **Settings** (the three switches above) and a collapsed **System Information** carrying the timestamps and the subscriber count. The slug is the stable identifier the storefront uses; do not change it once customers have subscribed.

### Subscriptions

| Column | Meaning |
|---|---|
| **Subscription** | Number and creation date. |
| **User** | The account's name and email, or the guest's email address. |
| **Topic** | Name and category. |
| **Status** | See below. |
| **Dates** | Subscribed at, and unsubscribed at when set. |
| **Created at** | |

Statuses:

| Status | Meaning |
|---|---|
| Active | Receives the topic. |
| Pending Confirmation | Opted in on a topic that requires confirmation; the subscriber has not confirmed yet. |
| Unsubscribed | Opted out; **Unsubscribed At** records when. |
| Bounced | Delivery to the address failed. |

Filters: **Status**, **Subscriber** (account or guest), **Source** (newsletter form, account, signup), **Topic Category**, **Topic**, **Subscribed at** and **Unsubscribed at** ranges. Search matches the guest email, the customer's email, username and name, and the topic name.

Subscriptions are created only by subscribers themselves, so the list has no **Add** button. The form shows **Subscription Details** (user or guest email, topic and status, all read-only), **Consent** (the exact sentence the subscriber agreed to, their language, IP address and browser, and when and from which IP they confirmed, all read-only), **Timestamps** (subscribed, unsubscribed, created, updated, all read-only) and **Additional Data** (the confirmation token, read-only, and a metadata field).

Bulk actions: **Resend confirmation** and **Deactivate selected subscriptions**. Nothing in the admin makes a subscription Active: only the subscriber's own confirmation does, so every Active subscription on a confirmed topic carries its own proof of consent.

## Tasks

### Create a topic

1. Open <span class="sidebar-path">Newsletter → Subscription Topics</span> and add a topic with a slug, a category and a name in each language.
2. Decide the three switches. **Requires Confirmation** on gives you a double opt-in record, which every marketing topic should have. **Default Subscription** means something different per category, see the table above.
3. Leave **Active** on. Turning it off later hides the topic from the storefront and stops new subscriptions to it, without touching existing ones.

### Put a newsletter form on the storefront

1. A new store already has one: a **Newsletter** topic with **Active**, **Default Subscription** and **Requires Confirmation** on. Rename it if you like. To use a topic of your own instead, turn **Default Subscription** off on that one first: only one Newsletter topic can be the default, and saving a second one is refused.
2. Add a **Newsletter Signup** section to a page layout, see [Page layouts](/admin/storefront/page-layouts).
3. Keep the `NEWSLETTER_ENABLED` setting on. With it off, or with no default Newsletter topic, the section shows nothing.

A visitor enters an email and ticks the consent box, which is never ticked in advance. The storefront always answers "check your inbox", whether or not the address was already subscribed, so the form cannot be used to find out who your subscribers are. The confirmation email links to a page on your storefront with a **Confirm subscription** button. The subscription becomes Active only when that button is pressed, and the link stops working after 7 days. If the visitor later creates an account and verifies the same address, the subscription moves onto the account.

### Unsubscribe a customer on request

1. Open <span class="sidebar-path">Customers → Subscriptions</span>, search the email.
2. Select the rows and run **Deactivate selected subscriptions**. Only Active rows change; they become Unsubscribed with the current time recorded.

### Send a confirmation email again

Select Pending rows and run **Resend confirmation**. Each gets a fresh link, valid for 7 days. A subscriber who unsubscribed and wants the topic back subscribes again themselves, from the account page or the newsletter form, and confirms again.

### Handle bounces

A Bounced subscription is set when the mail system reported the address as undeliverable. Ask the customer for a working address and to subscribe again with it; the new subscription goes through confirmation like any other.

## Consent and export

- The consent record for a subscription is the row itself: the consent sentence, language, IP address and browser at signup, the confirmation time and IP, **Subscribed At** and **Unsubscribed At**. Do not delete rows to "clean up"; deactivate instead so the history survives.
- Guest signups that are never confirmed are deleted automatically 30 days after the confirmation email was sent.
- Subscriptions are included in the customer's own data export bundle, together with guest signups made with any of the customer's verified email addresses, see [Data exports (GDPR)](/admin/customers/data-exports). Deleting the account deletes those guest signups too.
- The subscription list has no export button. To pull a mailing list, filter the user list by **Users with Subscriptions** in <span class="sidebar-path">Customers → Users</span> and use its CSV or XML export, or read the subscriber counts per topic here.
- New accounts are subscribed at registration only to default **Account Updates** and **System Notifications** topics. Marketing topics never subscribe anyone who has not asked to.

## Things to know

- Each customer, and each guest email address, can hold one subscription per topic. Re-subscribing reuses the existing row.
- Deactivating in bulk does not send any email.
- The confirmation email is sent in the background, and retried up to three times five minutes apart if the mail fails.
- Deleting a topic deletes every subscription to it, and with them the consent record. Deactivate the topic instead.

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Data exports (GDPR)](/admin/customers/data-exports)
- [Page layouts](/admin/storefront/page-layouts)
- [Email templates](/admin/storefront/email-templates)
