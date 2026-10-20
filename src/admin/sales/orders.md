---
title: Orders
description: Find an order, move it forward, cancel it, and read its order and payment status.
---

# Orders

<span class="sidebar-path">Sales → Orders</span>

Every purchase is one order, whether a customer, a guest without an account or an AI agent placed it. This is where your team works every day: where is the order, has it been paid, and what comes next.

The number next to **Orders** in the menu counts the orders still **Pending**.

## What you see

### The list

| Column | What it shows |
|---|---|
| **Status** | Where the order is in fulfilment (see [Order statuses](#order-statuses)). |
| **Follow-up** | A blue **Follow up** badge when the customer has waited too long for the parcel. See [Orders to follow up](#orders-to-follow-up). |
| **Customer** | The name and email on the order. |
| **Order** | Number of lines, total quantity and the amount the customer owes after discounts, points and gift cards. |
| **Order source** and **Cart source** | Where the customer came from. See [Order source](/admin/sales/order-source). |
| **Payment** | The payment status (see [Payment statuses](#payment-statuses)). |
| **Payment Method** | Viva Wallet or Stripe for a card payment, otherwise the method the customer chose, such as cash on delivery. |
| **Shipment** | The courier's own state for the parcel (ACS or BoxNow). |
| **Shipping** | Tracking number, carrier and city. |
| **Created** | Date and time the order was placed. |

Each row has two quick buttons: **Download shipping voucher (PDF)**, the courier's label for the parcel, and **Customer's orders**, which lists everything else the same customer bought.

Above the list, tabs lead to **Order Items** (every order line separately, so you can see who bought a product), **Receipts** and **Credit Documents**.

### Filters and search

The filters panel lets you combine:

- **Status** and **Payment Status** (you may pick several values)
- **Document Type** (receipt or invoice) and **Wholesale**
- **Refund**: **Cancelled but still paid** (see [Refunds and disputes](/admin/sales/refunds-and-disputes))
- **Needs follow-up** and **Recent Orders**
- the order source and cart source filters
- dates, country, region, payment method, shipping provider and shipping kind

Press the apply button once you have chosen. The search box finds an order by number, customer email, name or phone, city, tracking number or BoxNow voucher.

### The order page

Cards at the top show **Status**, **Payment**, **Total**, **Customer**, **Shipment** and **Receipt** (or **Invoice** for an invoice order). Below them are tabs: **Order Information**, **Billing / Invoice**, **Customer Information**, **Shipping Address**, **Payment Information**, **Shipping & Tracking** and **Additional Information**.

Further down: the order lines, **Payment Transactions** (every charge, refund and chargeback), the receipt and credit documents, the order's history, and an ACS or BoxNow tab when a courier is attached.

The header holds **Refund (amount, reason)** while money can still be refunded, **Download shipping voucher (PDF)** and, if the platform issues your receipts, the **Invoicing & myDATA** menu.

## Tasks

### Find an order
1. Type the order number, the customer's email or phone, or a tracking or voucher number in the search box.
2. If there are many results, narrow them with **Status** or **Recent Orders**.
3. Open the order. To see the customer's other purchases, use the **Customer's orders** button on the order's row in the list.

### Move an order forward by hand
1. Tick the order (or several) in the list.
2. From the actions choose, for example, **Mark selected orders as shipped**, and confirm.
3. Read the messages at the top. An order that cannot move to that status is skipped, with the reason.

**Status** cannot be changed on the order page. Only these actions change it, because they check that the move is allowed.

### Cancel an order
1. Tick the order in the list and run **Cancel selected orders and restore stock**. Only **Pending** and **Processing** orders can be cancelled.
2. The stock goes back, the customer gets an email and the courier is asked to cancel the voucher.
3. Gift cards and points used on the order go back to the customer. If the order was paid by card, the money is refunded in full at the same time.

If the courier does not cancel the parcel (for example, it is already on a pickup list), the order is cancelled anyway. A red message tells you so: arrange the parcel's return with the courier.

If the refund does not go through, the order stays cancelled and the money stays with you. See [Refunds and disputes](/admin/sales/refunds-and-disputes#an-order-was-cancelled-but-is-still-paid).

### Refund a customer
Use **Refund (amount, reason)** on the order page. The whole process, including cash on delivery and card disputes, is on [Refunds and disputes](/admin/sales/refunds-and-disputes).

### A bank transfer has arrived
When the money for a bank-transfer order is in your account:

1. Open the order and press **Confirm payment received**. The button is there only while a bank-transfer order is still waiting for its payment.
2. **Amount received** must be exactly what the order costs.
3. In **Bank transaction reference**, enter the bank's id for the transfer. One transfer cannot pay two orders, so a reference that is already recorded is refused.
4. Confirm. The order is marked paid, and a **Pending** order moves to **Processing**.

The order's history keeps who confirmed it, when, and how much. Card payments are never confirmed by hand: the payment provider records them. If you later refund this order, you pay the money back yourself, as for cash on delivery; see [Refunds and disputes](/admin/sales/refunds-and-disputes).

### Print the voucher or the receipt
- **Download shipping voucher (PDF)**, on the row or on the order page, fetches the label from the courier. It tells you if no voucher exists yet.
- The receipt is the **Download PDF** link in the order's receipts tab. See [Receipts and credit documents](/admin/sales/receipts).

### Add a tracking number by hand
1. Open the order, tab **Shipping & Tracking**.
2. Fill in **Tracking Number** and **Shipping Carrier**, and save.
3. The "your order has shipped" email goes out once the order is also **Shipped**, whichever of the two happens second.

## Order statuses

| Status | Meaning | Can move to |
|---|---|---|
| **Pending** | Placed, nothing has happened yet. A card order waits for its payment. | Processing, Canceled |
| **Processing** | Confirmed and being prepared. Set automatically when a card payment succeeds or the courier voucher is created. | Shipped, Canceled |
| **Shipped** | The courier reports the parcel on its way. Set automatically by ACS or BoxNow. | Delivered, Returned |
| **Delivered** | The courier reports delivery. | Completed, Returned |
| **Completed** | Delivered and paid. Set automatically once a delivered order is paid. Final. | — |
| **Canceled** | Closed before shipping; the stock went back. Final. | — |
| **Returned** | The parcel came back to you. Stock does not go back by itself. | Refunded |
| **Refunded** | A returned order whose money has all gone back. Final. | — |

A **Completed** order cannot be marked **Returned**. A card order usually becomes **Completed** as soon as it is delivered, so for a return you simply refund it and put the goods back in stock by hand.

## Payment statuses

| Payment status | Meaning |
|---|---|
| **Pending** | Nothing collected yet. Normal for cash on delivery until the courier pays you, and for a bank transfer until you confirm it. |
| **Processing** | Viva Wallet or Stripe is still working on the charge. |
| **Completed** | Paid in full, including an order covered entirely by gift cards or points. |
| **Failed** | The card payment was declined. The order is cancelled automatically after a while. |
| **Partially Refunded** | Part of the money went back; more can follow. |
| **Refunded** | Everything went back to the customer. |
| **Canceled** | Nothing was collected and nothing is owed, for example a cash-on-delivery parcel the customer refused. |

A late or repeated message from Viva Wallet or Stripe never moves a paid, refunded or cancelled payment back to **Pending** or **Failed**.

## Orders to follow up

A customer who ordered a week ago and still has no parcel is about to contact you. The platform flags those orders so you can contact them first.

An order is flagged when it was placed at least 7 days ago and is still **Pending**, **Processing** or **Shipped**. The number of days is `ORDER_FOLLOW_UP_DAYS` under <span class="sidebar-path">Settings → Store Settings</span>. A card order still waiting for its payment is never flagged: it is an abandoned checkout.

You see the flag in the **Follow-up** column, in the **Needs follow-up** filter, on the **Order Information** tab with the reason and the courier's last update, and on the [Dashboard](/admin/getting-started/dashboard) as **Orders to follow up**.

The flag disappears by itself once the order is delivered, completed, returned, cancelled or refunded. There is nothing to tick off.

### Change the follow-up period
1. Open <span class="sidebar-path">Settings → Store Settings</span> and search for `ORDER_FOLLOW_UP_DAYS`.
2. Enter the number of days and save. The list, the filter and the dashboard follow at once.
3. Enter `0` to switch the flag off.

## Cancellations by the customer

A customer can cancel an order from their account while it is **Pending** or **Processing** and the courier can still take the parcel back. The courier is asked first:

- **The courier agrees**, or there is no voucher yet: the order is cancelled and refunded, as if you had cancelled it.
- **The courier refuses**, because it already has the parcel: nothing changes, and the customer is told it is too late. Expect them to ask for a return.
- **The courier cannot be reached**: nothing changes, and the customer is asked to try again.

## What happens automatically

- **Stock.** Checkout holds the stock for `STOCK_RESERVATION_TTL_MINUTES` minutes (30 by default). A failed card payment does not free it; the automatic cancellation below does.
- **Unpaid card orders are cancelled.** Every 15 minutes the platform cancels a **Pending** order whose card payment failed more than `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES` minutes ago (30). It also cancels a card order still unpaid once its payment window has passed. Cash on delivery and bank transfer orders are never cancelled this way.
- **A limit on unpaid card orders.** One customer can have at most `ORDER_MAX_UNPAID_ONLINE_ORDERS` card orders waiting for payment (5 by default). A sixth is refused until they pay or cancel one. Raise it if genuine customers hit the limit; `0` switches it off.
- **Courier voucher.** Created right after checkout for cash on delivery, and after the payment for card orders. The order then moves to **Processing**.
- **With ACS, cash on delivery stays payment-Pending until ACS pays you.** ACS pays out days later. A nightly check matches the payout to the order and marks it **Completed**, without emailing the customer. With BoxNow, the payment is marked **Completed** as soon as the parcel is delivered.
- **Emails to the customer**: order received, payment failed, shipped, out for delivery (ACS) or at the locker (BoxNow), delivered, cancelled, returned, one per refund, and the receipt when the platform issues it. A **Completed** set automatically sends nothing: the customer has just had the "delivered" email.

## Things to know

- **Guest orders** work like any other: the customer gets every email and opens the order from the link in them. Guests get no notifications inside the store.
- **Editing money fields moves no money.** Changing **Amount Due** only changes what the screen shows. To give money back, use **Refund (amount, reason)**.
- **Payment Method and Payment Gateway are different.** **Payment Method** is what the customer chose. **Payment Gateway** is filled in by the platform to match the provider's messages: leave it alone.
- **Wholesale orders** keep the customer group and discount they were priced with. Changing the customer's group later does not change old orders.
- **An empty Shipment column** means no voucher has been created yet. The voucher button will say so.
- The store-wide **Order History** and **Stock Logs** lists are open to the platform team only. Each order's own history is on its page. For anything older, [contact support](/admin/help/contact-support).

## Related

- [Refunds and disputes](/admin/sales/refunds-and-disputes)
- [Order source](/admin/sales/order-source)
- [Receipts and credit documents](/admin/sales/receipts)
- [Payment methods](/admin/settings/payment-methods)
- [Daily shipping routine](/admin/shipping/daily-routine)
- [Dashboard](/admin/getting-started/dashboard)
