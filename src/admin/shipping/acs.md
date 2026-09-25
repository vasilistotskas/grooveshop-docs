---
title: ACS Courier
description: Operating ACS shipments end to end, from voucher creation and thermal label printing to the daily pickup list, tracking, cash-on-delivery payouts and Smartpoint stations.
---

# ACS Courier

<span class="sidebar-path">Shipping → ACS Shipments</span>

Every order shipped with ACS has one ACS shipment record. The record is created at checkout, receives its voucher from ACS a few seconds later, is printed and collected, and is then tracked by polling ACS every fifteen minutes until it reaches a final state. Store staff work mostly from this list and from the order page. Superusers also see the pickup lists, the cash-on-delivery payouts and the raw tracking events under <span class="sidebar-path">System</span>.

## The lifecycle at a glance

```mermaid
flowchart LR
  A[Order placed] --> B[Pending creation]
  B -->|voucher issued| C[New]
  C -->|print label| D[Label printed]
  D -->|pickup list 16:30| E[On pickup list]
  E -->|poll| F[In transit / At destination / Out for delivery]
  F --> G[Delivered]
  F --> H[Returned / Lost]
  C --> I[Canceled]
  G -->|COD payout reconcile| J[Order paid and completed]
```

What the platform does automatically:

1. **At checkout** the shipment row is created in state **Pending creation** with the delivery kind, the chosen Smartpoint (if any), the parcel weight from the cart, one parcel, and the charge type.
2. **The voucher** is requested in the background: straight away for cash on delivery, bank transfer and orders paid entirely with a gift card, and only after the payment succeeds for card orders. On success the row gets its **Voucher number**, moves to **New**, the order's tracking number is set and the order moves from Pending to Processing.
3. **Printing** the label records **Label printed at** on the row.
4. **The pickup list** (manifest) is issued Monday to Friday at 16:30 Athens time, or on demand with the button on this page. ACS does not collect parcels that are not on a pickup list.
5. **Tracking** is polled every fifteen minutes for every non-final shipment. The shipment state follows ACS, and the order status follows the shipment state.
6. **Cash on delivery** is settled days later: a nightly job pulls ACS's payout report and marks the matching orders paid.

## What you see

Columns of the list:

| Column | Meaning |
|---|---|
| **Voucher number** | The 10-digit ACS voucher. Empty while the shipment is Pending creation. |
| **Order** | Link to the order. |
| **State** | See the state table below. |
| **Delivery kind** | Home delivery or Pickup point / locker. |
| **Pickup list** | The manifest the voucher was issued on. Empty until the daily list runs. |
| **Label printed at** | When the label was **first** downloaded through the platform. Later downloads do not change it. Empty means ACS will reject the pickup list. |
| **Last polled at** | When tracking was last refreshed. |

Filters: **Shipment state**, **Delivery kind**, **Label printed at** (empty or not), **Created at** range. The search box matches the voucher number, the order number and the customer email.

Shipment states:

| State | Meaning | Order status it sets |
|---|---|---|
| Pending creation | Row exists, no voucher yet. | none |
| New | Voucher issued, parcel still with you. | none (already Processing) |
| In transit | ACS has loaded the parcel. | Shipped |
| At destination station | Parcel reached the delivery branch. | Shipped |
| Out for delivery | On the courier's vehicle. The customer is emailed once. | Shipped |
| Delivery attempted | ACS could not deliver and recorded why: the customer was absent, the address was wrong, or the parcel is waiting at the branch or a Smartpoint for the customer to collect. ACS texts the customer and holds the parcel for about ten days, then returns it to you. Call the customer while it is held. | Shipped |
| Delivered | Signed for. | Delivered, then Completed if the order is paid |
| Returned | Returned to sender. | Returned |
| Canceled | Voucher cancelled at ACS or retired locally. | Canceled |
| Lost | Declared lost. | Returned |

Delivered, Returned, Canceled and Lost are final: a later noisy poll can never move the shipment out of them.

The shipment page shows the voucher and tracking fields read-only, the destination (delivery kind, station), the parcel (weight in grams, item quantity, charge type, COD amount, COD payment way, delivery products) and a tab with every tracking event: **Event time**, **Checkpoint action**, **Checkpoint location**, **Notes**, **Received at**. The same shipment is shown as an **ACS Shipment** tab on the order page in <span class="sidebar-path">Sales → Orders</span>.

Buttons on this page:

| Where | Button | What it does |
|---|---|---|
| Top of the list | **Issue ACS pickup list now** | Runs the daily manifest immediately for today's vouchers. |
| Each row | **Re-poll ACS tracking** | Queues one tracking refresh for that shipment. |
| Each row | **Issue ACS voucher now** | Queues voucher creation. On a Canceled shipment it first clears the old voucher so a fresh one can be issued. |
| Bulk action | **Print labels for selected shipments** | Downloads one PDF holding every selected label, in order-number order. Pair it with the **Label printed at: empty** filter to clear everything outstanding in a single print job. |
| Bulk action | **Re-poll tracking for selected shipments** | Queues one refresh per selected row. |
| Bulk action | **Retire selected shipments (mark CANCELED, stop polling)** | Local bookkeeping only. Marks the rows Canceled so tracking checks and the stale alert stop. Does not call ACS and does not change the order. Rows already in a final state are skipped. |

## Tasks

### Create a voucher for an order

Nothing to do in the normal case: the voucher is minted automatically. If an order shows **Pending creation** for more than a minute:

1. Open the order in <span class="sidebar-path">Sales → Orders</span> and check the email you received about the failed voucher, or the **Metadata** section of the shipment, where the last ACS error and the request that failed are stored.
2. Fix the cause on the order. Checkout now requires a postcode in the country's format, a street that contains a letter, and a street number that is not a postcode, so a mistyped address rarely reaches ACS; the platform strips the space in a postcode such as "703 00" before sending. Orders placed before that check can still carry a bad address: correct it in the order's **Shipping Address** section, where the same check applies. ACS also rejects a phone number that is not a plain 10-digit Greek number, an address it cannot place, and a Smartpoint it does not recognise.
3. Back on <span class="sidebar-path">Shipping → ACS Shipments</span>, click **Issue ACS voucher now** on the row.

A missing ACS credential is a different failure. Nothing is retried, because credentials do not appear on their own; the store's admins are emailed at once and the order waits. Tell the platform team.

### Print the voucher

One parcel at a time, the voucher is printed from the **order**:

1. In <span class="sidebar-path">Sales → Orders</span>, click **Download shipping voucher (PDF)** on the order row or at the top of the order page.
2. Print the PDF on the thermal roll printer. The layout is the thermal one (one voucher per page) unless the ACS provider's metadata sets `print_type` to `2` for laser, four per A4. See [Shipping providers](/admin/shipping/providers).
3. **Label printed at** is now set. Print every voucher before 16:30; ACS refuses the whole day's pickup list if even one voucher on it is unprinted.

**Printing everything outstanding at once.** On <span class="sidebar-path">Shipping → ACS Shipments</span>, filter by **Label printed at: empty**, tick the rows and choose the bulk action **Print labels for selected shipments**. ACS has no bulk print of its own, so the platform fetches each label and merges them into a single PDF ordered by order number: one file, one job on the thermal roll, instead of opening one order page per parcel. The single voucher you miss holds back every other parcel that day, so prefer this over working through them by hand.

Downloading the merged file sets **Label printed at** by exactly the same route as the per-order button, so the 15:45 warning and the 16:30 pickup list see the same truth either way.

If a voucher cannot be fetched — none has been minted yet, or ACS refuses that one — it is named on screen with its order number and **the others still print**. Only when every selected voucher fails is there no download at all: you get the error messages instead of an empty PDF, which would look like a successful print of nothing.

A label printed from ACS's own portal is not visible to the platform, so the column stays empty in that case. Nothing blocks on the column; it is a pre-flight check.

### Issue the pickup list

Automatic on working days at 16:30. You get a warning email at 15:45 listing vouchers that still have no printed label.

To issue earlier, or again after fixing a rejection:

1. Filter the list by **Label printed at: empty**, select every row shown, run **Print labels for selected shipments** and print the PDF it downloads.
2. Click **Issue ACS pickup list now**.
3. Read the message. "Pickup list … issued for N voucher(s)" is success. "ACS did not issue the pickup list: …" quotes ACS's own reason, usually naming the unprinted vouchers. "No vouchers are waiting for a pickup list" means there was nothing for ACS to collect: either every voucher already belongs to a list, or the only ones left are vouchers ACS will never collect — see "An empty day is not a failure" below.

If the 16:30 run is rejected because a label is missing, the store's admins get a second email, **"ACS pickup list NOT issued — N voucher(s) need printing"**. It names the same vouchers and orders as the 15:45 warning and quotes ACS's reply. Either email has the same fix, and it takes a minute: on <span class="sidebar-path">Shipping → ACS Shipments</span> select the rows it names, run **Print labels for selected shipments**, print the one PDF that downloads, then click **Issue ACS pickup list now**. The day is not lost until the courier leaves. Those two are the only emails the pickup list ever sends you; anything else that goes wrong is recorded for the platform team, not mailed to you.

**An empty day is not a failure.** ACS builds each list for one pickup date and chooses the vouchers itself, so on a day with no new parcels it correctly answers that there is nothing eligible. When the only vouchers still waiting are ones ACS has never scanned — typically a parcel that was never actually handed over — the run ends quietly with no list and no email, and the button reports "No vouchers are waiting for a pickup list". Those rows are reported by the 09:00 stale-shipment email instead, and retiring them is what clears them.

Why it matters:

- ACS collects only vouchers that are on an issued pickup list. Handing a parcel to the driver without one does not get it collected.
- A voucher on a list can no longer be cancelled through the platform and can no longer be reprinted through ACS.
- **A missed list is not caught up later.** ACS builds each list for one pickup date only. A voucher that missed the list for its own day stays unlisted: tomorrow's list covers tomorrow's vouchers, not yesterday's. The **Pickup list** column stays empty on those rows, which is how you find them. Ask ACS to collect them against their voucher numbers.

Issued lists are visible to superusers at <span class="sidebar-path">System → Reconciliation → ACS Pickup Lists</span> with the **Pickup list number**, **Issued at**, **Voucher count** and **Issued by** (empty when the 16:30 run issued it). Search matches the pickup list number. The rows are read-only, and there is no button here to reprint the manifest as a PDF: print it from the ACS portal if the driver asks for it. See [Reconciliation](/admin/system/reconciliation).

### Cancel a voucher

- Cancelling the order in <span class="sidebar-path">Sales → Orders</span> also asks ACS to delete the voucher, when it is still allowed. See [Orders](/admin/sales/orders).
- ACS refuses to delete a voucher that is already on a pickup list. Contact ACS for a manual return instead.
- A cancelled voucher can be reissued: click **Issue ACS voucher now** on the Canceled row. The old voucher number is kept in the row's metadata history.

### Deal with a shipment that stopped moving

A daily check at 09:00 emails the store's own admins about shipments with no tracking movement for three days, and about rows stuck in Pending creation for more than a day. Each shipment is reported once; a new tracking event re-arms the alert. The alert does not stop the polling: only marking the row final does that.

This email is also the only place a voucher ACS never collected is reported. Until you retire it, it stays on the list of vouchers offered to ACS every working day — and on a day with no other parcels it is why the pickup list comes back empty.

1. Search the voucher on the ACS portal or call ACS.
2. If the parcel was never handed over and never will be, select the row and run **Retire selected shipments**. The order is not changed; cancel it separately if needed.
3. If the parcel is genuinely moving, click **Re-poll ACS tracking**.

### Cash on delivery

The store's ACS contract is cash on delivery only. ACS refuses a prepaid voucher outright, so **Charge type** is not really a choice: every voucher goes out as Cash on delivery. The **COD amount** is the order's paid amount for orders whose payment method is courier cash, and 0,00 for orders paid online or by bank transfer, so the courier collects nothing on those. The payment way is sent only when there is an amount to collect, so the driver is never told to collect zero.

How a COD order gets paid:

1. The customer pays the courier. The shipment reaches Delivered, the order becomes Delivered, and its payment status stays Pending.
2. ACS remits the collected cash to the store some days later. A measured remittance lag is about four days.
3. Every night at 02:30 the platform pulls yesterday's payouts from ACS and stores one row per voucher and payout date in <span class="sidebar-path">System → Reconciliation → ACS COD Payouts</span>.
4. Each payout matched to a shipment flips the order's payment status to Completed and the order to Completed. Customers are not emailed for this step; they were already notified at delivery.

The payouts screen (superusers) shows **Voucher number**, **Parcel delivery date**, **COD amount total**, **COD payment date**, **Shipment** and **Customer reference 1** (the order number sent to ACS). Filters: **COD payment date** and **Parcel delivery date** ranges. Search matches the voucher, both customer references and the receiver name. Rows are read-only. The row button **Run COD reconciliation now** re-runs the nightly pull for yesterday's date; it is safe to press twice, as a payout already recorded is simply updated in place.

Alerts you may receive:

| Email subject | Meaning | What to do |
|---|---|---|
| "ACS COD reconcile: N unattributable payout row(s)" | ACS paid out money for a voucher the platform does not know, typically one created by hand in the ACS portal. The row is stored; it is not attributed. | Reconcile it as an off-platform sale against ACS's beneficiary report. |
| "ACS COD: N delivered parcel(s) never remitted" | Delivered COD parcels older than ten days with no payout row. | Give ACS the voucher numbers and ask for the remittance status. If ACS paid on a date the nightly pull never queried, the platform team can replay that date. |

See [Reconciliation](/admin/system/reconciliation) for the finance view.

### Smartpoint stations

<span class="sidebar-path">Shipping → ACS Stations</span> is a local copy of ACS shops and Smartpoint lockers, refreshed daily at 03:00. Columns: **External ID** (the area station code), **Name**, **Shop kind**, **City**, **Postal code**, **Country code**, **Is active**. Filters: **Shop kind**, **Country code**, **Is active**. Search matches ID, name, city and postcode. **Last synced at** is read-only. There is no sync button on this screen; the nightly refresh is the only way the list changes.

Notes:

- A locker's identity is the pair of **External ID** and branch code. Many lockers share one area code.
- Only kinds **Smartpoint (no locker)** and **Smartpoint locker** are offered to customers as pickup points. Kind **Shop** rows are kept fresh but not shown.
- Smartpoint lockers cap at 6 kg per parcel.
- The picker appears in checkout only when the ACS row has **Supports Pickup Point** on and the setting **ACS_SMARTPOINT_ENABLED** is on. See [Shipping providers](/admin/shipping/providers).
- A station that disappears from ACS's list is marked inactive, not deleted. Shipments keep the station code they were created with.

### Tracking events

<span class="sidebar-path">System → Audit & Logs → ACS Tracking Events</span> (superusers) lists every checkpoint the tracking checks have recorded: **Shipment**, **Event time**, **Checkpoint action**, **Checkpoint location**, **Received at**. Filters: **Checkpoint action**, **Received at** range. The rows are read-only and are the same events shown in the tab on the shipment page. See [Audit & logs](/admin/system/audit-and-logs).

## Things to know

- **Transient 403 and 406 errors.** ACS sporadically answers a tracking poll or a voucher request with HTTP 403 or 406 and then succeeds on the next attempt. The platform retries those automatically with backoff. Only a persistent rejection means a wrong API key or an IP address ACS has not allow-listed; in that case raise it with the platform team.
- **Business errors do not retry.** A rejected address or station is reported by email at once and stored on the shipment. Fix the data and click **Issue ACS voucher now**.
- **Parcels per voucher.** ACS's item quantity is the number of physical parcels, not cart lines. The platform sends one. Smartpoint pickup requires exactly one.
- **Weight** is stored in grams and sent in kilograms with a minimum of 0.5 kg. Bounds come from the provider metadata.
- **The customer's checkout note** is printed on the voucher's remarks line, trimmed to one paragraph.
- **Out for delivery** is emailed to the customer once per shipment, even when ACS's snapshot bounces between "on the vehicle" and "at the station" across days.
- **The order status only moves forward.** When ACS reports Delivered or Returned while the order is still Processing, the platform passes through Shipped first; the Shipped hop is silent for the customer on the Returned path.
- **Editing the shipment form.** Weight, item quantity, charge type and COD fields are editable but are only read at voucher creation time. Changing them after the voucher exists has no effect at ACS.

## Related

- [Shipping providers](/admin/shipping/providers)
- [Orders](/admin/sales/orders)
- [Reconciliation](/admin/system/reconciliation)
- [Audit & logs](/admin/system/audit-and-logs)
- [Background jobs](/admin/system/background-jobs)
