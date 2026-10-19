---
title: Store profile
description: Your store's name, logo, colours, emails and the credentials that connect it to Viva Wallet, Stripe, ACS, BoxNow and myDATA.
---

# Store profile

<span class="sidebar-path">Settings → Store Profile</span>

This is your store's identity: name, logo, colours, contact email and the credentials for payments, couriers and myDATA. Admins and Owners can open it.

## What you see

A form with tabs. Some fields are read-only: the platform team sets those, such as the plan, billing, the plan's features and the currency.

| Tab | What you change |
|---|---|
| **Store** | Nothing. It shows the store's details on the platform. |
| **Plan & Billing** | Nothing. It shows your plan and until when it is paid. |
| **Branding** | Name, description, language, logos, colours and social links. |
| **Features** | Nothing. It shows which features your plan includes. |
| **Marketing** | The IDs for Google Analytics, Google Ads, Meta and TikTok. |
| **Email & Security** | **Contact Email**, **From Email** and **TOTP Issuer**. |
| **Payments** | Your Viva Wallet and Stripe credentials. |
| **Shipping** | Your ACS and BoxNow credentials. |
| **Invoicing & myDATA** | Your AADE myDATA credentials. |

## Tasks

### Change the logo and colours

1. Open the **Branding** tab.
2. In **Logo (Light)** and **Logo (Dark)** enter the address (URL) of the image. The light logo is for light backgrounds, the dark one for dark backgrounds.
3. Choose a **Primary Color** and a **Neutral Color**. In **Accent Hex** enter a colour code, for example `#003DFF`.
4. Click **Save**.

### Set the contact email

1. Open the **Email & Security** tab.
2. In **Contact Email** enter the address where customers should reach you.
3. Click **Save**.

This email receives the contact-form messages and shows at the bottom of the store's emails. When customers reply to a store email, the reply goes there. Operational alerts arrive there too, for example about a parcel that is not moving. If you leave it empty, contact-form messages and replies go to the `CONTACT_EMAIL` setting instead; if that is empty too, contact-form messages reach no one. The email shown on the store's pages is `INVOICE_SELLER_EMAIL` in [Store settings](/admin/settings/store-settings).

### Enter the credentials of a payment provider or courier

1. Open the **Payments** or **Shipping** tab.
2. Copy each credential from your Viva Wallet, Stripe, ACS or BoxNow account into the matching field.
3. Click **Save**.
4. Switch the method or courier on. See [Payment methods](/admin/settings/payment-methods) and [Shipping providers](/admin/settings/shipping-providers).

### Take Viva Wallet or BoxNow live

Both have separate credentials for testing and for real sales.

- **Viva Wallet**: when you enter the live credentials, set **Viva Wallet Live Mode** to Yes. Otherwise payments go to Viva Wallet's test environment and you are not paid.
- **BoxNow**: tick **BoxNow Live Mode** when you enter the live credentials. While it is off, the store talks to BoxNow's test environment.

The switch must always match the credentials you entered.

## Things to know

- **Language.** The **Default Locale** is the language of the emails the platform sends to you, for example about a new review. It must be one of the store's languages. Which languages the store has is set by the platform team.
- **Description in other languages.** The **Store Description** is in the default language. For another language fill in **Store Description (other languages)**, for example `{"en": "Handmade jewellery from Thessaloniki"}`.
- **Sender email.** The **From Email** (e.g. orders@your-domain.com) takes effect only after the platform team confirms it. Until then emails go out from the platform's address with your store's name.
- **TOTP Issuer.** The name your customers see in the code app on their phone. Empty means the store name.
- **Google Ads.** Enter the **Google Ads Conversion ID** first (`AW-` followed by digits). Without it, saving refuses the conversion labels.
- **Something read-only you want changed**, such as the currency, the languages or the plan: ask the platform team.
- Changes show on the store within a few minutes. If a page still shows the old logo, clear **Storefront pages** on [Cache](/admin/settings/cache).
- The store's operating settings (switches, limits, legal details) are on another page: [Store settings](/admin/settings/store-settings).

## Related

- [First steps](/admin/getting-started/first-steps)
- [Store settings](/admin/settings/store-settings)
- [Payment methods](/admin/settings/payment-methods)
- [Shipping providers](/admin/settings/shipping-providers)
- [BoxNow](/admin/shipping/boxnow)
