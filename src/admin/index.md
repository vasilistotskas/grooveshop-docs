---
title: Welcome
description: What the store admin panel is, who can sign in, what each role sees, how the sidebar decides what to list, and what the header and footer offer.
---

# Welcome

The admin panel is the back office of your store. Every product, order, customer, shipment and setting is managed here. It runs on the same domain as your storefront under the `/admin/` path, and it only ever shows the data of the store you are signed in to.

This guide covers what a store owner and their team can do. Some screens are reserved for the platform operators who run the hosting; those are marked as such on every page.

## Roles

Access is granted per store through a membership with one of three roles.

| Role | What it can do |
|---|---|
| **Staff** | View, add and edit the operational screens: sales, catalog, customers, marketing, content, shipping, payment methods, VAT rates and email templates. Cannot delete anything, and does not see **Store Profile**, **Team**, **Store Settings** or **Cache**. |
| **Admin** | Everything Staff can, plus deleting records, the **Store Profile** (branding, credentials), the **Team**, **Store Settings** and **Cache**. Cannot edit or remove an Owner and cannot make someone an Owner. |
| **Owner** | Everything Admin can, plus full control of Owner memberships. |

Staff get view, add and edit on every operational screen in the store and nothing at all on its settings. Admin and Owner get the full set on every store screen, plus their own store's profile and their own team. Nothing that belongs to the platform — countries, regions, store domains, permission groups, the job schedule — is ever given to a store role.

A fourth kind of user exists: the **platform superuser**. Platform operators see everything on every store, including the **System** section at the bottom of the sidebar. If a page in this guide says "platform operators only", that is who it means.

Details: [Roles & team](/admin/getting-started/roles-and-team).

## How the sidebar is organised

The sidebar is put together for you on every page: it lists only the screens your role can open and only the features your store has. Sections appear in this order:

- **Dashboard**. The landing page: the period's figures, what is waiting, best sellers, order sources and store search. See [Dashboard](/admin/getting-started/dashboard).
- **Sales**. Orders, Receipts, Credit Documents, Carts. Order line items open from the **Order Items** tab at the top of the order screens. See [Orders](/admin/sales/orders).
- **Catalog**. Products, Categories, Brands, Attributes (Attributes, Attribute Values, Variant Groups), Images (Product Images, Category Images), Tags, Reviews. See [Products](/admin/catalog/products).
- **Customers**. Customers, Addresses, Messages, Feedback, Favourites, Notifications (Notifications, Recipients), Wholesale (Business Customers, Customer Groups, B2B Price Lists), Loyalty (Loyalty Tiers, Points Transactions), Newsletter (Subscriptions, Subscription Topics). See [Users & addresses](/admin/customers/users-and-addresses).
- **Marketing**. Promotions (Promotions, Coupon Codes, Redemptions), Gift Cards (Gift Cards, Purchases, Transactions), Recommendations (Slots, Events, Candidates). See [Promotions](/admin/sales/promotions).
- **Content**. Pages, Menus (Menus, Menu Columns), Page Layouts, Blog (Blog Posts, Blog Categories, Blog Authors, Blog Comments, Blog Tags). See [Content pages](/admin/storefront/content-pages).
- **Shipping**. ACS Shipments, BoxNow Shipments, Pickup Points (BoxNow Lockers, ACS Stations). See [ACS Courier](/admin/shipping/acs) and [BoxNow](/admin/shipping/boxnow).
- **Settings**. Your store's own configuration, listed below.
- **System**. Platform operators only, collapsed until opened: Security & Access, Audit & Logs, Reconciliation, Stripe. See [Security & access](/admin/settings/security-and-access), [Audit & logs](/admin/system/audit-and-logs) and [Reconciliation](/admin/system/reconciliation).

An entry with the pages in brackets after it opens a sub-menu when you click it. When only one of those pages is open to you, the entry is that page itself and opens it directly.

The **Settings** section:

| Entry | What it is | Who sees it |
|---|---|---|
| **Store Profile** | Your store's own record: name, description, branding and colours, social links, pixels, payment and courier credentials. Opens straight on its form. See [Roles & team](/admin/getting-started/roles-and-team). | Admin, Owner |
| **Team** | The memberships that give people access to this store. See [Roles & team](/admin/getting-started/roles-and-team). | Admin, Owner |
| **Store Settings** | The runtime settings: feature switches, thresholds, legal identity, integrations. See [Store settings](/admin/settings/store-settings). | Admin, Owner |
| **Payment Methods** | See [Payment methods](/admin/sales/payment-methods). | everyone |
| **Shipping Providers** | See [Shipping providers](/admin/shipping/providers). | everyone |
| **VAT Rates** | See [VAT rates](/admin/sales/vat-rates). | everyone |
| **Email Templates** | Preview the transactional emails with your real orders. See [Email templates](/admin/storefront/email-templates). | anyone who may view orders |
| **Translations** | The editor for the admin's own wording. It changes text shared by every store, so it is listed only where the platform has opened it; normally it is not. See [Languages & translations](/admin/localization/languages-and-translations). | as opened by the platform |
| **Cache** | Purge what the storefront has cached so an edit shows at once. See [Cache](/admin/system/cache). | Admin, Owner |

### What decides which entries you see

- **Your role.** A screen your role cannot open is not listed at all, so you never click a link that answers "permission denied".
- **Your plan.** Loyalty, Wholesale, Promotions, Gift Cards, Recommendations and Blog appear only when your plan includes them.
- **Your store settings.** A plan feature you have switched off in **Store Settings** stays in the sidebar with an **Off** badge, so you can prepare it — tiers, coupons, price lists — before shoppers see it; its counts and its dashboard lines disappear until you switch it on. A screen that only collects what shoppers send disappears while its setting is off: Reviews, Feedback, Favourites, Newsletter, Blog Comments.
- **Your couriers.** ACS Shipments and ACS Stations appear only while ACS is an active shipping provider; BoxNow Shipments and BoxNow Lockers only while BoxNow is. With neither active, the **Shipping** section is not shown.

The full list of switches is in [Store settings](/admin/settings/store-settings#what-the-admin-shows).

### Badges

Six entries carry a number, and each counts only work that is waiting for someone:

| Entry | What the number counts |
|---|---|
| **Orders** | Orders in status Pending, waiting to be processed. |
| **Products** | Active products with stock between 1 and 9. |
| **Reviews** | Reviews in status New, waiting for approval. |
| **Messages** | Contact-form messages received in the last 7 days. There is no read/unread flag, so the number falls as messages turn a week old. |
| **Wholesale** | Business accounts waiting to be verified. |
| **Blog** | Blog comments waiting for approval, while blog comments are on. |

A number disappears while its count is zero. It is refreshed at once when a record it counts is saved, and at least once a minute otherwise. The dashboard's **Needs attention** card shows the same numbers. Carts, Blog Posts and Promotions carry no number: they count nothing anyone has to act on.

### Search and your account

The search box at the top of the sidebar narrows the menu as you type, and **Ctrl+K** (**⌘K** on a Mac) opens the command palette, which finds records too; see [Search & command palette](/admin/getting-started/search-and-command-palette). Your name at the bottom of the sidebar opens your account menu: the theme (**Light**, **Dark** or **System**), the admin's language, **View site** and **Log out**.

### Screens the platform keeps

Six screens a store's sidebar used to offer are managed on the platform console now, and none of them is listed in a store's admin any more.

Five of the six are a single list shared by the whole platform: one merchant's change would land on every other store, and the list itself mixes every store's records together. Those five now refuse to open even if you paste the address. The sixth, permission groups, is simply not how store access works — see [Roles & team](/admin/getting-started/roles-and-team).

| Screen | Where it used to be | What to do instead |
|---|---|---|
| **Countries** | The Localization group, which no longer exists | Ask the platform to enable, disable or reorder a country. The change applies to every store. |
| **Regions** | Same group | Ask the platform. Regions are the list your customers pick from at checkout. |
| **Sites** | Same group | Nothing to maintain: these are the store addresses the platform keeps. Ask the platform if one of yours looks wrong. |
| **Background Jobs** — the schedule of recurring work, and its results | The System section | Ask the platform. One schedule drives the recurring work of every store, so it was never a per-store setting. |
| **Cache Purge Log** | System → Audit & Logs | Purging itself stays yours, under <span class="sidebar-path">Settings → Cache</span>; see [Cache](/admin/system/cache). For the record of who purged what, see [Audit & logs](/admin/system/audit-and-logs). |
| **Groups** — permission groups | System → Configuration | Nothing to do. Store access comes from the three roles above, never from a group. See [Roles & team](/admin/getting-started/roles-and-team). |

Only the first three were ever open to an Owner or an Admin. The other three were already reserved for platform operators, so nothing a store role could previously reach has been taken away.

## Header and footer

### Header

- **View store**, at the top of every page, opens your storefront in a new tab.
- The **environment marker** tells a test copy from the live store. Outside production, the browser tab title starts with `[STAGE]`, `[CI]` or `[DEV]`, and a coloured label in the header names the environment (**Staging**, **CI**, **Development**). On the live store your own team sees neither, because there they would only state what you always know; platform operators, who move between environments, still see **Production** and `[PROD]`. The platform console carries its own **Control plane** label.

### The store name menu

Clicking the store name at the top of the sidebar no longer holds store tools: **Email Templates**, **Translations** and **Cache** are in the **Settings** section, and the help link is in the footer. For platform operators it lists the operational consoles (Flower, Mailpit, Meilisearch, RabbitMQ) configured for that environment; for everyone else it is empty.

### Footer

Every admin page ends with a footer showing:

- the store's name;
- **Version** followed by the release of the platform you are using — quote it when you report a problem;
- **Help & Guides**, which opens this guide in a new tab, shown when the platform has configured the link for the environment;
- **API docs**, the interactive API reference, for platform operators only.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Dashboard](/admin/getting-started/dashboard)
- [FAQ & troubleshooting](/admin/faq)
