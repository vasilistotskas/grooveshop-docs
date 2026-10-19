---
title: Shipping providers
description: Which couriers appear at checkout, which countries you ship to, what shipping costs, when it is free and which payment methods each courier offers.
---

# Shipping providers

Here you decide which couriers you ship with, to which countries and at what price. Everything a customer sees in the delivery step of checkout comes from this screen.

<span class="sidebar-path">Settings → Shipping Providers</span>

## What you see

One row per courier: **ACS Courier** (home delivery and Smartpoint lockers), **BoxNow** (lockers only) and **Standard delivery**. Standard delivery is your own delivery, with no courier contract: you pack the parcel and send it with whoever you like. A new store starts with it switched on and a rate for Greece.

| Column | Meaning |
|---|---|
| **Carrier** | The courier's name and logo. |
| **Is Active** | The master switch. Off means the courier does not appear at checkout. |
| **Supports Home Delivery** | Delivers to the customer's address. |
| **Supports Pickup Point** | Delivers to a locker or pickup shop. |
| **Live Mode** | Only a marker for you: that the courier runs on real credentials. It changes nothing. |
| **Priority** | Order at checkout. The lowest number comes first. |
| **Rates** | How many rate lines the courier has. |

Each courier's form has three tabs:

- **General**: the name, the on/off switch, the priority, what the courier supports and the logos.
- **Rates**: one line per country and shipping kind (see the table below).
- **Payment-method exclusions**: payment methods you do not want offered with this courier.

The fields of a line under **Rates**:

| Field | Meaning |
|---|---|
| **Country** | The delivery country. |
| **Shipping Kind** | **Home delivery** or **Pickup point / locker**. The courier must support that kind. |
| **Price** | What the customer pays for shipping. |
| **Free Shipping Threshold** | From this amount up, shipping is free. Empty means never free. |
| **Max Weight (grams)** | The heaviest cart it accepts. Empty means no limit. |
| **Delivery Days (min)** / **Delivery Days (max)** | Delivery time in working days after dispatch. Fill in both or neither. |
| **Is Active** | Untick to stop offering this option without losing the price. |

## Tasks

### Switch a courier on or off

1. Open the courier.
2. Tick or untick **Is Active** and save.
3. Try a cart at your store's checkout.

ACS and BoxNow also need the login details the courier gave you. They go in the [Store profile](/admin/settings/store-profile), not here. Without them the courier does not appear at checkout, even when **Is Active** is on.

### Change a shipping price

1. Open the courier and go to the **Rates** tab.
2. On the country's line, change **Price**, **Free Shipping Threshold** or **Max Weight (grams)**.
3. Save. Checkout uses the new values straight away.

Example: **Price** €3.50 and **Free Shipping Threshold** €50. A cart with €42 of products pays €3.50 shipping. If the customer adds another product and reaches €55, shipping becomes free. The threshold is measured on the products after discounts, without shipping.

### Set a delivery time

1. On the country's line, fill in **Delivery Days (min)** and **Delivery Days (max)**, for example 1 and 3.
2. Save. Checkout shows the customer the delivery time, and every new order gets an estimated delivery date.

The date counts from the day the parcel leaves, working days only (no weekends or Greek public holidays). The latest time an order still leaves the same day is the `DISPATCH_CUTOFF` setting under <span class="sidebar-path">Settings → Store Settings</span>. The default is 15:00: an order after 15:00 leaves the next working day. The same time is shown on the product page. Leave the setting empty if you do not want a time shown.

### Ship to a new country

Every country is already in the **Country** list. You do not need the platform team.

1. Open each courier that will deliver there and add a line under **Rates**: the country, the kind, the price and, if you want, a free-shipping threshold and a maximum weight.
2. Leave **Is Active** ticked and save.
3. Try it at checkout. The country now appears in the country list, with the couriers you gave it a rate.

To stop shipping to a country, untick **Is Active** on its lines. Once no active line is left, the country leaves checkout.

### ACS Smartpoint lockers

1. On the ACS courier, tick **Supports Pickup Point** and add a line with **Shipping Kind** **Pickup point / locker**.
2. Turn on the `ACS_SMARTPOINT_ENABLED` setting in Store Settings. It is off by default.
3. Check that there are shops in <span class="sidebar-path">Shipping → Pickup Points → ACS Stations</span>. The list refreshes every night, for the countries that have an active ACS rate. When BoxNow is switched off, **ACS Stations** sits directly under **Shipping**.

### Hide a payment method for one courier

Example: you do not want cash on delivery with ACS to Cyprus.

1. Open the courier and go to the **Payment-method exclusions** tab.
2. Add a line: **Shipping kind**, **Country** (empty means every country), **Pay way** and a **Note** saying why. Only you see the note.
3. Save. The payment method is no longer offered with this courier.

The same tab is on the payment method's own page, see [Payment methods](/admin/settings/payment-methods).

### Change the logo

1. Upload an image (PNG, JPG or SVG) in **Logo**. For a different picture on the locker card, also upload **Pickup-point logo**.
2. Save. The new image can take a few minutes to show in the store. Without a logo, the store shows a ready-made logo for the courier.

## Things to know

- **No rate, no option.** A courier appears for a country only when it has an active rate line for that country and kind. There is no general price for every country.
- **The countries a customer can choose are the countries you have a rate for.** That holds for the country list at checkout and for the addresses in the customer's account.
- **A region is required for Greece and Cyprus** (a prefecture in Greece, a district in Cyprus). It must belong to the country the customer chose. Other countries have no regions, so the field stays empty.
- **Heavy carts.** When the cart is over **Max Weight (grams)**, the option is shown greyed out with the reason, so the customer understands why it cannot be chosen.
- **What each courier can collect.** Cash to a courier is never offered on a BoxNow locker, because nobody meets the customer there. BoxNow's PAY ON THE GO is not offered with Standard delivery. Exclusions do not change these.
- **Free shipping from a promotion** removes the price but never opens a new country. The country always needs an active rate.
- **Live prices from ACS.** With the `ACS_DYNAMIC_PRICING_ENABLED` setting on, checkout asks ACS for a price based on weight. If ACS does not answer, the line's **Price** is charged. The free-shipping threshold always applies first.
- **The "free shipping from…" line** customers see in the store is the lowest free-shipping threshold among the active rates of the first country in the list.
- **Switching a courier off** does not touch shipments that already exist. Its screens under **Shipping** are hidden until you switch it back on.
- **Do not delete a courier.** Its rates go with it. Switch it off instead.
- **Metadata**: the courier's technical settings. Leave it as it is. If you need a change, for example printing vouchers on a laser printer instead of a thermal one, ask the [platform team](/admin/help/contact-support).

## Related

- [Daily shipping routine](/admin/shipping/daily-routine)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Payment methods](/admin/settings/payment-methods)
- [Store profile](/admin/settings/store-profile)
- [Store settings](/admin/settings/store-settings)
