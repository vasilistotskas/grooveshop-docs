---
title: Store settings
description: "Every runtime setting under Settings → Extra Settings, grouped by area, with its meaning, default and whether the storefront can read it; plus how the two-tier feature switches work."
---

# Store settings

<span class="sidebar-path">Settings → Extra Settings</span>

Extra Settings is the list of runtime knobs of your store: prices and thresholds, feature switches, legal identity, integrations. Admin and Owner can edit them; Staff see the entry but cannot open it. Every row belongs to your store only.

## What you see

Columns: **Name**, **Category**, **Type**, **Current Value**, **Description**. Filters: **Category** and value type, applied with the panel's submit button. Search covers name and description.

The edit form has three parts: **Setting Information** (name, type, description), **Value** (one input per type; only the one matching the type is used) and a collapsed **Validation** block. Do not change the type of an existing setting.

**Public** in the tables below means the storefront reads the value and may show it to a visitor. Non-public settings are read by the server only and never leave it.

## Two-tier feature switches

Several features have two switches that must **both** be on:

1. a **plan flag** on your store profile, set by the platform, which says the feature is included in what you have; and
2. a **setting** in this list, which says you currently want it on.

If the plan flag is off, turning the setting on does nothing. If the plan flag is on and the setting is off, the feature is hidden and its addresses answer "not found" rather than "forbidden", so a disabled feature looks exactly like one that was never built.

| Feature | Plan flag (platform) | Your setting |
|---|---|---|
| Loyalty program | **Loyalty Enabled** | `LOYALTY_ENABLED` |
| Promotions and coupons | **Promotions Enabled** | `PROMOTIONS_ENABLED` |
| Gift cards | **Gift Cards Enabled** | `GIFT_CARDS_ENABLED` |
| Wholesale (B2B) | **B2B Enabled** | `B2B_WHOLESALE_ENABLED` |
| Product suggestions | **Recommendations Enabled** | `PRODUCT_SUGGESTIONS_ENABLED` |
| Agent commerce (AI agents, feeds, chatbot) | **Agent Commerce Enabled** | `AGENT_COMMERCE_ENABLED` |
| Hosted payment for agents | **Agent Hosted Payment Selection** | `AGENT_HOSTED_PAYMENT_ENABLED` |
| Blog and blog comments | **Blog Enabled** | `BLOG_COMMENTS_ENABLED` |

Commercial features (loyalty, promotions, gift cards, wholesale, suggestions) default to **off** and fail closed: if the setting cannot be read, the feature stays hidden, so nothing is ever on by accident. Interface toggles (cart, catalogue, bottom nav) default to **on** and fail open, so a temporary error never blanks the storefront.

## Settings by category

Defaults are what a fresh store starts with. Money is in euro.

### Storefront UI

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `CATALOGUE_ENABLED` | Serve listings, product pages and search. Off makes them all "not found", for a store that publishes work rather than sells. | on | yes |
| `CART_ENABLED` | Show the cart button and the cart page. Off for a content-only launch. | on | yes |
| `MOBILE_BOTTOM_NAV_ENABLED` | Mobile bottom navigation bar. | on | yes |
| `STICKY_ADD_TO_CART_ENABLED` | Sticky add-to-cart bar on product pages. | on | yes |
| `RECENTLY_VIEWED_ENABLED` | "Recently viewed" rail on the home page. | on | yes |
| `CHAT_WIDGET_ENABLED` | AI shopping-assistant launcher. Hides for every visitor shortly after switching off. | on | yes |
| `ACCOUNT_REVIEWS_ENABLED` | "My reviews" page in the customer account. Product-page reviews are unaffected. | on | yes |
| `PRODUCT_REVIEWS_ENABLED` | Review list and write-review flow on product pages. | on | yes |
| `BLOG_COMMENTS_ENABLED` | Comments and likes under blog posts. | on | yes |
| `FAVOURITES_ENABLED` | Wishlist hearts, favourites page, price-drop and back-in-stock emails driven by favourites. | on | yes |
| `NEWSLETTER_ENABLED` | Topic subscriptions in the account, the storefront's newsletter form and the subscription endpoints. Existing unsubscribe links keep working. | on | yes |
| `FEEDBACK_ENABLED` | The feedback page and its submission endpoint. | on | yes |
| `PRODUCT_ALERTS_ENABLED` | Explicit back-in-stock and price-drop alerts and their emails. | on | yes |

### Orders & Checkout

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `STOCK_RESERVATION_TTL_MINUTES` | How long stock stays reserved for a checkout in progress. | 30 | no |
| `ORDER_AUTO_CANCEL_FAILED_PAYMENT_MINUTES` | Minutes after a failed online payment before the order is cancelled and its stock released. | 30 | no |
| `ORDER_AUTO_CANCEL_PENDING_HOURS` | Hours an unpaid online order may stay pending before it is cancelled. | 24 | no |
| `PENDING_ORDER_REMINDER_MAX_COUNT` | Maximum reminder emails for a pending order. | 3 | no |
| `PENDING_ORDER_REMINDER_INTERVAL_DAYS_1/_2/_3` | Days after placement for the first, second and third reminder. | 1, 3, 7 | no |
| `CHECKOUT_ABANDONMENT_HOURS` | Hours of inactivity before a checkout counts as abandoned for the reminder email. | 2 | no |
| `CART_ABANDONED_HOURS` | Hours of inactivity before a cart counts as abandoned, for the Active and Abandoned filters on the carts list. The sidebar badge ignores it and always uses one day. | 24 | no |
| `ABANDONED_CART_CLEANUP_DAYS` | Days after which abandoned carts are deleted. | 7 | no |
| `OLD_GUEST_CART_CLEANUP_DAYS` | Days after which guest carts are deleted. | 30 | no |
| `LOW_STOCK_THRESHOLD` | Present in the list but read by nothing. The hourly low-stock alert uses each product's own **Low stock threshold** field instead, and the sidebar badge uses a fixed band of 1 to 9. | 10 | no |

### Shipping

Shipping prices, free-shipping thresholds and the countries you deliver to are not settings: they are the **Rates** on each courier's row, see [Shipping providers](/admin/shipping/providers#rates). What remains here are the courier switches.

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `ACS_SMARTPOINT_ENABLED` | Offer ACS Smartpoint locker pickup at checkout. Turn on only after the stations have synced. | off | yes |
| `ACS_DYNAMIC_PRICING_ENABLED` | Ask ACS for a live quote at checkout; falls back to the rate's price on any error. | off | no |
| `DEFAULT_WEIGHT_UNIT` | Unit for product weights. | kg | no |

### Invoicing & myDATA

Fill the seller identity **before the first invoice**: the values are printed on every invoice PDF and published in the storefront footer as your legal identity.

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `INVOICE_SELLER_NAME` | Legal company name. | empty | no |
| `INVOICE_SELLER_LEGAL_FORM` | Legal form (ΙΚΕ, ΑΕ, ΟΕ, sole trader). Required on the storefront by law 4919/2022. | empty | no |
| `INVOICE_SELLER_VAT_ID` | Tax number (ΑΦΜ). | empty | no |
| `INVOICE_SELLER_TAX_OFFICE` | Tax office (ΔΟΥ). | empty | no |
| `INVOICE_SELLER_REGISTRATION_NUMBER` | Business registry number (Γ.Ε.ΜΗ.). | empty | no |
| `INVOICE_SELLER_BUSINESS_ACTIVITY` | Main business activity. | empty | no |
| `INVOICE_SELLER_ADDRESS_LINE_1/_2`, `_CITY`, `_POSTAL_CODE`, `_COUNTRY` | Registered address. | empty | no |
| `INVOICE_SELLER_PHONE`, `INVOICE_SELLER_EMAIL` | Seller contact details on the invoice. | empty | no |
| `INVOICE_SELLER_IN_LIQUIDATION` | Disclose that the business is in liquidation. | off | no |
| `B2B_INVOICING_ENABLED` | Let customers request an invoice instead of a receipt at checkout. Available on every plan, with no plan flag behind it. | on | yes |
| `B2B_WHOLESALE_ENABLED` | Your half of the wholesale switch (business profiles, customer groups, price lists). | off | yes |
| `B2B_ALLOW_PROMOTIONS` | Let promotions and coupons stack on top of wholesale prices. | off | no |
| `B2B_LOYALTY_ENABLED` | Let wholesale orders take part in loyalty. One switch for both earning and redeeming. | off | no |
| `MYDATA_ENABLED` | Master switch of the AADE myDATA integration. | off | no |
| `MYDATA_AUTO_SUBMIT` | Submit each invoice automatically once its PDF is rendered; otherwise only through the invoice action. | off | no |
| `MYDATA_ENVIRONMENT` | `dev` (sandbox) or `prod`. Separate credentials for each; the credentials themselves are on your store profile, not here. | dev | no |
| `MYDATA_INVOICE_SERIES_PREFIX` | Prefix of the AADE series code, combined with year. | GRVP | no |
| `MYDATA_ISSUER_BRANCH` | AADE branch code; 0 is the main branch. | 0 | no |
| `MYDATA_REQUEST_TIMEOUT_SECONDS` | Timeout for AADE calls. | 30 | no |
| `MYDATA_GIFT_CARD_PAYMENT_TYPE` | AADE payment type for amounts settled by gift card (3 cash, 5 on credit). | 3 | no |

### Promotions & Gift Cards

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `PROMOTIONS_ENABLED` | Your half of the promotions switch. | off | yes |
| `GIFT_CARDS_ENABLED` | Your half of the gift cards switch. | off | yes |
| `GIFT_CARD_MIN_AMOUNT`, `GIFT_CARD_MAX_AMOUNT` | Bounds of the purchase form. | 10.00, 500.00 | yes |
| `GIFT_CARD_VALIDITY_DAYS` | Validity of a card; 0 never expires. Greek consumer law requires at least five years. | 1825 | no |
| `GIFT_CARD_EXPIRY_REMINDER_DAYS` | Days before expiry to email the recipient; 0 disables. | 30 | no |

### Loyalty

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `LOYALTY_ENABLED` | Your half of the loyalty switch. | off | yes |
| `LOYALTY_POINTS_FACTOR` | Points earned per euro. | 1.0 | yes |
| `LOYALTY_PRICE_BASIS` | Which price earns points. | final_price | no |
| `LOYALTY_REDEMPTION_RATIO_EUR` | Points needed for one euro of discount. | 100 | yes |
| `LOYALTY_REDEMPTION_RATIO_USD` | Same for dollars; unused while the store trades in euro. | 100 | no |
| `LOYALTY_POINTS_EXPIRATION_DAYS` | Days until unused points expire; 0 never. | 0 | yes |
| `LOYALTY_TIER_MULTIPLIER_ENABLED` | Apply the tier multiplier to earned points. | off | yes |
| `LOYALTY_NEW_CUSTOMER_BONUS_ENABLED`, `LOYALTY_NEW_CUSTOMER_BONUS_POINTS` | Welcome bonus and its size. | off, 100 | yes |
| `LOYALTY_XP_PER_LEVEL` | Experience points per level. | 1000 | yes |

### Emails & Engagement

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `CONTACT_EMAIL` | Public contact email in the footer and contact page; empty falls back to the store profile's contact email. | empty | yes |
| `REENGAGEMENT_EMAIL_MAX_COUNT`, `REENGAGEMENT_EMAIL_COOLDOWN_DAYS` | Limits of the "we miss you" emails. | 3, 90 | no |
| `INACTIVE_USER_THRESHOLD_DAYS` | Days without activity before a customer counts as inactive. | 60 | no |
| `NOTIFICATION_EXPIRATION_DAYS` | Days after which in-app notifications are deleted. | 180 | no |
### Store presence

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `BUSINESS_HOURS` | Weekly opening hours as JSON (time zone plus one entry per day, `null` for closed). Drives the hours section, the footer open/closed badge and structured data. Empty disables. | empty | yes |
| `STORE_OFFICES` | Public office addresses as JSON, with optional translations. Distinct from the registered seller address. Empty disables. | empty | yes |
| `STORE_GEO_LAT`, `STORE_GEO_LNG` | Coordinates for the structured data. | empty | yes |

### Contact form attachments

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `CONTACT_ATTACHMENTS_ENABLED` | Let visitors attach files to the contact form. Off by default because it is the only place an anonymous visitor can upload anything. | off | yes |
| `CONTACT_ATTACHMENTS_MAX_COUNT` | Files per enquiry. | 3 | yes |
| `CONTACT_ATTACHMENTS_MAX_MB` | Per-file size limit. Values above 25 are ignored; 25 MB is the hard ceiling. | 10 | yes |
| `CONTACT_ATTACHMENTS_TYPES` | Comma-separated file types, verified by reading the file's own signature, not its extension. | application/pdf | yes |
| `CONTACT_ATTACHMENTS_RETENTION_DAYS` | Days before the file bytes are deleted while the enquiry stays; 0 keeps forever. | 90 | no |

### Agent commerce, analytics, search

| Setting | Meaning | Default | Public |
|---|---|---|---|
| `AGENT_COMMERCE_ENABLED` | Your half of the agent-commerce switch (AI agent tools, feeds, chatbot). | on | no |
| `AGENT_HOSTED_PAYMENT_ENABLED` | Let an AI agent choose an online payment method so the buyer pays on the provider's page. Subordinate to agent commerce. | on | no |
| `PRODUCT_FEEDS_ENABLED` | Catalog feeds for Meta, TikTok and agents. Off whenever agent commerce is off. | on | no |
| `PRODUCT_SUGGESTIONS_ENABLED` | Your half of the product suggestions switch. | off | yes |
| `SOCIAL_LOGIN_PROVIDERS` | JSON list of allowed social-login providers; `["*"]` all, `["google"]` one, `[]` none. | `["*"]` | no |
| `META_CAPI_ENABLED` | Server-side Meta Conversions API. Turn on only after the pixel and access token are set on the store profile and Test Events look right. | off | no |
| `SEARCH_MAX_LIMIT` | Maximum results per search request. | 100 | no |

## Tasks

### Change a value

1. Open <span class="sidebar-path">Settings → Extra Settings</span>.
2. Search the name, open the row.
3. Edit the input that matches the **Type** and **Save**.

The storefront reads every public setting in one request and keeps the answer for a minute, so a change shows within about a minute. To force it, purge **Site settings** on the [Cache](/admin/system/cache) page.

### Turn a commercial feature on

1. Confirm with the platform that the plan flag is on (it shows read-only on your store profile).
2. Set the matching setting to on.
3. Purge **Site settings** if you want the storefront to pick it up immediately.

## Things to know

- Your store profile (branding, colours, social links, pixels, payment and courier credentials) is a separate form, not a setting. See [Roles & team](/admin/getting-started/roles-and-team) for where it lives.
- The currency cannot be changed by the store; every money path in the back office uses euro, and a storefront showing another symbol over euro amounts would misprice everything.
- Settings whose description mentions a validator reject malformed JSON on save with an error message.
- The dashboard shows a "seller identity missing" warning to platform operators while any of `INVOICE_SELLER_NAME`, `INVOICE_SELLER_VAT_ID`, `INVOICE_SELLER_TAX_OFFICE` is empty.

## Related

- [Cache](/admin/system/cache)
- [Promotions](/admin/sales/promotions)
- [Gift cards](/admin/sales/gift-cards)
- [Tiers & points](/admin/loyalty/tiers-and-points)
- [Invoices](/admin/sales/invoices)
