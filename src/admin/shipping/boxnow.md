---
title: BoxNow
description: BoxNow locker deliveries in Greece and Cyprus, the synced locker list, parcel states and events, label printing, cancellation and what the customer receives.
---

# BoxNow

<span class="sidebar-path">Shipping → BoxNow Shipments</span> and <span class="sidebar-path">Shipping → BoxNow Lockers</span>

BoxNow delivers to automated lockers. A customer picks a locker on the checkout map, the platform sends BoxNow a delivery request, and BoxNow reports every parcel movement back through a signed webhook. A check with BoxNow every fifteen minutes runs as a safety net in case a webhook is lost.

## Lockers

The locker list is a local copy of BoxNow's destination catalogue. It holds the Greek and the Cypriot lockers together; the country code on each locker says which is which.

| Column | Meaning |
|---|---|
| **External ID** | BoxNow's own locker identifier. This is what goes on the voucher. |
| **Name** | Locker name as BoxNow publishes it. |
| **Postal Code**, **Address Line 1** | Where the locker is. |
| **Is Active** | Off when the locker was absent from the latest sync. Inactive lockers are not offered. |
| **Last Synced At** | When the row was last confirmed by BoxNow. |

Filters: **Is Active**, **Type** (APM, Any APM, Warehouse, Depot), **Last Synced At** range. Search matches ID, name, postcode and both address lines. The form also shows title, country code, coordinates, note and image URL.

The list is refreshed every night at 02:00. To refresh it now, tick any row and run the bulk action **Sync lockers from BoxNow API**. The selection is ignored: the action always fetches the full catalogue, creates and updates rows, and deactivates lockers that BoxNow no longer lists. The result message reports created, updated and deactivated counts.

## Shipments

Columns of the list:

| Column | Meaning |
|---|---|
| **Voucher** | BoxNow's 10-digit parcel ID. Shown as a dash until BoxNow accepts the delivery request. |
| **State** | See the state table. |
| **Locker External ID** | Destination locker. |
| **Order** | Link to the order. |
| **Compartment Size** | Μικρό, Μεσαίο or Μεγάλο, as chosen at checkout. |
| **Created at** | Also available as a date drill-down above the list. |

Filters: **Parcel State Group** (Active, Ready for Pickup, Completed, Problematic), **Parcel State**, **Payment Mode**, **Compartment Size**, **Created at** range. Search matches the parcel ID, the delivery request ID, the locker ID, the order number and the customer email.

Parcel states:

| State | Group | Meaning | Order status it sets |
|---|---|---|---|
| Pending creation | Active | Row exists, BoxNow not yet called. | none |
| New | Active | BoxNow accepted the delivery request. Parcel still with you. | none (already Processing) |
| In depot | Active | Parcel is in BoxNow's network. | none |
| Accepted to locker | Active | Parcel placed in the locker. | Shipped |
| At locker | Ready for Pickup | Parcel available for pickup; the customer is notified. | Shipped |
| Delivered | Completed | Customer opened the compartment. | Delivered, then Completed if paid |
| Accepted for return | Active | Customer or BoxNow started a return. The **Parcel State Group** filter counts this one as Active, not Problematic. | Returned |
| Returned | Problematic | Back with the sender. | Returned |
| Expired | Problematic | Not collected within BoxNow's window. | Returned |
| Missing, Lost | Problematic | Declared missing or lost. | Returned |
| Canceled | Problematic | Cancelled before pickup. | Canceled |

Delivered, Canceled, Returned, Expired, Lost and Missing are final.

The shipment page has these sections: **BoxNow Identifiers** (UUID, delivery request ID, parcel ID, label URL, all read-only), **Order & Locker** (order, locker, locker external ID), **Shipment Configuration** (parcel state read-only, compartment size, weight in grams, payment mode, amount to be collected, allow return), **Timestamps** and **Diagnostics** (metadata with BoxNow's full response and the last error). A tab lists every event: **Event Time**, **Event Type**, **Parcel State**, **Display Name**, **Postal Code**, **Additional Information**, **Received At**.

Buttons:

| Where | Button | What it does |
|---|---|---|
| Bulk action | **Cancel parcels via BoxNow API** | Cancels every selected parcel that is in state New. Others are skipped with a warning. |
| Bulk action | **Re-fetch label URL from BoxNow** | Downloads the label PDF again into the one-hour cache for every selected parcel that has an ID. |
| Bulk action | **Download voucher PDFs (zip)** | One zip named `boxnow-vouchers.zip` with one PDF per selected parcel, named by parcel ID. Rows without a parcel ID are skipped. |
| Shipment page | **Download BoxNow voucher (PDF)** | The single label. |
| Shipment page | **Cancel parcel via BoxNow API** | Cancels this parcel if it is New. |
| Shipment page | **Create BoxNow parcel now** | Sends the delivery request again for a shipment that has no parcel yet, after its data was fixed. Refused while an online payment is still pending: the parcel is then created automatically once the payment is confirmed. |

The label is also one click away in <span class="sidebar-path">Sales → Orders</span> with **Download shipping voucher (PDF)** on the row or the order page.

## Delivering to Cyprus

BoxNow also delivers from Greek shops to its locker network in Cyprus. It uses the same BoxNow account and the same credentials, so there is nothing for the platform team to change.

### Set it up

1. Open <span class="sidebar-path">Shipping → Shipping Providers</span>, then the BoxNow row, and scroll to **Rates**.
2. Add a line: **Country** Cyprus, **Shipping Kind** pickup point, your **Price**, a **Free Shipping Threshold** if you want one, and **Max Weight (grams)** `4000`. BoxNow accepts at most 4 kg per parcel to Cyprus.
3. Tick **Is Active** and save. Cyprus now appears in the checkout country list, and BoxNow is offered for it. Couriers without a Cyprus rate are not.
4. Check that the Cypriot lockers are in <span class="sidebar-path">Shipping → BoxNow Lockers</span>: filter **Country Code** by `CY`. They arrive with the nightly sync; if none are there yet, run **Sync lockers from BoxNow API**.
5. Place a test order to a Cypriot locker, print its voucher and send it to BoxNow so they can confirm the setup. BoxNow asks for this before you start shipping to Cyprus.

For the general steps of adding a country, see [Shipping providers](/admin/shipping/providers).

### What the customer sees

- **Cyprus in the country list**, with its districts as regions. The district must belong to the chosen country: a Greek prefecture with Cyprus is refused.
- **The Cyprus locker map.** When Cyprus is the delivery country, the map switches to BoxNow's Cyprus map on its own. Changing the country clears a locker that was already picked.
- **The phone number in international format.** When Cyprus is the delivery country, `+357` is shown in front of the phone field and a Cypriot number of eight digits is accepted. A Greek mobile works too, typed with `+30` in front: someone in Greece can send a parcel to a locker in Cyprus.
- **Carts over 4 kg** see BoxNow greyed out with the reason, instead of an empty delivery step.
- **Delivery time**: about three working days from the moment you hand the parcel to BoxNow.

### Things to know about Cyprus

- **A Greek locker cannot be used for a Cypriot address, or the other way round.** The order is refused and the customer is asked to pick a locker in the delivery country.
- **A brand-new locker may be missing for up to a day.** The locker list syncs once a night, so BoxNow may show a locker on the map before it reaches your list. An order to such a locker is still accepted.
- Labels, cancellations, parcel states and PAY ON THE GO work exactly as for Greece.

## Tasks

### Ship a locker order

1. The order is placed with a locker and a compartment size. The shipment row appears in **Pending creation**.
2. After payment (immediately for PAY ON THE GO and bank transfer, after the webhook for card payments) the platform sends the delivery request. The row gets its parcel ID, moves to **New**, the order's tracking number is set and the order moves to Processing.
3. Print the label with **Download BoxNow voucher (PDF)** or, for the day's batch, select the rows and use **Download voucher PDFs (zip)**.
4. Attach the label and hand the parcel to BoxNow. From here on every state comes from BoxNow.

### Fix a delivery request that failed

The row stays in **Pending creation** and the store's admins receive an email naming the order and BoxNow's error code. The **Diagnostics** section on the shipment also holds the last error.

- **P402 invalid locker**: the locker is unknown to the store's BoxNow account. Run **Sync lockers from BoxNow API** and check the locker is active; a catalogue synced under different credentials produces this for every order.
- **Missing credentials**: the platform team must add the store's BoxNow client ID, secret and partner ID; nothing retries until then.
- Once the data is fixed, open the shipment and press **Create BoxNow parcel now**. The failure is also written as a note in the order's history, with the same instruction.

### Cancel a parcel

1. Only a parcel in state **New** can be cancelled through BoxNow. Anything later needs BoxNow support.
2. Open the shipment and click **Cancel parcel via BoxNow API**, or select rows and run **Cancel parcels via BoxNow API**.
3. Cancelling the order in <span class="sidebar-path">Sales → Orders</span> also cancels the parcel when it is still New. A row that never got a parcel ID is simply marked Canceled locally.
4. A customer can cancel the order from their account only while the parcel is still New. After that their cancel is refused and the order is left as it is.

### Check what BoxNow reported

Open the shipment and read the events tab, or go to <span class="sidebar-path">System → Audit & Logs → BoxNow Events</span> (superusers) for every event across all parcels: **Voucher**, **Event Type**, **Parcel State**, **Event Time**, **Display Name**, **Received At**, with filters on event type, parcel state and event time, and search by parcel ID or **Webhook Message ID**. Events cannot be added, edited or deleted, not even by a superuser. An event picked up by the fifteen-minute check rather than by a webhook has a **Webhook Message ID** beginning with `poll:`.

## What the customer sees

- The order's tracking number is the BoxNow parcel ID.
- When the parcel reaches **At locker**, the customer receives the store's email "Your BOX NOW parcel arrived at the locker" with the locker address, plus an in-app notification if they have an account. BoxNow separately sends its own SMS or Viber message with the pickup PIN.
- On **Delivered**, account holders get an in-app "parcel collected" notification. Order-status emails (Shipped, Delivered, Returned, Canceled) come from the order system as usual.
- **PAY ON THE GO** (BoxNow's collect-before-pickup product): BoxNow sends the customer a payment link after the parcel is dispatched and activates the pickup PIN once the payment clears. It is not a card reader on the locker. The platform marks the order paid when BoxNow reports Delivered, since the compartment cannot open before payment. No later payout reconciliation exists or is needed, unlike ACS cash on delivery.

## Things to know

- **Test keys or live keys.** BoxNow issues separate test and production keys, and each only works with its own BoxNow system. The **BoxNow Live Mode** switch on the store's platform record, next to the BoxNow keys, says which kind the store holds: on for production keys, off for test keys. Keep it matching the keys, otherwise BoxNow refuses every request. A store on test keys never ships a real parcel, which is what a demo store wants. After changing it, run **Sync lockers from BoxNow API** again, because the test and production locker lists differ. A staging copy of a store is always held on test mode, whatever the switch says.
- **Payment mode** on the shipment follows the order's payment method. PAY ON THE GO shows as **Cash on delivery**, which is BoxNow's word for "collect at the locker". Online and bank-transfer orders show as **Prepaid**, with nothing to collect. Cash to a courier is never allowed on a locker, so such an order cannot be placed in the first place.
- **Amount to be collected** is filled in when the delivery request is sent and equals the order's paid amount, so a loyalty discount is reflected.
- **Weight** is sent in kilograms with three decimals, and is capped at BoxNow's own maximum. A zero weight is accepted by BoxNow.
- **Out-of-order webhooks** cannot move a parcel backwards: the state only changes when the event is newer than the last one applied. Duplicate deliveries are ignored.
- **"BoxNow: webhook processing failed"** is an email you may receive when BoxNow sent something the platform could not apply. BoxNow has already been told the message arrived and will not send it again, so a parcel movement may be missing. Compare the parcel against the BoxNow portal and reconcile it by hand.
- The **Locker External ID** field on the form is editable and its help text refers to BoxNow's test environment. Leave it alone on a live store; the voucher is already at BoxNow.
- The locker map in the storefront is a hosted widget. If it stops rendering after a platform change, the content security policy is the usual cause; that is a platform-team fix.

## Related

- [Shipping providers](/admin/shipping/providers)
- [Countries & regions](/admin/localization/countries-and-regions)
- [ACS Courier](/admin/shipping/acs)
- [Orders](/admin/sales/orders)
- [Audit & logs](/admin/system/audit-and-logs)
