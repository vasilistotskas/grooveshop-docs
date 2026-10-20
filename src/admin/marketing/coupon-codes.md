---
title: Coupon codes
description: "The codes a shopper types at checkout to get a promotion: one easy code, bulk single-use codes, personal coupons and switching a code off."
---

# Coupon codes

<span class="sidebar-path">Marketing → Promotions → Coupon Codes</span>

A coupon code is the word a shopper types at checkout to get a promotion whose **Trigger** is **Coupon code**. The code holds only its name and its limits; the discount, the dates and the conditions are set on the [promotion](/admin/marketing/promotions).

## What you see

| Column | What it shows |
|---|---|
| **Code** | The code, always in capitals. Shoppers may type it in lower case. |
| **Promotion** | The promotion it unlocks. |
| **Usage Limit** | How many orders may use it. Empty means unlimited, 1 means single-use. |
| **Assigned To** / **Assigned To Email** | Filled in when the coupon is personal. |
| **Active** | An inactive code is refused at checkout. |
| **Created At** | Date and time it was created. |

Search finds a code or the email of the customer it is assigned to. The bulk actions **Export selected to CSV** and **Export selected to XML** give you a file to email or print.

## Tasks

### One easy code for everyone

1. Click **Add**, pick the **Promotion** and type the **Code** (for example `SUMMER10`).
2. Leave **Usage Limit** empty and **Active** ticked. Save.

### Many single-use codes

1. Open the promotion and click **Generate codes** at the top right.
2. Fill in **Number of codes** (up to 10,000), a **Prefix** if you want one (for example `VIP-`), **Random part length** (6 to 24 characters) and **Usage limit per code** (1 for single-use).
3. Confirm. Come back to this list, filter by the promotion, tick the codes and export them to CSV.

The codes never contain 0, O, 1 or I, so they cannot be mistyped.

### A personal coupon for one customer

1. Add a code and pick the customer in **Assigned To**. If they shop without an account, enter their email in **Assigned To Email**.
2. Only that customer can use it. When signed in, they see the code in the checkout's coupon list; it never appears on the public offers page.

### A code has leaked

1. Open it and untick **Active**. Save.

## Things to know

- **The storefront updates on its own** within about ten seconds when you add, change or generate codes.

- **The dates belong to the promotion.** A code stops working when the promotion's **Ends At** passes or when you deactivate the promotion.
- **Three limits at once.** The code's **Usage Limit**, the promotion's **Total Usage Limit** and its **Per-customer Usage Limit** all apply. The strictest wins.
- **One code per cart.** A new code replaces the previous one. If the new code does not exist, is switched off or its promotion is not running, it is refused and the previous code stays. If the cart or the customer does not qualify for it, the shopper sees why and the cart is left with no code.
- **Each code exists once in the whole store**, even across different promotions.
- **What shoppers see on the offers page.** A code promotion appears only if it has an active code that is neither personal nor single-use.
- **Business customers.** Carts with wholesale prices refuse coupons unless `B2B_ALLOW_PROMOTIONS` is on under <span class="sidebar-path">Settings → Store Settings</span>.
- Who used each code is listed under [Redemptions](/admin/marketing/redemptions).

## Related

- [Promotions](/admin/marketing/promotions)
- [Redemptions](/admin/marketing/redemptions)
- [Cache](/admin/settings/cache)
