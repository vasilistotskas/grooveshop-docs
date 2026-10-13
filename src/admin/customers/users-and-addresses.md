---
title: Users & addresses
description: Customer accounts and their saved addresses; what an admin can safely change, what to leave alone, and where staff accounts are managed instead.
---

# Users & addresses

<span class="sidebar-path">Customers → Customers</span> and <span class="sidebar-path">Customers → Addresses</span>

On a store's admin these screens list the store's **customers**: everyone who registered on the storefront or was created for an order. Your own team members are not managed here. Staff roles, invitations and the owner are handled under <span class="sidebar-path">Settings → Team</span>, as described in [Roles & team](/admin/getting-started/roles-and-team).

## What you see

Columns of the customer list:

| Column | Meaning |
|---|---|
| **User** | Name, email and avatar. The name falls back to the username, then the email. |
| **Contact** | Phone and username. |
| **Location** | City and country. |
| **Active** | Can the account sign in. |
| **Staff**, **Superuser** | Privilege flags. Customers have both off. |
| **Social** | Which of Website, LinkedIn, GitHub and Twitter are filled in. The full set of links is on the account page. |
| **Engagement** | Active and total newsletter subscriptions, number of saved addresses. |
| **Last Activity** | Last change to the account, absolute and relative. |
| **Created at** | Registration date. A date drill-down sits above the list. |

Filters on the right: **User Status** (Active Staff, Active Regular Users, Inactive Users, Super Users, Users with Subscriptions, Users without Subscriptions), **Social Media Presence**, **Active**, **Staff**, **Superuser**, **Country**, **Region**, **Subscription Count**, **Address Count**, **Created at**, **Updated at** and **Birth Date** ranges. The search box matches email, username, first and last name, phone, city, address and bio.

The account page has these sections:

- Account credentials: email, username, password. Username is an optional login handle, not the person's name; when blank one is generated from the email.
- **Personal Information**: first and last name, phone, birth date, image.
- **Bio & Description**.
- **Location & Address**: address, city, zip code, place, country, region. This is the profile address; saved delivery addresses are separate, see below.
- **Social Media & Website**.
- **Account Permissions**: Active, Staff, Superuser, groups, user permissions. Only a superuser can change the last four; for everyone else they are read-only.
- **Subscriptions & Engagement** (collapsed): the engagement summary.
- **Loyalty & Rewards**: **Points Balance**, **Total XP**, **Level**, **Tier**, all read-only. See [Tiers & points](/admin/loyalty/tiers-and-points).
- **System Information** (collapsed): ID and timestamps.

Tabs on the same page list the customer's saved addresses (Title, First Name, Last Name, City, Country, Is Main, Phone), newsletter subscriptions (Topic, Status, Subscribed At, Unsubscribed At) and **Orders**: every order of the customer, newest first and 20 per page, with its status, payment and paid amount, each linking to the order.

Buttons: platform operators see **Adjust loyalty points** on the account page. The list has bulk actions to export the selected rows as CSV or XML. Select more than ten thousand rows and the export is refused rather than truncated, so narrow the filter first. The password is never written into an export file.

## Addresses

<span class="sidebar-path">Customers → Addresses</span> lists every saved delivery address across customers.

| Column | Meaning |
|---|---|
| **Address** | Title, street and number, city. |
| **Contact Person** | Recipient name and the owner's email. |
| **Location** | City, country, zip code. |
| **Is Main** | The customer's default address. Exactly one per customer. |
| **Phone** | Recipient phone. |
| **Created at** | |

Filters: **Is Main**, **Floor**, **Location Type**, **Country**, **Region**, **Created at** range. Search matches the owner's email and username, the title, recipient name, street and city.

The form groups **Address Owner** (user, title), **Contact Person**, **Address Details** (street, number, city, zip code, country, region), **Additional Information** (floor, location type, notes, is main), **Contact Information** (phone) and a collapsed **System Information**.

A customer can have only one main address, and the form enforces it rather than sorting it out for you: tick **Is Main** on a second address and saving fails with "There can only be one main address per user." Untick it on the current main address first, save, then set the new one.

## Tasks

### Find a customer

1. Type the email, name or phone in the search box.
2. Open the row. For their orders, go to [Orders](/admin/sales/orders) and search the same email.

### Deactivate an account

1. Open the account and untick **Active** in **Account Permissions**. Save.
2. The customer can no longer sign in. Orders, addresses and points are kept. Re-tick to restore.

Use this for abuse or on the customer's request. It is not the deletion route: customers delete their own account from the storefront, which anonymises their orders and removes everything else. See [Data exports (GDPR)](/admin/customers/data-exports).

### Correct a profile or an address

1. Edit the fields and save. Order records are snapshots and do not change; only future checkouts pick up the new values.
2. For an address the customer no longer uses, delete it from the address list or the tab on the account page.

### Add points to a customer's balance

This is a platform operator's task; the button is not shown to store roles.

1. Open the account and click **Adjust loyalty points**.
2. Enter the **Points** (positive adds, negative removes; between minus and plus ten thousand) and a **Reason**, then submit. The adjustment is written to the points ledger with your name and the reason, and cannot be undone except by another adjustment. See [Tiers & points](/admin/loyalty/tiers-and-points).

## Things to know

- **Do not set passwords for customers.** The change-password link exists on the form, but a password typed by staff is a password staff know. Ask the customer to use the storefront's forgotten-password flow instead.
- **Do not tick Staff or Superuser on a customer.** Staff is not a cosmetic label: it grants administrative access to the store's whole data set, not just a menu. **Groups** and **User permissions** are the same thing by another route. Team access goes through [Roles & team](/admin/getting-started/roles-and-team). All four fields are read-only unless you are a superuser, for exactly this reason.
- **There is no resend-verification button here.** Nothing on the account page or in the bulk actions sends a new verification email. Verified addresses are visible to superusers under <span class="sidebar-path">System → Security & Access → Email Addresses</span>; see [Security & access](/admin/settings/security-and-access). An unverified customer requests a new verification email themselves from the storefront.
- **Changing the email** changes the login. Do it only on the customer's explicit request, and remember the old address stays on past orders.
- **The email language is not set here.** Customer emails go out in the language the customer chose on the storefront, and that choice is not shown on this screen.
- The **Last Activity** column is the last time the record itself changed, not the last login.
- **Guest orders** have no user row. They appear only in [Orders](/admin/sales/orders).

## Related

- [Subscriptions](/admin/customers/subscriptions)
- [Data exports (GDPR)](/admin/customers/data-exports)
- [Tiers & points](/admin/loyalty/tiers-and-points)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Orders](/admin/sales/orders)
