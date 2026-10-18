---
title: Gift cards
description: Issuing gift cards, the balance ledger, delivery emails, redemption at checkout, refunds back to the card, expiry and the feature switches.
---

# Gift cards

<span class="sidebar-path">Marketing → Gift Cards → Gift Cards</span>

A gift card is stored value: a secret code with a balance that the shopper spends at checkout. It is a payment, not a discount, so it never lowers the taxable value of an order. Balance is never stored as a number; it is the sum of an append-only ledger, which is what makes every card auditable.

Gift cards ship dark. They work only when the platform has enabled them for the store and `GIFT_CARDS_ENABLED` is on under [Store settings](/admin/settings/store-settings). The sidebar follows the same two switches: without gift cards on your plan the **Gift Cards** menu is not shown at all; with them on the plan but the setting off, the menu stays and carries an **Off** badge, so you can issue cards before shoppers can redeem them.

While the setting is off, shoppers cannot check a balance, buy a card or see their cards, and nothing moves on its own: no card expires, no expiry reminder goes out and no scheduled card is delivered. The time gift cards are off does not count against a card: when you switch them back on, the **Expires At** of every active card that had not yet expired when you switched them off moves forward by that time, and scheduled cards go out with the next daily run. A shopper who has just paid for a card still sees the purchase complete.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Code** | The bearer secret. Anyone with the code can spend the balance. |
| **Balance** | Current value, from the ledger. |
| **Initial Value** | Value at issue. |
| **Status** | **Active**, **Disabled**, or **Expired** (an active card past its expiry date). |
| **Source** | **Issued by admin** or **Purchased in store**. |
| **Recipient Email** | Where the card was or will be delivered. |
| **Expires At** | Expiry date, empty for never. |
| **Delivered At** | When the delivery email went out. |

Filters: status, source, expiry and creation date ranges. Search by code, recipient email or the email of the account the card is linked to. A **Ledger** panel under the list shows the most recent transactions.

### The card page

Two tabs. **Card**: code (read-only), **Initial Value**, **Status**, **Expires At**, source, the purchase it came from, and **Issued To**, an optional account link that makes the card appear under the customer's "My gift cards". **Delivery**: **Recipient Email**, **Recipient Name**, **Sender Name**, **Message**, **Deliver At** and the read-only **Delivered At**.

Header actions: **Adjust balance**, **Disable card**, **Resend delivery email**.

### The ledger

Every change to a card is a signed row of one kind:

| Kind | Sign | Written by |
|---|---|---|
| **Issue** | + | Issuing the card. |
| **Redeem** | − | Checkout, one row per order. |
| **Refund credit** | + | An order paid with the card being canceled or fully refunded. |
| **Adjust** | + or − | You, through **Adjust balance**, with a reason. |
| **Expire** | − | The nightly expiry sweep, zeroing the remaining balance. |

<span class="sidebar-path">Marketing → Gift Cards → Transactions</span> lists every row read-only, with CSV and XML export. <span class="sidebar-path">Marketing → Gift Cards → Purchases</span> lists storefront purchases with their payment status (Pending payment, Paid, Failed, Canceled), also read-only.

## Tasks

### Issue a card by hand
1. **Add gift card**. Enter **Initial Value**. Leave **Expires At** empty to use the default validity (`GIFT_CARD_VALIDITY_DAYS`, 1825 days, the five years Greek consumer law requires) or set a date.
2. Optionally link **Issued To** so the customer sees it in their account.
3. On the **Delivery** tab fill **Recipient Email** and the personal fields.
4. Save. The code is generated and the **Issue** row written.
5. Send it: either set **Deliver At** to a date (the daily 06:00 sweep sends cards whose date has arrived) or click **Resend delivery email** now. An admin-issued card is not emailed just by saving.

### Correct a balance
1. Open the card, **Adjust balance**.
2. Enter a positive amount to add or a negative amount to remove (never more than the current balance) and a **Reason**. The reason is recorded on the ledger row with your name.

### Block a card
1. **Disable card** in the header. The card is refused at checkout immediately; the balance stays on the ledger.
2. To reactivate, set **Status** back to **Active** on the Card tab.

### Resend the delivery email
1. **Resend delivery email**. The delivered timestamp is cleared and a new email queued to the recipient address.

## How redemption works

- At checkout the shopper enters one or more codes. Cards must be active, not expired, with a positive balance and in the store currency.
- Cards are drained smallest balance first. The amount taken never exceeds what is due, and the provider still charges the remainder, if any. If the card covers the whole total the order is settled without a provider and its payment status becomes **Completed** at once.
- Each order gets exactly one **Redeem** row per card; the order shows the total under **Gift Card Amount** on its Payment Information tab.
- The storefront balance check is rate-limited because a code is a secret.

## Refunds and cancellations

When an order that was paid partly or fully with gift cards is canceled or **fully** refunded, each card gets back exactly what it paid for the order, as one **Refund credit** row; the provider refund covers only what the provider charged. A partial refund credits nothing to the cards: their part comes back, whole, with the refund that returns the rest of the money, or with a cancellation. If a customer needs card value back sooner, use **Adjust balance**. A card that expired while its value sat on the order gets a fresh validity window so the credit is spendable. Each card is credited at most once per order.

A refund of a **gift card purchase** made in the Viva Wallet dashboard is added up on the purchase, under **Refunded Amount** in **Purchases**. The card is voided (its balance set to zero and the card disabled) only once the refunds reach the whole purchase amount; a partial refund leaves the card and its balance alone. A card that has already been spent is not voided: the platform team is alerted and decides what to do.

## Expiry

- Every night at 03:00 active cards past **Expires At** with a positive balance get an **Expire** row that zeroes them.
- `GIFT_CARD_EXPIRY_REMINDER_DAYS` (30) before expiry, a reminder email goes to the recipient, once per card, from the daily 06:00 sweep; 0 disables reminders.
- Empty **Expires At** means the card never expires.
- Neither run happens while `GIFT_CARDS_ENABLED` is off (see above).

## Things to know

- **The code is the only secret.** Linking an account is a convenience for the customer; redemption needs the code alone. Treat exports of this list accordingly.
- **Never edit the ledger.** Corrections are new **Adjust** rows; that is why the transactions screen is read-only.
- **Storefront purchases** are limited to `GIFT_CARD_MIN_AMOUNT` to `GIFT_CARD_MAX_AMOUNT` (10 to 500 by default), paid through the store's online provider, and are not orders: no stock, no shipping, no invoice. The buyer gets a receipt email and the recipient gets the card, immediately or on the chosen date. The sale of a card is never submitted to myDATA; VAT is due when goods are bought with it.
- **A card is not a coupon.** It has no conditions, targeting or stacking rules and can be combined with any promotion. See [Promotions](/admin/marketing/promotions).
- **VAT and receipts**: the receipt shows the full goods value and VAT; the gift-card amount appears as a payment. See [Receipts and credit documents](/admin/sales/receipts).

## Related

- [Orders](/admin/sales/orders)
- [Promotions](/admin/marketing/promotions)
- [Coupon codes](/admin/marketing/coupon-codes)
- [Store settings](/admin/settings/store-settings)
