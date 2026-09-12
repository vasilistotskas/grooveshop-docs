---
title: Email templates
description: Preview every transactional email the store sends, in each language, with sample data or a real order, and know which template fires when.
---

# Email templates

<span class="sidebar-path">Site dropdown (click the store name at the top of the sidebar) → Email Templates</span>

The Email Template Management page lets staff see exactly what a customer receives. It is a **preview tool**: templates are part of the platform code and cannot be edited, reset or sent from here. The page is available on the store admin only, and it lists recent orders of this store, so treat it as customer data.

## What you see

**Left panel: Available Templates.** A search box (**Ctrl+K** / **⌘K** focuses it) filters by name and description, and the list is grouped by category with collapsible headings. Each template shows an **Active** or **Unused** badge, whether it has an HTML and a text version, and a short description.

**Right panel: Template Preview.**

| Control | Options |
|---|---|
| **Language** | Greek, English, German. |
| **Data Source** | **Sample Data** (generated on the fly, never saved) or **Real Order** (shown only for order templates). |
| **Select Order** | Appears with Real Order: the 10 most recent orders of the store. |
| **Generate Preview** | Renders the template. |
| **HTML** / **Text** tabs | Switch between the rich and the plain-text version. |

## Which templates exist

Templates are discovered from the code's email folders, so the list always matches what the platform can send.

| Category | Templates |
|---|---|
| Order Lifecycle | Order received, Payment confirmed, Order shipped, Order delivered, Order completed, Order canceled, Order refunded, Order returned, Order pending reminder, Order status generic, Payment failed, Invoice issued, Dispute notification, ACS out for delivery, BoxNow parcel at locker, Admin new order |
| Cart | Checkout abandoned |
| Product | Low stock alert (to the store), Price drop alert, Restock alert |
| Giftcard | Gift card delivery, Gift card purchase receipt, Gift card expiry reminder |
| B2B | Business profile approved, Business profile rejected, Admin new business profile |
| Billing | Expiring, Expired, Suspended (platform billing notices) |
| Shipping ACS | Stale shipments alert, Unprinted vouchers alert (to the store) |
| Subscription | Confirmation |
| User | Data export ready, Inactive user re-engagement |

Templates with a configuration entry carry a description and a subject line pattern such as `Your Order #<id> Has Shipped`; the rest show "Email template" and a generic subject in the preview. Every template has an HTML and a text version.

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

- The content comes from the order (customer name, items, totals, tracking number, carrier) or, for sample data, from generated Greek names, addresses and products. Nothing you do on this page writes to the database.
- Customer emails are sent in the customer's language. Emails addressed to the store (new order, low stock, business profile applications, shipping alerts) go to the store contact address and ignore the customer's language.

## Things to know

- **No editing, no reset to default.** Templates are files in the platform; a change request goes to the platform team. There is also no "send test email" button.
- **Unused** means the platform has the template but no code path triggers it today; it can still be previewed.
- The template list is cached per server process; a template added by a deployment appears after the next restart.
- An unknown order id, or an order from another store, returns "Order not found".
- Some subjects and strings in the preview are English placeholders when the template has no configured subject; the real email uses the subject set by the sending code.

## Related

- [Orders](/admin/sales/orders)
- [Notifications](/admin/sales/notifications)
- [Store settings](/admin/settings/store-settings)
