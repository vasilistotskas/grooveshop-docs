---
title: Loyalty
description: "The Loyalty programme: how customers earn and spend points, tiers and levels, what happens on cancellations and refunds, and its settings."
---

# Loyalty

<span class="sidebar-path">Customers → Loyalty → Loyalty Tiers</span> and <span class="sidebar-path">Customers → Loyalty → Points Transactions</span>

With Loyalty, customers with an account earn **points** from their orders and spend them as a discount at checkout. Alongside, they collect **XP** (experience points), which do not go down when they spend and move them up a **level** and a **tier**.

## What you see

### Loyalty Tiers

| Column | What it shows |
|---|---|
| **Name** | The tier's name, with its icon. |
| **Required Level** | From which level up a customer enters this tier. |
| **Points Multiplier** | For example 1.5: customers in the tier earn 50% more points, if `LOYALTY_TIER_MULTIPLIER_ENABLED` is on. |

### Points Transactions

The movement history of all customers, read-only.

| Column | What it shows |
|---|---|
| **User** | The customer. |
| **Points** | Positive when added, negative when taken off. |
| **Transaction Type** | **Earn**, **Bonus**, **Redeem**, **Expire** or **Adjust**. |
| **Reference Order** | The order that caused it. |
| **Created At** | Date and time. |

On the customer's page (<span class="sidebar-path">Customers → Customers</span>) the **Loyalty & Engagement** section shows **Points Balance**, **Total XP**, **Level** and **Tier**.

## Tasks

### Turn the programme on

1. Ask the platform team to confirm your plan includes Loyalty.
2. Check the settings in the table below, under <span class="sidebar-path">Settings → Store Settings</span>.
3. Create tiers, for example "Silver" with **Required Level** 3 and "Gold" with 10.
4. Turn on `LOYALTY_ENABLED` (off by default). Points start with the next completed order.

### Explain a balance to a customer

1. Open **Points Transactions** and filter by **User**.
2. Read the rows in order: earnings per product, bonus, redemptions, expiries and corrections from cancellations or refunds.

### Add or remove points by hand

Only the platform team can do this. Send them the customer, the points and the reason.

### Change tier thresholds

Change the tier's **Required Level**. Two tiers cannot share a level. Customers change tier the next time they gain or lose XP, not straight away.

## How it works

**Earning.** When an order becomes **Completed**, the customer earns points for each product. With the defaults, 1 point per euro of the final price, rounded down. Example: a €24.80 product gives 24 points. If you set **Bonus Points** 5 on the product, it gives 29. The same amount is added to XP.

**Redeeming.** At checkout the customer chooses how many points to use. With the default, 100 points = €1 off. The discount covers only the products, not shipping or the payment fee. One redemption per order.

**Level and tier.** With the default, every 1,000 XP is one level: 2,500 XP means level 3. The tier is the highest one the level allows. When a customer moves up a tier they get a notification; when they move down, they do not.

**Cancellation or full refund.** The customer gets back the points they spent on the order, and loses the points and XP they earned from it, plus the new-customer bonus if it came from this order.

**Partial refund.** If the order was partly paid with points, some of them may be given back to the customer. The points they earned are not taken off until all of the order's money has been returned.

**Lost payment dispute (chargeback).** The customer loses the points they earned but does not get back the ones they spent. If you want to give them back, ask the platform team. See [Refunds & disputes](/admin/sales/refunds-and-disputes).

### Negative balance

If the customer already spent the points of an order that was later canceled, the `LOYALTY_REFUND_ALLOWS_NEGATIVE_BALANCE` setting decides what happens:

- **On (default):** all the points are taken off and the balance goes negative. Later purchases pay it off, and the customer cannot redeem until it is positive again. That way nobody keeps points from a canceled order.
- **Off:** the deduction stops at zero and the points already spent stay spent.

Leave it on unless you want to be more lenient with your customers.

## Settings

All under <span class="sidebar-path">Settings → Store Settings</span>.

| Setting | What it does | Default |
|---|---|---|
| `LOYALTY_ENABLED` | Turns the whole programme on or off, earning and redeeming together. | Off |
| `LOYALTY_POINTS_FACTOR` | Points per euro. With 2, each euro gives 2 points. | 1 |
| `LOYALTY_PRICE_BASIS` | Which price counts for points: the final price, or the price without VAT or without discount. | Final price |
| `LOYALTY_REDEMPTION_RATIO_EUR` | How many points make €1 off. | 100 |
| `LOYALTY_XP_PER_LEVEL` | How much XP each level takes. | 1000 |
| `LOYALTY_TIER_MULTIPLIER_ENABLED` | Higher tiers earn more points, by their **Points Multiplier**. | Off |
| `LOYALTY_NEW_CUSTOMER_BONUS_ENABLED` / `LOYALTY_NEW_CUSTOMER_BONUS_POINTS` | Bonus points on the first order that earns points. Adds no XP. | Off / 100 |
| `LOYALTY_POINTS_EXPIRATION_DAYS` | After how many days points expire. 0 = never. | 0 |
| `LOYALTY_REFUND_ALLOWS_NEGATIVE_BALANCE` | See "Negative balance" above. | On |
| `B2B_LOYALTY_ENABLED` | Whether wholesale-priced orders earn and redeem points. | Off |

On each product's page, the **Points Coefficient** multiplies its points (0 = no points) and **Bonus Points** adds a fixed number. See [Products](/admin/catalog/products).

## Things to know

- **Customers with an account only.** Guest orders earn no points.
- **Points arrive at Completed**, not at payment. For cash on delivery that happens when the courier pays the money over, a few days after delivery.
- **While the programme is off**, customers cannot earn, spend or see their balance, but balances stay. That time does not count towards points expiry. The menu shows an **Off** badge, so you can prepare the tiers.
- **Expiry.** Every night, points older than `LOYALTY_POINTS_EXPIRATION_DAYS` expire, never more than the customer holds.
- **Deleting a tier** leaves its customers without a tier until their XP next changes. Better to raise its **Required Level** very high.

## Related

- [Users & addresses](/admin/customers/users-and-addresses)
- [Products](/admin/catalog/products)
- [Refunds & disputes](/admin/sales/refunds-and-disputes)
- [Customer groups & price lists](/admin/customers/groups-and-price-lists)
- [Store settings](/admin/settings/store-settings)
