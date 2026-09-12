---
title: Email templates
description: Preview every transactional email the store sends, in each language, with sample data or a real order, and know which template fires when.
---

# Email templates

<span class="sidebar-path">Not in the sidebar. Click the store name at the top of the sidebar and pick **Email Templates**, or go to `/admin/email-templates/management/`.</span>

The Email Template Management page lets staff see exactly what a customer receives. It is a **preview tool and nothing else**: the templates belong to the platform, and there is no way to edit one, reset one, or send a test from this page. The page exists on the store admin only, and it shows real orders of this store, so treat what you see on it as customer data.

## What you see

**Left panel: Available Templates.** A search box (**Ctrl+K** / **⌘K** focuses it) filters by name and description, and the list is grouped by category with collapsible headings that open automatically when a search matches inside them. Each template shows a badge, an **HTML** and a **TXT** marker, and a short description. Every template today carries the **Active** badge and has both an HTML and a plain-text version, so neither marker distinguishes anything in practice.

**Right panel: Template Preview.**

| Control | Options |
|---|---|
| **Language** | Greek, English, German. |
| **Data Source** | **Sample Data** (made up on the spot, never saved) or **Real Order**. The **Real Order** choice is only offered on templates whose name begins `order_`, which leaves out several genuine order emails: the new-order notice to you, payment failed, invoice issued, dispute notification, and the two courier ones. Preview those with sample data. |
| **Select Order** | Appears with Real Order: the 10 most recent orders of the store, and only those ten. |
| **Generate Preview** | Renders the template. |
| **HTML** / **Text** tabs | Switch between the rich and the plain-text version. |

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
| Shipping Acs | Stale shipments alert, Unprinted vouchers alert (to the store) |
| Subscription | Confirmation |
| User Management | Data export ready, Inactive user re-engagement |

Ten templates carry a written description and a real subject pattern such as `Your Order #<id> Has Shipped`. The other twenty-four show the placeholder description "Email template" and a generic subject in the preview. That says nothing about the email itself: those templates are sent just as often, and the real message carries a proper subject.

## Tasks

### Check what a customer will get
1. Open the page from the site dropdown.
2. Click the template, for example **order_shipped**.
3. Pick the **Language** the customer uses.
4. Choose **Real Order**, pick the order in **Select Order**, click **Generate Preview**.
5. Compare the **HTML** and **Text** tabs.

### Review translations
Generate the same template three times, once per language, and read each. Missing or English-only strings in a Greek preview are something to report to the platform team, not something you can fix here.

### Find the template for an order status
Order templates carry the statuses they are sent for. Use the search box with the status name (shipped, delivered, canceled) or open the template and read its description.

## Variables and language

- The content comes from the order (customer name, items, totals, tracking number, carrier) or, with sample data, from made-up Greek names, addresses and products. Nothing you do on this page changes any record.
- Customer emails are sent in the customer's own language. Emails addressed to you instead (new order, low stock, business profile applications, shipping alerts) go to the store contact address, and their subject line is always in English whatever language the body comes out in. That is expected; it is not a translation you can fix.

## Things to know

- **No editing, no reset to default, no test send.** Changing what an email says is a request to the platform team, not something this page can do.
- **A bad order id gives you a misleading preview.** Pick an order that has since been deleted, or paste an id belonging to another store, and the preview does not say so. It quietly renders sample data while still labelling itself a real-order preview. If a preview shows names and products you do not recognise, the order id did not resolve.
- Only the ten most recent orders are offered, so you cannot preview an older one here.
- The template list is read once when the store's servers start. A template added by a platform release shows up after the next restart, not immediately.

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/sales/notifications)
- [Store settings](/admin/settings/store-settings)
