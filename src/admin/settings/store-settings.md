---
title: Store settings
description: How to change one of the store's operating settings, how to switch a feature on, and what each setting does, by category, with its default.
---

# Store settings

<span class="sidebar-path">Settings → Store Settings</span>

These are the store's operating settings: feature switches, limits, legal details, alert emails. Admins and Owners can change them.

## What you see

A list with one row per setting. Columns: **Name**, **Category**, **Type**, **Current Value**, **Description**. Above the list you search by name or description. Under **Filters** you pick a **Category**.

A setting's form has three parts: **Setting Information**, **Value** and **Validation**. You fill in only the value field that matches the **Type**. For example, a switch is the **Value (Boolean)** tick box.

## Tasks

### Change a setting

1. Open <span class="sidebar-path">Settings → Store Settings</span>.
2. Type the setting's name in the search, for example `DISPATCH_CUTOFF`, and open it.
3. Change the value and click **Save**.

If the value is not in the right format, saving is refused with a message and nothing changes.

### Switch a feature on

Several features need two things: your plan must include them, and you switch their setting on yourself.

1. Look at the sidebar. If the feature is there marked **Off**, your plan includes it. If it is missing, ask the platform team.
2. Prepare what it needs (tiers, coupons, price lists). Its pages work normally while it is **Off**.
3. Open the feature's setting from the table below and tick **Value (Boolean)**.

| Feature | Sidebar | Setting |
|---|---|---|
| Loyalty | <span class="sidebar-path">Customers → Loyalty</span> | `LOYALTY_ENABLED` |
| Wholesale | <span class="sidebar-path">Customers → Wholesale</span> | `B2B_WHOLESALE_ENABLED` |
| Promotions and coupons | <span class="sidebar-path">Marketing → Promotions</span> | `PROMOTIONS_ENABLED` |
| Gift cards | <span class="sidebar-path">Marketing → Gift Cards</span> | `GIFT_CARDS_ENABLED` |
| Product suggestions | <span class="sidebar-path">Marketing → Recommendations</span> | `PRODUCT_SUGGESTIONS_ENABLED` |

The Blog has no setting of yours: it appears when your plan includes it.

### Turn reviews off across the store

1. Open the setting `PRODUCT_REVIEWS_ENABLED`.
2. Untick **Value (Boolean)** and click **Save**.

Reviews leave the product pages, the review form goes, and so do the stars on product cards. **Reviews** also leaves the admin sidebar. The reviews you already have stay and show again as soon as you switch it back on.

### Add an announcement bar

The announcement bar is a line above the store's header. Open the setting `ANNOUNCEMENT_BAR` and enter in **Value (JSON)**:

```json
{
  "enabled": true,
  "text": "Δωρεάν μεταφορικά για αγορές άνω των 50 €",
  "shortText": "Δωρεάν μεταφορικά άνω των 50 €",
  "code": "AUTUMN10",
  "link": "/products",
  "color": "primary",
  "dismissible": true,
  "id": "autumn",
  "i18n": { "en": { "text": "Free shipping on orders over €50" } }
}
```

- `text`: the message, up to 200 characters, in the store's main language. `shortText` (up to 80) shows on phones.
- `code`: an optional coupon code, one word of up to 40 characters, the same in every language.
- `link`: optional, a store page (starts with `/`) or an address starting with `https://`.
- `color`: one of `primary`, `secondary`, `neutral`, `info`, `success`, `warning`, `error`.
- `dismissible`: whether the visitor can close it. Change the `id` to show the bar again to those who closed it.
- `i18n`: the text in another language.

To remove it, set `enabled` to `false`.

### Set the same-day dispatch time

1. Open the setting `DISPATCH_CUTOFF`.
2. Enter the time as HH:MM, for example `14:00`. The default is `15:00`.

An order placed before this time on a working day ships the same day. After it, or on a weekend or public holiday, it ships the next working day. The estimated delivery date and the "order before…" line on the store come from this. Empty means every order on a working day ships that day.

## Settings by category

Defaults are the values a new store starts with. Amounts are in euros.

### Storefront UI

| Setting | What it does | Default |
|---|---|---|
| `MOBILE_BOTTOM_NAV_ENABLED` | The navigation bar at the bottom of the screen on phones. | on |
| `STICKY_ADD_TO_CART_ENABLED` | The "add to cart" bar that stays on screen as you scroll a product page. | on |
| `RECENTLY_VIEWED_ENABLED` | The "Recently viewed" strip on the home page. | on |
| `CHAT_WIDGET_ENABLED` | The AI shopping assistant button. Agent commerce must be on too. | on |
| `PRODUCT_REVIEWS_ENABLED` | Reviews everywhere: on product pages, the stars on cards, the customers' "My reviews". | on |
| `PRODUCT_REVIEWS_PURCHASE_REQUIRED` | Only someone who bought the product can review it. Off: any signed-in customer can. A buyer's review always carries the verified-purchase badge. Switch it off if you want more reviews early on. | on |
| `ACCOUNT_REVIEWS_ENABLED` | The "My reviews" page in the customer's account. Does not affect reviews on product pages. | on |
| `BLOG_COMMENTS_ENABLED` | Comments and likes under blog posts. | on |
| `FAVOURITES_ENABLED` | Favourites: the hearts, the favourites page and the emails when a favourite drops in price or is back in stock. | on |
| `NEWSLETTER_ENABLED` | Newsletter subscriptions from the customer's account. Unsubscribe links in emails already sent always work. | on |
| `FEEDBACK_ENABLED` | The store's feedback page. | on |
| `PRODUCT_ALERTS_ENABLED` | The "notify me" alerts for back in stock or price drop, and their emails. | on |

### Invoicing & myDATA

Fill in the business details **before the first receipt**. They are printed on every receipt and shown at the bottom of the store. To find them all together, search for `INVOICE_SELLER_`.

| Setting | What it does | Default |
|---|---|---|
| `INVOICE_SELLER_NAME` | Company name. | empty |
| `INVOICE_SELLER_LEGAL_FORM` | Legal form (IKE, AE, OE, sole trader). The law requires it on the store. | empty |
| `INVOICE_SELLER_VAT_ID` | VAT ID (ΑΦΜ). | empty |
| `INVOICE_SELLER_TAX_OFFICE` | Tax office (ΔΟΥ). | empty |
| `INVOICE_SELLER_REGISTRATION_NUMBER` | GEMI number. | empty |
| `INVOICE_SELLER_BUSINESS_ACTIVITY` | Business activity. | empty |
| `INVOICE_SELLER_ADDRESS_LINE_1`, `INVOICE_SELLER_ADDRESS_LINE_2`, `INVOICE_SELLER_CITY`, `INVOICE_SELLER_POSTAL_CODE`, `INVOICE_SELLER_COUNTRY` | The registered address. | empty |
| `INVOICE_SELLER_PHONE`, `INVOICE_SELLER_EMAIL` | Phone and email on the receipt. | empty |
| `INVOICE_SELLER_IN_LIQUIDATION` | Tick only if the business is in liquidation. | off |
| `B2B_INVOICING_ENABLED` | The customer can ask for an invoice instead of a receipt at checkout. | on |
| `B2B_WHOLESALE_ENABLED` | Switches wholesale on (business customers, customer groups, price lists). | off |
| `B2B_ALLOW_PROMOTIONS` | Promotions and coupons also apply on top of wholesale prices. | off |
| `B2B_LOYALTY_ENABLED` | Wholesale orders earn and redeem loyalty points. | off |
| `MYDATA_ENABLED` | The platform itself issues your retail receipts to AADE's myDATA. Off: you issue them in your own fiscal device or with your provider. | off |
| `MYDATA_FHM_EXEMPTION_GROUND` | The legal ground of your exemption from a fiscal device, as your accountant confirmed it. While it is empty, no receipt is issued. | empty |
| `MYDATA_AUTO_SUBMIT` | The receipt is issued by itself when the order ships, and the credit document when money is refunded. | off |
| `MYDATA_ENVIRONMENT` | `dev` for testing (not tax documents) or `prod` for real receipts. | dev |
| `MYDATA_INVOICE_SERIES_PREFIX`, `MYDATA_CREDIT_SERIES_PREFIX` | The series prefix for receipts and credit documents. | GRVP, GRVC |
| `MYDATA_ISSUER_BRANCH` | Your AADE branch code; 0 is the head office. | 0 |
| `MYDATA_GIFT_CARD_PAYMENT_TYPE` | How an amount paid by gift card is declared to AADE: 3 cash, 5 on credit. | 3 |
| `MYDATA_REQUEST_TIMEOUT_SECONDS` | How many seconds the store waits for AADE to answer. Leave it as it is. | 30 |

Set the myDATA settings together with your accountant. See [Receipts](/admin/sales/receipts).

### Promotions & Gift Cards

| Setting | What it does | Default |
|---|---|---|
| `PROMOTIONS_ENABLED` | Switches promotions and coupons on. | off |
| `GIFT_CARDS_ENABLED` | Switches gift cards on. | off |
| `GIFT_CARD_MIN_AMOUNT`, `GIFT_CARD_MAX_AMOUNT` | The smallest and largest gift-card amount a customer can buy. | 10.00 and 500.00 |
| `GIFT_CARD_VALIDITY_DAYS` | How many days a gift card is valid; 0 never expires. Greek law requires at least five years. | 1825 |
| `GIFT_CARD_EXPIRY_REMINDER_DAYS` | How many days before expiry the holder gets a reminder; 0 none. | 30 |

### Loyalty

| Setting | What it does | Default |
|---|---|---|
| `LOYALTY_ENABLED` | Switches loyalty on (earning and redeeming points). | off |
| `LOYALTY_POINTS_FACTOR` | Points per euro. | 1.0 |
| `LOYALTY_PRICE_BASIS` | Which price earns points. | final_price |
| `LOYALTY_REDEMPTION_RATIO_EUR` | How many points make one euro of discount. | 100 |
| `LOYALTY_REDEMPTION_RATIO_USD` | Does not apply, since the store sells in euros. | 100 |
| `LOYALTY_POINTS_EXPIRATION_DAYS` | After how many days points expire; 0 never. | 0 |
| `LOYALTY_TIER_MULTIPLIER_ENABLED` | Tiers multiply the points earned. | off |
| `LOYALTY_NEW_CUSTOMER_BONUS_ENABLED`, `LOYALTY_NEW_CUSTOMER_BONUS_POINTS` | Welcome points for a new customer, and how many. | off, 100 |
| `LOYALTY_XP_PER_LEVEL` | Experience points (XP) per level. | 1000 |
| `LOYALTY_REFUND_ALLOWS_NEGATIVE_BALANCE` | What happens to an order's points when it is refunded. See [Loyalty](/admin/customers/loyalty). | on |

### Shipping

Shipping costs, free-shipping thresholds and countries are not here. They are on each courier's rates: see [Shipping providers](/admin/settings/shipping-providers).

| Setting | What it does | Default |
|---|---|---|
| `ACS_SMARTPOINT_ENABLED` | The customer can choose pickup from an ACS Smartpoint at checkout. | off |
| `ACS_DYNAMIC_PRICING_ENABLED` | ACS works out the shipping cost at checkout. If ACS does not answer, the normal rate is charged. | off |

### Orders & Checkout

| Setting | What it does | Default |
|---|---|---|
| `CART_ENABLED` | The cart on the store. Switch it off only if the store does not sell yet. | on |
| `STOCK_RESERVATION_TTL_MINUTES` | How many minutes stock is held for a customer who is at checkout. | 30 |
| `ORDER_MAX_UNPAID_ONLINE_ORDERS` | How many unpaid online-payment orders one customer can have at once. Each one holds stock. Past the limit, the customer must pay or cancel one. 0 means no limit. | 5 |
| `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES` | Minutes after a failed online payment until the order is canceled and its stock returns. | 30 |
| `ORDER_FOLLOW_UP_DAYS` | After how many days without delivery an order goes into **Orders to follow up**. 0 turns it off. | 7 |
| `CHECKOUT_ABANDONMENT_HOURS` | After how many hours an unfinished checkout gets a reminder email. | 2 |
| `CART_ABANDONED_HOURS` | After how many hours without activity a cart counts as abandoned in the **Carts** list. | 24 |
| `ABANDONED_CART_CLEANUP_DAYS` | After how many days empty guest carts are deleted. | 7 |
| `OLD_GUEST_CART_CLEANUP_DAYS` | After how many days guest carts are deleted. | 30 |

Low stock is not a setting here. The low-stock email (checked every hour) uses each product's own **Low Stock Threshold**, set on [Products](/admin/catalog/products). The number beside **Products** in the sidebar and **Running low on stock** on the [Dashboard](/admin/getting-started/dashboard) count active products with 1 to 9 units left.

### Emails & Engagement

| Setting | What it does | Default |
|---|---|---|
| `CONTACT_EMAIL` | Used only while the **Contact Email** on the [Store profile](/admin/settings/store-profile) is empty. It then receives the contact-form messages and is the reply address of the store's emails. The email shown on the store's pages is `INVOICE_SELLER_EMAIL`. | empty |
| `REENGAGEMENT_EMAIL_MAX_COUNT`, `REENGAGEMENT_EMAIL_COOLDOWN_DAYS` | The most "we miss you" emails a customer gets, and how many days apart. | 3, 90 |
| `INACTIVE_USER_THRESHOLD_DAYS` | After how many days without activity a customer counts as inactive. | 60 |
| `CONTACT_RETENTION_DAYS` | After how many days contact messages and feedback are deleted. 0 keeps them forever. | 365 |
| `CONTACT_ATTACHMENTS_ENABLED` | Visitors can attach files to the contact form. | off |
| `CONTACT_ATTACHMENTS_MAX_COUNT` | Files per message. | 3 |
| `CONTACT_ATTACHMENTS_MAX_MB` | Largest size per file in MB. It cannot go above 25. | 10 |
| `CONTACT_ATTACHMENTS_TYPES` | The file types accepted, separated by commas, for example `application/pdf,image/jpeg`. | application/pdf |
| `CONTACT_ATTACHMENTS_RETENTION_DAYS` | After how many days the file is deleted while the message stays. 0 keeps it. | 90 |

See [Messages & feedback](/admin/customers/messages-and-feedback).

### Operational Alerts

Emails to the store when something needs a person. They go to the **Contact Email** and the owner's email on the [Store profile](/admin/settings/store-profile). All start switched on. If you switch one off, only that email stops. Even with the email off, these stay in **Needs attention** on the [Dashboard](/admin/getting-started/dashboard): ACS parcels that are not moving, cash on delivery ACS has not paid out, ACS payouts that match no shipment, canceled orders that still hold a payment, and reviews waiting for approval. The other alerts come only by email.

| Setting | The email comes when |
|---|---|
| `OPS_ALERT_STALE_SHIPMENTS_ENABLED` | Once a day, for ACS parcels without movement or without a voucher. |
| `OPS_ALERT_UNREMITTED_COD_ENABLED` | ACS delivered a cash-on-delivery parcel and has not paid the money out. |
| `OPS_ALERT_UNATTRIBUTABLE_COD_PAYOUTS_ENABLED` | ACS paid out money that matches none of your shipments. |
| `OPS_ALERT_SHIPMENT_REJECTED_ENABLED` | A courier refused to create a shipment, for example because of a wrong address. |
| `OPS_ALERT_WEBHOOK_FAILED_ENABLED` | BoxNow sent a parcel update the store could not apply. |
| `OPS_ALERT_PAYMENT_AFTER_CANCEL_ENABLED` | A payment arrived for an order already canceled, and you have to refund it. |
| `OPS_ALERT_REFUND_FAILED_ENABLED` | A refund through Stripe failed, although the customer had been told it went through. |
| `OPS_ALERT_GIFT_CARD_REVERSAL_ENABLED` | A gift card's payment was disputed, or was refunded or charged back after part of the card had been spent. |
| `OPS_ALERT_PAYMENT_MISMATCH_ENABLED` | A payment does not match its order. The order is not marked paid. |
| `OPS_ALERT_REVIEW_PENDING_ENABLED` | A review is waiting for approval. |

### Agent Commerce

| Setting | What it does | Default |
|---|---|---|
| `AGENT_COMMERCE_ENABLED` | AI shopping assistants can see the catalogue and place orders, and the store's own shopping assistant works. Your plan must include it too. | on |
| `AGENT_HOSTED_PAYMENT_ENABLED` | An AI assistant can choose an online payment, and the customer pays on Viva Wallet's or Stripe's page. | on |
| `PRODUCT_FEEDS_ENABLED` | The feeds (product files for Meta, TikTok and Google). They stop when `AGENT_COMMERCE_ENABLED` is off. | on |

### Analytics

| Setting | What it does | Default |
|---|---|---|
| `META_CAPI_ENABLED` | The store also sends purchases to Meta directly. Switch it on after you enter the Meta details on the [Store profile](/admin/settings/store-profile). | off |

### Search

| Setting | What it does | Default |
|---|---|---|
| `SEARCH_MAX_LIMIT` | The most results one search returns. Leave it as it is. | 100 |

### Other

| Setting | What it does | Default |
|---|---|---|
| `CATALOGUE_ENABLED` | Product lists, product pages and search. Switch it off only if the store presents work and does not sell. | on |
| `PRODUCT_SUGGESTIONS_ENABLED` | Switches product suggestions on. | off |
| `DISPATCH_CUTOFF` | The same-day dispatch time. See the task above. | 15:00 |
| `ANNOUNCEMENT_BAR` | The announcement bar. See the task above. | empty |
| `BUSINESS_HOURS` | The store's opening hours. | empty |
| `STORE_OFFICES` | The addresses of your offices or shops. | empty |
| `STORE_GEO_LAT`, `STORE_GEO_LNG` | The store's position on the map, in decimal degrees, for example `40.565129` and `22.119096`. | empty |
| `FUNDING_BANNER` | The EU/ESPA co-funding strip at the top of every page. | off |
| `AUTH_PANEL` | The photo and line beside the sign-in and sign-up pages. Without them your logo shows. | empty |
| `SOCIAL_LOGIN_PROVIDERS` | Which accounts (e.g. Google) customers can sign in with. | `["*"]` |
| `DEMO_ACCOUNT_ENABLED`, `DEMO_ACCOUNT_EMAIL`, `DEMO_ACCOUNT_PASSWORD`, `DEMO_ACCOUNT_B2B_EMAIL`, `DEMO_ACCOUNT_B2B_PASSWORD` | For a demo store only. **Do not switch them on**: they show every visitor an account's email and password. | off, empty |

Examples for the JSON settings. Enter them in **Value (JSON)** and change the values.

`BUSINESS_HOURS`: all seven days are required. `null` means closed.

```json
{
  "timezone": "Europe/Athens",
  "schedule": {
    "mon": { "opens": "09:00", "closes": "17:00" },
    "tue": { "opens": "09:00", "closes": "17:00" },
    "wed": { "opens": "09:00", "closes": "17:00" },
    "thu": { "opens": "09:00", "closes": "17:00" },
    "fri": { "opens": "09:00", "closes": "17:00" },
    "sat": { "opens": "10:00", "closes": "14:00" },
    "sun": null
  }
}
```

`STORE_OFFICES`: up to 10 addresses. `label` and `street` are required.

```json
[
  {
    "label": "Κεντρικό κατάστημα",
    "street": "Τσιμισκή 10",
    "postal": "54624",
    "city": "Θεσσαλονίκη",
    "phones": ["2310 000000"],
    "i18n": { "en": { "label": "Main store", "street": "10 Tsimiski St", "city": "Thessaloniki" } }
  }
]
```

`FUNDING_BANNER`: enter the address of the official logo image, its width and height in pixels, and the page describing the funded project.

```json
{
  "enabled": true,
  "image": "https://the-image-address.png",
  "width": 728,
  "height": 90,
  "alt": "Λογότυπα ΕΣΠΑ και Ευρωπαϊκής Ένωσης",
  "link": "/espa",
  "label": "Δείτε την πράξη"
}
```

`AUTH_PANEL`: a line, and its translation.

```json
{ "tagline": "Χειροποίητα κοσμήματα από το 1990", "i18n": { "en": { "tagline": "Handmade jewellery since 1990" } } }
```

`SOCIAL_LOGIN_PROVIDERS`: `["*"]` every available one, `["google"]` Google only, `[]` none.

## Things to know

- When you switch a feature on or off, the store updates by itself within a few minutes. For other settings, if a page still shows the old value, clear **Storefront pages** on [Cache](/admin/settings/cache).
- A setting's **Type** cannot change. Do not delete settings or add new ones: the store reads only the settings in this list.
- The currency is not a setting. The store sells in euros.
- While legal details of the business are missing, the [Dashboard](/admin/getting-started/dashboard) reminds Owners and Admins.
- The name, logo, colours and the payment and courier credentials are on the [Store profile](/admin/settings/store-profile).

## Related

- [Store profile](/admin/settings/store-profile)
- [Cache](/admin/settings/cache)
- [Automatic tasks](/admin/help/automatic-tasks)
- [First steps](/admin/getting-started/first-steps)
