---
title: Automatic tasks
description: What your store does on its own every day (cancellations, alerts, deleting old data) and which setting changes each one.
---

# Automatic tasks

Some work happens on its own, at fixed times: unpaid orders are cancelled, shipments are updated, old data is deleted. Times are Greek time and the platform team sets them. You change the "how much" and the "whether" from your store's settings.

<span class="sidebar-path">Settings → Store Settings</span>

## What you see

Automatic tasks have no screen of their own. You see their result on orders, on shipments and in the emails you or your customers receive. The "Setting" column names the key you change in Store Settings and, in brackets, its starting value.

### Orders and stock

| What happens | When | Setting |
|---|---|---|
| An online order whose payment failed is cancelled. Its stock comes back. | every 15 minutes | `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES` (30 minutes) |
| An online order that was never paid is cancelled once its payment window has passed. Its stock comes back. | every 15 minutes | `ORDER_ONLINE_PAYMENT_HOLD_MINUTES` (30 minutes), `ORDER_ONLINE_PAYMENT_GRACE_MINUTES` (5 minutes), `ORDER_ONLINE_PAYMENT_MAX_HOLD_MINUTES` (60 minutes) |
| Stock held for a customer at checkout is released if they did not finish the order. | as soon as the time runs out | `STOCK_RESERVATION_TTL_MINUTES` (30 minutes) |
| A signed-in customer who left checkout halfway gets a "Did you forget something?" email, once. | every day 06:00 | `CHECKOUT_ABANDONMENT_HOURS` (2 hours) |
| An order that was delivered and is paid moves to "Completed". The customer gets no email. | every hour | — |
| You get one email, at the **Contact Email**, about active products with low stock. Each product is listed once, until its stock rises above the threshold again. | every hour | the **Low Stock Threshold** field of each product (10; 0 stops it) |
| Empty guest carts are deleted. | every day 04:00 | `ABANDONED_CART_CLEANUP_DAYS` (7 days) |
| Guest carts not opened for a long time are deleted. Registered customers' carts stay. | every day 06:00 | `OLD_GUEST_CART_CLEANUP_DAYS` (30 days) |

Cash on delivery and other offline payments are never cancelled automatically. No unpaid order gets a reminder email.

### Shipping

| What happens | When | Setting |
|---|---|---|
| The progress of ACS and BoxNow parcels is updated. | every 15 minutes | — |
| The day's ACS pickup list is issued. | Monday–Friday 16:30 | — |
| You get an email about ACS parcels with no movement for three days. | every day 09:00 | `OPS_ALERT_STALE_SHIPMENTS_ENABLED` (on) |
| The cash-on-delivery money ACS paid out the day before is recorded. The order becomes paid. | every day 02:30 | — |
| You get an email about cash-on-delivery parcels delivered more than ten days ago that ACS has not paid out yet. | every day 03:00 | `OPS_ALERT_UNREMITTED_COD_ENABLED` (on) |
| The lists of BoxNow lockers and ACS stations are refreshed. | every day 02:00 and 03:00 | — |

These emails to the store go to the **Contact Email** and the **Owner Email** of the Store Profile.

### Customers, loyalty and gift cards

| What happens | When | Setting |
|---|---|---|
| Loyalty points past their validity expire. Time when Loyalty was off does not count. | every day 03:00 | `LOYALTY_POINTS_EXPIRATION_DAYS` (0; they never expire) |
| A gift card's remaining balance expires on its expiry date. | every day 03:00 | `GIFT_CARD_VALIDITY_DAYS` (1825 days, that is 5 years from issue) |
| A gift card bought for a future date is sent. | every day 06:00 | — |
| The recipient of a gift card with a balance gets one reminder before it expires. | every day 06:00 | `GIFT_CARD_EXPIRY_REMINDER_DAYS` (30 days; 0 stops it) |
| A customer who has not signed in for a long time gets a "We miss you!" email. | 1st of the month 06:00 | `INACTIVE_USER_THRESHOLD_DAYS` (60 days), `REENGAGEMENT_EMAIL_MAX_COUNT` (3; 0 stops it), `REENGAGEMENT_EMAIL_COOLDOWN_DAYS` (90 days between two emails) |

While gift cards are off, no card expires and no card or reminder is sent.

### Deleting old data

| What is deleted | When | Setting |
|---|---|---|
| Messages and Feedback (customers' comments about the store), with their attachments. | every day 04:00 | `CONTACT_RETENTION_DAYS` (365 days; 0 keeps them all) |
| The files a customer attached to a message. The message itself stays. | every day 04:00 | `CONTACT_ATTACHMENTS_RETENTION_DAYS` (90 days) |
| Files uploaded to a contact form that was never sent. | every hour | — |
| The file of a customer data export, seven days after it was ready. | every day 03:00 | — |
| Guest Newsletter sign-ups not confirmed within 30 days. | every day 04:00 | — |
| Customer notifications older than a year. | 1st and 15th of the month 06:00 | — |

### Search

| What happens | When |
|---|---|
| The storefront search is updated again for every product and blog post. | every day 02:00 |
| When a promotion starts or ends, search shows the new price. | within 5 minutes |

## Tasks

### Change a setting

1. Open <span class="sidebar-path">Settings → Store Settings</span>.
2. Type the key in the search box, for example `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES`.
3. Open the setting, change the value and click **Save**.

The new value applies from the next time the task runs.

### Stop an email to the store

Switch off `OPS_ALERT_STALE_SHIPMENTS_ENABLED` or `OPS_ALERT_UNREMITTED_COD_ENABLED`. The email stops, but the [Dashboard](/admin/getting-started/dashboard) keeps counting the same parcels.

### Make something happen now

| You want | Where | Button |
|---|---|---|
| The ACS pickup list before 16:30 | <span class="sidebar-path">Shipping → ACS Shipments</span> | **Issue ACS pickup list now** |
| The progress of one ACS parcel | on the shipment's page | **Re-poll ACS tracking** |
| The progress of several ACS parcels | select them in the list | **Re-poll tracking for selected shipments** |
| The list of BoxNow lockers | <span class="sidebar-path">Shipping → Pickup Points → BoxNow Lockers</span> | **Sync lockers from BoxNow API** |

If you need ACS's cash-on-delivery payouts recorded sooner, ask [support](/admin/help/contact-support).

## Things to know

- If an automatic email did not arrive, check its setting first. For emails to the store, also check that the **Contact Email** is filled in.
- You cannot change when the tasks run. If a time does not suit you, talk to [support](/admin/help/contact-support).

## Related

- [Store settings](/admin/settings/store-settings)
- [Orders](/admin/sales/orders)
- [Daily shipping routine](/admin/shipping/daily-routine)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [When to contact support](/admin/help/contact-support)
