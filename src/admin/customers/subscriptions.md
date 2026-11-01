---
title: Newsletter subscriptions
description: The topics your customers sign up to, the store's newsletter form, each subscriber's consent, and how to unsubscribe someone or resend their confirmation.
---

# Newsletter subscriptions

Here you decide what your customers can sign up to (for example the Newsletter or your offers) and see who has signed up. Customers manage their own subscriptions from their account; here you set up the topics and answer requests.

<span class="sidebar-path">Customers → Newsletter → Subscriptions</span> and <span class="sidebar-path">Customers → Newsletter → Subscription Topics</span>

## What you see

### Subscription Topics

A topic is something a customer signs up to. For each topic you see:

| Column | What it shows |
|---|---|
| **Topic** | The topic's name. |
| **Category** | **Newsletter**, **Marketing Campaigns**, **Promotional**, **Product Updates**, **Account Updates**, **System Notifications** or **Other**. |
| **Active** | Whether customers can sign up right now. |
| **Default Subscription** | What it means depends on the category; see below. |
| **Requires Confirmation** | The subscriber gets an email and must click its link before the subscription is switched on. |
| **Subscribers** | How many are active, out of how many in total. The total also counts people who never confirmed or who unsubscribed. |

**Default Subscription** does different things per category:

| Category | What it does |
|---|---|
| **Newsletter** | It is the topic the store's newsletter form signs people up to. Only one active Newsletter topic can be the default. |
| **Account Updates**, **System Notifications** | Every new customer is signed up automatically when they create an account. |
| All others | Nothing. Nobody is signed up to a marketing topic automatically; it needs their own consent. |

### Subscriptions

One row for each subscriber on each topic. A subscriber is a customer with an account, or a visitor who only gave their email in the newsletter form.

| Status | What it means |
|---|---|
| **Active** | Receives the topic's emails. |
| **Pending Confirmation** | Signed up but has not clicked the confirmation link yet. |
| **Unsubscribed** | Opted out. The **Dates** column shows when. |
| **Bounced** | The confirmation email could not be delivered: the recipient's mail server refused the address for good. Nothing more is sent to it; a new sign-up with that address starts over. |

The **Source** column shows where the subscription came from: **Newsletter form**, **Account** (the customer signed up from their account) or **Signup** (signed up automatically when they opened an account). Filter by **Status**, **Source**, **Subscriber** (account or **Guest (email only)**) and **Topic**.

The list has no add button: only the subscriber creates a subscription.

## Tasks

### Create a new topic

1. Open <span class="sidebar-path">Customers → Newsletter → Subscription Topics</span> and click **Add**.
2. Enter a name and a short description. The customer sees these on their subscriptions page. If the store has other languages, fill in their tabs.
3. Fill in the **Slug** (the last part of the address, e.g. `offers`) and choose a **Category**.
4. For a marketing topic, tick **Requires Confirmation**. That gives you proof the subscriber asked for it.
5. Click **Save**.

### Put a newsletter form on the store

Every new store already has a **Newsletter** topic that is active, the default and requires confirmation. You can rename it.

1. Keep the `NEWSLETTER_ENABLED` setting on, under <span class="sidebar-path">Settings → Store Settings</span>. It is on from the start.
2. The store footer and the sign-up form already show it, in every design, as long as the setting is on and the store has a default newsletter topic. The sign-up form offers it as an optional box, unticked, below the terms. To add the form to another page as well, add a **Newsletter Signup** section to a [page layout](/admin/content/page-layouts).

The visitor enters their email and ticks the consent box. They get an email with a link to a page on your store, where they click **Confirm subscription**. Only then does the subscription become **Active**. The link is valid for 7 days. A customer who ticks the box when they open an account gets the same email, and shows in the list with the source **Newsletter form** until they confirm.

To use another topic for the form, first remove **Default Subscription** from the current one, then set it on the new one.

### Unsubscribe a customer who asked

1. Open <span class="sidebar-path">Customers → Newsletter → Subscriptions</span> and search for their email.
2. Select their rows and run the action **Deactivate selected subscriptions**.

Only active subscriptions change; they become **Unsubscribed** with the current date and time. The customer gets no email about it.

### Resend the confirmation email

1. Select subscriptions in **Pending Confirmation**.
2. Run **Resend confirmation**.

Each subscriber gets a new link, valid for 7 days; the old one stops working. There is no way for you to make a subscription **Active**: only the subscriber can, by confirming.

### Retire a topic

Open the topic, untick **Active** and save. The topic leaves the store and nobody can sign up to it any more. Existing subscriptions are kept.

## Things to know

- **Do not delete topics or subscriptions to "tidy up".** Deleting a topic erases all its subscriptions, along with each subscriber's proof of consent. Switch them off instead.
- **The proof of consent** is on each subscription's page, in the **Consent** section: the sentence the subscriber agreed to, when and from where, and when they confirmed. It cannot be changed.
- **Unsubscribing from marketing emails.** Every marketing email (abandoned-checkout reminder, product alert, "We miss you!") can be stopped with the **Unsubscribe** button of the customer's mail program; that stops only that kind of email. The "We miss you!" email also has an unsubscribe link, which opens a page of the store where the customer chooses: stop only these emails, or stop **all** the store's marketing emails. Opening the page changes nothing until they press a button, so a mail program that checks links cannot unsubscribe anyone. Choosing "all" also ends all their active subscriptions, and the customer's page then shows the date in **Marketing Opted Out At** (<span class="sidebar-path">Customers → Customers</span>, tab **Loyalty & Engagement**). You can set that date yourself when a customer asks by phone or email; once set, it cannot be cleared in the admin, because only the customer can take the refusal back. A new newsletter subscription does not clear it.
- **Visitors who never confirm** are deleted automatically 30 days after the confirmation email.
- **If the visitor later creates an account** with the same email and confirms it, their subscription moves onto the account.
- **The form does not give subscribers away.** It always answers "check your inbox", whether or not the email was already signed up. What the owner of the address learns arrives by email: a new address gets the confirmation link, an address that is already **Active** gets an "already subscribed" email (with a link to manage subscriptions for a customer with an account; a visitor without one is reminded that every newsletter has an unsubscribe link at the bottom). Submitting the form again within 10 minutes sends nothing more. The one exception is a customer who is signed in and enters their own verified email: the form tells them on the spot that they are already subscribed, and sends no email.
- **Mailing list:** there is no export of subscribers. Do not use the **Users with Subscriptions** filter under <span class="sidebar-path">Customers → Customers</span> as a mailing list: it also includes customers who unsubscribed, never confirmed, or only have the automatic account topics.
- **With the `NEWSLETTER_ENABLED` setting off**, the form and the customer's subscriptions page are hidden. Unsubscribe links in emails already sent keep working.

## Related

- [Customers & addresses](/admin/customers/users-and-addresses)
- [Data export (GDPR)](/admin/customers/data-exports)
- [Page layouts](/admin/content/page-layouts)
- [Email templates](/admin/settings/email-templates)
