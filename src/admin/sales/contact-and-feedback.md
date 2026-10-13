---
title: Contact messages & feedback
description: The contact-form inbox with its attachments and the feedback submissions with ratings; who gets notified, how to reply, and the settings that control both forms.
---

# Contact messages & feedback

<span class="sidebar-path">Customers → Messages</span> and <span class="sidebar-path">Customers → Feedback</span>

Two inboxes for what visitors send through the storefront. **Messages** are enquiries from the contact page: a name, an email, a message, and optionally a subject, company, phone and attached files. **Feedback** entries come from the feedback page: a one-to-five star rating with a category and a comment, optionally signed. Both are read-only records of what arrived; replying happens from your own mailbox.

## Contact messages

### What you see

| Column | Meaning |
|---|---|
| **Contact** | Name and email. The email is flagged "(invalid)" when it does not look like an address. |
| **Subject** | The subject and the company, when the sender gave them; a dash otherwise. |
| **Message** | The first hundred characters. |
| **Message Stats** | Characters, words, lines. |
| **Timing** | Date and relative age. |
| **Priority** | A triage hint: **Urgent** under two hours old, **High** for long messages, **Medium** under a day, **Low** otherwise. Nothing you set. |

Filters: **Contact Period** (Today, This Week, This Month, This Quarter), **Message Length**, a text filter on **Subject**, created and updated date ranges. Search by name, email, message, company, phone. Bulk actions export the selection as CSV or XML. The number beside the **Messages** entry in the sidebar counts the messages received in the last seven days, the same window as **Contact Period → This Week**; there is no read or unread flag.

The message page shows **Contact Information** (name, email, company, phone), the **Message** (subject and body) and an **Attachments** tab: file name as a download link, content type, size, scan verdict and time. Attachments can be deleted from here, which removes the file as well; they cannot be added by staff.

### What happens automatically

- Every new message triggers an email to the store's contact address. That is the contact address on the store's own record, which the platform team sets, and `CONTACT_EMAIL` under [Store settings](/admin/settings/store-settings) when that is empty. With neither filled in, no email is sent at all, so set one.
- Attachments are scanned in the background when a scanner is configured. The verdict decides whether you can download the file: **Clean** and **Not scanned** can be downloaded; **Pending scan** and **Scan failed** are withheld until a verdict exists; **Infected** is never served. A file uploaded but never sent with a message is deleted six hours later; the bytes of files that did arrive are deleted after `CONTACT_ATTACHMENTS_RETENTION_DAYS` (90) while the message and the file's name, size and checksum stay.

### Tasks

**Reply to an enquiry**
1. Open the message, copy the email, write from your mail client. There is no reply box and no status field in the admin.
2. If you want a record, keep the thread in your mailbox; the admin only keeps what was received.

**Allow attachments on the contact form**
1. Under Store settings turn on `CONTACT_ATTACHMENTS_ENABLED` (off by default: this is the store's only anonymous upload).
2. Set `CONTACT_ATTACHMENTS_MAX_COUNT` (3, capped at 20), `CONTACT_ATTACHMENTS_MAX_MB` (10, capped at 25) and `CONTACT_ATTACHMENTS_TYPES` (file types separated by commas; PDF only by default). The type is read from the file's actual bytes, never from its name or what the browser claims, and a file the platform cannot identify is refused.

**Handle a data-subject request about a message**
Delete the message; the attachments and their files go with it. Contact messages have no user account behind them, so the customer erasure tools do not touch them.

## Feedback

### What you see

| Column | Meaning |
|---|---|
| **Submitter** | Name and email, or "Anonymous" and "(no email)". |
| **Rating** | One to five stars, colour-coded. |
| **Category** | General, Website & UX, Products, Delivery, Customer support, Other. |
| **Message** | The first hundred characters. |
| **Timing** | Date and relative age. |

Filters: category, rating, created date. Search by name, email, message. Bulk actions export to CSV or XML. The feedback page shows the submitter and the rating, category and message.

### What happens automatically

Every submission emails the store's contact address, like a contact message, and is skipped in the same way when no address is set. The storefront feedback page exists only while `FEEDBACK_ENABLED` is on (it is on by default); turning it off makes the page answer "not found" and rejects submissions. While it is off, **Feedback** is also left out of the sidebar, since nothing new can arrive; the entries already received come back when you turn it on again.

## Things to know

- **Nothing here is a ticket.** There is no assignment, status or reply workflow. If you need one, forward the notification emails into your helpdesk.
- **The badge counts this week, not unread.** Because there is no read flag, the sidebar number is the messages of the last seven days: it goes down as messages turn a week old, not when you open them. The same count appears as **New messages** under **Needs attention** on the [Dashboard](/admin/getting-started/dashboard).
- **Attachment downloads are staff-only** and served as plain downloads, never opened in the browser, because the sender is anonymous.
- **Export before you delete** if you keep records elsewhere; deletion is immediate.

## Related

- [Store settings](/admin/settings/store-settings)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Reviews](/admin/catalog/reviews)
