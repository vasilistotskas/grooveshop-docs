---
title: VAT rates
description: "The VAT rates your products can have, which ones are allowed, how to move many products to another rate, and what happens to orders already placed."
---

# VAT rates

<span class="sidebar-path">Settings → VAT Rates</span>

Every product has one VAT rate. The rate turns the product's net price into the price the shopper pays. Most stores need two or three rates, for example 24%, 13% and 6%.

## What you see

| Column | What it shows |
|---|---|
| **VAT Rate** | The percentage. |
| **Category** | A coloured label by size, such as **Tax Free** (0%) or **Standard Rate**. Only a reading aid. |
| **Usage** | How many products have this rate. |
| **Price Examples** | What €10, €50 and €100 net become with the VAT. |
| **Created At** / **Updated At** | Date and time. |

The **Usage Status** filter shows rates that are **Currently in Use**, **Not in Use**, **Popular (5+ products)** or **Rarely Used (1-2 products)**. A rate's page has one field, **Value**.

**Only the rates myDATA accepts are allowed:** 24, 17, 13, 9, 6, 4, 3 and 0. Any other value is refused when you save, so no receipt is issued that AADE would reject.

## Tasks

### Add a rate

1. Click **Add**, enter the **Value** (for example 13) and save.
2. Give it to the products that need it, on each product's page under [Products](/admin/catalog/products).

### Move many products to another rate

1. Create the new rate, if it does not exist.
2. Change the rate on the products, one by one.
3. When the old rate shows **0 products** under **Usage**, delete it.

Do not change the **Value** of a rate in use unless the law changed: all its products change their final price at once.

### The law changed (say 13% became 14%)

1. Change the rate's **Value** and save. Prices and search update by themselves.
2. Clear the **Products** cache on the [Cache](/admin/settings/cache) page, so the storefront pages show the new prices.

If the new rate is not one myDATA accepts, saving is refused. Get in touch with [support](/admin/help/contact-support).

## Things to know

- **Orders do not change.** Each order line keeps the price and the rate it was sold at. Changing or deleting a rate does not touch orders and receipts already made.
- **Deleting a rate in use.** Its products are left without a rate, which means 0% VAT and a lower final price. Check **Usage** first.
- **A new product** has no rate until you pick one. Without a rate it sells at 0%.
- **One rate per product**, whatever the destination country.
- **Shipping and the payment fee** have no rate of their own. They are taxed at the rate of the order's products. If the order mixes rates, they are split by value. For example, with €60 of products at 24% and €40 at 13%, €5 shipping splits into €3 at 24% and €2 at 13%.
- **Discounts and gift cards.** A promotion's discount lowers the value of the products it covers, and so their VAT. A gift card is a payment and does not change the VAT.
- If an order line was entered with the wrong rate, it is corrected on the order itself. See [Receipts](/admin/sales/receipts).

## Related

- [Products](/admin/catalog/products)
- [Receipts](/admin/sales/receipts)
- [Cache](/admin/settings/cache)
