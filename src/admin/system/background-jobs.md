---
title: Background jobs
description: Everything that runs automatically for your store on a schedule, which of it you can tune through settings, and what only the platform may change.
---

# Background jobs

Scheduled work runs from one platform-wide timetable. The schedule screens (**Periodic Tasks**, **Crontab Schedules**, **Interval Schedules**, **Clocked Schedules**, **Solar Schedules**) and the **Task Results** screens live on the platform console only. A store's admin has no Background Jobs section, by design: one timetable drives every store, so it is not any one store's to edit.

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
| Poll ACS tracking | every 15 minutes | Fetches checkpoints for every ACS voucher not yet delivered. ACS sends no notifications, so this is the only source. |
| Issue ACS pickup list | Mon–Fri 16:30 | Records the day's manifest with ACS. ACS collects printed parcels with or without it and refuses it while any voucher is unprinted; a refusal is noted on the orders it held back, not emailed. See [Reconciliation](/admin/system/reconciliation). |
| Stale ACS shipments digest | daily 09:00 | Emails a list of vouchers with no movement for several days. |
| Reconcile ACS COD payouts | daily 02:30 | Imports the previous day's cash-on-delivery payouts and marks the matching orders paid. |
| Alert unremitted COD | daily 03:00 | Emails a list of delivered COD parcels ACS has not paid out yet. |
| Sync ACS stations | daily 03:00 | Refreshes the Smartpoint list. |
| Poll BoxNow tracking | every 15 minutes | Fetches parcel state for open BoxNow shipments, alongside BoxNow's own notifications. |
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
| Clean expired data exports | daily 03:00 | Deletes data-export files older than seven days. | |
| Reap unclaimed contact attachments | hourly | Deletes uploads whose enquiry was never submitted. | |
| Purge expired attachment files | daily 04:00 | Deletes attachment bytes past the retention window; the enquiry stays. | `CONTACT_ATTACHMENTS_RETENTION_DAYS` |
| Rebuild search indexes | daily 02:00 | Re-syncs products and posts to the search engine. | |
| Update search click scores | daily 03:00 | Feeds click data back into ranking. | |
| Anonymise old search queries | Sunday 03:00 | Strips identifying data from searches older than 90 days. | |
| Clear expired customer sessions | Monday 04:00 | Removes expired sessions. | |
| Clear duplicate / old history | daily 05:00 / Sunday 03:00 | Trims the record change history. | |
| Clear all cache | 1st of the month 04:00 | A full cache reset. | |

### Platform-wide (not per store)

Health check every 30 minutes, database backup daily 03:00 with a weekly cleanup on Sunday 05:00, tenant billing daily 06:00, archived-store purge daily 03:00.

## Buttons you can press yourself

These run the job now instead of waiting, and all of them sit on screens a store's Staff, Admin and Owner can open.

| Screen | Button | What it does |
|---|---|---|
| ACS Shipments | **Issue ACS pickup list now** | Issues the day's manifest for every waiting voucher without waiting for 16:30. |
| ACS Shipments | **Issue ACS voucher now** | Creates the voucher for one shipment. |
| ACS Shipments | **Re-poll ACS tracking** | Re-fetches checkpoints for one shipment. |
| ACS Shipments | **Re-poll tracking for selected shipments** | The same for several at once. |
| ACS Shipments | **Retire selected shipments (mark CANCELED, stop polling)** | For vouchers ACS will never advance again. |
| BoxNow Lockers | **Sync lockers from BoxNow API** | Refreshes the locker list for the checkout map. |

**Run COD reconciliation now** is not one of them. It sits on the ACS COD Payouts screen, which only platform operators can open; ask the platform if a payout import must run early. See [Reconciliation](/admin/system/reconciliation).

## For platform operators

- Do not disable or re-time the fan-out jobs; every store depends on them.
- The ACS pickup-list time does not decide when parcels are collected: ACS collects printed parcels whether or not a list was issued, so moving it changes only when the day's manifest is recorded.
- **Task Results lists failures, not runs.** Successful jobs deliberately write nothing, so an empty list means nothing failed, not that nothing ran. Failure rows are kept for thirty days. To answer "did the nightly job run at all?", read the last-run time on **Periodic Tasks** instead.

## Things to know

- If a scheduled email did not arrive, check the setting that gates it before assuming the job failed.
- Issuing the ACS pickup list is single-flight: if the scheduled run and someone's click overlap, the second one is skipped rather than issuing twice.

## Related

- [Store settings](/admin/settings/store-settings)
- [Reconciliation](/admin/system/reconciliation)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
