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
| **Staff** | View, add and edit the operational screens: catalog, blog, sales, shipping, customers, loyalty. Cannot delete records, cannot open **Extra Settings**, and cannot manage the team. |
| **Admin** | Everything Staff can, plus deleting records, **Extra Settings**, the store's own profile (branding, credentials) and the team. Cannot demote or remove an Owner and cannot make someone an Owner. |
| **Owner** | Everything Admin can, plus full control of Owner memberships. A store always keeps at least one Owner. |

The rules come from `tenant/role_scopes.py` and `tenant/auth_backends.py`: Staff receives view, add and change on every store app except settings, while Admin and Owner receive the full permission set on every store app plus a narrow grant on their own store row and their own team. Nothing that belongs to the platform (countries, regions, sites, groups, background jobs) is ever granted to a store role.

A fourth kind of user exists: the **platform superuser**. Platform operators see everything on every store, including the **System** section at the bottom of the sidebar. If a page in this guide says "platform operators only", that is who it means.

Details: [Roles & team](/admin/getting-started/roles-and-team).

## How the sidebar is organised

Sections appear in this order. Each one is collapsible.

- **Navigation → Dashboard**. The landing page with revenue, orders, queues and search insights. See [Dashboard](/admin/getting-started/dashboard).
- **Catalog**. Products, Categories, Reviews, Tags, Attributes, Attribute Values, Variant Groups. See [Products](/admin/catalog/products).
- **Blog**. Blog Posts, Blog Categories, Blog Authors, Blog Comments, Blog Tags. See [Posts](/admin/blog/posts).
- **Sales**. Orders, Carts, Invoices, Payment Methods, Promotions, Coupon Codes, Gift Cards, Business Customers, Customer Groups, B2B Price Lists, VAT Rates, Notifications, Contact Messages, Feedback. See [Orders](/admin/sales/orders).
- **Shipping**. Shipping Providers, BoxNow Shipments, ACS Shipments, BoxNow Lockers, ACS Stations. See [Shipping providers](/admin/shipping/providers).
- **Customers**. Users, User Addresses, Subscriptions. See [Users & addresses](/admin/customers/users-and-addresses).
- **Loyalty**. Loyalty Tiers, Points Transactions. See [Tiers & points](/admin/loyalty/tiers-and-points).
- **Newsletter**. Subscription Topics. See [Countries & regions](/admin/localization/countries-and-regions), which also covers this screen.
- **Settings**. Extra Settings. Visible to everyone, usable by Admin and Owner. See [Store settings](/admin/settings/store-settings).
- **System**. Platform operators only. Configuration, Security & Access, Audit & Logs, Reconciliation. See [Security & access](/admin/settings/security-and-access), [Audit & logs](/admin/system/audit-and-logs) and [Reconciliation](/admin/system/reconciliation).

Some entries carry a badge: Products shows the number of low-stock products, Reviews and Blog Comments the number waiting for approval, Orders the pending orders, Carts the abandoned carts, Promotions the live ones, Business Customers the pending applications, and Contact Messages the unread ones.

Above the sections there is a filter box that narrows the sidebar as you type. The command palette is a faster way to jump anywhere; see [Search & command palette](/admin/getting-started/search-and-command-palette).

## The site dropdown

Click the store name at the top of the sidebar to open the site dropdown.

| Entry | What it does |
|---|---|
| **Rosetta** | The editor for the admin's own interface strings. It works only on the platform console; on a store's admin the link sends you to a login page. Ask the platform to change a label. See [Languages & translations](/admin/localization/languages-and-translations). |
| **Cache** | The cache management page: purge what the storefront has cached so an edit shows immediately. See [Cache](/admin/system/cache). |
| **Email Templates** | Preview and manage the transactional email templates. See [Email templates](/admin/storefront/email-templates). |
| **API Swagger** | Opens the interactive API reference in a new tab. Useful for developers integrating with your store. |
| **Help & Guides** | Opens this guide in a new tab. Shown when the platform has configured the documentation link for the environment. |

Links to operational tools (Flower, Mailpit, Meilisearch, RabbitMQ) appear in the same dropdown only when the platform has configured them for that environment. In production they are normally hidden.

## Environment marker

The browser tab title is prefixed with the environment, for example `[PROD]`, so you never edit the wrong store by mistake. The platform console carries a separate "Control plane" badge in its header.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Roles & team](/admin/getting-started/roles-and-team)
- [FAQ & troubleshooting](/admin/faq)
