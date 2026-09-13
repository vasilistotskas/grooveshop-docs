---
title: Welcome
description: What the store admin panel is, who can sign in, what each role sees, and how the sidebar and the site dropdown are organised.
---

# Welcome

The admin panel is the back office of your store. Every product, order, customer, shipment and setting is managed here. It runs on the same domain as your storefront under the `/admin/` path, and it only ever shows the data of the store you are signed in to.

This guide covers what a store owner and their team can do. Some screens are reserved for the platform operators who run the hosting; those are marked as such on every page.

## Roles

Access is granted per store through a membership with one of three roles.

| Role | What it can do |
|---|---|
| **Staff** | View, add and edit the operational screens: catalog, blog, sales, shipping, customers, loyalty. Cannot delete anything, cannot open **Extra Settings**, and cannot manage the team. |
| **Admin** | Everything Staff can, plus deleting records, **Extra Settings**, the store's own profile (branding, credentials) and the team. Cannot edit or remove an Owner and cannot make someone an Owner. |
| **Owner** | Everything Admin can, plus full control of Owner memberships. |

Staff get view, add and edit on every operational screen in the store and nothing at all on its settings. Admin and Owner get the full set on every store screen, plus their own store's profile row and their own team. Nothing that belongs to the platform — countries, regions, store domains, permission groups, the job schedule — is ever given to a store role.

A fourth kind of user exists: the **platform superuser**. Platform operators see everything on every store, including the **System** section at the bottom of the sidebar. If a page in this guide says "platform operators only", that is who it means.

Details: [Roles & team](/admin/getting-started/roles-and-team).

## How the sidebar is organised

Sections appear in this order. Each one below Dashboard is collapsible.

- **Navigation → Dashboard**. The landing page with revenue, orders, queues and search insights. See [Dashboard](/admin/getting-started/dashboard).
- **Catalog**. Products, Categories, Reviews, Tags, Attributes, Attribute Values, Variant Groups. See [Products](/admin/catalog/products).
- **Blog**. Blog Posts, Blog Categories, Blog Authors, Blog Comments, Blog Tags. See [Posts](/admin/blog/posts).
- **Sales**. Orders, Carts, Invoices, Payment Methods, Promotions, Coupon Codes, Gift Cards, Business Customers, Customer Groups, B2B Price Lists, VAT Rates, Notifications, Contact Messages, Feedback. See [Orders](/admin/sales/orders).
- **Shipping**. Shipping Providers, BoxNow Shipments, ACS Shipments, BoxNow Lockers, ACS Stations. See [Shipping providers](/admin/shipping/providers).
- **Customers**. Users, User Addresses, Subscriptions. See [Users & addresses](/admin/customers/users-and-addresses).
- **Loyalty**. Loyalty Tiers, Points Transactions. See [Tiers & points](/admin/loyalty/tiers-and-points).
- **Newsletter**. Subscription Topics, and nothing else. See [Countries & regions](/admin/localization/countries-and-regions), which also covers this screen. Countries, Regions and Sites used to share this group; they are platform screens now — see below.
- **Settings**. Extra Settings. The entry is shown to everyone; only Admin and Owner can open it. See [Store settings](/admin/settings/store-settings).
- **System**. Platform operators only. Configuration, Security & Access, Audit & Logs, Reconciliation. See [Security & access](/admin/settings/security-and-access), [Audit & logs](/admin/system/audit-and-logs) and [Reconciliation](/admin/system/reconciliation).

Nine entries carry a count badge. Each is refreshed about once a minute, and disappears while its count is zero.

| Entry | What the badge counts |
|---|---|
| **Products** | Active products with stock between 1 and 9. |
| **Reviews** | Reviews still in status New. |
| **Blog Posts** | Posts that are not published yet. |
| **Blog Comments** | Comments not approved yet. |
| **Orders** | Orders in status Pending. |
| **Carts** | Carts untouched for between one day and thirty days. |
| **Promotions** | Promotions that are active and inside their schedule. |
| **Business Customers** | Wholesale applications awaiting review. |
| **Contact Messages** | Every enquiry on file. There is no read/unread flag, so this number only falls when you delete messages. |

Above the sections there is a filter box that narrows the sidebar as you type. The command palette is a faster way to jump anywhere; see [Search & command palette](/admin/getting-started/search-and-command-palette).

### Screens the platform keeps

Six screens a store's sidebar used to offer are managed on the platform console now, and none of them is listed in a store's admin any more.

Five of the six are a single list shared by the whole platform: one merchant's change would land on every other store, and the list itself mixes every store's records together. Those five now refuse to open even if you paste the address. The sixth, permission groups, is simply not how store access works — see [Roles & team](/admin/getting-started/roles-and-team).

| Screen | Where it used to be | What to do instead |
|---|---|---|
| **Countries** | The Localization group, which no longer exists | Ask the platform to enable, disable or reorder a country. The change applies to every store. |
| **Regions** | Same group | Ask the platform. Regions are the list your customers pick from at checkout. |
| **Sites** | Same group | Nothing to maintain: these are the store addresses the platform keeps. Ask the platform if one of yours looks wrong. |
| **Background Jobs** — the schedule of recurring work, and its results | The System section | Ask the platform. One schedule drives the recurring work of every store, so it was never a per-store setting. |
| **Cache Purge Log** | System → Audit & Logs | Purging itself has not moved; see [Cache](/admin/system/cache). For the record of who purged what, see [Audit & logs](/admin/system/audit-and-logs). |
| **Groups** — permission groups | System → Configuration | Nothing to do. Store access comes from the three roles above, never from a group. See [Roles & team](/admin/getting-started/roles-and-team). |

Only the first three were ever open to an Owner or an Admin. The other three were already reserved for platform operators, so nothing a store role could previously reach has been taken away.

## The site dropdown

Click the store name at the top of the sidebar to open the site dropdown.

| Entry | What it does |
|---|---|
| **Rosetta** | The editor for the admin's own interface wording. It works only on the platform console; on a store's admin the link lands on a login page. Ask the platform to change a label. See [Languages & translations](/admin/localization/languages-and-translations). |
| **Cache** | The cache management page: purge what the storefront has cached so an edit shows immediately. See [Cache](/admin/system/cache). |
| **Email Templates** | Preview and manage the transactional email templates. See [Email templates](/admin/storefront/email-templates). |
| **API Swagger** | Opens the interactive API reference in a new tab. Useful for developers integrating with your store. |
| **Help & Guides** | Opens this guide in a new tab. Shown when the platform has configured the documentation link for the environment. |

Links to operational tools (Flower, Mailpit, Meilisearch, RabbitMQ) appear in the same dropdown only when the platform has configured them for that environment. In production they are normally hidden.

## Environment marker

The browser tab title is prefixed with the environment — `[PROD]`, `[STAGE]`, `[CI]` or `[DEV]` — so you never edit the wrong store by mistake. A coloured badge in the header says the same thing in words. The platform console carries a separate **Control plane** badge.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Roles & team](/admin/getting-started/roles-and-team)
- [FAQ & troubleshooting](/admin/faq)
