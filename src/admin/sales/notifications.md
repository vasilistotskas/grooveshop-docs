---
title: Notifications
description: The customer notification centre, which events create notifications automatically, how they reach the browser in real time, how to send a manual announcement, and how this differs from email.
---

# Notifications

<span class="sidebar-path">Sales → Notifications</span>

A notification is the bell in the storefront: a short in-app message a signed-in customer sees the moment it is created, and can find later in their notification centre. The platform creates them for order and account events; you can also create announcements by hand. Notifications are separate from email: a shipped order sends both an email and a notification, but the two are produced by different parts of the system and this screen only concerns the in-app side.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Notification** | Title and the start of the message. |
| **Kind** | **Info**, **Success**, **Warning**, **Error**, **Danger**: the colour of the toast. |
| **Category** | Order, Payment, Shipping, Cart, Product, Account, Security, Promotion, System, Review, Wishlist, Support, Newsletter, Recommendation. |
| **Priority** | **Low Priority**, **Normal Priority**, **High Priority**, **Urgent Priority**, **Critical Priority**. |
| **Status** | **Active** or **Expired**. |
| **Engagement** | How many recipients have seen it, out of how many it was delivered to. |
| **Timing** | Created, relative age, and the expiry date or "no expiry". |

Filters: **Notification Status** (Active, Expired, Urgent Priority, Recent, Has Link, and the System / Order / Payment / Security / Promotion categories), kind, category, priority, created and expiry date ranges. Search by title, message, notification type or link. A date drill-down by creation date sits above the table.

### The notification page

- **Notification Content**: **Title** and **Message** per language, and an optional **Link** the toast opens.
- **Classification**: **Kind**, **Category**, **Priority**, and **Notification Type**, the event name the platform uses to recognise the messages it sends itself. Leave it blank for an announcement you write.
- **Scheduling**: **Expiry Date**. New rows are given a date 180 days ahead. See "Things to know" for what it does, and does not, do.
- **Analytics** and **Timing Information**: read-only counts and timestamps.

### Recipients

A notification reaches nobody on its own. Delivery is one **Notification User** row per recipient, which records whether and when that person saw it. The **Notification Users** screen is not on the sidebar; open it from the search palette. It lists user, notification, seen or unseen, priority and timing, with filters for **User Status** (Seen, Unseen, Seen Today, Urgent & Unseen, Expired Notifications) and search by the user's email or username.

## What the platform sends automatically

Each of these creates a notification for the customer who owns the order or account, in every store language, and pushes it to their open browser tabs immediately:

| Event | When |
|---|---|
| Order created | Every order placed by a signed-in customer. |
| Payment confirmed / Payment failed | Stripe reports the charge. |
| Order shipped | The order reaches Shipped. |
| Order delivered / completed / canceled / refunded | The order reaches that status. |
| ACS parcel out for delivery | ACS tracking reports it out for delivery. |
| BoxNow parcel at locker / delivered | BoxNow reports the parcel. |
| Price drop / Back in stock | A favourited product changes. |
| Loyalty tier promotion | The customer reaches a new tier. |
| Blog comment liked | Someone liked their comment. |

**Pending** and **Processing** never notify; the order-created and payment-confirmed messages already cover "we are preparing your order". Guest orders never get in-app notifications, only email.

## Tasks

### Send an announcement to specific customers
1. **Add notification**. Write **Title** and **Message** in each language, choose **Kind** (Info for news, Warning for something that needs action), **Category** (System or Promotion), **Priority**, and a **Link** if there is a page to open. Leave **Notification Type** blank. Save.
2. Open **Notification Users** from the search palette and **Add** one row per recipient: pick the user and the notification you just created.
3. Each row you save is delivered to that customer at once, over the live connection if they are online and in their notification centre otherwise.

There is no "send to everyone" button; a store-wide broadcast means one row per customer.

### Check whether a customer saw a notification
1. Open **Notification Users**, search by the customer's email.
2. The **Seen** column and the seen timestamp tell you; the analytics block on the row shows how long they took.

### Withdraw a notification
1. Delete it. That removes it from every recipient's centre at once.
2. Setting **Expiry Date** to now does not withdraw anything. The customer keeps seeing the message; only this admin screen starts calling it Expired.

## Things to know

- **Real-time delivery** uses the storefront's live connection, which only signed-in customers have. If the customer is offline, the notification waits in their centre; nothing is lost.
- **Expiry is a label here, not a rule for the customer.** **Expiry Date** drives the **Status** column and the filters on this screen and nothing else: a customer's notification centre shows a message whether or not its date has passed. Deleting is the only way to take one back.
- **`NOTIFICATION_EXPIRATION_DAYS` does nothing.** The key is listed under [Store settings](/admin/settings/store-settings), but nothing reads it. New notifications always get a date 180 days out; change the date on the notification itself if you want a different one.
- **Old notifications are cleared out twice a month.** On the 1st and the 15th, notifications created more than a year ago are deleted, whatever their expiry date says.
- **Languages**: write every language the store serves. When a translation is missing the customer sees English, then Greek.
- **Editing a delivered notification** changes what recipients see the next time they open the centre; it does not re-push it.
- **Emails are configured elsewhere.** Transactional emails (order received, shipped, invoice and so on) are templates under [Email templates](/admin/storefront/email-templates) and are not affected by anything on this screen.

## Related

- [Orders](/admin/sales/orders)
- [Email templates](/admin/storefront/email-templates)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Search & command palette](/admin/getting-started/search-and-command-palette)
