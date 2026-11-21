---
title: Data export (GDPR)
description: How a customer downloads a copy of their personal data or deletes their account, what the file contains and how long it lasts.
---

# Data export (GDPR)

The law gives a customer the right to a copy of their data and to have it erased. On your store the customer does both themselves, from their account. This page tells you what to answer them.

The screen listing export requests is for the platform team only; if you need the status of a request, ask them.

## What you see

There is no screen for this in your admin. Everything happens in the customer's account, on the **Privacy** page of the account menu (titled "Your data"). It has two buttons:

| Button | What it does |
|---|---|
| **Request an export** | Prepares a file with all their data and emails them when it is ready. |
| **Delete my account** | Deletes their account for good, after they type DELETE to confirm. |

## Tasks

### A customer asks for their data

1. Tell them to sign in to the store and open **Privacy** in their account menu.
2. They click **Request an export**.
3. Within a few minutes they get an email titled "Your data export is ready". They download the file from the same page, with the **Download file** button, signed in to their account. The email holds no link that opens the file.

You cannot request an export on their behalf.

### The customer says nothing arrived

1. Ask them to check their spam folder.
2. Ask them to open the **Privacy** page again. There they see the status of the request and, if it failed, can request it again.
3. If it keeps failing, send the customer's email to the platform team. See [When to contact support](/admin/help/contact-support).

### The customer cannot sign in

Export and deletion happen only inside the account. Help them get back in first: they click "Forgot password?" on the sign-in page.

### The customer wants to be deleted

Tell them to click **Delete my account** on the **Privacy** page. Before they confirm, they see whether they lose loyalty points or a gift-card balance.

## What the file contains

One file (JSON format) with only the customer's own data:

- profile and contact details
- saved addresses
- orders, with products, prices and delivery details: the account's own and the guest orders placed with one of the customer's verified email addresses (an address they never verified does not count). For each order the file lists the contact details (name, email, phone), the delivery address including **Address line 2**, the note the customer left, the billing details, the reason given when the order was cancelled, the browser details stored with the order (IP address, user agent and the browser and click ids Meta uses for conversion tracking), and what the courier (ACS or BOX NOW) reported about the recipient (tracking notes, who received a cash-on-delivery parcel)
- favourite products
- product reviews
- blog comments and liked blog posts
- notifications they received
- newsletter subscriptions
- product alerts (back in stock, price drop)
- messages they sent through the contact form from their confirmed email
- loyalty points and their history
- searches they made while signed in
- their current cart

Other people's data is never included.

## Things to know

- **The file stays available for 7 days.** After that it is deleted automatically. The customer simply requests a new export.
- **One request at a time.** Clicking again while the file is being prepared does not start a second one.
- **The file is not public.** Only the customer downloads it, from their account.
- **What deletion does:** orders stay for tax reasons, including orders an admin deleted earlier and the guest orders placed with one of the customer's verified email addresses, but the customer's personal details on them are cleared: name, email, phone, the delivery address including **Address line 2**, the note the customer left, the cancellation reason, and the browser details stored with the order (IP address, user agent, Meta ids). The same details are also replaced with "[deleted]" wherever the order's own records repeat them: the order's history notes (for example "email sent to …"), the reason of a refund, the stock log and the payment records. The **billing details** (VAT number, company, tax office, registered address) are kept when an invoice was issued for the order in AADE's timologio app or is still owed (an invoice order that was not cancelled, which you issue by hand from those details), because that invoice names the buyer; otherwise they are cleared. The retail receipt keeps its own buyer details, because it is a legal document. The courier records of those orders are cleared too: for ACS and BOX NOW, the copies of failed requests, the call history, the delivery notes, checkpoint and parcel-event notes the courier sent back, the cancellation reasons, the receiver named on a cash-on-delivery payout, the customer's name, email and phone in BOX NOW's parcel updates, and the buyer's details in the notes staff wrote (for example a cash-on-delivery payment recorded outside ACS). The tracking checkpoints themselves and the payout amounts stay. A parcel that is still moving keeps being tracked and paid out, and each courier update can bring the recipient's details back, so a daily task clears them again whenever a courier has written about the order, for 7 days after each write. A delivery after the account is deleted therefore does not keep the buyer's name. Everything else linked to the account is erased. Contact-form messages, and product alerts they asked for as a visitor, are not linked to the account and stay; delete the messages under <span class="sidebar-path">Customers → Messages</span>. The customer is signed out of every device at once.
- **Receipts already issued do not change**, because they are legal documents.

## Related

- [Customers & addresses](/admin/customers/users-and-addresses)
- [Newsletter subscriptions](/admin/customers/subscriptions)
- [Product alerts](/admin/customers/product-alerts)
- [When to contact support](/admin/help/contact-support)
