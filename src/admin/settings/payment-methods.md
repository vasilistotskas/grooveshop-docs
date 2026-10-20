---
title: Payment methods
description: Choose which payment methods customers see at checkout, in what order, what each costs, and what the customer is told about paying.
---

# Payment methods

<span class="sidebar-path">Settings → Payment Methods</span>

A payment method is one choice the customer sees at checkout: card through Viva Wallet or Stripe, cash on delivery, BoxNow's pay-on-the-go, bank transfer and so on. Here you choose which are offered, in what order, what they cost and what the customer is told.

The login details for Viva Wallet and Stripe are not here: they are on <span class="sidebar-path">Settings → Store Profile</span>. A card method whose details are missing is hidden from customers automatically.

## What you see

### The list

| Column | What it shows |
|---|---|
| **Name** | The method's logo and the name customers see. |
| **Provider** | The payment provider that takes the money, or **No provider**. |
| **Type** | How the money is collected (see [How the money is collected](#how-the-money-is-collected)). |
| **Cost** | The fee added to the order, or **Free**. |
| **Free Threshold** | "Free above" an amount, or **No threshold**. |
| **Sort Order** | The position at checkout. Drag the rows to change it. |

Filters: **Active**, **Payment Type**, cost and threshold ranges, dates. The search box looks in the provider code, the description and the payment instructions, not in the name customers see.

### The payment method page

- **General**: **Active**, the order, **Key** (which method this is; the name customers see comes with it, in every language), **Icon**, **Description** and **Payment Instructions**.
- **Payment**: **Provider Code**, **Settlement** (how the money is collected), **Cost**, **Free Threshold** and **Effective Cost**.
- **Payment-method exclusions**: rows that hide this method for one courier, shipping kind and, if you choose, one country.

## Tasks

### Offer or hide a method
1. Tick the method in the list and run **Activate selected payment methods** or **Deactivate selected payment methods**.
2. Or open the method, tick or untick **Active**, and save.

The storefront shows the change straight away, either way.

### Charge a fee for cash on delivery
1. Open the cash-on-delivery method and set **Cost** to the fee, VAT included.
2. If you like, set **Free Threshold**: orders whose products reach that amount, after discounts and without shipping, pay no fee.
3. The fee is added to each order's total, and so to what the courier collects.

### Write the bank-transfer instructions
1. Open the bank-transfer method, tab **General**.
2. In **Payment Instructions**, write the IBAN, the beneficiary and what the customer should write as the payment reference, in each language.
3. The customer gets these instructions in the "order received" email.

When the transfer arrives, mark the order paid with **Confirm payment received** on its page; see [Orders](/admin/sales/orders#a-bank-transfer-has-arrived).

### Hide a method for one courier
1. Open the method and add a row under **Payment-method exclusions**.
2. Choose the **Shipping provider** and **Shipping kind**. Choose a **Country** to hide it only there, or leave it empty for every country.
3. Write a **Note** for your colleagues, and save.

The same rows can be edited from the courier's page under [Shipping providers](/admin/settings/shipping-providers).

## How the money is collected

| Settlement | What it means | What happens to the order |
|---|---|---|
| **Paid online at checkout** | Viva Wallet or Stripe charges the card before the order is confirmed. | The order waits in **Pending** until the payment succeeds, then the voucher (the courier's shipping label) is created. An unpaid order is cancelled automatically. |
| **Cash or card to the courier on delivery** | Classic cash on delivery with ACS. | The voucher is created straight away with the amount to collect. The payment stays **Pending** until ACS pays you, days later. |
| **Paid to the carrier before pickup** | BoxNow sends the customer a payment link when it picks up the parcel; the locker opens once they pay. | The voucher is created straight away. The payment becomes **Completed** when BoxNow reports the parcel delivered. |
| **Settled off-platform (e.g. bank transfer)** | The customer pays you outside the store. | The order and the voucher are created straight away. You mark it paid with **Confirm payment received** on the order. |

## Things to know

- **Viva Wallet is the main card provider and Stripe the second one.** Both use your own store's accounts.
- **Payment instructions are emailed only when the customer still has to act**: for a bank transfer (with a line asking for the order number as the payment reference) and for BoxNow's pay-on-the-go. A card payment or cash to the courier needs none.
- **Cash on delivery and BoxNow pay-on-the-go are different methods**, even though both are paid on delivery: one is cash to a courier, the other a payment link from the locker company. Keep both.
- **Each method is offered only with couriers that can collect that way.** For example, cash on delivery is never offered for a BoxNow locker.
- **Card disputes** are handled on the order. See [Refunds and disputes](/admin/sales/refunds-and-disputes#card-disputes).

## Related

- [Orders](/admin/sales/orders)
- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Shipping providers](/admin/settings/shipping-providers)
- [ACS Courier](/admin/shipping/acs)
- [BoxNow](/admin/shipping/boxnow)
