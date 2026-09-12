---
title: Shipping providers
description: The courier rows that switch ACS and BoxNow on or off at checkout, their capability flags, pricing settings, logos and payment-method exclusions.
---

# Shipping providers

<span class="sidebar-path">Shipping → Shipping Providers</span>

One row per courier integration. The row is the master switch for the courier in the storefront checkout and declares which fulfilment kinds it can serve. The same screen is also listed under <span class="sidebar-path">System → Configuration → Shipping Providers</span> for superusers; it is one and the same list.

Two couriers exist today: **ACS Courier** (code `acs`, home delivery and Smartpoint lockers) and **BoxNow** (code `boxnow`, lockers only). There is no generic or flat-rate provider row: every checkout option comes from one of these two rows.

## What you see

| Column | Meaning |
|---|---|
| **Code** | The value by which the platform recognises the courier (`acs`, `boxnow`). Do not change it on an existing row. |
| **Name** | The name customers see on the checkout card, e.g. "ACS Courier". |
| **Is Active** | Master switch. Off hides the courier from checkout whatever the **Capabilities** switches say. |
| **Supports Home Delivery** | The courier can deliver to the customer's address. |
| **Supports Pickup Point** | The courier can deliver to a locker or pickup station. |
| **Live Mode** | Informational only. Off means the store is on test credentials and vouchers will not really ship. It does not change which credentials are used. |
| **Priority** | Sort order in checkout. Lower numbers appear first. |
| **Logo** / **Pickup logo** | Thumbnails of the uploaded brand assets. |

Filters on the right: **Is Active**, **Live Mode**, **Supports Home Delivery**, **Supports Pickup Point**. The search box matches code and name.

The edit form has these sections:

- Code, Name, Is Active, Priority.
- **Capabilities**: Supports Home Delivery, Supports Pickup Point, Live Mode.
- **Branding**: **Logo** (used for home-delivery cards and as the fallback for pickup cards) and **Pickup-point logo** (optional, used only on the locker card). PNG, JPG or SVG. When both are empty the storefront shows its bundled default for the carrier.
- **Metadata** (collapsed): a JSON blob of provider-specific configuration. See below.
- **Payment-method exclusions**: an inline table with the fields Shipping provider, Shipping kind, Pay way and Note. A row here hides that payment method for that carrier and kind. The same table is reachable from the payment method's own page, see [Payment methods](/admin/sales/payment-methods).
- **Timestamps** (collapsed).

## How checkout builds the shipping options

The storefront asks the platform for one option per active provider and supported kind. An option is offered only when all of the following hold:

1. **Is Active** is on and the kind's **Supports …** flag is on.
2. The platform recognises the row's **Code**. A row with an unrecognised code is skipped and never offered.
3. The customer's country is listed in the row's `supported_countries` metadata key, or that key is absent.
4. The courier's own check for that kind passes. ACS Smartpoint pickup additionally needs the **ACS_SMARTPOINT_ENABLED** setting. Both couriers refuse every kind when the store has no credentials for them.

Options are sorted by **Priority**, then code. Each card also carries the payment methods that this courier and kind can settle, worked out from what the courier can physically collect and from the exclusion rows above:

| Courier and kind | Payment settlements offered |
|---|---|
| ACS, home delivery or Smartpoint | Online, courier cash on delivery, offline bank transfer |
| BoxNow locker | Online, BoxNow PAY ON THE GO (collected by the carrier before pickup), offline bank transfer |

Cash to a courier is never offered on a BoxNow locker: nobody meets the customer there. The BoxNow locker product is never offered on an ACS voucher either, because it is collected at BoxNow's own machine. Those are physical facts, not preferences. A preference such as "do not offer cash on delivery with ACS this month" belongs in **Payment-method exclusions**.

## Pricing and free shipping

Prices are not on the provider row. They live in <span class="sidebar-path">Settings → Extra Settings</span>:

| Setting | Effect |
|---|---|
| **ACS_SHIPPING_PRICE** | Flat ACS price for home delivery and Smartpoint. |
| **ACS_FREE_SHIPPING_THRESHOLD** | Cart subtotal above which ACS ships free (both kinds). |
| **ACS_DYNAMIC_PRICING_ENABLED** | When on, ACS is asked for a live weight-based quote at checkout. Any failure falls back to the flat price. Needs a merchant pickup station code (see Metadata). |
| **ACS_SMARTPOINT_ENABLED** | Shows the Smartpoint locker option. Off by default so a fresh store hides it until stations are synced. |
| **BOXNOW_SHIPPING_PRICE** | Flat BoxNow locker price. |
| **BOXNOW_FREE_SHIPPING_THRESHOLD** | Cart subtotal above which BoxNow ships free. |
| **CHECKOUT_SHIPPING_PRICE**, **FREE_SHIPPING_THRESHOLD** | Generic fallback used only when an order has no carrier that can price it. |

The storefront advertises "free shipping from X €" using the lowest threshold among the active couriers. Once the cart passes the highest threshold, every active courier ships free. See [Store settings](/admin/settings/store-settings) for how settings are edited.

## Metadata keys

**Metadata** is a small block of JSON you type by hand, read only by the courier whose row it sits on. These are the keys worth knowing:

| Key | Used by | Meaning |
|---|---|---|
| `supported_countries` | both | List of two-letter country codes. When present, the courier is hidden for every other country. |
| `shop_kinds_by_country` | ACS | Which kinds of ACS station count as lockers, per country. Default: Greece 7 and 8, Cyprus 7. |
| `print_type` | ACS | Voucher layout: `1` thermal roll (default), `2` laser, four vouchers per A4. Any other value falls back to `1`. |
| `station_origin` | ACS | The shop's own ACS pickup branch code, needed for live quotes. When absent it is read from the store's ACS billing code. |
| `min_weight_kg`, `max_weight_kg` | ACS | Bounds applied to the parcel weight sent to ACS. |
| `nearest_limit` | ACS | Maximum number of stations returned by the "nearest lockers" search. |
| `default_voucher_language` | ACS | Language printed on the voucher. Greek unless you change it. |
| `default_map_center`, `default_map_zoom`, `tile_provider` | ACS | How the map looks in the Smartpoint picker. |

Deleting a key is safe: every key has a built-in default.

## Tasks

### Switch a courier on or off

1. Open the provider row.
2. Tick or untick **Is Active** and save.
3. Check the storefront checkout with a test cart. No cache purge is needed for the option list.

### Offer or hide lockers for ACS

1. Make sure ACS Stations have been synced (see [ACS Courier](/admin/shipping/acs)).
2. Tick **Supports Pickup Point** on the ACS row.
3. Turn on **ACS_SMARTPOINT_ENABLED** in <span class="sidebar-path">Settings → Extra Settings</span>.

### Hide a payment method for one carrier

1. Open the provider row and scroll to **Payment-method exclusions**.
2. Add a row: pick the Shipping kind and the Pay way, add a Note explaining why.
3. Save. The payment method disappears from that carrier's card immediately.

### Change the courier logo

1. Upload a file in **Logo**. For a different locker illustration, also upload **Pickup-point logo**.
2. Save. Images are served through the media service, so allow a short while for caches.

## Things to know

- **Credentials are not on this screen.** The ACS and BoxNow keys, company and user IDs, billing code, partner and warehouse IDs and the BoxNow webhook secret belong to the store's own record with the platform team. You cannot view or edit them here. When they are missing the courier is hidden from checkout even with **Is Active** on, and a voucher for an order that already exists is not issued at all: the attempt stops and emails the store's admins instead of retrying, because credentials do not appear on their own.
- **Live Mode is a label, not a switch.** It is there so you can tell at a glance that vouchers on this store are test vouchers. Moving between test and live credentials is done by the platform team.
- Turning **Is Active** off does not touch existing shipments. Vouchers already issued keep being tracked.
- The row can also be deleted, but ACS and BoxNow are the only couriers the platform supports, so deleting a row simply removes that courier from checkout until it is recreated with the same **Code**.

## Related

- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Payment methods](/admin/sales/payment-methods)
- [Store settings](/admin/settings/store-settings)
