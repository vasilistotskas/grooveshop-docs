---
title: Refunds and disputes
description: Give money back to a customer, refund cash on delivery, deal with a cancelled order that is still paid, and follow a card dispute.
---

# Refunds and disputes

<span class="sidebar-path">Sales → Orders</span>

You give money back from the order itself: for a return, a goodwill gesture, or a cancelled order that is still paid. This page also explains what happens when a customer disputes a card payment with their bank.

## What you see

- **Refund (amount, reason)**, a button at the top of the order page. It appears whenever the order still has money that can go back, whatever its status.
- The refund form: **Amount**, **Reason** and, only for cash on delivery, **How it was paid back**.
- The **Payment Transactions** tab of the order: every charge, refund and chargeback, with its amount and reason.
- The **Refund → Cancelled but still paid** filter in the order list, and **Canceled orders to refund** on the [Dashboard](/admin/getting-started/dashboard).

## Tasks

### Refund a return
1. Open the order and press **Refund (amount, reason)**.
2. In **Amount**, enter the value of what came back. The form shows how much can still be refunded.
3. Fill in **Reason**, for example "1 shirt returned, wrong size". It stays with the refund.
4. Confirm. The message at the top says whether the money went back in full, in part, or not at all.
5. Put the goods back in stock by hand (see [Put returned goods back in stock](#put-returned-goods-back-in-stock)).

The card refund goes back through Viva Wallet or Stripe, whichever took the payment. After a partial refund the button stays, so you can refund more later.

### Refund the whole order
1. Open the order and press **Refund (amount, reason)**.
2. Leave **Amount** as it is: it is already everything that can still be refunded.
3. Fill in **Reason** and confirm.

Refund the whole remaining amount in one go rather than typing a rounded figure. Otherwise a few cents can be left over.

### Refund a cash-on-delivery order
No payment provider holds this money, so you pay the customer back yourself and the platform records it.

1. Pay the customer first, by bank transfer or in cash.
2. Open the order and press **Refund (amount, reason)**.
3. Enter the amount and the reason. In **How it was paid back**, write the transfer reference or a short note.
4. Confirm. The platform sends no money in this case, so check that you really paid.

Each refund needs its own reference: the same reference cannot be used twice on one order. Until the courier has paid you for the parcel, the payment is still **Pending** and there is nothing to refund yet.

### An order was cancelled but is still paid
This happens when the refund of a cancelled order did not go through, or when a card payment arrived after the order was cancelled.

1. In the order list, open the filters and choose **Refund → Cancelled but still paid**. The dashboard line **Canceled orders to refund** opens the same list.
2. Open the order and press **Refund (amount, reason)**.
3. Leave the full amount, fill in **Reason** and confirm.

### Put returned goods back in stock
A refund does not change the stock, and neither does marking the order **Returned**.

1. Check the parcel. Only put back what can be sold again.
2. Open the product under <span class="sidebar-path">Catalog → Products</span>, tab **Pricing & Inventory**, and raise **Stock**.

### Close the order as refunded
1. If the order is **Shipped** or **Delivered**, run **Mark selected orders as returned** from the order list.
2. Once everything has been refunded, run **Mark selected orders as refunded**.

A **Completed** order cannot be marked returned; leave its status as it is. The platform also refuses **Refunded** while money is still left to give back, and tells you how much.

## How a refund is split

Some orders are paid partly by card and partly with a gift card or loyalty points. The card is always refunded first. Only what is beyond the card goes back onto the gift card and the points.

**Example.** An order of €100 was paid €40 by card and €60 with a gift card.

- The customer returns a €10 item. You enter €10: €10 goes back to the card, and the gift card stays as it is.
- Later you refund the rest, €90: €30 goes back to the card, then €60 onto the gift card.

When an order paid with both a gift card and points gets value back, the two are refilled in proportion. An order paid entirely with gift cards or points is refunded the same way, with no money moving.

## What the customer receives

- **An email for each refund of money**, by card or cash on delivery. It states the amount of this refund and, after a partial refund, what can still be refunded.
- **A notification in their account**, for customers who have one.
- **Gift card and points.** What goes back onto a gift card or onto the points sends no email; the order's history notes it.
- **Points earned on the order** are taken back once the whole order has been refunded. If the customer has already spent them, their balance can go below zero; see [Loyalty](/admin/customers/loyalty).
- **A credit document**, when the platform issues your receipts. See [Receipts and credit documents](/admin/sales/receipts).

## Card disputes

A customer can dispute a card payment with their bank instead of asking you. Viva Wallet and Stripe tell the store, and the order follows on its own.

| What happens | What you see | What to do |
|---|---|---|
| **The dispute opens** | A note in the order's history and an email to the store's contact address. | Answer it in your Viva Wallet or Stripe account. The platform does not answer for you. |
| **While it is open** | A refund is refused. Cancelling the order still cancels it, but the refund waits, and a message tells you so. | Refund the order once the dispute has closed. |
| **You win** | A note in the history. | Nothing. The order can be refunded again. |
| **You lose (chargeback)** | A red **Chargeback** entry in the history, a **Chargeback** row on **Payment Transactions** and an email to the store. | Nothing to refund: the bank has already taken the money back. |

A chargeback is not a refund. The payment status does not change, the customer gets no email and no credit document, and gift cards and points they spent are not given back. Points earned on the order are taken back once nothing is left of the payment.

A question from Stripe, where the bank only asks for information and no dispute is open, does not block a refund.

## Refunds made in your Viva Wallet or Stripe account

A refund you make directly in your Viva Wallet or Stripe account reaches the order on its own. It is recorded on **Payment Transactions**, the payment status follows, and the customer gets the refund email. A refund made from the admin is never counted twice.

## Things to know

- **A refund changes neither the order status nor the stock.** Use the "Mark selected orders as…" actions and the product's **Stock** for those.
- **You cannot refund more than is left.** The platform refuses and tells you how much can still be refunded.
- **If Viva Wallet or Stripe did not answer**, the order's history says so. Check your account with the provider before trying again: the refund may already have been made, and it is recorded once the provider confirms it.
- **A Stripe refund can fail days later.** The money then counts as still paid, the order's history says so and the store receives an email. Pay the customer back another way. That email can be switched off with `OPS_ALERT_REFUND_FAILED_ENABLED` under <span class="sidebar-path">Settings → Store Settings</span>.
- **Editing the payment fields moves no money.** Only **Refund (amount, reason)** gives money back.
- **A Viva Wallet refund or dispute that never shows up** on the order: [contact support](/admin/help/contact-support). The store's Viva account may not be sending its notifications.

## Related

- [Orders](/admin/sales/orders)
- [Receipts and credit documents](/admin/sales/receipts)
- [Gift cards](/admin/marketing/gift-cards)
- [Loyalty](/admin/customers/loyalty)
- [Payment methods](/admin/settings/payment-methods)
