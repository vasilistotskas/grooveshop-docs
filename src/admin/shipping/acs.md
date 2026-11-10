---
title: ACS Courier
description: Shipping with ACS, from the voucher and the printed label to the pickup list, parcel tracking, cash on delivery and Smartpoints.
---

# ACS Courier

Every order that ships with ACS has one shipment here. The voucher (the ACS shipping label, carrying the parcel number) is issued automatically. You print the label and hand the parcel over. The order of the day is in the [Daily shipping routine](/admin/shipping/daily-routine).

<span class="sidebar-path">Shipping → ACS Shipments</span>

The screen appears only while ACS is active under [Shipping providers](/admin/settings/shipping-providers). Issued pickup lists, cash-on-delivery payouts and the detailed ACS history are visible to the platform team only. If you need something from there, [send them](/admin/help/contact-support) the voucher number.

## What you see

| Column | Meaning |
|---|---|
| **Voucher number** | The 10-digit ACS number. Empty until the voucher is issued. |
| **Order** | Link to the order. |
| **State** | Where the parcel is (table below). |
| **Delivery kind** | Home delivery or a Smartpoint. |
| **Pickup list** | The day's list that holds the voucher. Often empty, and that is normal. |
| **Label printed at** | When the label was first printed from here. Empty means not printed. |
| **Last polled at** | When ACS was last asked about the parcel. |

Filters: **Shipment state**, **Delivery kind**, **Label** (**Printed** / **Not printed**), **Needs attention** and **Created At**. Search finds a voucher number, an order number or a customer email.

A shipment waiting for you to check its voucher at ACS (see [A voucher request that got no answer](#a-voucher-request-that-got-no-answer)) stays in **Pending creation**. Its **Voucher request outcome unknown since** field on the **Shipment** tab shows the time, and the filter **Needs attention: Voucher request with an unknown outcome** lists such shipments.

The parcel states:

| State | Meaning | The order becomes |
|---|---|---|
| **Pending creation** | No voucher issued yet. | (unchanged) |
| **New** | The voucher is issued, the parcel is still with you. | **Processing** |
| **In transit** | ACS has collected the parcel. | **Shipped** |
| **At destination station** | The parcel reached the ACS shop that will deliver it. | **Shipped** |
| **Out for delivery** | The parcel is on the courier's van. The customer gets one email. | **Shipped** |
| **Delivery attempted** | ACS could not deliver and gave a reason. The parcel may wait at the ACS shop. Call the customer. | **Shipped** |
| **Delivered** | The customer received it. | **Delivered**, then **Completed** once paid |
| **Returned** | The parcel came back to you. | **Returned** |
| **Canceled** | The voucher was cancelled. | **Canceled** |

The last three are final: the parcel's state no longer changes. A parcel that is only waiting for the customer at a Smartpoint keeps its previous state, usually **In transit**.

A shipment's page has the tabs **Shipment**, **Destination**, **Parcel & COD**, **Tracking** and **Diagnostics**, plus one listing every checkpoint of the parcel. The same shipment is shown on the order, in the **ACS Shipment** tab.

The buttons:

| Where | Button | What it does |
|---|---|---|
| Above the list | **Issue ACS pickup list now** | Issues the day's pickup list without waiting for 16:30. |
| On each row | **Re-poll ACS tracking** | Asks ACS for a fresh update on the parcel. |
| On each row | **Issue ACS voucher now** | Asks for the voucher again, after you fix the details. On a cancelled shipment it issues a new one. |
| Bulk action | **Print labels for selected shipments** | Downloads one PDF with every selected label, in order-number order. |
| Bulk action | **Re-poll tracking for selected shipments** | Asks for a fresh update on each selected parcel. |
| Bulk action | **Retire selected shipments (mark CANCELED, stop polling)** | Marks the shipments cancelled here only, so the checks and alerts stop. It does not tell ACS and does not change the order. |
| Shipment page | **Adopt ACS voucher** | Gives the shipment a voucher you found in ACS's portal. See [A voucher request that got no answer](#a-voucher-request-that-got-no-answer). |
| Shipment page | **No voucher at ACS: request again** | Asks ACS for one new voucher, when the portal shows none for the order. See the same section. |
| Shipment page | **Record COD received outside ACS** | See "Cash on delivery that never arrived". |
| Shipment page | **Cancel ACS voucher** | Cancels only the voucher at ACS, with a reason; the order stays as it is. |

## Tasks

### Print the labels

1. Filter **Label: Not printed**.
2. Select every row and run **Print labels for selected shipments**.
3. Print the PDF on the thermal printer and stick each label on its parcel.

For a single parcel, click **Download shipping voucher (PDF)** on the order, in <span class="sidebar-path">Sales → Orders</span>. If a label cannot be downloaded, the screen names its order, and the others print as normal.

ACS collects a parcel once its label is printed. A label you miss is a parcel that does not leave.

### Issue the pickup list

The pickup list is the record of the day's parcels at ACS. It is issued automatically Monday to Friday at 16:30.

- **If ACS refuses it, it usually does not matter.** ACS refuses the whole list while even one voucher is unprinted. Parcels with a printed label are collected as normal. The refusal is written as a note in the orders' history, with no email.
- **To issue it yourself:** print any missing labels first, then click **Issue ACS pickup list now** and read the message. If ACS refuses, the message gives its reason.
- **A day with no new parcels:** the message says no vouchers are waiting. That is not an error.
- A voucher already on a list can no longer be cancelled from here.
- **A refusal can also name vouchers that belong to none of your orders.** They are kept in a list for you to check: see [Vouchers that match no order](#vouchers-that-match-no-order).

### A voucher that was not issued

The voucher is issued a few seconds after the order. For card payments, as soon as the payment is confirmed. If a shipment stays **Pending creation**:

1. Read the email you received about the failure, or the note in the order's history. It says what ACS rejected: usually the address, postcode, phone or Smartpoint.
2. Fix it on the order, in the **Shipping Address** tab.
3. Come back here and click **Issue ACS voucher now** on the row.

For a card order that is not paid yet, the button does nothing: the voucher is issued by itself when the payment arrives. If the ACS login details are missing from the [Store profile](/admin/settings/store-profile), no voucher is issued until an Owner or Admin fills them in.

If the button answers that the last voucher request may have reached ACS without an answer, do not press it again: follow the next section.

### A voucher request that got no answer

Sometimes the request for a voucher is sent to ACS and no answer comes back: ACS takes too long, the connection drops, or ACS reports a server error. ACS may have created the voucher all the same, and sending the request again could create a second voucher for the same parcel. So in this case the shop **stops and asks you**: it sends nothing more for that order, neither by itself nor from **Issue ACS voucher now**, until you decide.

How you are told:

- One email, **ACS voucher request with an unknown outcome**, with the order number. It is sent once, not on every attempt.
- A note in the order's history, which names the two actions below.
- On the [Dashboard](/admin/getting-started/dashboard), the row **ACS voucher requests to check** in **Needs attention**.
- On the shipment, which stays **Pending creation**, the field **Voucher request outcome unknown since**. The filter **Needs attention: Voucher request with an unknown outcome** lists these shipments.

What to do:

1. Open ACS's own portal and look for a voucher of this order. Its reference is the order number.
2. Open the shipment in <span class="sidebar-path">Shipping → ACS Shipments</span>.
3. If the portal has a voucher for the order, click **Adopt ACS voucher** and enter its number in **Voucher number**.
4. If the portal has none, click **No voucher at ACS: request again** and write in **How you checked** where you looked.

What each action does:

| Action | What happens | When it is refused |
|---|---|---|
| **Adopt ACS voucher** | The shipment takes that voucher and becomes **New**. The order gets the voucher number as its tracking number and a note, and moves to **Processing** if it was **Pending**. No new request is sent. | The number already belongs to another shipment. ACS does not confirm the voucher. ACS names a different recipient than the order's (accents, capitals and extra spaces are ignored in the comparison). Or ACS gives no recipient for it and the number is not on the list of [vouchers that match no order](#vouchers-that-match-no-order) either. |
| **No voucher at ACS: request again** | The note is kept on the order, and exactly one new request is sent. | The note is empty. **Be sure first:** if ACS did make a voucher, this creates a second one. |

Both actions work only on a shipment that is waiting for this check; on any other shipment they answer that they cannot be used. If the slow answer from ACS arrives while you are checking, the shipment takes that voucher by itself and the wait ends.

### Vouchers that match no order

<span class="sidebar-path">Shipping → ACS vouchers matching no order</span>

When ACS refuses a pickup list, it names the unprinted vouchers it holds for your account. Any that belong to none of your shipments are no longer ignored: each is kept here, and you get one email, **ACS vouchers matching no order**, the first time ACS names it. The row **ACS vouchers matching no order** on the [Dashboard](/admin/getting-started/dashboard) counts those you have not dealt with. The list has the filter **Resolution** (**Not resolved** / **Resolved**).

Such a voucher can be the lost answer of a request (see above), a second voucher for an order that already has one, or a voucher you made yourself in ACS's portal. The shop cannot tell which, so it deletes nothing by itself. While it stays unprinted at ACS, it keeps the pickup list refused. Open the voucher and choose:

- **Adopt it:** if it belongs to an order waiting for a check, adopt it from that order's shipment, as above. The voucher is then marked **Adopted by a shipment**.
- **Delete at ACS:** deletes the voucher at ACS and marks it deleted. It cannot be undone.
- **Mark as checked:** for a voucher you know, for example one you made in the ACS portal. Write in the note what it is. It stops being counted and nothing is sent to ACS.

**Delete at ACS** is refused:

- while any order is waiting for you to check its voucher request. The voucher may be that order's, and a deleted voucher can no longer be adopted, so the shop makes you resolve the waiting order first. The message names the order;
- while a voucher request is in progress, because the voucher may be its answer. Try again in a few minutes;
- when a shipment already holds the voucher: cancel it from that shipment instead;
- when ACS refuses, for example because the voucher is already on a pickup list;
- when the voucher is already resolved.

Both actions ask for a note; only **Mark as checked** keeps it, on the voucher.

### Cancel a voucher

- When you cancel the order, the platform asks ACS to cancel the voucher too, if that is still allowed.
- To replace a voucher without cancelling the order, for example after correcting the address, open the shipment, click **Cancel ACS voucher**, give the reason, then click **Issue ACS voucher now** for a new one.
- A voucher that is already on an issued pickup list is refused by ACS. Contact ACS.
- A customer can cancel the order from their account only until the voucher is on a pickup list.

### A parcel that is not moving

Every morning at 09:00 you receive an email about parcels with no movement for three days, and about shipments left without a voucher for more than a day. The [Dashboard](/admin/getting-started/dashboard) counts the same parcels, and the filter **Needs attention: Stale: no tracking movement or never created** lists them.

1. Look the voucher number up with ACS.
2. If the parcel is moving normally, click **Re-poll ACS tracking**.
3. If the parcel was never handed to ACS and never will be, select the row and run **Retire selected shipments (mark CANCELED, stop polling)**. Cancel the order separately if needed.

You can have the email [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store). The Dashboard and the filter keep showing the parcels.

### When cash on delivery gets paid

The ACS contract is cash on delivery only, so every voucher goes out as cash on delivery. On orders paid by card or bank transfer the amount to collect is €0.00 and the courier collects nothing.

1. The customer pays the courier. The order becomes **Delivered**, and its payment stays pending.
2. ACS pays the money out to you a few days later.
3. Every night the platform fetches the previous day's payouts from ACS. As soon as it finds a parcel's payout, the order becomes paid and **Completed**.

### Cash on delivery that never arrived

If a cash-on-delivery parcel was delivered more than ten days ago and ACS has not paid the money out, you receive an email. The filter **Needs attention: Delivered COD never paid out by ACS** lists the same parcels.

1. Give ACS the voucher numbers and ask when they will pay.
2. If you were paid another way, for example by bank transfer, open the shipment and click **Record COD received outside ACS**. Write in the note how the money came. The order becomes paid and the alert stops.

If you receive an email that ACS paid money matching none of your parcels (usually a voucher you made in the ACS program), [send the voucher number](/admin/help/contact-support) to the platform team. The two alerts can be [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store). The Dashboard keeps counting them.

### Smartpoint lockers

<span class="sidebar-path">Shipping → Pickup Points → ACS Stations</span>

The list of ACS shops and Smartpoints refreshes by itself every night at 03:00, for the countries that have an active ACS rate. There is no button to refresh it now. Customers are offered only **Smartpoint (no locker)** and **Smartpoint locker**, never plain shops. A point that ACS removes becomes inactive; it is not deleted. How to open Smartpoints at checkout is in [Shipping providers](/admin/settings/shipping-providers).

At checkout the customer chooses a Smartpoint on a map that starts near the postcode of their address. They can search by area, street or postcode, or type their own address (for example «Καλαμά 25 Αθήνα») to see the points nearest it, in Greek or Latin letters, or tap **My location** (on a phone, the target icon beside the search box) to see the points nearest to them. The browser asks for their location only when they tap it. A customer who has already allowed your store to use their location sees the map open on it straight away.

When BoxNow is switched off, the menu shows **ACS Stations** directly under **Shipping**.

## Things to know

- **ACS sometimes rejects a request.** The platform retries by itself, as long as the request never reached ACS. A request that may have reached it without an answer is never sent again by itself: see [A voucher request that got no answer](#a-voucher-request-that-got-no-answer). If the problem stays, tell the platform team.
- **A wrong address or Smartpoint** is not retried. You receive an email at once and a note is written on the order. The email can be [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store); the note is always written.
- **One voucher, one parcel.** The platform sends every order as one parcel. The fields on the **Parcel & COD** tab are read only when the voucher is issued. If you change them later, ACS does not find out.
- **Weight:** ACS charges at least 0.5 kg per parcel.
- **The customer's note** from checkout is printed in the voucher's remarks.
- **The "out for delivery" email** goes out once per parcel, even when ACS moves the state back and forth.
- **The label is laid out for a thermal printer**, one per page. For a laser printer (four on an A4 page), ask the platform team for the change.

## Related

- [Daily shipping routine](/admin/shipping/daily-routine)
- [Shipping providers](/admin/settings/shipping-providers)
- [Orders](/admin/sales/orders)
- [When to contact support](/admin/help/contact-support)
