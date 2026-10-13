---
title: Coupon codes
description: "Coupon codes attached to code-triggered promotions: single codes, bulk generation, per-code and per-customer limits, personal coupons, expiry and usage tracking."
---

# Coupon codes

<span class="sidebar-path">Marketing → Promotions → Coupon Codes</span>

A coupon code is the word a shopper types at checkout to unlock a promotion whose trigger is **Coupon code**. The code carries only identity and limits; the discount, the schedule, the targeting and the conditions all live on the promotion. See [Promotions](/admin/sales/promotions).

The screen belongs to the promotions feature and follows its switches: it is not in the sidebar at all when your plan does not include promotions, and while `PROMOTIONS_ENABLED` is off the **Promotions** menu carries an **Off** badge but stays open, so you can prepare codes before shoppers can use them.

## What you see

### The list

| Column | Meaning |
|---|---|
| **Code** | The code, stored in upper case; shoppers can type it in any case. |
| **Promotion** | The promotion it unlocks. |
| **Usage Limit** | Orders that may use this code; empty means unlimited, 1 means single-use. |
| **Assigned To** / **Assigned To Email** | Set when the coupon is personal. |
| **Active** | Inactive codes are refused. |
| **Created** | When it was created. |

Filters: active, promotion, created date. Search by code or by the assigned customer's email. Bulk actions export the selected rows as CSV or XML, for a mailing or a print run.

### The code page

**Promotion**, **Code**, **Usage Limit**, **Assigned To** (an account) or **Assigned To Email** (for guests without an account), **Active**.

## Tasks

### Add one memorable code
1. **Add coupon code**. Pick the promotion, type the code (for example `SUMMER10`), leave **Usage Limit** empty for unlimited use, keep **Active** on.
2. Save, then purge the **Promotions** cache under [Cache](/admin/system/cache) so the offers page picks it up.

### Generate a batch of single-use codes
1. Open the promotion and click **Generate codes** in the header.
2. Fill **Number of codes** (up to 10,000), an optional **Prefix** (upper-cased, for example `VIP-`), the **Random part length** (6 to 24 characters; the alphabet avoids 0/O and 1/I) and **Usage limit per code** (1 for single-use).
3. Confirm. Come back here, filter by the promotion and export to CSV to distribute them.

### Give one customer a personal coupon
1. Add a code and set **Assigned To** to their account, or **Assigned To Email** if they check out as a guest.
2. Only checkouts by that account or email can redeem it. Personal codes never appear on the public offers page.

### Kill a leaked code
1. Open it and untick **Active**, or set **Usage Limit** to the number already used.
2. Purge the **Promotions** cache.

## Things to know

- **Expiry comes from the promotion.** A code has no dates of its own; it stops working when the promotion's **Ends At** passes or the promotion is deactivated.
- **Three limits apply at once**: the code's **Usage Limit**, the promotion's **Total Usage Limit** and its **Per-customer Usage Limit**. The strictest wins. Usage is counted per order from the redemption ledger; every redemption records the code, the order, the customer or the checkout email, and the amount.
- **Codes are unique across the whole store**, not per promotion; bulk generation skips any collision.
- **What the offers page advertises**: a code promotion is listed only when it has at least one active code that is not personal and not single-use. Single-use bulk codes are meant to be handed out, not published.
- **Only one code per cart.** Applying a second code replaces the first. If the cart or the customer cannot use the new code, it is detached again and the cart shows the reason.
- **Wholesale carts** refuse coupons unless `B2B_ALLOW_PROMOTIONS` is on. See [Customer groups & price lists](/admin/b2b/groups-and-price-lists).
- Redemptions are read-only under <span class="sidebar-path">Marketing → Promotions → Redemptions</span>, with export.

## Related

- [Promotions](/admin/sales/promotions)
- [Gift cards](/admin/sales/gift-cards)
- [Orders](/admin/sales/orders)
- [Cache](/admin/system/cache)
