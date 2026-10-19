---
title: Messages & Feedback
description: "Messages from the contact form and Feedback ratings: where they arrive, how to reply, attached files and how long they are kept."
---

# Messages & Feedback

<span class="sidebar-path">Customers → Messages</span> and <span class="sidebar-path">Customers → Feedback</span>

**Messages** come from the storefront's contact form. **Feedback** (visitor comments) comes from the Feedback page: a rating from one to five stars with a comment. You get an email for each new message or Feedback entry, and you reply from your own email.

## What you see

### Messages

| Column | What it shows |
|---|---|
| **Contact** | Name and email. An email that does not look right is marked "(invalid)". |
| **Subject** | The subject and the company, if the sender gave them. |
| **Message** | The first hundred characters. |
| **Timing** | When it arrived. |
| **Priority** | An automatic hint: **Urgent** for the first two hours, **High** for long messages, **Medium** for the first day, then **Low**. |

The number next to **Messages** in the menu counts those that arrived in the last seven days, not the ones you have not read. The same number shows as **New messages** under **Needs attention** on the [Dashboard](/admin/getting-started/dashboard).

A message's page shows **Contact Information**, the **Message** and a **Contact Attachments** tab with the files that came with it.

### Feedback

| Column | What it shows |
|---|---|
| **Submitter** | Name and email, or **Anonymous** and **(no email)**. |
| **Rating** | From 1★ to 5★. |
| **Category** | **General**, **Website & UX**, **Products**, **Delivery**, **Customer support**, **Other**. |
| **Message** | The first hundred characters. |

In both lists the bulk actions export the selected rows to CSV or XML.

## Tasks

### Reply to a message

1. Open the message and copy the sender's email.
2. Reply from your email program. There is no reply box or "answered" status here.

### Set where the emails go

1. Open <span class="sidebar-path">Settings → Store Profile</span>, tab **Email & Security**.
2. Fill in **Contact Email** and save.

If it is empty, `CONTACT_EMAIL` under <span class="sidebar-path">Settings → Store Settings</span> is used. If both are missing, no email is sent; messages only show here.

### Allow attachments on the contact form

1. In Store Settings turn on `CONTACT_ATTACHMENTS_ENABLED` (off by default).
2. If you like, change how many files are allowed (`CONTACT_ATTACHMENTS_MAX_COUNT`, 3), the size per file in MB (`CONTACT_ATTACHMENTS_MAX_MB`, 10, at most 25) and the file types (`CONTACT_ATTACHMENTS_TYPES`, PDF only by default).

### Download an attachment

On the **Contact Attachments** tab click the file name. The **Scan** column shows whether it was checked for viruses:

| Scan | Can you download it? |
|---|---|
| **Clean** | Yes. |
| **Not scanned** | Yes. No virus checker is set up; open it with care. |
| **Pending scan** | Not yet. |
| **Scan failed** | No. The check gave up after several tries and the file stays blocked. |
| **Infected** | Never. |

### A customer asks for their details to be erased

Delete their messages here; the attachments go with them. Deleting a customer account does not remove messages, because they are not linked to an account.

## Things to know

- **How long they are kept.** Every night, messages and Feedback older than `CONTACT_RETENTION_DAYS` (365 days by default) are deleted, together with their attachments. With 0 they are kept forever. A note above each list says which period applies.
- **If you shorten the period**, anything already older is deleted that same night. Export what you need first. Emails already in your inbox are not affected.
- **Files go sooner.** After `CONTACT_ATTACHMENTS_RETENTION_DAYS` days (90 by default) the content of attachments is deleted; the message and the file name stay.
- **Customer data export.** When a customer asks for their data, the export includes the messages they sent from a verified email of their account.
- **Feedback can be switched off** with `FEEDBACK_ENABLED` (on by default). While it is off, the storefront's Feedback page does not exist and **Feedback** leaves the menu. Entries already received show again when you turn it back on.
- **It is not a helpdesk.** There is no assignment or ticket status. If you need that, forward the emails to such a system.

## Related

- [Store settings](/admin/settings/store-settings)
- [Store profile](/admin/settings/store-profile)
- [Data exports](/admin/customers/data-exports)
- [Reviews](/admin/catalog/reviews)
