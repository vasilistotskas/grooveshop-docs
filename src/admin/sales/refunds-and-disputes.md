---
title: Refunds and disputes
description: Refund the products a customer sent back, or a goodwill amount, and put them back in stock in one dialog; refund cash on delivery, retry or record a refund that got no answer, deal with a cancelled order that is still paid, and follow and settle a card dispute.
---

# Refunds and disputes

<span class="sidebar-path">Sales → Orders</span>

You give money back from the order itself: for products that came back, a goodwill gesture, or a cancelled order that is still paid. This page also explains what happens when a customer disputes a card payment with their bank.

## What you see

- **Return and refund**, a button at the top of the order page. It appears whenever the order still has money that can go back, whatever its status, and while any refund of the order still waits for its answer or is unfinished.
- The **Return and refund** dialog:

| Field | What it is for |
|---|---|
| One field per product of the order | How many units of it you refund. Below it: **Units still to refund: 1 of 2, €19.90 left to refund (VAT 24.00%).** A product with nothing left to refund is not listed. |
| **Refund the shipping too** | Refunds the shipping the customer paid. Shown while the shipping has not been refunded yet. |
| **Put the returned units back in stock** | Puts the same units back in stock once the refund is made. Shown on a **Delivered**, **Completed** or **Returned** order. |
| **Retry the pending refund** | Shown only while a refund of products has had no answer from the payment provider. See [Retry a refund that got no answer](#retry-a-refund-that-got-no-answer). |
| **Reason** | Required. One of the reasons in the table below. |
| **Note** | Optional, up to 200 characters, for example "wrong size". |
| **Goodwill amount** | Money back that is not for a product. Its help text says how much can still be refunded. Use it instead of the products, never together with them. |
| **How it was paid back** | Shown only while the order holds cash on delivery, or a bank transfer you confirmed, that can still be refunded. |

- The reasons in **Reason**:

| Reason | Use it when |
|---|---|
| **Returned by the customer** | The customer sent products back, for example within the 14 days. |
| **Arrived damaged or defective** | The product was damaged or did not work. |
| **Wrong item sent** | You sent a different product. |
| **Not as described** | The product does not match its page. |
| **Not delivered or lost in transit** | The parcel never arrived. |
| **Charged twice** | The customer paid the order twice. |
| **Goodwill** | A gesture, not a return. |
| **Other** | Anything else; say what in **Note**. |

- The **Payment Transactions** tab of the order: every charge, refund and chargeback, with its amount and reason. The reason is written as the reason you chose, then your note.
- The **Refund → Cancelled but still paid** filter in the order list, and **Canceled orders to refund** on the [Dashboard](/admin/getting-started/dashboard).
- The **Overcharge → Paid more than the order is for** filter, and **Orders paid twice** on the Dashboard: orders the customer paid twice. See [A customer paid twice](/admin/sales/orders#a-customer-paid-twice).
- **Record refund outcome**, a button on the order page once a refund has had no answer from Viva Wallet or Stripe and the hourly check could not settle it. See [A refund's result is unknown](#a-refund-s-result-is-unknown).
- **Settle chargeback (goods)**, a button on the order page after you lost a card dispute, and the **Chargeback → Goods not yet settled** filter. See [Card disputes](#card-disputes).
- Alerts on the [Dashboard](/admin/getting-started/dashboard#alerts) when a refund needs you: **Refunds with an unknown outcome**, **Gift card and points refunds left unfinished**, **Receipts waiting for a refund** and the receipt and credit document alerts.

## Tasks

### Refund products that came back
1. Open the order and press **Return and refund**.
2. In the field of each product that came back, enter how many units. Leave the others at 0.
3. If the shipping goes back too, switch on **Refund the shipping too**.
4. Choose a **Reason** and, if you like, write a **Note**.
5. If the products can be sold again, switch on **Put the returned units back in stock** (see [Put returned goods back in stock](#put-returned-goods-back-in-stock)).
6. Confirm. The message at the top says how much was refunded, and whether the money went back in full, in part, or not at all.

You do not type an amount. Each unit is refunded for what it was sold for: its price, less its share of the order's discounts, at the VAT rate it was sold at. The value under each product is what is left to refund of all its units; refunding them all refunds exactly that, and refunding some refunds their share of it. The dialog does not add the products up while you type: the message after you confirm gives the total.

The credit document then carries only the VAT rates of those products. Returning one 13% item from an order of 24% and 13% products credits 13% only. Shipping is split over the rates the way the receipt splits it.

The card refund goes back through Viva Wallet or Stripe, whichever took the payment. After a partial refund the button stays, so you can refund more later: each product then offers only the units not refunded yet.

### Give a goodwill refund
For money back that is not for a product: a gesture after a complaint, a price match, or the fee of the payment method, which is not offered as a product.

1. Open the order and press **Return and refund**.
2. Leave every product at 0 and the shipping off.
3. In **Goodwill amount**, enter the amount. Its help text says how much can still be refunded and, when the order was paid partly with gift cards or points, how much of it goes back to each.
4. Choose a **Reason**, for example **Goodwill**, write a **Note** if you like, and confirm.

A goodwill refund is credited over the receipt's VAT rates in proportion to what each rate still holds. It is not taken off any product: the products stay on offer for their full value, as long as the order still has that much to refund.

### Refund the whole order
1. Open the order and press **Return and refund**.
2. Enter all the units left of every product and switch on **Refund the shipping too**.
3. Choose a **Reason** and confirm.
4. If the order also charged a payment-method fee, refund it afterwards as a **Goodwill amount**.

Refunding by products adds up to exactly what the order was sold for, with no cents left over. If you refund the whole order with a **Goodwill amount** instead, enter exactly the amount its help text gives, not a rounded figure.

### Refund a cash-on-delivery order
No payment provider holds this money, so you pay the customer back yourself and the platform records it. The same goes for a bank-transfer order you confirmed with **Confirm payment received**.

1. Pay the customer first, by bank transfer or in cash.
2. Open the order and press **Return and refund**.
3. Choose the products (or a **Goodwill amount**) and the reason. In **How it was paid back**, write the transfer reference or a short note.
4. Confirm. The platform sends no money in this case, so check that you really paid.

**How it was paid back** is required only when the refund reaches that cash: an order paid partly by card is refunded to the card first. Each refund needs its own reference: the same reference cannot be used twice on one order. Until the courier has paid you for the parcel, the payment is still **Pending** and there is nothing to refund yet.

### An order was cancelled but is still paid
This happens when the refund of a cancelled order did not go through, or when a card payment arrived after the order was cancelled.

1. In the order list, open the filters and choose **Refund → Cancelled but still paid**. The dashboard line **Canceled orders to refund** opens the same list.
2. Open the order and press **Return and refund**.
3. Enter all the units of every product and switch on **Refund the shipping too**, or enter the whole amount in **Goodwill amount**.
4. Choose a **Reason** and confirm.

### Put returned goods back in stock
A refund changes the stock only when you ask it to, and marking the order **Returned** does not change it at all. Check the parcel first: only put back what can be sold again.

- **With the refund.** Switch on **Put the returned units back in stock** in the **Return and refund** dialog. The units you refund go back in stock, each in its own product, and the stock log records them with your name. They go back only once the whole refund has been made: if any part of it was declined or got no answer, nothing goes back, and a message says so. Restock them once the refund is made.
- **Without a refund, or later.** Press **Restock returned items** on the order, enter how many units of each product came back and a **Reason**, and confirm. Use it for goods that came back with no money to return, such as a cash-on-delivery parcel that was never paid for, or after a refund made without the switch. It is shown on a **Delivered**, **Completed** or **Returned** order while some units are not back in stock yet.
- **A free product** (a gift worth nothing) has nothing to refund. Enter its units in **Return and refund** with **Put the returned units back in stock** switched on: it goes back in stock and no money moves. Without the switch the dialog refuses it.

A unit is never put back twice: both ways offer only the units not back in stock yet. Use them rather than raising **Stock** on the product by hand, which leaves the order's products with no record of the return.

### Close the order as refunded
1. If the order is **Shipped** or **Delivered**, run **Mark selected orders as returned** from the order list.
2. Once everything has been refunded, run **Mark selected orders as refunded**.

A **Completed** order cannot be marked returned; leave its status as it is. The platform also refuses **Refunded** while money is still left to give back, or a refund still waits for its answer, and tells you how much.

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

While a refund waits for its answer, the products it was for are not offered again in **Return and refund**, so they cannot be refunded twice. Entering the same **Goodwill amount** again never sends a second refund either. Within the first hour a Stripe refund is picked up where it stopped, and Stripe hands back the refund it already made. A Viva Wallet refund, and any refund after that hour, is refused instead: the provider may have made the first refund, and sending it again could pay the customer twice. Record the outcome first.

### Retry a refund that got no answer
A refund of products that got no answer can be sent again from the same dialog, as the same refund, so the customer is never paid twice.

1. Open the order and press **Return and refund**.
2. Switch on **Retry the pending refund**. Its help text gives the amount of the refund that waits.
3. Leave the products, the shipping and **Goodwill amount** empty: the retry repeats exactly what was asked. Choose a **Reason** and confirm.

Stripe recognises the repeat and hands back the refund it already made instead of making another. The retry asks for no **How it was paid back**, and it cannot put units back in stock: do that afterwards with **Restock returned items**.

**Retry the pending refund** is shown but cannot be switched on, with the reason below it, when sending the refund again is not safe:

- **The payment was made through Viva Wallet.** Viva Wallet cannot tell a repeat from a new refund, so it is never asked twice. The refund is recorded when Viva Wallet confirms it; check your Viva Wallet account.
- **The refund was sent more than an hour ago.** The provider may no longer recognise it. The platform looks it up every hour; if it stays unknown, record its outcome with **Record refund outcome** (above).
- **Part of it was cash you paid back yourself.** Cash is never repeated: record how it was paid back with **Record refund outcome**.

**Return and refund** stays on the order while a refund waits, even when that refund holds everything that was left to refund, so you can always retry it here or be pointed to **Record refund outcome**. Until it is settled, the order cannot be marked **Refunded**.

### Finish a gift card and points refund that stopped
The part of a refund that goes back onto gift cards and points involves no provider, so it has no result to look up. If it stopped half-way, the order appears on the Dashboard as **Gift card and points refunds left unfinished**. Until it is finished it keeps its amount aside, and the order cannot be marked **Refunded**.

1. Open the order and press **Return and refund**. The button stays on the order while such a refund is unfinished, even when nothing else is left to refund.
2. For a refund of products, switch on **Retry the pending refund** and leave everything else empty. For a goodwill refund, **Goodwill amount** is already filled in with the part that stopped, which can be less than the refund you made: only the gift card and points part stopped, and it is that part's amount that finishes it.
3. Choose a **Reason** and confirm. The refund carries on from where it stopped; nothing is given back twice.

## How a refund is split

Some orders are paid partly by card and partly with a gift card or loyalty points. The card is always refunded first. Only what is beyond the card goes back onto the gift card and the points.

**Example.** An order of €100 was paid €40 by card and €60 with a gift card.

- The customer returns a €10 item. You refund it: €10 goes back to the card, and the gift card stays as it is.
- Later you refund the rest, €90: €30 goes back to the card, then €60 onto the gift card.

When an order paid with both a gift card and points gets value back, the two are refilled in proportion. An order paid entirely with gift cards or points is refunded the same way, with no money moving.

### Products refunded in part
What a product has had back is counted in value, so the dialog always offers what is really left of it:

- **Refunded in several steps.** A product refunded earlier in part offers only the units left, priced from what is left of it, so all its refunds together come to exactly what it was sold for. Rounding cents go to the last unit.
- **A refund still waiting** for its answer keeps its units; they come back on offer only if it turns out not to have been made. A refund the provider declined frees its units at once.
- **Paid in two parts.** When a product's refund went partly to the card and partly onto a gift card, or over two payments, and one part was declined, the part that was not paid stays on offer. The product never counts as fully refunded, and with **Put the returned units back in stock** nothing goes back in stock for that refund.
- **Points count as refunded.** Value that went back to the customer as loyalty points counts for the product like money does, so a product refunded in full, part of it in points, is not offered again. The points part still needs no credit document.

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

- **A refund is judged when you make it.** The moment you confirm **Return and refund**, the platform decides what the refund is for and where it sits on the receipt's VAT rates: a refund of products on exactly their own rates, a goodwill amount in proportion over what each rate still holds. What happens afterwards, such as another payment arriving or another refund going through, does not change that answer. A refund made in your Viva Wallet or Stripe account is judged when it reaches the store.
- **A duplicate payment is given back first, by a goodwill amount.** When the customer paid more than the order is still for, a goodwill refund first returns that extra money. Giving it back does not undo the sale: that part gets no credit document and leaves the receipt untouched. Only the rest of the refund counts as goods returned. The extra is never more than the provider still holds of the customer's money. A refund of products never takes the extra: the products are goods the customer sent back, credited in full at their own rates, and the extra stays to be refunded as a **Goodwill amount** with the reason **Charged twice**.
- **A lost dispute is a loss, never a duplicate payment.** What the bank took back is money lost on the sale. It is never what a duplicate payment is measured against, so a refund of the extra payment still counts as giving back a duplicate after a dispute. If the customer kept the goods, the loss stays a loss and is never credited. If you settle that the goods came back, the sale is undone and the receipt is credited for it.
- **A refund waiting for an answer holds everything it touches.** Until the provider answers or you record the outcome, a refund whose result is unknown keeps its amount and its place on the receipt. Nothing is guessed and time frees nothing. Whatever depends on it waits too: a newer refund of the same order may be refused, with a message naming the refund it waits for, and a receipt that is due waits when another refund reached the order meanwhile and its share depends on the answer (**Receipts waiting for a refund**). Once the refund is resolved, the rest follows within five minutes.
- **A refund the provider later reports failed counts only for what stands.** Its credit document covers only the money that really went back, and a refund that failed in full gets none.
- **Points need no credit document.** Points are a discount, so the receipt never included their value, and giving them back changes nothing on it. Value put back onto a gift card is credited, because a gift card is a way of paying.

## Things to know

- **A refund never changes the order status**, and changes the stock only when you switch on **Put the returned units back in stock**. Use the "Mark selected orders as…" actions for the status.
- **Products or a goodwill amount, not both.** The dialog refuses both together, and refuses a confirm with neither.
- **You cannot refund more than is left.** The platform refuses and tells you how much can still be refunded, or, for a product, how many units were sold and how many already went back.
- **If Viva Wallet or Stripe did not answer**, the order's history says so. Check your account with the provider before trying again: the refund may already have been made, and it is recorded once the provider confirms it. See [A refund's result is unknown](#a-refund-s-result-is-unknown).
- **A refund can be refused while another one waits.** The message, "Another refund of this order is waiting for … to be settled", names the refund it waits for. It comes only when the waiting refund holds something this one needs, such as room on the receipt at a VAT rate, and applies to products and goodwill amounts alike. Resolve that one first: record its outcome with **Record refund outcome**, or finish it as above.
- **A refund the receipt cannot hold is refused** before any money moves. For products, the message names the VAT rate and how much the receipt still holds at it; a goodwill amount can still be refunded. For a goodwill amount, it says how much the receipt still holds across its rates. It is rare: it means the refunds for goods would add up to more than the sale at that rate.
- **A Stripe refund can fail days later.** The money then counts as still paid, the order's history says so and the store receives an email. Pay the customer back another way. That email can be [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store). If the refund's credit document was already issued, it stays, and the Dashboard shows **A refunded credit document was reversed** until your accountant cancels it (see [Receipts and credit documents](/admin/sales/receipts#a-refund-failed-after-its-credit-document)).
- **Editing the payment fields moves no money.** Only **Return and refund** gives money back.
- **A Viva Wallet refund or dispute that never shows up** on the order: [contact support](/admin/help/contact-support). The store's Viva account may not be sending its notifications.

## Related

- [Orders](/admin/sales/orders)
- [Receipts and credit documents](/admin/sales/receipts)
- [Gift cards](/admin/marketing/gift-cards)
- [Loyalty](/admin/customers/loyalty)
- [Payment methods](/admin/settings/payment-methods)
