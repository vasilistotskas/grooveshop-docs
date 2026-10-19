---
title: Notifications
description: "The messages in the storefront's bell: which are sent automatically, how to send an announcement to customers, how to see whether they read it and how to withdraw it."
---

# Notifications

<span class="sidebar-path">Customers → Notifications → Notifications</span>

A notification is a short message in the storefront's bell. A signed-in customer sees it at once as a pop-up message and can find it again later. Notifications are separate from emails.

## What you see

| Column | What it shows |
|---|---|
| **Notification** | The title and the start of the message. |
| **Kind** | **Info**, **Success**, **Warning**, **Error** or **Danger**: the message's colour. |
| **Category** | For example **Order**, **Payment**, **Shipping**, **Product**, **Account**, **System**, **Promotion**. |
| **Priority** | From **Low Priority** to **Critical Priority**. |
| **Status** | **Active** or **Expired**, depending on the **Expiry Date**. |
| **Engagement** | How many recipients saw it, for example "3/10". |
| **Timing** | When it was created and when it expires. |

The **Notification Status** filter has ready-made choices, such as **Recent (Last 7 days)** or **Order Related**.

A notification reaches someone only through a **Notification User** row. You find them under <span class="sidebar-path">Customers → Notifications → Recipients</span>: which customer, which notification and whether they read it.

### What the store sends automatically

Only to customers with an account. Guests get email only.

| When | What it says |
|---|---|
| The customer places an order | We received your order. |
| A Stripe payment succeeds or fails | Payment confirmed or failed. Not sent for Viva Wallet or cash on delivery. |
| The order becomes **Shipped**, **Delivered**, **Completed** or **Canceled** | The new status. |
| Money is refunded, in full or in part | The refund. |
| The ACS parcel goes out for delivery | The parcel arrives today. |
| The BoxNow parcel reaches the locker or is collected | The parcel is at the locker / delivered. |
| A favourite product drops in price or is back in stock | Price drop / back in stock. |
| The customer moves up a Loyalty tier | Congratulations on the new tier. |
| Someone likes their blog comment | Your comment was liked. |

The **Pending** and **Processing** statuses send no notification.

## Tasks

### An announcement to specific customers

1. Click **Add**. Enter a **Title** and **Message** in each of the store's languages.
2. Pick a **Kind** (for example **Info**), a **Category** (for example **Promotion**) and a **Priority**. Add a **Link** if it should open a page.
3. Leave **Notification Type** empty. Save.
4. Open <span class="sidebar-path">Customers → Notifications → Recipients</span> and click **Add**. Pick a customer and the notification you created. Save.
5. Repeat step 4 for each customer.

The customer sees it at once if signed in, otherwise the next time they visit. There is no "send to everyone": you need one recipient row per customer.

### Did the customer read it?

1. Open **Recipients** and search by the customer's email.
2. The column shows **Seen** or **Unseen**.

### Withdraw a notification

Delete the notification. It disappears from every recipient's bell at once.

## Things to know

- **Expiry hides nothing from the customer.** The **Expiry Date** (180 days after creation by default) only changes the **Status** in this list. The customer keeps seeing the message. To take it back, delete it.
- **Old notifications are removed.** On the 1st and 15th of each month, notifications created more than a year ago are deleted.
- **Languages.** Fill in every language of the store. If one is missing, the customer sees the text in another language you filled in.
- **Editing does not resend.** If you change a notification already sent, the customer sees the new text when they open the bell, with no new pop-up.
- **Emails are set elsewhere**, under [Email templates](/admin/settings/email-templates).

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Favourites](/admin/customers/favourites)
- [Email templates](/admin/settings/email-templates)
