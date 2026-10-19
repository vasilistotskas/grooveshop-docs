---
title: BoxNow
description: BoxNow locker deliveries in Greece and Cyprus, the locker list, parcel states, printing the voucher, cancelling and PAY ON THE GO.
---

# BoxNow

BoxNow delivers to automated lockers. The customer picks a locker on the checkout map, the platform sends the order to BoxNow, and BoxNow updates the store automatically about every movement of the parcel. You print the voucher (the BoxNow shipping label) and hand the parcel over.

<span class="sidebar-path">Shipping → BoxNow Shipments</span>

The BoxNow screens appear only while BoxNow is active under [Shipping providers](/admin/settings/shipping-providers). The detailed history of every parcel is visible to the platform team only; one parcel's history is on its own page.

## What you see

| Column | Meaning |
|---|---|
| **Voucher** | BoxNow's 10-digit parcel number. A dash until BoxNow accepts the shipment. |
| **State** | Where the parcel is (table below). |
| **Locker External ID** | The destination locker. |
| **Order** | Link to the order. |
| **Compartment Size** | Small, medium or large (shown as Μικρό, Μεσαίο, Μεγάλο). Orders from your store always get small: the customer does not choose a size. |
| **Created At** | When the shipment was created. |

Filters: **Parcel State Group**, **Parcel State**, **Payment Mode**, **Compartment Size** and **Created At**. Search finds a parcel number, a locker, an order number or a customer email.

The parcel states:

| State | Meaning | The order becomes |
|---|---|---|
| **Pending creation** | BoxNow has not accepted the shipment yet. | (unchanged) |
| **New** | BoxNow accepted the shipment. The parcel is still with you. | **Processing** |
| **In depot** | The parcel is in BoxNow's network. | (unchanged) |
| **Accepted to locker** | The parcel was placed in the locker. | **Shipped** |
| **At locker** | The parcel is waiting for the customer, who is notified. | **Shipped** |
| **Delivered** | The customer opened the compartment. | **Delivered**, then **Completed** once paid |
| **Accepted for return** | A return has started. | **Returned** |
| **Returned** | The parcel came back to you. | **Returned** |
| **Expired** | The customer did not collect it in time. | **Returned** |
| **Missing**, **Lost** | BoxNow declared the parcel lost. | **Returned** |
| **Canceled** | Cancelled before pickup. | **Canceled** |

An older BoxNow update that arrives late never moves the parcel back to an earlier state.

A shipment's page has the tabs **BoxNow Identifiers**, **Order & Locker**, **Shipment Configuration**, **Timestamps** and **Diagnostics**, plus one listing every movement of the parcel.

The buttons:

| Where | Button | What it does |
|---|---|---|
| Bulk action | **Download voucher PDFs (zip)** | One zip file with a PDF for each selected parcel. |
| Bulk action | **Cancel parcels via BoxNow API** | Cancels the selected parcels that are **New**. It skips the others. |
| Bulk action | **Re-fetch label URL from BoxNow** | Fetches the label from BoxNow again, if downloading it does not work. |
| Shipment page | **Download BoxNow voucher (PDF)** | This parcel's voucher. |
| Shipment page | **Cancel parcel via BoxNow API** | Cancels the parcel, if it is **New**. |
| Shipment page | **Create BoxNow parcel now** | Sends the shipment to BoxNow again, after you fix the details. |

## Tasks

### Ship an order to a locker

1. The customer orders with a locker. The shipment appears as **Pending creation**.
2. A few seconds later the shipment goes to BoxNow. For card payments, as soon as the payment is confirmed. The parcel becomes **New** and the order **Processing**.
3. Print the voucher: **Download BoxNow voucher (PDF)** for one parcel, or select the day's parcels and run **Download voucher PDFs (zip)**. The voucher is also on the order, with **Download shipping voucher (PDF)**.
4. Attach the voucher and hand the parcel to BoxNow. From there on, the states come from BoxNow.

### A shipment that failed

The shipment stays **Pending creation**, you receive an email with the cause, and the same note is written in the order's history.

- **Unknown locker:** click **Sync lockers from BoxNow API** on the locker list and check that the locker is active.
- **BoxNow login details missing:** an Owner or Admin fills them in on the [Store profile](/admin/settings/store-profile). Nothing is retried until then.
- Once the details are fixed, open the shipment and click **Create BoxNow parcel now**. For a card order that is not paid yet, the button does nothing: the shipment is sent by itself when the payment arrives.

The email stops with the `OPS_ALERT_SHIPMENT_REJECTED_ENABLED` setting under <span class="sidebar-path">Settings → Store Settings</span>; the note is always written.

### Cancel a parcel

1. Only a parcel in state **New** can be cancelled. For anything later, contact BoxNow.
2. Open the shipment and click **Cancel parcel via BoxNow API**, or select rows and run **Cancel parcels via BoxNow API**.

When you cancel the order, the parcel is cancelled too, if it is still **New**. A customer can cancel the order from their account only while the parcel is **New**. A cancelled parcel cannot be created again from here; if you need it, [ask](/admin/help/contact-support) the platform team.

### Refresh the locker list

<span class="sidebar-path">Shipping → Pickup Points → BoxNow Lockers</span>

The list refreshes by itself every night at 02:00 and holds the Greek and Cypriot lockers together. The **Country Code** filter tells them apart. To refresh it now, click **Sync lockers from BoxNow API** above the list. It always fetches the whole list: it adds new lockers and makes inactive the ones BoxNow removed. Customers never see inactive lockers.

When BoxNow is the only active courier with lockers, the menu shows **BoxNow Lockers** directly under **Shipping**.

### Shipping to Cyprus

BoxNow also delivers to lockers in Cyprus, with the same account and the same login details.

1. In [Shipping providers](/admin/settings/shipping-providers), open BoxNow and add a line under **Rates**: **Country** Cyprus, **Shipping Kind** **Pickup point / locker**, a price, and in **Max Weight (grams)** the weight limit BoxNow gave you for Cyprus.
2. Save. Cyprus appears at checkout, with only the couriers that have a rate for it.
3. Check that there are Cypriot lockers: filter **Country Code** CY. If there are none, click **Sync lockers from BoxNow API**.
4. Place a test order to a Cypriot locker.

At checkout, the customer sees the Cyprus map once they choose Cyprus. The phone field has a country picker, so it accepts both a Cypriot and a Greek number. A Greek locker is refused for a Cypriot address, and the other way round.

## Things to know

- **What the customer gets:** the order's tracking number is the BoxNow parcel number. When the parcel reaches **At locker**, the customer receives an email with the locker's address, and a notification in their account if they have one.
- **PAY ON THE GO** (pay before pickup): BoxNow sends the customer a payment link, and the compartment opens only after they pay. That is why the order becomes paid as soon as the parcel is **Delivered**. There is no payout to wait for, unlike ACS cash on delivery.
- **Payment Mode** on the shipment: PAY ON THE GO shows as **Cash on delivery**, card and bank-transfer orders as **Prepaid**, with nothing to collect. **Amount to be Collected** is what the customer owes.
- **Test or live login details:** BoxNow gives separate details for testing and for real shipping. The **BoxNow Live Mode** switch on the [Store profile](/admin/settings/store-profile) must match them: on for live details, off for test ones. Otherwise BoxNow refuses every shipment.
- **A lost update:** if you receive an email that a BoxNow update could not be applied, compare the parcel with the BoxNow program. The email stops with the `OPS_ALERT_WEBHOOK_FAILED_ENABLED` setting, but then nothing else warns you.
- **One parcel per order.** The platform sends every order as one parcel.
- **Do not change the Locker External ID** on a shipment. It is there only for testing with BoxNow.

## Related

- [Daily shipping routine](/admin/shipping/daily-routine)
- [Shipping providers](/admin/settings/shipping-providers)
- [ACS Courier](/admin/shipping/acs)
- [Orders](/admin/sales/orders)
