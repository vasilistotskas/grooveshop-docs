---
title: FAQ & troubleshooting
description: Short answers to the questions store owners ask most, each pointing to the page with the full explanation.
---

# FAQ & troubleshooting

Each answer is short on purpose; follow the link for the details.

## Access

### I cannot sign in to the admin with my customer account

The admin accepts platform staff accounts with a membership in your store, never storefront customer accounts, even with the same email. Ask an Owner to add you, and ask the platform for a staff account if you have none. See [Signing in & MFA](/admin/getting-started/login-and-mfa).

### A colleague cannot find Store Settings, Cache or Team

Their role is Staff. The sidebar leaves out every screen a role cannot open, and only Admin and Owner can open **Store Profile**, **Team**, **Store Settings** and **Cache**. Change the role on their membership. See [Roles & team](/admin/getting-started/roles-and-team).

### I cannot demote or remove the other Owner

Only an Owner can edit an Owner's membership, and an Admin cannot pick the Owner role. If you are an Owner and still cannot, check that you are signed in as the right account. See [Roles & team](/admin/getting-started/roles-and-team).

### We removed our last Owner by mistake

Nothing prevents that, and no Admin can undo it. Ask the platform to grant an Owner membership again, and promote a second person once it is back. See [Roles & team](/admin/getting-started/roles-and-team).

### Where is the System section? I only see up to Settings

The System section (audit logs, reconciliation, identity lists, Stripe) is for platform operators and is hidden from store roles. Ask the platform when you need something from there. See [Welcome](/admin/).

### A menu in the sidebar is marked "Off"

The feature is part of your plan but switched off in **Store Settings**. Its pages work, so you can set it up before shoppers see it; switch its setting on when you are ready. See [Store settings](/admin/settings/store-settings#what-the-admin-shows).

### Loyalty, Promotions, Reviews or another entry is missing from the sidebar

It depends on the entry. Loyalty, Wholesale, Promotions, Gift Cards, Recommendations and Blog are missing when your plan does not include them; ask the platform. Reviews, Feedback, Favourites, Newsletter and Blog Comments are missing while their setting is off in **Store Settings**. The ACS or BoxNow pages are missing while that courier is not an active shipping provider. And a screen your role cannot open is never listed. See [Store settings](/admin/settings/store-settings#what-the-admin-shows) and [Welcome](/admin/).

### Where did Email Templates, Cache and Translations go?

They used to sit in the menu under the store name at the top of the sidebar. All three are in the **Settings** section now; the help link is in the footer of every page. See [Welcome](/admin/).

### Does the admin have two-factor authentication?

No. The admin login is email and password only. Your storefront customers do get authenticator apps, passkeys and login-by-code, but staff sign-in does not. Use strong, unique passwords and one membership per person. See [Signing in & MFA](/admin/getting-started/login-and-mfa).

## Storefront not reflecting changes

### I edited a product but the storefront still shows the old price

Saving a product purges its cache on its own about ten seconds later, but your browser may still hold the old page. Reload with Ctrl+Shift+R first; if it still looks old, purge **Products** on the Cache page. See [Cache](/admin/system/cache).

### I changed a setting and nothing happened

Public settings reach the storefront within about a minute. If the setting is one half of a two-tier feature (loyalty, promotions, gift cards, wholesale, suggestions), the platform's plan flag must be on as well. See [Store settings](/admin/settings/store-settings).

### Promotions or coupons are not applied at checkout

Check, in order: the plan flag on the store profile, the `PROMOTIONS_ENABLED` setting, the promotion's dates and conditions, and whether the order is a wholesale order with `B2B_ALLOW_PROMOTIONS` off. See [Promotions](/admin/sales/promotions) and [Store settings](/admin/settings/store-settings).

### My navigation menu edit is not visible

Menus and page layouts are cached as rendered pages. Saving a menu, column or link purges them on its own about ten seconds later; if the change still does not show, purge **Pages & navigation** on the Cache page. See [Navigation](/admin/storefront/navigation) and [Cache](/admin/system/cache).

### A product image does not appear

Check that the image is attached to the product and that one image is marked as main, then purge **Products**. See [Products](/admin/catalog/products).

### The English version of a product shows Greek text

There is no English translation of that record, so the fallback is shown. Open the product, click the English tab and fill it in. See [Languages & translations](/admin/localization/languages-and-translations).

## Orders and payments

### A cash-on-delivery order has been delivered but its payment is still Pending

That is by design. The payment flips to Completed when ACS pays out the collected cash, which the 02:30 reconciliation imports; it usually takes several days after delivery. See [Reconciliation](/admin/system/reconciliation).

### An online order has been Pending for hours

The customer never completed the payment. Such orders are cancelled automatically and their stock released after the time set in `ORDER_AUTO_CANCEL_PENDING_HOURS` (failed payments after `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES`). If you want it gone sooner, tick it in the order list and run **Cancel selected orders and restore stock**. See [Orders](/admin/sales/orders).

### The customer says they paid but the order is not marked paid

Platform operators can check the Viva Webhook Events ledger for the order id: no row means the provider never notified us, a Failed row means the notification could not be applied. Ask the platform to look. See [Audit & logs](/admin/system/audit-and-logs).

### Stock looks wrong after a failed payment

Stock reserved for an order is released by the stuck-order cleanup that runs every fifteen minutes, not at the moment the payment fails. Wait for the next run or cancel the order. See [Background jobs](/admin/system/background-jobs).

### Why is the receipt number not the next one I expected?

Numbers are taken from a per-year counter that only moves forward; a deleted receipt does not return its number. See [Reconciliation](/admin/system/reconciliation) and [Receipts and credit documents](/admin/sales/receipts).

## Shipping

### ACS never collected today's parcels

ACS collects a parcel once its label is printed, whether or not a pickup list was issued, so check the labels first: on ACS Shipments, filter by **Label printed at: empty**, select the rows and run **Print labels for selected shipments**. The 16:30 pickup list is only the day's manifest. ACS refuses it as a whole while any voucher is unprinted, which is normal and needs no action; after printing you can issue it with **Issue ACS pickup list now**. A printed parcel that still has not moved after three days is named in the 09:00 stale-shipments email. See [ACS Courier](/admin/shipping/acs) and [Reconciliation](/admin/system/reconciliation).

### ACS tracking looks out of date

ACS sends no notifications at all, so every checkpoint arrives through a poll that runs every fifteen minutes. Click **Re-poll ACS tracking** on the shipment if you need it now. See [ACS Courier](/admin/shipping/acs).

### The Smartpoint option does not show at checkout

`ACS_SMARTPOINT_ENABLED` is off by default; turn it on after the station sync has run. See [Store settings](/admin/settings/store-settings).

### A BoxNow parcel state looks stale

Parcel state comes from BoxNow's notifications and from a poll every fifteen minutes, so a delay of up to fifteen minutes is normal. Platform operators can read every delivery in BoxNow Events. See [BoxNow](/admin/shipping/boxnow).

## Customers and emails

### A customer cannot receive the verification code

Verification is mandatory. After confirming the address through another channel, mark it verified from the Email Addresses list. That screen is a platform-operator tool and is not in your sidebar, so ask the platform rather than hunting for it. See [Security & access](/admin/settings/security-and-access).

### A customer lost their authenticator app

The customer's second factor can be deleted so they can sign in with the password and enrol again. It is done from the MFA Authenticators list, a platform-operator screen; ask the platform. See [Security & access](/admin/settings/security-and-access).

### A customer asked for a copy of their data

They request it from their account; the file is ready for seven days. Platform operators see the requests under User Data Exports. See [Data exports (GDPR)](/admin/customers/data-exports).

### Newsletter subscriptions are gone from the account page

`NEWSLETTER_ENABLED` is off, or the topic is inactive. With the setting off, the **Newsletter** menu also leaves the admin sidebar. Existing unsubscribe links keep working either way. See [Countries & regions](/admin/localization/countries-and-regions) for topics and [Store settings](/admin/settings/store-settings).

## Admin itself

### The dashboard numbers look a few minutes old

Each block is kept for one to fifteen minutes and refreshed at once when an order, product, review, blog comment, contact message or business account it counts is saved. New customers, open carts and search figures wait for their time to run out. See [Dashboard](/admin/getting-started/dashboard).

### The Messages number does not go down when I read messages

It counts the contact-form messages of the last 7 days, not the unread ones: there is no read flag. It falls as messages turn a week old. See [Welcome](/admin/).

### How do I find an order by voucher number or an email quickly?

Press Ctrl+K (⌘K on a Mac) and type it. See [Search & command palette](/admin/getting-started/search-and-command-palette).

### An admin label is wrong or in English

The admin's wording is edited on the platform console and is shared by every store, so a store cannot change it. Tell the platform the screen and the text. See [Languages & translations](/admin/localization/languages-and-translations).
