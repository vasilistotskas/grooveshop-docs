---
title: Refunds and disputes
description: Give money back to a customer, refund cash on delivery, record the outcome of a refund that got no answer, deal with a cancelled order that is still paid, and follow and settle a card dispute.
---

# Refunds and disputes

<span class="sidebar-path">Sales → Orders</span>

You give money back from the order itself: for a return, a goodwill gesture, or a cancelled order that is still paid. This page also explains what happens when a customer disputes a card payment with their bank.

## What you see

- **Refund (amount, reason)**, a button at the top of the order page. It appears whenever the order still has money that can go back, whatever its status.
- The refund form: **Amount**, **Reason** and, only for cash on delivery or a bank transfer you confirmed, **How it was paid back**.
- The **Payment Transactions** tab of the order: every charge, refund and chargeback, with its amount and reason.
- The **Refund → Cancelled but still paid** filter in the order list, and **Canceled orders to refund** on the [Dashboard](/admin/getting-started/dashboard).
- The **Overcharge → Paid more than the order is for** filter, and **Orders paid twice** on the Dashboard: orders the customer paid twice. See [A customer paid twice](/admin/sales/orders#a-customer-paid-twice).
- **Record refund outcome**, a button on the order page while a refund has had no answer from Viva Wallet or Stripe for more than an hour. See [A refund's result is unknown](#a-refund-s-result-is-unknown).
- **Settle chargeback (goods)**, a button on the order page after you lost a card dispute, and the **Chargeback → Goods not yet settled** filter. See [Card disputes](#card-disputes).
- Alerts on the [Dashboard](/admin/getting-started/dashboard#alerts) when a refund needs you: **Refunds with an unknown outcome**, **Gift card and points refunds left unfinished**, **Receipts waiting for a refund** and the receipt and credit document alerts.

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
No payment provider holds this money, so you pay the customer back yourself and the platform records it. The same goes for a bank-transfer order you confirmed with **Confirm payment received**.

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

### A refund's result is unknown
Sometimes Viva Wallet or Stripe does not answer a refund: the connection drops, or the provider is slow. The refund may or may not have been made, so the platform keeps its amount aside: it cannot be refunded a second time, and nothing is decided about it on a guess. The order's history says the result is not known.

Most such refunds sort themselves out. The provider's own notification records the refund when it arrives, and every hour the platform asks the provider about each refund that has had no answer for more than an hour. A refund the provider still cannot account for stays open, and appears on the [Dashboard](/admin/getting-started/dashboard#alerts) as **Refunds with an unknown outcome**. Then:

1. Look the refund up in your Viva Wallet or Stripe account.
2. Open the order and press **Record refund outcome**.
3. In **Refund**, pick the refund (its amount and when it was sent).
4. In **What happened**, choose **The refund was made** or **The refund was not made**.
5. If it was made, fill in **Reference**: the refund's id as your Viva Wallet or Stripe account shows it (a Stripe refund id starts with `re_`). For cash on delivery or a bank transfer you paid back yourself, write the transfer reference.
6. Confirm.

The platform checks a card refund with the provider before recording it: the reference must belong to this payment, be for this amount, and have gone through. Otherwise it refuses and tells you why. A reference already recorded on the store is refused too. **The refund was not made** frees the amount, so you can refund it again. Either way the order's history notes the outcome with your name.

Pressing **Refund (amount, reason)** again for the same amount never sends a second refund. Within the first hour a Stripe refund is picked up where it stopped, and Stripe hands back the refund it already made. A Viva Wallet refund, and any refund after that hour, is refused instead: the provider may have made the first refund, and sending it again could pay the customer twice. Record the outcome first.

### Finish a gift card and points refund that stopped
The part of a refund that goes back onto gift cards and points involves no provider, so it has no result to look up. If it stopped half-way, the order appears on the Dashboard as **Gift card and points refunds left unfinished**. Until it is finished it keeps its amount aside, holds back the order's receipt and refuses any new refund.

1. Open the order and press **Refund (amount, reason)**.
2. Enter the same amount as the refund that stopped, and confirm. The refund carries on from where it stopped; nothing is given back twice.

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
| **You lose (chargeback)** | A red **Chargeback** entry in the history, a **Chargeback** row on **Payment Transactions** and an email to the store. The order appears on the Dashboard as **Lost disputes to settle**. | Nothing to refund: the bank has already taken the money back. Say what became of the goods (below). |

A chargeback is not a refund. The payment status does not change, the customer gets no email, and gift cards and points they spent are not given back. Points earned on the order are taken back once nothing is left of the payment.

A question from Stripe, where the bank only asks for information and no dispute is open, does not block a refund.

### Settle a lost dispute
Whether the receipt is credited depends on what became of the goods, and only you know that.

1. Open the order from **Lost disputes to settle** on the Dashboard, or with the filter **Chargeback → Goods not yet settled**.
2. Press **Settle chargeback (goods)**.
3. In **What became of the goods?** choose:
   - **The product was returned or not delivered**: the sale is undone, and the receipt gets a credit document for what the bank took, as for a refund. If the receipt has not been issued yet, it is issued without that amount.
   - **The customer kept the product**: the sale stands. The money the bank took is a loss, and no credit document is issued for it.
4. Confirm. The choice applies to every lost dispute of the order, and the order leaves the Dashboard row.

You can change your answer later, with one exception: once the order has a receipt, "returned" can no longer be turned into "kept", because the receipt or its credit document already reflects it.

If the order is fully refunded and closed, its final credit document waits until every lost dispute of the order is settled this way.

## Refunds made in your Viva Wallet or Stripe account

A refund you make directly in your Viva Wallet or Stripe account reaches the order on its own. It is recorded on **Payment Transactions**, the payment status follows, and the customer gets the refund email. A refund made from the admin is never counted twice.

## How a refund is judged

These rules decide which part of a refund undoes the sale, and so needs a credit document. They matter most when the platform issues your receipts (see [Receipts and credit documents](/admin/sales/receipts)), but the money side applies to every order.

- **A refund is judged when you make it.** The moment you confirm **Refund (amount, reason)**, the platform decides what the refund is for and where it sits on the receipt's VAT rates. What happens afterwards, such as another payment arriving or another refund going through, does not change that answer. A refund made in your Viva Wallet or Stripe account is judged when it reaches the store.
- **A duplicate payment is given back first.** When the customer paid more than the order is still for, a refund first returns that extra money. Giving it back does not undo the sale: that part gets no credit document and leaves the receipt untouched. Only the rest of the refund counts as goods returned. The extra is never more than the provider still holds of the customer's money.
- **A lost dispute is a loss, never a duplicate payment.** What the bank took back is money lost on the sale. It is never what a duplicate payment is measured against, so a refund of the extra payment still counts as giving back a duplicate after a dispute. If the customer kept the goods, the loss stays a loss and is never credited. If you settle that the goods came back, the sale is undone and the receipt is credited for it.
- **A refund waiting for an answer holds everything it touches.** Until the provider answers or you record the outcome, a refund whose result is unknown keeps its amount and its place on the receipt. Nothing is guessed and time frees nothing. Whatever depends on it waits too: a newer refund of the same order may be refused, with a message naming the refund it waits for, and a receipt that is due is held back (**Receipts waiting for a refund**). Once the refund is resolved, the rest follows within five minutes.
- **A refund the provider later reports failed counts only for what stands.** Its credit document covers only the money that really went back, and a refund that failed in full gets none.
- **Points need no credit document.** Points are a discount, so the receipt never included their value, and giving them back changes nothing on it. Value put back onto a gift card is credited, because a gift card is a way of paying.

## Things to know

- **A refund changes neither the order status nor the stock.** Use the "Mark selected orders as…" actions and the product's **Stock** for those.
- **You cannot refund more than is left.** The platform refuses and tells you how much can still be refunded.
- **If Viva Wallet or Stripe did not answer**, the order's history says so. Check your account with the provider before trying again: the refund may already have been made, and it is recorded once the provider confirms it. See [A refund's result is unknown](#a-refund-s-result-is-unknown).
- **A refund can be refused while another one waits.** The message names the refund it waits for. Resolve that one first: record its outcome, or finish it by refunding the same amount again.
- **A refund the receipt cannot hold is refused** before any money moves, with a message saying how much the receipt still holds. It is rare: it means the refunds for goods would add up to more than the sale.
- **A Stripe refund can fail days later.** The money then counts as still paid, the order's history says so and the store receives an email. Pay the customer back another way. That email can be [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store). If the refund's credit document was already issued, it stays, and the Dashboard shows **A refunded credit document was reversed** until your accountant cancels it (see [Receipts and credit documents](/admin/sales/receipts#a-refund-failed-after-its-credit-document)).
- **Editing the payment fields moves no money.** Only **Refund (amount, reason)** gives money back.
- **A Viva Wallet refund or dispute that never shows up** on the order: [contact support](/admin/help/contact-support). The store's Viva account may not be sending its notifications.

## Related

- [Orders](/admin/sales/orders)
- [Receipts and credit documents](/admin/sales/receipts)
- [Gift cards](/admin/marketing/gift-cards)
- [Loyalty](/admin/customers/loyalty)
- [Payment methods](/admin/settings/payment-methods)
