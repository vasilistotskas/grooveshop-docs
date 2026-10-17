---
title: Payment methods
description: The payment methods offered at checkout, what each settlement type means, fees and free thresholds, the instructions text, and which parts are configured elsewhere.
---

# Payment methods

<span class="sidebar-path">Settings → Payment Methods</span>

A payment method is one option the shopper sees at checkout: Viva Wallet, Stripe, cash on delivery, BoxNow's pay-on-pickup, bank transfer and so on. This screen controls which are offered, in what order, what they cost the shopper and what the customer is told. It does not hold credentials: API keys for Viva Wallet, Stripe and the carriers are on the store profile, <span class="sidebar-path">Settings → Store Profile</span>, which Owners and Admins can edit, and an online method whose credentials are missing is hidden from shoppers automatically.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Name** | The method's logo and its customer-facing label, resolved from a fixed list of keys (Credit Card, Pay On Delivery, BOX NOW PAY ON THE GO!, Pay On Store, PayPal, Stripe, Bank Transfer, Apple Pay, Google Pay, Viva Wallet). |
| **Provider** | The provider code the platform uses to route the charge, e.g. `stripe`, `viva_wallet`, or "No provider". |
| **Type** | The settlement type (table below). |
| **Cost** | The fee added to the order, or **Free**. |
| **Free Threshold** | "Free above X" when the fee is waived over an order amount, or **No threshold**. |
| **Order** | Position in the checkout list. Rows can be dragged to reorder. |

Filters: **Active**, **Payment Type** (settlement), **Cost** and **Free Threshold** (from–to ranges), created and updated dates. Search by the name key (for example `PAY_ON_DELIVERY`, not the Greek label), provider code, description and instructions.

Bulk actions: **Activate selected payment methods** and **Deactivate selected payment methods**. To change the order at checkout, drag the rows.

### The payment method page

The page has tabs:

- **General**: **Active**, sort order, **Name** (one of the keys above, translated per language), **Icon**, **Description** and **Payment Instructions**, a rich-text field. The order-received email shows the instructions only while the shopper still has to act to pay, which means two settlement types (table below). **Settled off-platform** gets them together with a line asking for the order number in the payment reference. **Paid to the carrier before pickup** gets them without that line. The email leaves them out for online payments, for cash or card to the courier, and for a transfer you have already marked as paid. Bank-transfer details belong here; a reminder for the courier would never reach the shopper.
- **Payment**: **Provider Code**, **Settlement**, **Cost**, **Free Threshold** and the computed effective cost.
- **System**: id and timestamps.
- **Payment-method exclusions**: rows that block this method for a given shipping provider and shipping kind, with a private note. An empty table means the method is offered with every carrier that supports its settlement.

## Settlement types

| Settlement | Meaning | Order behaviour |
|---|---|---|
| **Paid online at checkout** | A payment provider charges the shopper before the order is confirmed (Viva Wallet, Stripe). | The order waits in Pending until the provider confirms; then it moves to Processing and the courier voucher is created. Unpaid orders are auto-canceled after the grace period. Needs credentials. |
| **Cash or card to the courier on delivery** | Classic cash on delivery (αντικαταβολή) with ACS. | Voucher is created immediately with the amount to collect. Payment status stays Pending until ACS pays out, days later, then flips to Completed automatically. |
| **Paid to the carrier before pickup** | BoxNow collects payment online after dispatch: it sends a payment link when it picks the parcel up, and the locker PIN activates once the shopper pays. | Voucher is created immediately with the amount. Payment status stays Pending until BoxNow reports the parcel delivered, which it can only be after payment; it then flips to Completed. |
| **Settled off-platform (e.g. bank transfer)** | The shopper pays outside the platform. | Order and voucher are created immediately; nothing marks it paid. You confirm the payment on the order page. |

Only the online settlement needs the payment provider's credentials, which belong to the store profile (see [Roles & team](/admin/getting-started/roles-and-team)); the other three collect money without the platform calling anyone.

## Tasks

### Offer or hide a method
1. Tick the method in the list and run **Activate selected payment methods** or **Deactivate selected payment methods**, or open it and toggle **Active**.
2. **The two routes differ.** Opening the method and saving clears the checkout's cached copy for you, so the change shows at once. The bulk activate and deactivate actions write straight to the rows and skip that, so afterwards purge the **Payment methods** entry under [Cache](/admin/system/cache), and the **Shipping** entry with it, since the delivery step shows which methods each option allows.

### Charge a fee for cash on delivery
1. Open **Pay On Delivery** and set **Cost** to the fee.
2. Optionally set **Free Threshold** so orders above that amount pay no fee.
3. The fee is copied onto each order as its payment-method fee and included in the courier's collection amount.

### Write the bank-transfer instructions
1. Open **Bank Transfer**, tab **General**.
2. Put the IBAN, beneficiary and the reference the customer should use in **Payment Instructions**, per language.
3. When a transfer arrives, open the order and set **Payment status** to **Completed**. See [Orders](/admin/sales/orders).

### Block a method for a carrier
1. Open the method and add a row under **Payment-method exclusions**: choose the shipping provider and shipping kind, write a note for your colleagues.
2. Save. The combination disappears from checkout without a deployment. The same rows can be edited from the carrier's page under [Shipping providers](/admin/shipping/providers).

## Things to know

- **Viva Wallet is the primary online provider and Stripe the secondary.** Both are per-store accounts. If the store profile holds no keys for one, the method is not shown to shoppers even if it is Active here, and checkout refuses to start a session for it.
- **Card disputes follow the order for both providers.** When a customer disputes a Viva Wallet or Stripe payment with their bank, the order's history and the store's contact email tell you, refunds are refused until the dispute is decided, and a lost dispute is recorded on the order as a chargeback without changing its payment status. See [Card disputes and chargebacks](/admin/sales/orders#card-disputes-and-chargebacks).
- **Cash on delivery and BoxNow pay-on-pickup are different products** even though both are collected on delivery: one is cash to a courier, the other a payment link from the carrier. Keep both rows; do not point a courier method at a locker.
- **The name is a key, not free text.** Pick the key that matches the product; the Greek and English labels come with it. The storefront uses the same key to translate the label.
- **Fees are VAT-inclusive amounts** in the store currency and appear on the invoice as a separate line.
- **Search by key.** The search box queries the stored key, so searching "Αντικαταβολή" finds nothing; search `PAY_ON_DELIVERY`.
- **Settlement is the only switch that decides how money is collected.** Two older flags meaning "is online payment" and "requires confirmation" are still kept in step behind the scenes, but they are not on the form and there is nothing to set.

## Related

- [Orders](/admin/sales/orders)
- [Shipping providers](/admin/shipping/providers)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
- [Cache](/admin/system/cache)
