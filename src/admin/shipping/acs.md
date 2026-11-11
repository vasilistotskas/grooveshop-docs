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

A shipment waiting for you to check its voucher at ACS (see [A voucher request that got no answer](#a-voucher-request-that-got-no-answer)) is usually in **Pending creation**; a shipment that was retired meanwhile is **Canceled** and stays counted until you close the check. Its **Voucher request outcome unknown since** field on the **Shipment** tab shows the time, and the filter **Needs attention: Voucher request with an unknown outcome** lists such shipments.

A shipment whose voucher request is only waiting because ACS is not answering (see [Voucher requests waiting for ACS](#voucher-requests-waiting-for-acs)) is also **Pending creation**. Its **Voucher request held since** field on the **Shipment** tab shows the time, and the filter **Needs attention: Voucher request held while ACS is failing** lists these shipments.

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
| Shipment page | **No voucher needed: close** | Ends the check for a shipment that was retired, or whose order was canceled or refunded. See the same section. |
| Shipment page | **Record COD received outside ACS** | See "Cash on delivery that never arrived". |
| Page of a voucher hold | **ACS answers again: send one request** | Skips the wait and sends one waiting voucher request now. See [Voucher requests waiting for ACS](#voucher-requests-waiting-for-acs). |
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

If the Dashboard shows **ACS voucher requests are held**, not every order that is **Pending creation** is waiting for ACS. Only the shipments listed by the filter **Needs attention: Voucher request held while ACS is failing** are: do not press the button on those, see [Voucher requests waiting for ACS](#voucher-requests-waiting-for-acs). A pending order that is not in that list, for example one ACS refused, follows the steps above: fix it and press the button.

For a card order that is not paid yet, the button does nothing: the voucher is issued by itself when the payment arrives. If the ACS login details are missing from the [Store profile](/admin/settings/store-profile), no voucher is issued until an Owner or Admin fills them in.

If the button answers that the last voucher request may have reached ACS without an answer, do not press it again: follow the next section. On a canceled shipment, the button refuses while a voucher request for it is still in progress: try again in a few minutes. If that request has been out for too long, the button records the unknown outcome and shows the same guidance instead of saying a voucher is being created: check ACS, then adopt the voucher or request again, or, for a canceled shipment, close the check with **No voucher needed: close**.

### A voucher request that got no answer

Sometimes the request for a voucher is sent to ACS and no answer comes back: ACS takes too long, the connection drops, or ACS reports a server error. ACS may have created the voucher all the same, and sending the request again could create a second voucher for the same parcel. So in this case the shop **stops and asks you**: it sends nothing more for that order, neither by itself nor from **Issue ACS voucher now**, until you decide. When ACS is failing for everyone, the requests that follow the first lost answer wait instead, as described in [Voucher requests waiting for ACS](#voucher-requests-waiting-for-acs). A request that was already out when the trouble began, or a later request sent first that also loses its answer, can still end here: each is its own order to check.

How you are told:

- One email, **ACS voucher request with an unknown outcome**, with the order number. It is sent once for each unknown outcome, not on every attempt. If you request again and that request is also lost, you get a new email.
- A note in the order's history, which names the actions below.
- On the [Dashboard](/admin/getting-started/dashboard), the row **ACS voucher requests to check** in **Needs attention**.
- On the shipment, which is **Pending creation** (or **Canceled**, if it was retired), the field **Voucher request outcome unknown since**. The filter **Needs attention: Voucher request with an unknown outcome** lists these shipments.

What to do:

Look in ACS's portal first, then choose by what you found and by whether the order still needs a voucher. A shipment that was retired, or whose order was canceled or refunded, needs no voucher.

| What you found at ACS | The order still needs a voucher | The order needs no voucher |
|---|---|---|
| A voucher for this order | **Adopt ACS voucher**, with its number. Do not delete it. | **No voucher needed: close**, then delete the voucher you found (see below). |
| No voucher | **No voucher at ACS: request again** | **No voucher needed: close** |

Steps:

1. Open ACS's own portal and look for a voucher of this order. Its reference is the order number.
2. Open the shipment in <span class="sidebar-path">Shipping → ACS Shipments</span>.
3. Click the action from the table. **Adopt ACS voucher** asks for **Voucher number**; the other two ask for **How you checked**, where you write where you looked and what you did at ACS.

What each action does:

| Action | What happens | When it is refused |
|---|---|---|
| **Adopt ACS voucher** | The shipment takes that voucher and becomes **New**. The order gets the voucher number as its tracking number and a note, and moves to **Processing** if it was **Pending**. No new request is sent. | ACS does not hold the voucher for your store. The number already belongs to another shipment. The order no longer needs a voucher. Or ACS's answer does not settle it by itself (see below) and **Confirmed by hand** is empty. The one exception to "ACS must hold the voucher": a number the list shows as our own unused voucher for this shipment that ACS would not delete can be adopted with **Confirmed by hand** even when ACS reports nothing for it. |
| **No voucher at ACS: request again** | The note is kept on the order, and exactly one new request is sent. | The note is empty, or the order no longer needs a voucher. **Be sure first:** if ACS did make a voucher, this creates a second one. |
| **No voucher needed: close** | The check ends, the note is kept on the order, and nothing is sent to ACS. | The note is empty, or the order still needs its voucher (then adopt or request again). |

The three actions work only on a shipment that is waiting for this check; on any other shipment they answer that they cannot be used. A shipment that was retired, or whose order was canceled or refunded, "needs no voucher": it stays counted on the Dashboard until you close it, and **Adopt ACS voucher** and **No voucher at ACS: request again** refuse it. If the slow answer from ACS arrives while you are checking, the shipment takes that voucher by itself and the wait ends.

**When Adopt accepts the number by itself.** Only when ACS reports a recipient that matches the name the lost request sent (accents, capitals and extra spaces are ignored), and no other order that is still waiting was sent to the same recipient. In every other case Adopt refuses and tells you why: ACS names a different or masked recipient, gives no recipient, knows the voucher only from a refused pickup list, or another waiting order has the same recipient so the name cannot tell them apart. Then check in ACS's portal that the voucher is really this order's parcel, click **Adopt ACS voucher** again, and write in **Confirmed by hand** how you confirmed it. That text is kept on the order.

**Delete a voucher only after the check is closed.** A voucher found for an order that still needs one is adopted, never deleted and never answered with a new request. A voucher found for an order that needs none is deleted after you close the check here, in the portal or with **Delete at ACS** in <span class="sidebar-path">Shipping → ACS vouchers matching no order</span>. Do not delete it in the portal while the order is still waiting for the check: the slow answer to the lost request can still arrive and the shipment would save a voucher number that no longer exists.

What the shop does today with that slow answer once you have resolved the check: it does not save it. It deletes the voucher at ACS itself. If ACS refuses to delete it, the voucher appears at once in the list above (**Found by**: **Our own unused voucher that ACS would not delete**), and you delete it from there; a voucher you had only marked as checked is reopened then. The same holds if you requested again and that new request is also lost: the check stays open for the new request, and an answer to the earlier request that arrives then is not saved either. It is deleted at ACS, or shown in the list as our own unused voucher if ACS refuses. The shop does not offer that earlier voucher for adoption; the voucher to look for is the new request's. If you find the earlier voucher at ACS and adopt it anyway, and it is on the list as our own unused voucher for this shipment, adopting it works with **Confirmed by hand** filled in, even when ACS reports nothing for it. Do not delete a voucher at ACS to make room for a new request.

One more case. If a voucher request that was sent before you resolved the check ends without an answer afterwards, ACS may hold one more voucher for the order that nothing records, because there is no number to list. You get one note in the order's history and one email saying so, once for that request. It is not counted on the Dashboard. **Do not delete anything at ACS yet.** After you requested again, the new request may still be in progress, and its voucher can already be visible at ACS before the shipment shows it: deleting it would leave the shipment with a number that no longer exists. First wait until the order's shipment shows its voucher number, or shows the check again (**Voucher request outcome unknown since**). With the default settings a request takes at most about 78 seconds, and the shop treats one with no result after 5 minutes (300 seconds) as lost, recording the check the next time it works on the order. Then delete only a voucher at ACS whose number is **different** from the one on the shipment. If the shipment shows the check again, decide by the table above.

### Voucher requests waiting for ACS

When ACS stops answering, the first voucher request that loses its answer is handled as in the previous section: you check that one order at ACS's portal. Everything that comes after it would end the same way, so the shop stops sending. The voucher requests of the following orders **wait**: nothing is sent to ACS for them, and they are not marked as needing a check. Nothing is wrong with those orders. ACS was not answering.

How you see it:

- On the [Dashboard](/admin/getting-started/dashboard), in **Needs attention**, the row **ACS voucher requests are held**: "Since (time), because ACS is failing. They are sent when it answers again". It opens the list <span class="sidebar-path">Shipping → ACS voucher holds</span>, filtered to the hold that is in force.
- In that list, one row for each time requests waited, with **Held since**, **Ended at**, **State**, **Failed first requests**, **Last lost answer at** and **ACS failure** (the last failure as ACS or the network reported it). The filter **In force** (**In force** / **Ended**) separates the current one from past ones. These rows are only a record: you cannot add or delete them.
- On each waiting order's shipment, which stays **Pending creation**, the field **Voucher request held since**. The filter **Needs attention: Voucher request held while ACS is failing** in <span class="sidebar-path">Shipping → ACS Shipments</span> lists them. No email is sent and no note is written on the order.

The **State** of a hold says where it is:

| State | Meaning |
|---|---|
| **Held: nothing is sent** | ACS is being given time. The page shows **ACS is asked again after** (the time). |
| **One request first** | One waiting request is allowed to go, to find out whether ACS issues vouchers again. The rest wait for its result. |
| **No request waits: the next one goes alone** | Nothing is left to send (for example, the orders were canceled). The hold is still in force, so the next order's request goes alone, and its voucher ends the hold. Nothing is asked of you, so the Dashboard row is not shown. |
| **Ended: ACS answered** | ACS issued a voucher again. Requests are sent as usual. |

#### What happens by itself

1. The wait before ACS is asked again starts at 5 minutes after the last lost answer. Each time the request sent first loses its answer too, the wait doubles, up to one hour (5, 10, 20, 40, then 60 minutes).
2. A check runs every 5 minutes. When the wait is over, it asks ACS a simple question that changes nothing (today's pickup lists). If ACS answers, **one** waiting request is sent first. If it does not, nothing is sent and the wait goes on.
3. When ACS **returns a voucher** for that request, the hold ends. The orders that waited are then issued by the same check, a batch of at most 100 every 5 minutes. They need nothing from you, and each gets its voucher as usual.
4. An order that is canceled while it waits is never sent.

#### The one action: ACS answers again

If you know ACS is working again and do not want to wait, open the current hold in <span class="sidebar-path">Shipping → ACS voucher holds</span> and click **ACS answers again: send one request**. The dialog **Send one voucher request to ACS now** asks you to confirm. It skips the wait and the question to ACS, not the rule that only one request goes first. You see it only if you may edit; a press that changes something is written in the admin's history. A repeat press changes nothing and writes nothing.

- The message **One held voucher request is being sent to ACS. The others follow once ACS answers it.** means one request is now allowed to go first and the check that sends it was started. It does not prove the request was sent: the check sends nothing for a store whose ACS login details are missing from the [Store profile](/admin/settings/store-profile). Watch the **State** of the hold and the shipment's **Voucher request held since** field.
- A second press while that request is already allowed says **One voucher request was already allowed to go first. Nothing more was sent.** and changes nothing.
- **This hold is no longer in force.** means ACS answered in the meantime.

If the answer to that first request is lost too, that one order moves to **ACS voucher requests to check** (previous section) and you get its one email. The hold closes again, the wait doubles, and the other orders keep waiting.

#### What the first request can end with

| What happens to the first request | The order | The hold |
|---|---|---|
| ACS returns a voucher | Gets its voucher. | Ends. The others follow. |
| ACS refuses the order, for example a bad address | Rejected as always: you get the email and fix it, then click **Issue ACS voucher now** on it. | Stays at **One request first**. The next waiting order goes at the next check, 5 minutes later. |
| The answer is lost | Needs a check, as in the previous section. | Closes again, the wait doubles. |
| It never reached ACS, or something other than ACS answered (for example a gateway error) | Stays waiting. | A request that never reached ACS leaves the hold at **One request first**, and the next goes at the next check. An answer that did not come from ACS closes it again. |

One refused order never holds up the others. A hold that sits at **One request first** for a long time means the requests are not getting an answer from ACS: a connection that never gets through, or ACS rejecting the login (the waiting orders stay waiting and another is tried at each check), or ACS refusing one order after another (each refused order leaves the waiting list with its own email). Check that the ACS login details in the [Store profile](/admin/settings/store-profile) are filled in and [tell the platform team](/admin/help/contact-support).

#### What not to do

**Do not click Issue ACS voucher now on each waiting order.** It does not make them go faster. While the hold is closed it sends nothing: the shop answers that ACS voucher requests are held since (time) and that the order is sent automatically once ACS answers again. While one request is allowed, only one goes, whichever order you click. The waiting orders need no action.

Do not use **Adopt ACS voucher**, **No voucher at ACS: request again** or **No voucher needed: close** on a waiting order either. They are for orders that need a check: a waiting order has not been sent, so there is nothing to look for in ACS's portal. If the request sent first loses its answer, that order moves to the check described above.

#### Waiting, or needs a check?

| | Waiting for ACS | Needs a check |
|---|---|---|
| Did the request reach ACS? | No, except the one request sent first, while it is out. | Maybe: ACS may hold a voucher. |
| Dashboard row | **ACS voucher requests are held** (one row for all) | **ACS voucher requests to check** (one count for the orders) |
| Shipment field | **Voucher request held since** | **Voucher request outcome unknown since** |
| Email and order note | None. | One email and a note. |
| What you do | Nothing. Wait, or use **ACS answers again: send one request**. | Look in ACS's portal and choose, as in the previous section. |

### Vouchers that match no order

<span class="sidebar-path">Shipping → ACS vouchers matching no order</span>

When ACS refuses a pickup list, it names the unprinted vouchers it holds for your account. Any that belong to none of your shipments are no longer ignored: each is kept here, and you get one email, **ACS vouchers matching no order**, the first time ACS names it. The row **ACS vouchers matching no order** on the [Dashboard](/admin/getting-started/dashboard) counts those you have not dealt with. The list has the filters **Resolution** (**Not resolved** / **Resolved**) and **Found by**: a voucher is either named by ACS on a refused pickup list, or is our own unused voucher that ACS would not delete.

Such a voucher can be the lost answer of a request (see above), a second voucher for an order that already has one, or a voucher you made yourself in ACS's portal. The shop cannot tell which, so it deletes nothing by itself. While it stays unprinted at ACS, it keeps the pickup list refused. Open the voucher and choose:

- **Adopt it:** if it belongs to an order waiting for a check, adopt it from that order's shipment, as above. The voucher is then marked **Adopted by a shipment**.
- **Delete at ACS:** deletes the voucher at ACS and marks it deleted, keeping your note. It cannot be undone. A duplicate that the shop's own request deleted at ACS is closed by itself. Only Owners and Admins can use it, because Staff cannot delete (see [Roles & team](/admin/getting-started/roles-and-team)).
- **Mark as checked:** for a voucher you know, for example one you made in the ACS portal. Write in the note what it is. It stops being counted and nothing is sent to ACS.

**Delete at ACS** is refused:

- while a voucher request is in progress, because the voucher may be its answer. Try again in a few minutes;
- while an order that still needs a voucher is waiting for you to check its voucher request. The voucher may be that order's, and a deleted voucher can no longer be adopted, so the shop makes you resolve that order first. The message names the order. An order that no longer needs a voucher does not hold the delete back;
- when a shipment already holds the voucher: cancel it from that shipment instead;
- when ACS refuses, for example because the voucher is already on a pickup list;
- when the voucher is already resolved.

Both actions ask for a note, and both keep it on the voucher.

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
- **When ACS keeps failing,** the voucher requests wait and are sent by themselves once ACS answers again: see [Voucher requests waiting for ACS](#voucher-requests-waiting-for-acs).
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
