---
title: FAQ
description: Short answers to the questions store owners ask most, each with a link to the page that has the details.
---

# FAQ

Every answer is short. The link at the end leads to the details.

## Sign-in and team

### I forgot my password

Click **Forgotten your password or username?** on the sign-in page and follow the link in the email; it works once, for one hour. See [Sign-in & password](/admin/getting-started/sign-in).

### I cannot get into the admin with my customer account

The admin accepts only platform accounts that are members of the store's team. Ask an Owner or Admin to add you, and the platform team for an account if you have none. See [Roles & team](/admin/getting-started/roles-and-team).

### A colleague cannot find Store Settings, Cache or Team

Their role is Staff, which does not see them. Change their role to Admin. See [Roles & team](/admin/getting-started/roles-and-team).

### I cannot change or remove the other Owner

Only another Owner can change an Owner. If you are an Owner, check that you signed in with the right account. See [Roles & team](/admin/getting-started/roles-and-team).

### We removed our last Owner by mistake

Only the platform team can appoint a new one. Ask them, then appoint a second Owner too. See [When to contact support](/admin/help/contact-support).

### Does the admin ask for a code from a phone app?

Not for the store's team: sign-in asks for email and password. Use a strong password and give every person their own account. See [Sign-in & password](/admin/getting-started/sign-in).

## The sidebar

### A sidebar entry says "Off"

Your plan includes the feature, but it is switched off. Set it up and switch its setting on when you are ready. See [Store settings](/admin/settings/store-settings).

### Something is missing from the sidebar

Your plan may not include it, its setting may be off, or your role cannot open it. The ACS and BoxNow pages show only while that courier is active. See [Welcome](/admin/).

### Where is the System section?

It is for the platform team only. If you need something from there, see [When to contact support](/admin/help/contact-support).

## How the store looks

### How do I change the logo and colours?

In <span class="sidebar-path">Settings → Store Profile</span>, on the **Branding** tab. See [Store profile](/admin/settings/store-profile).

### How do I add an announcement above the header?

With the `ANNOUNCEMENT_BAR` setting. There is a ready-made example on [Store settings](/admin/settings/store-settings).

### How do I change the time until which an order ships the same day?

With the `DISPATCH_CUTOFF` setting, e.g. `14:00`. On weekends and public holidays the order ships the next working day. See [Store settings](/admin/settings/store-settings).

### Why are the stars not showing on products?

Stars show only on a product with at least one approved review. If they show nowhere, reviews are switched off (`PRODUCT_REVIEWS_ENABLED`). See [Reviews](/admin/catalog/reviews).

### How do I turn reviews off across the store?

Untick the `PRODUCT_REVIEWS_ENABLED` setting. The reviews you have stay and show again when you switch it back on. See [Store settings](/admin/settings/store-settings).

### I changed a product but the store shows the old price

The store updates by itself about ten seconds after you save. Reload the page with Ctrl+Shift+R. If it still shows the old one, clear **Products** on [Cache](/admin/settings/cache).

### I changed a setting and nothing happened

If your plan does not include the feature, the setting does not switch it on. Otherwise wait a few minutes, or clear **Storefront pages** on [Cache](/admin/settings/cache).

### Promotions or coupons do not apply at checkout

Check in order: that **Promotions** does not say **Off** in the sidebar, the promotion's dates and conditions, and whether the customer is a business customer with `B2B_ALLOW_PROMOTIONS` off. See [Promotions](/admin/marketing/promotions).

### My change to the store's menu does not show

The store updates by itself about ten seconds after you save. If it does not show, clear **Pages & navigation** on [Cache](/admin/settings/cache). See [Menus](/admin/content/menus).

### A product's English page shows Greek text

The product has no English translation. Open it, click the English language tab and fill it in. See [Languages & translations](/admin/settings/languages-and-translations).

## Orders and payments

### A cash-on-delivery order was delivered but its payment says Pending

With ACS that is normal: the payment becomes **Completed** when ACS pays the money out, days after delivery. With BoxNow the customer pays at the locker, so the payment becomes **Completed** on delivery. If the money does not arrive, or a delivered BoxNow order still says Pending, see [When to contact support](/admin/help/contact-support).

### An online-payment order has been Pending for hours

The customer did not pay. The order cancels itself, and its stock returns, once its payment window has passed: 30 minutes plus 5 by default (`ORDER_ONLINE_PAYMENT_HOLD_MINUTES`, `ORDER_ONLINE_PAYMENT_GRACE_MINUTES`). The customer gets no reminder email. To do it sooner, select it in the list and run **Cancel selected orders and restore stock**. See [Orders](/admin/sales/orders).

### The customer says they paid, but the order does not show as paid

Check the payment in your Viva Wallet or Stripe account. If it shows as paid there, send the order number to the platform team. See [When to contact support](/admin/help/contact-support).

### A customer cannot place a new order because others are "waiting for their payment"

They already have as many unpaid online-payment orders as `ORDER_MAX_UNPAID_ONLINE_ORDERS` allows (5 by default). They must pay for or cancel one. See [Store settings](/admin/settings/store-settings).

### Stock looks wrong after a failed payment

Stock returns when the order is canceled. The store checks every fifteen minutes and cancels orders with a failed payment after `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES` minutes. Wait, or cancel it yourself. See [Automatic tasks](/admin/help/automatic-tasks).

### Why is the receipt number not the next one I expected?

Numbering only moves forward, and a number once used is never given again. If something looks wrong, see [When to contact support](/admin/help/contact-support). See also [Receipts](/admin/sales/receipts).

### A customer lost their gift-card code

1. Open <span class="sidebar-path">Marketing → Gift Cards → Gift Cards</span> and search for the recipient's email.
2. Open the card. Check the **Recipient Email** on the **Delivery** tab.
3. Click **Resend delivery email**.

See [Gift cards](/admin/marketing/gift-cards).

## Shipping

### ACS did not collect today's parcels

1. In <span class="sidebar-path">Shipping → ACS Shipments</span> filter **Label: Not printed**.
2. Select the shipments and run **Print labels for selected shipments**.
3. Click **Issue ACS pickup list now**.

ACS refuses the day's pickup list while any label is unprinted. See [The daily routine](/admin/shipping/daily-routine).

### An ACS shipment's tracking looks old

The store asks ACS every fifteen minutes. For an immediate check, click **Re-poll ACS tracking** on the shipment. See [ACS](/admin/shipping/acs).

### ACS Smartpoint pickup does not show at checkout

It starts switched off. Switch on the `ACS_SMARTPOINT_ENABLED` setting. See [Store settings](/admin/settings/store-settings).

### A BoxNow parcel's status looks old

BoxNow updates the store automatically, and the store also asks every fifteen minutes. A delay of up to fifteen minutes is normal. See [BoxNow](/admin/shipping/boxnow).

## Customers

### A customer does not receive the confirmation code, or lost the phone with their codes

Only the platform team can sort these out. See [When to contact support](/admin/help/contact-support).

### A customer asked for a copy of their data

They request it themselves from their account. See [Data exports](/admin/customers/data-exports).

### Newsletter subscriptions disappeared from customers' accounts

The `NEWSLETTER_ENABLED` setting is off, or the subscription's topic is inactive. See [Subscriptions](/admin/customers/subscriptions).

## The admin itself

### The Dashboard figures look a little old

Order figures update as soon as an order changes. New customers can take up to 5 minutes, and **Store search** and the carts in **Checkout funnel** up to 15. See [Dashboard](/admin/getting-started/dashboard).

### The number on Messages does not drop when I read them

It counts messages from the last 7 days, not unread ones. It drops by itself as messages turn a week old. See [Welcome](/admin/).

### How do I quickly find an order by voucher number or email?

Press Ctrl+K (⌘K on a Mac) and type it. See [Search & command palette](/admin/getting-started/search-and-command-palette).

### A word in the admin is wrong or in English

The platform team corrects the admin's texts. Send them the screen and the word. See [When to contact support](/admin/help/contact-support).
