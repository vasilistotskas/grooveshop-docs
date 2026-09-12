---
title: Countries & regions
description: The shared reference data behind checkout addresses (countries, regions), the sites list behind social login, and the newsletter subscription topics you manage yourself.
---

# Countries & regions

Countries, regions and sites are **platform-wide reference data**. They are shared by every store and live on the platform console, not in a store's admin (`tenant/role_scopes.py`, `PLATFORM_ONLY_APP_LABELS`; the sidebar comment in `settings.py` explains the move). A store role never gets permission on them. This page explains what they control so you know what to ask for.

Subscription topics, in contrast, are yours: they sit under <span class="sidebar-path">Newsletter → Subscription Topics</span> in your own admin.

## Countries and regions (platform)

| Data | What it holds | What it controls |
|---|---|---|
| **Countries** | ISO codes, phone prefix, flag, names in Greek, English and German (`country/models.py`). | The country picker on the checkout and account address forms; the country recorded on every order and user address. |
| **Regions** | A code and the country it belongs to, with translated names (`region/models.py`). | The region picker that appears once a country is chosen. Greek prefectures and German states are seeded. |

Effects on your store:

- A customer can only ship to a country that exists in the list. Shipping providers then decide whether they serve it.
- VAT rates are attached to products, not to countries; see [VAT rates](/admin/sales/vat-rates).
- The pickers are cached on the storefront under the **Regions & Countries** surface; a change made by the platform may need a purge, see [Cache](/admin/system/cache).

To add a country or fix a region name, ask the platform.

## Sites (platform)

One site row exists per store domain; the platform creates it when the domain is set up (`tenant/provisioning.py`, `ensure_site`). Its purpose is social login: a store's own Google (or other provider) credentials are attached to its site row, so that customers logging in on your domain use your provider app rather than the platform's. There is nothing for a store to do here.

## Subscription Topics (yours)

<span class="sidebar-path">Newsletter → Subscription Topics</span>

The topics a customer can subscribe to from their account, and the lists you send to (`user/admin.py`, `SubscriptionTopicAdmin`). Visible to Staff, Admin and Owner.

Columns: **Topic** (name), **Category**, **Is active**, **Is default**, **Requires confirmation**, **Subscribers** (active and total), **Created at**. Filters: category, active, default, confirmation, created date. Search: name, slug, description.

The form (translatable: name and description have language tabs):

| Field | Meaning |
|---|---|
| **Name**, **Slug**, **Description**, **Category** | What the customer sees in the account's subscriptions page. |
| **Is active** | Inactive topics are hidden from customers; existing subscriptions are kept. |
| **Is default** | New accounts are subscribed automatically. |
| **Requires confirmation** | The customer must click a confirmation link before the subscription becomes active. The link is built from the `SUBSCRIPTION_CONFIRMATION_URL` setting. |

### Tasks

#### Create a topic

1. Open <span class="sidebar-path">Newsletter → Subscription Topics</span> and click **Add**.
2. Fill the Greek name and description; add English and German on their tabs if you show those languages.
3. Choose the category and the three switches, then **Save**.

#### Retire a topic

Untick **Is active** rather than deleting, so the subscriber history stays. Individual subscriptions are managed in [Subscriptions](/admin/customers/subscriptions).

## Things to know

- The whole newsletter feature can be switched off with the `NEWSLETTER_ENABLED` setting; unsubscribe links in already-sent emails keep working regardless. See [Store settings](/admin/settings/store-settings).
- Subscriber counts on the list are computed live and include unconfirmed subscriptions in the total.

## Related

- [Subscriptions](/admin/customers/subscriptions)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Languages & translations](/admin/localization/languages-and-translations)
- [Store settings](/admin/settings/store-settings)
