---
title: Receipts for courier and locker orders
description: How the platform issues a receipt that declares the movement of the goods for ACS and BOX NOW orders, what it shows, when the customer gets it, what happens when myDATA does not answer or refuses it, and what a cancellation does to it.
---

# Receipts for courier and locker orders

<span class="sidebar-path">Sales → Orders</span> · <span class="sidebar-path">Settings → Store Settings</span>

When an order is delivered to the customer by a courier (ACS) or to a locker (BOX NOW), the law asks for a receipt that declares the movement of the goods: where the parcel leaves from, where it goes, and when. AADE must receive it before the courier collects the parcel. So for these orders the receipt is issued earlier than for the others, as soon as the courier voucher or the locker parcel exists.

This applies only when the platform issues your receipts through myDATA. If you issue them in your own fiscal device or with your provider, nothing changes for you. See [Receipts and credit documents](/admin/sales/receipts) for the rest of the receipt flow.

## Set your dispatch point

Tell the platform the place your parcels leave from. Under <span class="sidebar-path">Settings → Store Settings</span> there are four dispatch point settings, one for each part of that place's address:

| Setting | What to enter |
|---|---|
| `MYDATA_LOADING_STREET` | The street. |
| `MYDATA_LOADING_NUMBER` | The street number. |
| `MYDATA_LOADING_POSTAL_CODE` | The postcode, a Greek one. |
| `MYDATA_LOADING_CITY` | The city. |

The quickest way to them is the **Open the dispatch point settings** link of the Dashboard alert below.

All four are needed. The place is also the address the receipt gives for your store, and AADE requires the street number of it. Until all four are filled in, nothing changes: every receipt, courier orders included, is issued when the order ships and carries no movement.

Your <span class="sidebar-path">Dashboard</span> shows **Set the dispatch point for courier receipts** until you do, as long as ACS or BOX NOW is switched on for the store.

## When the receipt is issued

- It is issued as soon as the courier voucher or the locker parcel exists, before the courier collects it. With `MYDATA_AUTO_SUBMIT` on, you do nothing. With it off, press **Issue receipt (myDATA)** on the order before you hand the parcel over.
- A voucher you only typed in by hand does not count: the receipt waits for the voucher or parcel made through ACS or BOX NOW.
- Shipping never waits for myDATA. The voucher, the pickup list and the handover go ahead whatever AADE answers.

## What the receipt shows

- The buyer's name and address. AADE requires them on a receipt that carries a movement, and the platform sends them nowhere else.
- A **Movement of goods** box on the printed receipt: the purpose (a sale), **Start of movement**, the loading place (your dispatch point), the delivery place and the unit.
- The delivery place is the ACS station or the BOX NOW locker for a pickup order, and the customer's shipping address otherwise.
- The start of the movement is the day the voucher or parcel was created, with no time.
- Every product that moves is listed with the quantity actually sent. A free gift is listed too, at zero value, so it does not change any total. Products refunded before the receipt are left out of the quantity.
- AADE's QR code is on the receipt once it is registered, so you can print it with the parcel. The courier's own label is not changed.

## When the customer gets it

The customer does not receive the receipt, and cannot download it, until the parcel leaves. At that moment it is emailed, as for any receipt. Until then it is issued but not used, which is what lets a cancellation before the pickup cancel it (see below).

## If a voucher is made again

If a new voucher is made after the receipt was issued (a new locker, station or address), or the parcel leaves more than 5 days after the receipt, the receipt is left as AADE has it. When the parcel ships, a note on the order says what differs. Check with your accountant how that movement is documented.

## If myDATA does not answer

The receipt is issued anyway and the parcel ships as usual. The receipt is sent again by itself about every 15 minutes until AADE registers it.

- While the parcel is still at the store, it is sent again exactly as it was issued. If the day has changed, only the date of the movement moves to today, because AADE refuses an earlier one.
- Before each new send, the platform asks AADE whether it already holds the receipt, so it is never registered twice.
- If the parcel leaves before the receipt is registered, the movement started while myDATA was unreachable. From then on the receipt is sent with AADE's lost-connection indication until it is registered.

You do nothing. The Dashboard shows one warning, **Parcels that left while myDATA was unreachable**, with the count of such parcels, and it goes away once their receipts are registered.

## If myDATA refuses the receipt

The receipt is marked **Rejected** with AADE's reason on the order, and counted on the Dashboard as **Receipts rejected by myDATA**. The parcel ships all the same. Fix the data, then press **Send receipt to myDATA** on the order.

Missing data is caught before anything is sent: a store name that is blank, or a buyer without a name, a country or a full address, is refused at once with the reason on the order.

A locker or station whose address the platform does not know yet is also marked **Rejected**, before anything is sent. The order's history gets one note, "myDATA rejected …: PICKUP …", and the code shown on the receipt is `PICKUP`. The receipt is then built again by itself about every 15 minutes, and goes out once the next sync of the carrier's list has added that address, so you normally do nothing. If the address never appears, check the pickup point with the carrier.

## If the order is cancelled before the courier collects the parcel

The receipt never reached the customer, so it is **cancelled in myDATA**, and no credit document is issued for it. This happens once the courier's answer is known: the parcel was stopped, or there was none to stop.

- If the courier could not stop the parcel, or did not answer, the goods may be on their way. The receipt then stands, reaches the customer, and any refund is credited as usual.
- If myDATA does not answer, the cancellation is tried again by itself.
- If myDATA had refused the receipt before, a note on the order asks you to correct it and press **Send receipt to myDATA**. Once it is registered it is cancelled in myDATA, with no credit document.
- A receipt that is still waiting to be cancelled more than 15 minutes after the order was cancelled shows on the Dashboard as **Receipts of canceled orders not canceled in myDATA**, and the order's notes say why.

The cancel and the refund never wait for any of this.

### A receipt that myDATA cannot see

Sometimes myDATA does not find the receipt at all with the store's current myDATA credentials. It may be registered, or already cancelled, under other credentials, for example after a change of VAT number or of credentials, or between the test and the real system. Cancelling it again changes nothing, and a credit document could count the same tax document twice, so the platform does not decide for you.

- The receipt is held for you. One note on the order says so, and nothing is done automatically after that. The note reads: "myDATA cannot see receipt … with the store's current myDATA credentials … Check with your accountant whether it was registered or canceled under other credentials, then press "Cancel receipt in myDATA" or "Issue credit documents (myDATA)". It is not settled automatically."
- It stays on the Dashboard as **Receipts of canceled orders not canceled in myDATA**.
- Check with your accountant whether it was registered or cancelled under other credentials. Then on the order press **Cancel receipt in myDATA (issued in error)** once myDATA sees it, or **Issue credit documents (myDATA)** to release it to the normal credit path: the receipt stands, reaches the customer, and its credit document is issued.

## Things to know

- **Turnover** still counts the sale when the parcel leaves, not on the receipt's date. A voucher made in the last days of a month whose parcel leaves in the next one puts the receipt in myDATA's earlier month and the sale in the Turnover report's later one.
- An order no carrier takes keeps the plain receipt, issued when the order ships.
- An order cancelled after its parcel left, or whose goods come back, goes through the refund and credit documents as usual.

## Related

- [Receipts and credit documents](/admin/sales/receipts)
- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Store settings](/admin/settings/store-settings)
- [Dashboard](/admin/getting-started/dashboard)
