---
title: FAQ & troubleshooting
description: Short answers to the questions store owners ask most, each pointing to the page with the full explanation.
---

# FAQ & troubleshooting

Each answer is short on purpose; follow the link for the details.

## Access

### I cannot sign in to the admin with my customer account

The admin accepts platform staff accounts with a membership in your store, never storefront customer accounts, even with the same email. Ask an Owner to add you, and ask the platform for a staff account if you have none. See [Signing in & MFA](/admin/getting-started/login-and-mfa).

### A colleague sees "permission denied" on Extra Settings

Their role is Staff. Staff sees the entry but cannot open it; only Admin and Owner can. Change the role on their membership. See [Roles & team](/admin/getting-started/roles-and-team).

### I cannot demote or remove the other Owner

Only an Owner can edit an Owner's membership, and an Admin cannot pick the Owner role. If you are an Owner and still cannot, check that you are signed in as the right account. See [Roles & team](/admin/getting-started/roles-and-team).

### Where is the System section? I only see up to Settings

The System section (audit logs, reconciliation, identity lists) is for platform operators. Store roles do not see it. Ask the platform when you need something from there. See [Welcome](/admin/).

## Storefront not reflecting changes

### I edited a product but the storefront still shows the old price

The storefront caches rendered pages for a few minutes, and your browser may cache them too. Reload with Ctrl+Shift+R first; then purge **Products** on the Cache page. See [Cache](/admin/system/cache).

### I changed a setting and nothing happened

Public settings reach the storefront within about a minute. If the setting is one half of a two-tier feature (loyalty, promotions, gift cards, wholesale, suggestions), the platform's plan flag must be on as well. See [Store settings](/admin/settings/store-settings).

### Promotions or coupons are not applied at checkout

Check, in order: the plan flag on the store profile, the `PROMOTIONS_ENABLED` setting, the promotion's dates and conditions, and whether the order is a wholesale order with `B2B_ALLOW_PROMOTIONS` off. See [Promotions](/admin/sales/promotions) and [Store settings](/admin/settings/store-settings).

### My navigation menu edit is not visible

Menus and page layouts are cached as rendered HTML. Purge **Pages & navigation** on the Cache page. See [Navigation](/admin/storefront/navigation) and [Cache](/admin/system/cache).

### A product image does not appear

Check that the image is attached to the product and that one image is marked as main, then purge **Products**. See [Products](/admin/catalog/products).

### The English version of a product shows Greek text

There is no English translation of that record, so the fallback is shown. Open the product, click the English tab and fill it in. See [Languages & translations](/admin/localization/languages-and-translations).

## Orders and payments

### A cash-on-delivery order has been delivered but its payment is still Pending

That is by design. The payment flips to Completed when ACS pays out the collected cash, which the nightly reconciliation imports; it usually takes several days after delivery. See [Reconciliation](/admin/system/reconciliation).

### An online order has been Pending for hours

The customer never completed the payment. Such orders are cancelled automatically and their stock released after the time set in `ORDER_AUTO_CANCEL_PENDING_HOURS` (failed payments after `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES`). If you want it gone sooner, cancel it from the order page. See [Orders](/admin/sales/orders).

### The customer says they paid but the order is not marked paid

Platform operators can check the Viva Webhook Events ledger for the order id: no row means the provider never notified us, a Failed row means the notification could not be applied. Ask the platform to look. See [Audit & logs](/admin/system/audit-and-logs).

### Stock looks wrong after a failed payment

Stock reserved for an order is released by the stuck-order cleanup that runs every fifteen minutes, not at the moment the payment fails. Wait for the next run or cancel the order. See [Background jobs](/admin/system/background-jobs).

### Why is the invoice number not the next one I expected?

Numbers are taken from a per-year counter that only moves forward; a deleted invoice does not return its number. See [Reconciliation](/admin/system/reconciliation) and [Invoices](/admin/sales/invoices).

## Shipping

### ACS never collected today's parcels

Vouchers are collected only when they are on a pickup list. The list is issued Mon–Fri at 16:30 and is rejected as a whole if any voucher on it is unprinted. Print the missing label and click **Issue ACS pickup list now** on ACS Shipments. See [ACS Courier](/admin/shipping/acs) and [Reconciliation](/admin/system/reconciliation).

### The Smartpoint option does not show at checkout

`ACS_SMARTPOINT_ENABLED` is off by default; turn it on after the station sync has run. See [Store settings](/admin/settings/store-settings).

### A BoxNow parcel state looks stale

Parcel state comes from BoxNow's webhooks and from a poll every fifteen minutes, so a delay of up to fifteen minutes is normal. Platform operators can read every delivery in BoxNow Events. See [BoxNow](/admin/shipping/boxnow).

## Customers and emails

### A customer cannot receive the verification code

Verification is mandatory. After confirming the address through another channel, a platform operator can mark it verified from the Email Addresses list. See [Security & access](/admin/settings/security-and-access).

### A customer lost their authenticator app

A platform operator can delete the customer's MFA authenticator so they can sign in with the password and enrol again. See [Security & access](/admin/settings/security-and-access).

### A customer asked for a copy of their data

They request it from their account; the file is ready for seven days. Platform operators see the requests under User Data Exports. See [Data exports (GDPR)](/admin/customers/data-exports).

### Newsletter subscriptions are gone from the account page

`NEWSLETTER_ENABLED` is off, or the topic is inactive. Existing unsubscribe links keep working either way. See [Countries & regions](/admin/localization/countries-and-regions) for topics and [Store settings](/admin/settings/store-settings).

## Admin itself

### The dashboard numbers look a few minutes old

They are cached for five minutes and refreshed on order and stock writes. See [Dashboard](/admin/getting-started/dashboard).

### How do I find an order by voucher number or an email quickly?

Press Ctrl+K (⌘K on a Mac) and type it. See [Search & command palette](/admin/getting-started/search-and-command-palette).

### An admin label is wrong or in English

Interface strings are edited in Rosetta on the platform console; a store cannot change them. Tell the platform the screen and the text. See [Languages & translations](/admin/localization/languages-and-translations).
