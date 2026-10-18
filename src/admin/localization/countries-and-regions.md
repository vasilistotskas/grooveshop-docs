---
title: Countries & regions
description: The shared reference data behind checkout addresses (countries, regions), the domain records behind social login, and the newsletter subscription topics you manage yourself.
---

# Countries & regions

Countries, regions and store domain records are **platform-wide reference data**. They are shared by every store and live on the platform console, not in a store's admin: one store editing them would change them for all. A store role never gets permission on them, and they are not in your sidebar. This page explains what they control so you know what to ask for.

Subscription topics, in contrast, are yours: they sit under <span class="sidebar-path">Customers → Newsletter → Subscription Topics</span> in your own admin.

## Countries and regions (platform)

| Data | What it holds | What it controls |
|---|---|---|
| **Countries** | Every country in the world, each with its two- and three-letter codes, the numeric code, the telephone dialling code, a flag image, and the country name in Greek, English and German. | The country picker on the checkout and account address forms; the country recorded on every order and user address; the phone format checked for that country. |
| **Regions** | A code and the country it belongs to, with names in the same three languages. | The region picker that appears once a country is chosen. The Greek regions and the Cypriot districts are seeded. For a country that has regions, a region is required and must belong to that country, at checkout and when staff edit an address. A country without regions is checked out without one. |

Effects on your store:

- A customer can only ship to a country that one of your shipping providers has an active rate for. Every country is already in the list, so offering a new one is up to you: add a rate, see [Shipping providers](/admin/settings/shipping-providers#offer-a-new-country). Checkout lists only those countries; the account profile still offers the whole list.
- VAT rates are attached to products, not to countries; see [VAT rates](/admin/settings/vat-rates).
- The pickers are cached under the **Regions & Countries** surface; a change made by the platform may need a purge, see [Cache](/admin/settings/cache).

To fix a country or region name, or to add regions for a country, ask the platform.

## Store domain records (platform)

The platform creates one record per store domain when the domain is set up. Its purpose is social login: your store's own Google (or other provider) credentials are attached to that record, so a customer signing in on your domain uses your provider app rather than the platform's. Without it, sign-in silently falls back to the platform-wide credentials. There is nothing for a store to do here.

## Subscription Topics (yours)

<span class="sidebar-path">Customers → Newsletter → Subscription Topics</span>

The topics a customer can subscribe to from their account, and the lists you send to. Staff, Admin and Owner can all open this screen.

Columns: **Topic** (name), **Category**, **Is active**, **Is default**, **Requires confirmation**, **Subscribers** (active and total), **Created at**. Filters: category, active, default, confirmation, created date. Search: name, slug, description.

The form (name and description are translatable and have language tabs):

| Field | Meaning |
|---|---|
| **Name**, **Slug**, **Description**, **Category** | What the customer sees on the account's subscriptions page. |
| **Is active** | Inactive topics disappear from the customer's list and from every subscription endpoint; existing subscriptions are kept. |
| **Is default** | On a Newsletter topic, the one the storefront's newsletter form subscribes to. On an Account Updates or System Notifications topic, every new account is subscribed at sign-up. See [Subscriptions](/admin/customers/subscriptions). |
| **Requires confirmation** | The subscription starts as pending and the customer gets an email with a confirmation link; it becomes active only when they click it. |

### Tasks

#### Create a topic

1. Open <span class="sidebar-path">Customers → Newsletter → Subscription Topics</span> and click **Add**.
2. Fill the Greek name and description; add English and German on their tabs if you show those languages.
3. Choose the category and the three switches, then **Save**.

#### Retire a topic

Untick **Is active** rather than deleting, so the subscriber history stays. Individual subscriptions are managed in [Subscriptions](/admin/customers/subscriptions).

## Things to know

- The **Subscribers** column is counted fresh every time you load the list. It reads "active/total", and the total counts every subscription row on the topic, including the pending ones that were never confirmed and the ones that unsubscribed.
- The whole newsletter feature can be switched off with the `NEWSLETTER_ENABLED` setting; unsubscribe links in already-sent emails keep working regardless. With it off, the **Newsletter** menu, and this screen with it, leaves your sidebar. See [Store settings](/admin/settings/store-settings).
- The confirmation link points at your storefront's own address; there is nothing to configure.

## Related

- [Subscriptions](/admin/customers/subscriptions)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Languages & translations](/admin/settings/languages-and-translations)
- [Store settings](/admin/settings/store-settings)
