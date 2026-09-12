---
title: Data exports (GDPR)
description: How a customer obtains a copy of their personal data, what the export bundle contains, how long it lives, and what the admin ledger under System shows.
---

# Data exports (GDPR)

<span class="sidebar-path">System → Audit & Logs → User Data Exports</span>

The right of access is self-service: a customer requests a copy of their data from their account on the storefront, a background job compiles it, and an email delivers a download link. The admin screen is a read-only ledger of those requests, visible to superusers, used to answer "did it work" and "when does it expire".

## What you see

| Column | Meaning |
|---|---|
| **User** | The customer. |
| **Status** | Pending, Processing, Ready, Failed, Expired. |
| **File Size (bytes)** | Size of the JSON bundle once Ready. |
| **Expires At** | When the download link stops working. |
| **Created at** | When the customer asked. |

Filters: **Status**, **Created at** and **Expires At** ranges. Search matches the customer's email and username, and the download token.

The record shows the same fields plus **File Path** (the file's location inside the store's private media folder), **Download Token** and **Error Message**. Everything is read-only and new rows cannot be added here.

Statuses:

| Status | Meaning |
|---|---|
| Pending | Queued, the job has not started. |
| Processing | The bundle is being compiled. |
| Ready | The file exists and the customer has been emailed. |
| Failed | The job raised an error; **Error Message** holds it. |
| Expired | The link is past its date and the file has been deleted. |

## Tasks

### A customer asks for their data

1. Tell them to sign in to the storefront, open their account privacy settings and request the export there. There is no button in the admin to request one on a customer's behalf.
2. Within a few minutes they receive the email "Your data export is ready" with a link back to the same privacy page, where the download starts.
3. If they say nothing arrived, open this screen, search their email and read the status. **Ready** means the email was sent; ask them to check spam and remind them the link expires. **Failed** means a platform-side error; pass the **Error Message** to the platform team.

### Check whether an export was collected

The ledger does not record downloads. If the row is Ready and not yet expired, the file is still available; the customer can download it again from the same link.

### Handle a request outside the storefront

If the customer cannot sign in (lost credentials, closed account), the export cannot be produced by the platform. Help them recover access first through the storefront's forgotten-password flow. Erasure requests follow the same rule: account deletion is self-service and requires the customer's password.

## What the bundle contains

One JSON file with these sections, each limited to data about the requesting customer:

- Profile: identifiers, contact details, addresses on the profile, social links, language, loyalty XP and tier, activity timestamps.
- Saved delivery addresses.
- Orders with their line items, prices and the recipient details as entered at checkout.
- Favourite products.
- Product reviews, with the text in every language it was written in.
- Blog comments and liked blog posts.
- Notifications received and whether they were seen.
- Newsletter subscriptions and their status.
- Loyalty points transactions and the current balance.
- Search history made while signed in, including the IP address and browser recorded at search time.
- The current shopping cart.

Other people's data is never included, for example the author of a comment the customer replied to.

## Retention

- The download link is valid for seven days from the moment the file is ready.
- The file is written to the store's private media area, in a folder that belongs to this store only. It is never served as a public file; the only way to it is the tokenised link.
- One request can be in flight per customer; a second click while one is Pending or Processing returns the existing request.
- A nightly job at 03:00 deletes the files of every export past its expiry date and marks the row Expired. A file that cannot be deleted is retried the next night and logged as an error, because a personal-data bundle lingering past its date is a retention breach.
- After expiry the link answers "gone". The customer simply requests a new export.

## Things to know

- Retention of the ledger row itself is indefinite: it is the record that the request was honoured.
- Right to erasure is separate. When a customer deletes their account from the storefront, orders are kept for tax reasons with the buyer details anonymised, and everything else is removed. A pending export of a deleted account disappears with the account.
- Both flows run inside the store; a customer of another store on the platform cannot see or request anything here.

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Subscriptions](/admin/customers/subscriptions)
- [Audit & logs](/admin/system/audit-and-logs)
- [Background jobs](/admin/system/background-jobs)
