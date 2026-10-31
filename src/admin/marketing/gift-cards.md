---
title: Gift cards
description: "Issuing and sending a gift card, correcting a balance, blocking a card, a lost code, how shoppers pay with a card, refunds and expiry."
---

# Gift cards

<span class="sidebar-path">Marketing → Gift Cards → Gift Cards</span>

A gift card is a code with a money balance that the shopper spends at checkout. It is a way to pay, not a discount: the receipt shows the full value and VAT, and the card amount as a payment. Here you issue cards, send them and correct balances.

## What you see

| Column | What it shows |
|---|---|
| **Code** | The card's code. Whoever has it can spend the balance. |
| **Balance** | How much money is left on the card. |
| **Initial Value** | Its value when issued. |
| **Status** | **Active**, **Disabled**, or **Expired**. |
| **Source** | **Issued by admin** or **Purchased in store**. |
| **Recipient Email** | Who it was or will be sent to. |
| **Expires At** | Expiry date. Empty means it never expires. |
| **Delivered At** | When the email with the card went out. |

Search finds a code, a recipient email or the email of the account that holds the card. Below each row the **Ledger** opens: the card's history of movements.

The card page has the tabs **Card** (value, status, expiry, **Issued To**) and **Delivery** (recipient, sender, message, **Deliver At**). The buttons at the top right are **Adjust balance**, **Disable card** and **Resend delivery email**.

### A card's movements

| Kind | What it means |
|---|---|
| **Issue** | The card was created with its initial value. |
| **Redeem** | The shopper paid for an order with the card. |
| **Refund credit** | Money came back to the card from a cancellation or refund. |
| **Adjust** | A correction by staff, with a reason. |
| **Expire** | The card expired and its balance was set to zero. |

Every movement of every card is under <span class="sidebar-path">Marketing → Gift Cards → Transactions</span>. Cards that shoppers bought from the storefront, with their payment status, are under <span class="sidebar-path">Marketing → Gift Cards → Purchases</span>. Both lists are read-only.

## Tasks

### Issue and send a card

1. Click **Add** and enter the **Initial Value**.
2. Leave **Expires At** empty for the default validity (five years), or set a date.
3. If the customer has an account, pick it in **Issued To** so they see the card in their account.
4. On the **Delivery** tab fill in **Recipient Email**, name and message. Save; the code is created for you.
5. To send it now, click **Resend delivery email**. To send it later, set **Deliver At**. Every morning at 06:00 the cards whose time has come go out.

Saving alone does not send an email.

**Large amounts need the Owner.** An Admin or Staff member cannot issue a card, or add to a balance, for more than `GIFT_CARD_STAFF_ISSUE_LIMIT` (€500 unless you changed it) in one step: the save is refused with a message that the store's owner can do it. The Owner can. The card's **Issue** or **Adjust** movement then says the amount was above the limit and who authorised it. There is also a daily cap: one Admin or Staff member cannot put more than `GIFT_CARD_STAFF_DAILY_LIMIT` (€1,000 unless you changed it) on gift cards in any 24 hours, all cards together. Taking value off a card has no limit.

### Correct a balance

1. Open the card and click **Adjust balance**.
2. In **Adjustment amount** enter a positive amount to add or a negative one to remove (never more than the balance). Enter a **Reason** and confirm.

The correction is recorded as an **Adjust** movement with your name. Movements are never deleted; a mistake is fixed with another adjustment.

### Block a card

1. Click **Disable card**. From then on the card is refused at checkout; the balance stays.
2. To turn it back on, set **Status** to **Active** on the **Card** tab and save.

### The customer lost the code

1. Search by the recipient's or the account's email.
2. Open the card, check the **Recipient Email** and click **Resend delivery email**.

## Things to know

- **Two switches.** Gift cards work only if your plan includes them and `GIFT_CARDS_ENABLED` is on under <span class="sidebar-path">Settings → Store Settings</span> (off by default). While it is off, shoppers cannot buy or use a card, and cards do not expire. That time is added to every active card's expiry when you turn them back on.
- **The code is all anyone needs.** Whoever has it can pay with the card. Be careful who you send exports of this list to.
- **At checkout** a shopper can use up to three cards per order. If the cards cover the whole amount, the order counts as paid at once. Otherwise they pay the rest with one of your payment methods.
- **A gift card combines with any promotion.** It is not a coupon and has no conditions.
- **Refunds.** On a cancellation, the card gets back everything it paid. On a refund, the money the shopper paid with their payment method (a bank card, say) is returned first, and only what is left goes back onto the gift card. If the card expired in the meantime, it gets a new validity so the money can be spent. See [Refunds & disputes](/admin/sales/refunds-and-disputes).
- **A lost payment dispute** (chargeback) does not give value back to the gift card.
- **Expiry.** Every night expired cards are set to zero. The recipient gets a reminder email 30 days before, once; change the number of days with `GIFT_CARD_EXPIRY_REMINDER_DAYS` (0 = no reminder). A new card's default validity is `GIFT_CARD_VALIDITY_DAYS` (1825 days).
- **Buying from the storefront.** A shopper buys a card of €10 to €500 (`GIFT_CARD_MIN_AMOUNT` and `GIFT_CARD_MAX_AMOUNT`) and pays online. It is not an order: no stock, no shipping, no receipt. The buyer gets a confirmation email and the recipient gets the card.
- **Refunding a card purchase.** If you refund the full amount from your Viva Wallet or Stripe account, the card is cancelled automatically. If the shopper had already spent part of it, you get an email; that email can be [switched off](/admin/help/automatic-tasks#stop-an-email-to-the-store).
- **myDATA.** Selling a gift card is not reported. When an order is paid with a card, the payment type reported is set by `MYDATA_GIFT_CARD_PAYMENT_TYPE` (3 = cash, the default; 5 = on credit). Ask your accountant before changing it.

## Related

- [Promotions](/admin/marketing/promotions)
- [Refunds & disputes](/admin/sales/refunds-and-disputes)
- [Receipts](/admin/sales/receipts)
- [Store settings](/admin/settings/store-settings)
