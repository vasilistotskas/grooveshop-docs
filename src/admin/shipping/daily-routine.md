---
title: Daily shipping routine
description: What to do every working day to get parcels out with ACS, BoxNow and your own delivery, and what to do when an address changes or a customer does not collect.
---

# Daily shipping routine

This page brings together a working day's shipping: which parcels you print, where you hand them over and how you update the orders you deliver yourself.

<span class="sidebar-path">Shipping → ACS Shipments</span>, <span class="sidebar-path">Shipping → BoxNow Shipments</span> and <span class="sidebar-path">Sales → Orders</span>

## What you see

| Courier | Where you work | Who updates the parcel's progress |
|---|---|---|
| ACS | **ACS Shipments** | ACS, automatically |
| BoxNow | **BoxNow Shipments** | BoxNow, automatically |
| Standard delivery (your own delivery) | **Orders** | You, by hand |

For ACS and BoxNow the voucher (the courier's shipping label) is issued by itself a few seconds after the order. For card payments, as soon as the payment is confirmed.

## Tasks

### 1. Start from the Dashboard

Open the [Dashboard](/admin/getting-started/dashboard) and look at the **Needs attention** section, for example **Stale ACS shipments** and **COD cash ACS has not paid out**. Each line opens the list of parcels. At 09:00 an email also arrives about ACS parcels that are not moving.

### 2. ACS parcels

1. In <span class="sidebar-path">Shipping → ACS Shipments</span>, filter **Label: Not printed**.
2. Select every row and run **Print labels for selected shipments**.
3. Print the PDF and stick each label on its parcel.
4. Hand the parcels to ACS.

The day's pickup list is issued by itself Monday to Friday at 16:30. If ACS refuses it because a label was not printed, the parcels with a printed label still leave as normal. Details in [ACS Courier](/admin/shipping/acs).

### 3. BoxNow parcels

1. In <span class="sidebar-path">Shipping → BoxNow Shipments</span>, filter **Parcel State: New**.
2. Select the rows and run **Download voucher PDFs (zip)**.
3. Print each PDF and stick it on its parcel.
4. Hand the parcels to BoxNow.

### 4. Orders you deliver yourself (Standard delivery)

No courier updates these orders, so you do.

1. In <span class="sidebar-path">Sales → Orders</span>, filter **Shipping Provider: Standard delivery**.
2. Send the parcel with any courier you like.
3. Open the order, go to the **Shipping & Tracking** tab and fill in **Tracking Number** and **Shipping Carrier**. Save.
4. In the list, select the orders and run **Mark selected orders as shipped**. If an order is still **Pending** (for example cash on delivery), first run **Mark selected orders as processing**.
5. When the customer has received it, run **Mark selected orders as delivered**.

The customer gets the "your order has shipped" email only once the order is **Shipped** and has both a tracking number and a carrier. If you fill them in later, the email goes out then.

### The customer changed address after the voucher was issued

The voucher keeps the address it was issued with. If you change the **Shipping Address** on the order, only the order changes: ACS or BoxNow are not told.

- **ACS:** ask ACS for the change, with the voucher number.
- **BoxNow:** while the parcel is **New** you can cancel it, but it cannot be created again from the admin. Contact BoxNow or the [platform team](/admin/help/contact-support).
- **Standard delivery:** just correct the address on the order.

### The customer did not collect the parcel

- **ACS:** when the parcel comes back to you, the shipment becomes **Returned** and the order **Returned**, automatically.
- **BoxNow:** if the customer does not open the compartment in time, the parcel becomes **Expired** and the order **Returned**, automatically.
- **Standard delivery:** run **Mark selected orders as returned**.

Then:

1. Stock does not come back automatically, because the parcel may return damaged. When you receive it, correct the stock on the [product](/admin/catalog/products).
2. With cash on delivery no money was collected, so there is nothing to give back. If the customer paid by card, see [Refunds and disputes](/admin/sales/refunds-and-disputes).

### An order that does not fit in one parcel

The platform sends every ACS or BoxNow order as one parcel, with one voucher. With ACS you can change the number of parcels only while the shipment has no voucher yet, for example after ACS rejected it: set **Item quantity** on the **Parcel & COD** tab, then click **Issue ACS voucher now**. A Smartpoint takes one parcel only. Once the voucher exists, or for BoxNow, contact the courier or the [platform team](/admin/help/contact-support).

## Things to know

- **Same-day dispatch time.** The `DISPATCH_CUTOFF` setting under <span class="sidebar-path">Settings → Store Settings</span> says until what time an order still leaves the same day (default 15:00). The estimated delivery date is worked out from it. If you usually ship earlier or later, change it.
- **Weekends and public holidays** do not count towards the delivery time. The ACS pickup list is not issued on Saturday or Sunday.
- **Cancelling after hand-over.** A customer cannot cancel from their account once the ACS voucher is on a pickup list or the BoxNow parcel is past **New**.

## Related

- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Shipping providers](/admin/settings/shipping-providers)
- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
