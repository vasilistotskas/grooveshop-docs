---
title: Shipping zones
description: Where you deliver and at what price, per country and per region. Charge the islands more, stop delivering to a region, and set each courier's rates.
---

# Shipping zones

A shipping zone is a place you deliver to: a whole country, or some regions of a country. Its rates say which couriers deliver there, how, and at what price. Every price, free-shipping threshold, weight limit and delivery time a customer sees at checkout comes from the rates of a zone.

<span class="sidebar-path">Settings → Shipping Zones</span>

## What you see

One row per zone:

| Column | Meaning |
|---|---|
| **Name** | A name for you and your team, for example "Greece" or "Greek islands". Customers never see it. |
| **Country** | The country the zone is in. |
| **Covers** | **Whole country**, or how many regions the zone covers. |
| **Rates** | How many rate lines the zone has. |

A zone's form has the **Name**, the **Country** and the **Regions**, and a **Rates** tab with one line per courier and shipping kind:

| Field | Meaning |
|---|---|
| **Shipping Provider** | The courier that delivers. Switch couriers on and off in [Shipping providers](/admin/settings/shipping-providers). |
| **Shipping Kind** | **Home delivery** or **Pickup point / locker**. The courier must support that kind. |
| **Price** | What the customer pays for shipping. |
| **Free Shipping Threshold** | From this amount up, shipping is free. Empty means never free. |
| **Max Weight (grams)** | The heaviest cart it accepts. Empty means no limit. |
| **Delivery Days (min)** / **Delivery Days (max)** | Delivery time in working days after dispatch. Fill in both or neither. Customers see it on the product page and at checkout. |
| **Is Active** | Untick to stop offering this option without losing the price. |

### Whole country and regions

- A zone with **Regions** left empty covers the **whole country**. Each country you deliver to has one.
- A zone with **Regions** covers only those regions, and **its rates replace the whole-country zone's there**. For every other region of the country, the whole-country zone still applies.

Example: the zone "Greece" (whole country) delivers home for €3.50, and the zone "Crete" (region Crete) delivers home for €6.00 in 3 to 5 days. A customer in Athens pays €3.50, and a customer in Heraklion pays €6.00.

## Tasks

### Change a shipping price

1. Open the zone and go to the **Rates** tab.
2. On the courier's line, change **Price**, **Free Shipping Threshold** or **Max Weight (grams)**.
3. Save. Checkout uses the new values straight away.

Example: **Price** €3.50 and **Free Shipping Threshold** €50. A cart with €42 of products pays €3.50 shipping. If the customer adds another product and reaches €55, shipping becomes free. The threshold is measured on the products after discounts, without shipping.

### Set a delivery time

1. On the courier's line, fill in **Delivery Days (min)** and **Delivery Days (max)**, for example 1 and 3.
2. Save. Checkout shows the customer the delivery time, and every new order gets an estimated delivery date.

The date counts from the day the parcel leaves, working days only (no weekends or Greek public holidays). The latest time an order still leaves the same day is the `DISPATCH_CUTOFF` setting under <span class="sidebar-path">Settings → Store Settings</span>.

### Charge more for some regions (the islands)

1. Click **Add Shipping Zone**.
2. Give it a **Name** (for example "Greek islands"), choose the **Country**, and choose the islands' regions in **Regions**.
3. On the **Rates** tab, add a **Home delivery** line for each courier that delivers there, with its own price, free-shipping threshold and delivery days.
4. Save, then try a cart at checkout with an address in one of those regions.

### Stop delivering to a region

1. Create a zone for that region as above, or open the zone that already covers it.
2. Give it no **Home delivery** line, or untick **Is Active** on its lines.
3. Save. Customers can no longer choose that region for a delivery address, and checkout offers them no home delivery there. Pickup points in that country are still offered.

To deliver there again, add or re-activate a home-delivery line, or remove the region from the zone: the whole-country zone then covers it again.

### Ship to a new country

Every country and its regions already exist. You do not need the platform team.

1. Click **Add Shipping Zone**, give it a **Name**, choose the **Country**, and leave **Regions** empty.
2. On the **Rates** tab, add a line for each courier and kind that delivers there.
3. Save, then try it at checkout. The country now appears in the country list.

To stop shipping to a country, untick **Is Active** on the rate lines of its zones. Once no active line is left, the country leaves checkout.

### ACS Smartpoint lockers and BoxNow lockers

1. Check that the courier has **Supports Pickup Point** ticked in [Shipping providers](/admin/settings/shipping-providers).
2. In the country's **whole-country** zone, add a line with **Shipping Kind** **Pickup point / locker**.
3. ACS lockers appear at checkout for a country once its ACS stations have been fetched, every night, for the countries that have an active ACS rate.

## Things to know

- **Your existing rates were moved into zones.** Each country you had rates for got one whole-country zone named after the country, holding those rates. Nothing your customers pay changed.
- **Pickup-point rates go on the whole-country zone only.** A locker or pickup shop belongs to a country, not to a region, so the form refuses a pickup-point line on a zone that has regions.
- **One whole-country zone per country, and a region in one zone only.** The form says so when you try a second one.
- **A zone's regions belong to its country.** The form refuses a region of another country.
- **No rate, no option.** A courier appears for a destination only when the zone of that destination has an active line for it and that kind.
- **Customers see only the regions you deliver to at home**, at checkout and in the addresses of their account. A region a zone covers with no home-delivery rate is not offered.
- **A saved address you no longer deliver to** stays in the customer's account, marked "We no longer deliver to this address". At checkout it is listed but cannot be chosen. The customer can still rename it, or change it to a region you deliver to.
- **Before the customer chooses a region**, checkout shows the whole-country zone's prices. Once they choose one, the prices are those of the region's zone.
- **The product page and the cart's free-shipping line** are judged for the whole-country zone of the first country in the list, the one checkout picks first. A country you cover only with region zones shows nothing there until the customer gives an address.
- **Live prices from ACS.** With the `ACS_DYNAMIC_PRICING_ENABLED` setting on, checkout asks ACS for a price for the region's zone line. If ACS does not answer, the line's **Price** is charged.
- **Deleting a zone deletes its rates.** To stop for a while, untick **Is Active** on its lines instead.
- **AI shopping assistants** that buy from your store are offered the same regions and prices.

## Related

- [Shipping providers](/admin/settings/shipping-providers)
- [Daily shipping routine](/admin/shipping/daily-routine)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Payment methods](/admin/settings/payment-methods)
