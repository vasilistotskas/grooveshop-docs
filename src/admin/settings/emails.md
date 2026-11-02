---
title: Emails
description: Every automatic email of your store in one place - which are on, how many were sent and failed, what each looks like, a test to yourself, the log of every email, and the addresses your store no longer writes to.
---

# Emails

Every automatic email your store sends is listed here: order confirmations, shipping notices, sign-in codes, alerts to you and more. For each one you see whether it is on, how many were sent in the last 30 days, how many failed, and what it looks like. You can switch the optional ones off, send yourself a test, and look up what happened to any email that was sent.

<span class="sidebar-path">Settings → Emails</span>

The texts of the emails are written by the platform and are not changed here. Who can do what:

| | Owner and Admin | Staff |
|---|---|---|
| See the page, the log and the suppression list | Yes | Yes |
| Switch an email on or off | Yes | No |
| Send a test | Yes | No |
| Remove an address from the suppression list | Yes | No |

## The page

At the top, two buttons open the **Email log** and the **Suppression list** (see below). Under them:

- Two tabs: **To customers** (what your customers receive) and **To your team** (what you and your staff receive).
- **Search emails...** filters by name or description. **Show** keeps **All emails**, only those that are **On**, only those that are **Off**, or only the **Failing** ones. Press **Apply** after you choose.

Each email is a card with:

- Its name and a short description. The name opens the email's own page.
- A line such as **Last sent 3 hours ago** and **7 sent in 30 days**, or **Not sent in the last 30 days**. A red **1 failed** appears when some did not arrive; it opens the log filtered to that email. Tests you send yourself are not counted.
- One status: **On**; **Required** (the email cannot be switched off: a customer or the law needs it, such as an order confirmation or a password reset); **Off:** with the reason (the feature it belongs to is off, a carrier is not active, or a scheduled run is not on); or **Switched off** (you turned it off).
- A switch, for the emails you may turn off. A switched-off email is simply not sent, and only that one.
- **Preview** and, if you may, **Send test**.

The emails are grouped by area, for example Orders, Shipping, Products, Gift cards, Wholesale and Customer accounts. **To your team** holds the emails to you: a new order, a payment dispute, low stock, a new business application, a contact form message, and alerts when something needs a person (courier problems, a payment or refund that needs you).

## One email

Click an email's name or **Preview** to open its page. It shows what it sent and how many failed, then:

- **Preview**: the email as the customer sees it. Choose the **Language** (Greek or English), the **Data** (**Sample data**, or one of your 10 most recent orders for the emails that are about an order, if you may view orders) and the **Format** (**HTML** as the customer sees it, or **Text**, the plain version). The subject is shown above it.
- **Send test**: sends this email, in the language and with the data you chose, to **the email address of your own account**, and to no one else. The subject starts with **[Test]**. It is sent even if the email is switched off, so you can check it. A test appears in the log marked as a test and is not counted in the figures. You can send a limited number of tests per hour; when they are used up the page tells you to try later.
- **Latest sends**: the last 20 times it was sent, each with how long ago, the recipient (partly hidden, like `j***@e***.com`), its status, and what the email provider reported about it (for example delivered).

## The email log

Open it with the **Email log** button on <span class="sidebar-path">Settings → Emails</span>.

Every email your store sent, skipped or failed to send. Each row shows the email, its **Status**, the recipient (partly hidden), when, the subject and the provider. The messages themselves are not kept, and a row is deleted after 90 days (the **EMAIL_LOG_RETENTION_DAYS** setting under <span class="sidebar-path">Settings → Store Settings</span>; 0 keeps the log for good).

The statuses:

| Status | Meaning |
|---|---|
| **Sent** | Handed to the email provider. |
| **Delivered** | The recipient's mail server accepted it. |
| **Delayed** | Not delivered yet; the provider is retrying. |
| **Bounced** | The address does not exist or refuses mail. The address is added to the suppression list. |
| **Marked as spam** | The customer marked it as spam. The address is added to the list for marketing emails and is opted out of them. |
| **Suppressed by the provider** | The provider refused to send to this address. |
| **Failed** | It could not be sent. |
| **Skipped: ...** | Nothing was sent, with the reason: the email or its feature is off, there was no recipient, the recipient unsubscribed, or the address is on the suppression list. |

To find what was sent to one person, type their **exact** email address in the search box: addresses are never displayed in full, so the search compares them without showing them. The filters narrow by email, by status, by **Failing** (in the last 7 or 30 days) and by date.

## The suppression list

Open it with the **Suppression list** button on <span class="sidebar-path">Settings → Emails</span>.

The addresses your store will not write to again, with the reason and how far it goes:

- **Hard bounce**: the address cannot receive mail. **All email** to it is skipped.
- **Spam complaint**: the customer marked a marketing email as spam. Only **Email marketing** is skipped; they still get their receipts and security emails.
- **Suppressed by the provider**: the email provider holds the address on its own list. **All email** is skipped.

A required email (a receipt, a sign-in code) to an address that is fully suppressed is not sent either, and the log shows it as skipped.

### Remove an address

Owners and admins can remove a row, for example after a customer corrected a mistyped address that bounced. Select the row and delete it; a confirmation page asks first and says what to do next. Removing it here lets your store write to the address again, but **the email provider keeps its own list**, and nothing here changes it. If the address is on that list too, remove it in the provider's dashboard as well (Resend: Emails, Suppressions), or its emails will still be refused. If you cannot reach it, [contact support](/admin/help/contact-support). The removal is recorded in the admin history with your name.

## The dashboard

When emails failed in the last 7 days (not delivered, bounced, marked as spam or refused by the provider), **Emails failing** appears in **Needs attention** on the dashboard and opens the log with the **Failing** filter on.

## Things to know

- **A failing email is not always your problem.** A bounce usually means the customer typed the address wrongly; fix it with them and remove the row.
- **Emails the platform sends itself**, such as the notices about your store's subscription and the link to reset an admin password, are not on this page.
- **Emails to you** go to the store's contact email and the owner's email (set under <span class="sidebar-path">Settings → Store Profile</span>), and are written in the store's default language. Customer emails go out in the customer's language.
- **Marketing emails can be unsubscribed from.** A customer who unsubscribes, or marks an email as spam, stops getting that kind; see [Newsletter subscriptions](/admin/customers/subscriptions).
- **To change a text**, contact the platform team: [When to contact support](/admin/help/contact-support).
- **On a phone**, the page and the log scroll sideways where a table is wider than the screen.

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/customers/notifications)
- [Product alerts](/admin/customers/product-alerts)
- [Newsletter subscriptions](/admin/customers/subscriptions)
- [Store profile](/admin/settings/store-profile)
