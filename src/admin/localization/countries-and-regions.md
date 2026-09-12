---
title: Countries & regions
description: The shared reference data behind checkout addresses (countries, regions), the domain records behind social login, and the newsletter subscription topics you manage yourself.
---

# Countries & regions

Countries, regions and store domain records are **platform-wide reference data**. They are shared by every store and live on the platform console, not in a store's admin: one store editing them would change them for all. A store role never gets permission on them, and they are not in your sidebar. This page explains what they control so you know what to ask for.

Subscription topics, in contrast, are yours: they sit under <span class="sidebar-path">Newsletter → Subscription Topics</span> in your own admin.

## Countries and regions (platform)

| Data | What it holds | What it controls |
|---|---|---|
| **Countries** | Two- and three-letter codes, the numeric code, the telephone dialling code, a flag image, and the country name in Greek, English and German. | The country picker on the checkout and account address forms; the country recorded on every order and user address. |
| **Regions** | A code and the country it belongs to, with names in the same three languages. | The region picker that appears once a country is chosen. Greek prefectures and German states are seeded. |

Effects on your store:

- A customer can only ship to a country that exists in the list. Your shipping providers then decide whether they serve it.
- VAT rates are attached to products, not to countries; see [VAT rates](/admin/sales/vat-rates).
- The pickers are cached under the **Regions & Countries** surface; a change made by the platform may need a purge, see [Cache](/admin/system/cache).

To add a country or fix a region name, ask the platform.

## Store domain records (platform)

The platform creates one record per store domain when the domain is set up. Its purpose is social login: your store's own Google (or other provider) credentials are attached to that record, so a customer signing in on your domain uses your provider app rather than the platform's. Without it, sign-in silently falls back to the platform-wide credentials. There is nothing for a store to do here.

## Subscription Topics (yours)

<span class="sidebar-path">Newsletter → Subscription Topics</span>

The topics a customer can subscribe to from their account, and the lists you send to. Staff, Admin and Owner can all open this screen.

Columns: **Topic** (name), **Category**, **Is active**, **Is default**, **Requires confirmation**, **Subscribers** (active and total), **Created at**. Filters: category, active, default, confirmation, created date. Search: name, slug, description.

The form (name and description are translatable and have language tabs):

| Field | Meaning |
|---|---|
| **Name**, **Slug**, **Description**, **Category** | What the customer sees on the account's subscriptions page. |
| **Is active** | Inactive topics disappear from the customer's list and from every subscription endpoint; existing subscriptions are kept. |
| **Is default** | Every new account is subscribed automatically at sign-up. |
| **Requires confirmation** | The subscription starts as pending and the customer gets an email with a confirmation link; it becomes active only when they click it. |

### Tasks

#### Create a topic

1. Open <span class="sidebar-path">Newsletter → Subscription Topics</span> and click **Add**.
2. Fill the Greek name and description; add English and German on their tabs if you show those languages.
3. Choose the category and the three switches, then **Save**.

#### Retire a topic

Untick **Is active** rather than deleting, so the subscriber history stays. Individual subscriptions are managed in [Subscriptions](/admin/customers/subscriptions).

## Things to know

- The **Subscribers** column is counted fresh every time you load the list. It reads "active/total", and the total counts every subscription row on the topic, including the pending ones that were never confirmed and the ones that unsubscribed.
- The whole newsletter feature can be switched off with the `NEWSLETTER_ENABLED` setting; unsubscribe links in already-sent emails keep working regardless. See [Store settings](/admin/settings/store-settings).
- The confirmation link is built from the `SUBSCRIPTION_CONFIRMATION_URL` setting, which points at your own store's address. Leave it as it is.

## Related

- [Subscriptions](/admin/customers/subscriptions)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Languages & translations](/admin/localization/languages-and-translations)
- [Store settings](/admin/settings/store-settings)
