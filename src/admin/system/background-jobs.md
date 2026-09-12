---
title: Background jobs
description: Everything that runs automatically for your store on a schedule, which of it you can tune through settings, and what only the platform may change.
---

# Background jobs

<span class="sidebar-path">Background Jobs (platform console only)</span>

Scheduled work is run by Celery from one platform-wide schedule (`CELERY_BEAT_SCHEDULE` in `settings.py`). The schedule tables (**Periodic Tasks**, **Crontab Schedules**, **Interval Schedules**, **Clocked Schedules**, **Solar Schedules**) and the result tables (**Task Results**, **Group Results**) exist only on the platform console. A store's admin has no Background Jobs section, by design: one schedule drives every store, so it is not any one store's to edit.

What a store can control is the **behaviour** of those jobs, through [Store settings](/admin/settings/store-settings).

## What runs for your store

Times are store local time (Athens). Each job runs once per store.

### Orders and stock

| Job | When | What it does | Your knobs |
|---|---|---|---|
| Cancel stuck pending orders | every 15 minutes | Cancels orders whose online payment failed or never completed, and releases their stock. | `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES`, `ORDER_AUTO_CANCEL_PENDING_HOURS` |
| Release expired stock reservations | hourly | Frees stock held by checkouts that were never completed. | `STOCK_RESERVATION_TTL_MINUTES` |
| Pending order reminders | daily 07:00 | Emails customers whose order is still unpaid. | `PENDING_ORDER_REMINDER_*` |
| Low stock check | hourly | Emails the store when a product falls to its threshold. | the product's own **Low stock threshold** field (0 disables it for that product) |
| Checkout abandonment emails | daily 06:00 | Reminds customers who left a checkout. | `CHECKOUT_ABANDONMENT_HOURS` |
| Abandoned cart cleanup | daily 04:00 | Deletes old abandoned carts. | `ABANDONED_CART_CLEANUP_DAYS` |
| Guest cart cleanup | daily 06:00 | Deletes old guest carts. | `OLD_GUEST_CART_CLEANUP_DAYS` |

### Shipping

| Job | When | What it does |
|---|---|---|
| Poll ACS tracking | every 15 minutes | Fetches checkpoints for every ACS voucher not yet delivered. |
| Warn about unprinted ACS vouchers | Mon–Fri 15:45 | Emails the store if a voucher on today's list has not been printed, because ACS rejects the whole pickup list otherwise. |
| Issue ACS pickup list | Mon–Fri 16:30 | Presents the day's vouchers to ACS for collection. See [Reconciliation](/admin/system/reconciliation). |
| Stale ACS shipments digest | daily 09:00 | Emails a list of vouchers with no movement for several days. |
| Reconcile ACS COD payouts | daily 02:30 | Imports yesterday's cash-on-delivery payouts and marks the matching orders paid. |
| Alert unremitted COD | daily 03:00 | Emails a list of delivered COD parcels ACS has not paid out yet. |
| Sync ACS stations | daily 03:00 | Refreshes the Smartpoint list. |
| Poll BoxNow tracking | every 15 minutes | Fetches parcel state for open BoxNow shipments, independent of webhooks. |
| Sync BoxNow lockers | daily 02:00 | Refreshes the locker list used by the checkout map. |

### Loyalty, gift cards, promotions

| Job | When | What it does | Your knobs |
|---|---|---|---|
| Expire loyalty points | daily 03:00 | Removes points past their validity. | `LOYALTY_POINTS_EXPIRATION_DAYS` |
| Expire gift cards | daily 03:00 | Marks cards past their validity as expired. | `GIFT_CARD_VALIDITY_DAYS` |
| Deliver scheduled gift cards | daily 06:00 | Sends cards bought with a future delivery date. | |
| Gift card expiry reminders | daily 06:00 | Emails recipients before a card expires. | `GIFT_CARD_EXPIRY_REMINDER_DAYS` |

### Customers, content, housekeeping

| Job | When | What it does | Your knobs |
|---|---|---|---|
| Inactive customer emails | 1st of the month 06:00 | "We miss you" emails. | `INACTIVE_USER_THRESHOLD_DAYS`, `REENGAGEMENT_EMAIL_*` |
| Expire notifications | 1st and 15th 06:00 | Deletes old in-app notifications. | `NOTIFICATION_EXPIRATION_DAYS` |
| Clean expired data exports | daily 03:00 | Deletes GDPR export files older than seven days. | |
| Reap unclaimed contact attachments | hourly | Deletes uploads whose enquiry was never submitted. | |
| Purge expired attachment files | daily 04:00 | Deletes attachment bytes past the retention window; the enquiry stays. | `CONTACT_ATTACHMENTS_RETENTION_DAYS` |
| Rebuild search indexes | daily 02:00 | Re-syncs products and posts to the search engine. | |
| Update search click scores | daily 03:00 | Feeds click data back into ranking. | |
| Anonymise old search queries | Sunday 03:00 | Strips identifying data from searches older than 90 days. | |
| Clear expired sessions | Monday 04:00 | Removes expired customer sessions. | |
| Clear duplicate / old history | daily 05:00 / Sunday 03:00 | Trims the model change history. | |
| Clear all cache | 1st of the month 04:00 | A full cache reset. | |

### Platform-wide (not per store)

System health check every 30 minutes, database backup daily 03:00 with weekly cleanup, tenant billing daily 06:00, archived-store purge daily 03:00.

## What an admin may safely change

- Any of the settings named in the tables above, from your own admin.
- Ask the platform to trigger a job early when needed. The only jobs with an on-demand button in the store admin are **Issue ACS pickup list now** (on ACS Shipments), **Run COD reconciliation now** (on ACS COD Payouts), **Sync lockers from BoxNow API** (on BoxNow Lockers) and **Re-poll ACS tracking** (on ACS Shipments).

## What never to touch

For platform operators on the console:

- Do not disable or re-time the fan-out tasks; every store depends on them.
- Do not change the ACS pickup-list time without agreeing it with the courier's collection window.
- **Task Results** only fills under the database result backend; in production results go to Redis, so an empty list is normal, not a sign that nothing ran.

## Things to know

- If a scheduled email did not arrive, check the setting that gates it before assuming the job failed.
- The dashboard's failed-task counter (platform operators only) covers the last 24 hours.

## Related

- [Store settings](/admin/settings/store-settings)
- [Reconciliation](/admin/system/reconciliation)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
