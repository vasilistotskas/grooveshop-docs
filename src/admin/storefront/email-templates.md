---
title: Email templates
description: Preview every transactional email the store sends, in each language, with sample data or a real order, and know which template fires when.
---

# Email templates

<span class="sidebar-path">Settings → Email Templates</span>

The Email Template Management page lets staff see exactly what a customer receives. It is a **preview tool and nothing else**: the templates belong to the platform, and there is no way to edit one, reset one, or send a test from this page. The page exists on the store admin only, and it shows real orders of this store, so it is open, and listed in the sidebar, only for roles that may view orders; treat what you see on it as customer data.

## What you see

**Left: Templates.** A search box filters the list by name and description as you type. The list is grouped by category; each template shows its name, an **Active** label and a short description. Click a template to preview it.

**Right: Preview.** The preview renders as soon as you pick a template, and again whenever you change one of its controls:

| Control | Options |
|---|---|
| **Language** | Greek, English, German. |
| **Data** | **Sample data** (made up on the spot, never saved) or one of the store's 10 most recent orders. A real order fills in the order, cart, courier and gift-card emails; the other templates always use sample data. |
| **Format** | **HTML** (the email as the customer sees it) or **Text** (the plain-text version). |

The subject line is shown above the preview.

## Which templates exist

The list is built from the templates the platform actually ships, so it always matches what your store can send.

| Category | Templates |
|---|---|
| Order Lifecycle | Order received, Payment confirmed, Order shipped, Order delivered, Order completed, Order canceled, Order refunded, Order returned, Order pending reminder, Order status generic, Payment failed, Invoice issued, Dispute notification, ACS out for delivery, BoxNow parcel at locker, Admin new order |
| Cart | Checkout abandoned |
| Product | Low stock alert (to the store), Price drop alert, Restock alert |
| Giftcard | Gift card delivery, Gift card purchase receipt, Gift card expiry reminder |
| B2B | Business profile approved, Business profile rejected, Admin new business profile |
| Billing | Expiring, Expired, Suspended (platform billing notices) |
| Shipping Acs | Stale shipments alert (to the store) |
| Subscription | Confirmation |
| User Management | Data export ready, Inactive user re-engagement |

Ten templates carry a written description and a real subject pattern such as `Your Order #<id> Has Shipped`. The other twenty-three show the placeholder description "Email template" and a generic subject in the preview. That says nothing about the email itself: those templates are sent just as often, and the real message carries a proper subject.

## Tasks

### Check what a customer will get
1. Open <span class="sidebar-path">Settings → Email Templates</span>.
2. Click the template, for example **order_shipped**.
3. Pick the **Language** the customer uses.
4. Pick the order under **Data**.
5. Switch **Format** between **HTML** and **Text** to compare the two versions.

### Review translations
Preview the same template in each language in turn and read each. Missing or English-only strings in a Greek preview are something to report to the platform team, not something you can fix here.

### Find the template for an order status
Order templates carry the statuses they are sent for. Use the search box with the status name (shipped, delivered, canceled) or open the template and read its description.

## Variables and language

- The content comes from the order (customer name, items, totals, tracking number, carrier) or, with sample data, from made-up Greek names, addresses and products. Nothing you do on this page changes any record.
- Customer emails are sent in the customer's own language. Emails addressed to you instead (new order, low stock, business profile applications, shipping alerts) go to the store contact address, and their subject line is always in English whatever language the body comes out in. That is expected; it is not a translation you can fix.

## Things to know

- **No editing, no reset to default, no test send.** Changing what an email says is a request to the platform team, not something this page can do.
- Only the ten most recent orders are offered, so you cannot preview an older one here.
- The template list is read once when the store's servers start. A template added by a platform release shows up after the next restart, not immediately.

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/sales/notifications)
- [Store settings](/admin/settings/store-settings)
