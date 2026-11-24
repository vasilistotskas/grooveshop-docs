---
title: Shipping providers
description: Which couriers you ship with, what each supports, their order at checkout and logos, and which payment methods each courier offers.
---

# Shipping providers

Here you decide which couriers you ship with, what each one supports and which payment methods it offers. Where they deliver and at what price is set in [Shipping zones](/admin/settings/shipping-zones).

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
| **Rates** | How many rate lines the courier has, across all your shipping zones. |

Each courier's form has two tabs:

- **General**: the name, the on/off switch, the priority, what the courier supports and the logos.
- **Payment-method exclusions**: payment methods you do not want offered with this courier.

Where a courier delivers and at what price are its rates, set on each place you deliver to in [Shipping zones](/admin/settings/shipping-zones).

## Tasks

### Switch a courier on or off

1. Open the courier.
2. Tick or untick **Is Active** and save.
3. Try a cart at your store's checkout.

ACS and BoxNow also need the login details the courier gave you. They go in the [Store profile](/admin/settings/store-profile), not here. Without them the courier does not appear at checkout, even when **Is Active** is on.

### Prices, delivery times and countries

Prices, free-shipping thresholds, weight limits, delivery times, the countries and the regions you deliver to are set in [Shipping zones](/admin/settings/shipping-zones), one zone for each place you deliver to.

### ACS Smartpoint lockers

1. On the ACS courier, tick **Supports Pickup Point**.
2. In the country's whole-country zone under [Shipping zones](/admin/settings/shipping-zones), add an ACS line with **Shipping Kind** **Pickup point / locker**.
3. Lockers appear at checkout for a country once its ACS stations have been fetched. The store fetches them every night, for the countries that have an active ACS rate, so a new setup shows lockers the day after. Check the list in <span class="sidebar-path">Shipping → Pickup Points → ACS Stations</span>. When BoxNow is switched off, **ACS Stations** sits directly under **Shipping**.

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

- **No rate, no option.** A courier appears for a destination only when the [shipping zone](/admin/settings/shipping-zones) of that destination has an active rate line for it and that kind. There is no general price for every country.
- **The countries a customer can choose are the countries you have a rate for**, and the regions those where you deliver at home. That holds for checkout and for the addresses in the customer's account.
- **A region is required for Greece and Cyprus** (a prefecture in Greece, a district in Cyprus). It must belong to the country the customer chose. Other countries have no regions, so the field stays empty.
- **Heavy carts.** When the cart is over **Max Weight (grams)**, the option is shown greyed out with the reason, so the customer understands why it cannot be chosen.
- **What each courier can collect.** Cash to a courier is never offered on a BoxNow locker, because nobody meets the customer there. BoxNow's PAY ON THE GO is not offered with Standard delivery. Exclusions do not change these.
- **Free shipping from a promotion** removes the price but never opens a new country. The country always needs an active rate.
- **Live prices from ACS.** With the `ACS_DYNAMIC_PRICING_ENABLED` setting on, checkout asks ACS for a price based on weight. If ACS does not answer, the line's **Price** is charged. The free-shipping threshold always applies first.
- **How far a cart is from free shipping.** The cart shows one line, such as "Add €30.01 more for free shipping". It is the cheapest way this cart can get free shipping: the lowest **Free Shipping Threshold** of a courier that can carry the cart, or an automatic free-shipping promotion with a lower minimum. Rates are judged for the first country in the list, the one checkout picks first. A free-shipping promotion is not shown a second time beside it. See [Promotions](/admin/marketing/promotions).
- **The "free shipping over…" line** on a product page, for a customer whose cart is empty, is the lowest free-shipping threshold among the active rates of the first country in the list.
- **Switching a courier off** does not touch shipments that already exist. Its screens under **Shipping** are hidden until you switch it back on.
- **Do not delete a courier.** Its rates in every zone go with it. Switch it off instead.
- **Metadata**: the courier's technical settings. Leave it as it is. If you need a change, for example printing vouchers on a laser printer instead of a thermal one, ask the [platform team](/admin/help/contact-support).

## Related

- [Shipping zones](/admin/settings/shipping-zones)
- [Daily shipping routine](/admin/shipping/daily-routine)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Payment methods](/admin/settings/payment-methods)
- [Store profile](/admin/settings/store-profile)
- [Store settings](/admin/settings/store-settings)
