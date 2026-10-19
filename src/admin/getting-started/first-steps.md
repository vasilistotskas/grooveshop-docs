---
title: First steps
description: What to set up before the store opens, in order, from the legal details to a test order.
---

# First steps

A checklist for opening the store. Follow it in order. Most steps need the Admin or Owner role.

## Tasks

### 1. The business's legal details

1. Open <span class="sidebar-path">Settings → Store Settings</span>.
2. Type `INVOICE_SELLER_` in the search.
3. Fill in the company name, legal form, VAT ID, tax office, GEMI number, address and email.

The law requires these details on the store, and they are printed on receipts. While something is missing, the Dashboard reminds you. See [Store settings](/admin/settings/store-settings).

### 2. Payment methods

1. Enter your Viva Wallet or Stripe credentials on the **Payments** tab of <span class="sidebar-path">Settings → Store Profile</span>.
2. Switch on the methods you want in <span class="sidebar-path">Settings → Payment Methods</span>.

See [Store profile](/admin/settings/store-profile) and [Payment methods](/admin/settings/payment-methods).

### 3. Shipping

1. Enter your ACS or BoxNow credentials on the **Shipping** tab of the store profile.
2. Switch the couriers on and set their rates in <span class="sidebar-path">Settings → Shipping Providers</span>.
3. Set the same-day dispatch time (`DISPATCH_CUTOFF`) in Store Settings.

See [Shipping providers](/admin/settings/shipping-providers).

### 4. VAT

Check the rates in <span class="sidebar-path">Settings → VAT Rates</span>, and that every product has the right one. See [VAT rates](/admin/settings/vat-rates).

### 5. Logo, colours and contact email

On the **Branding** tab of the store profile add your logo and colours. On the **Email & Security** tab enter the **Contact Email**. See [Store profile](/admin/settings/store-profile).

### 6. A test order

1. Open the store, put a product in the cart and complete the order at checkout.
2. Check that the confirmation email arrived and the order shows in <span class="sidebar-path">Sales → Orders</span>.
3. Select the order in the list and run **Cancel selected orders and restore stock**.

## Things to know

- Every order sent with ACS or BoxNow creates a real voucher (the shipping label) with the courier: a cash-on-delivery or bank-transfer order straight away, a card order once it is paid. For the test choose another delivery method, or ask the platform team first.
- A card payment made while **Viva Wallet Live Mode** is not on goes to Viva Wallet's test environment. Go live before you open. See [Store profile](/admin/settings/store-profile).
- Add your colleagues to the team. See [Roles & team](/admin/getting-started/roles-and-team).

## Related

- [Welcome](/admin/)
- [Store settings](/admin/settings/store-settings)
- [Orders](/admin/sales/orders)
- [When to contact support](/admin/help/contact-support)
