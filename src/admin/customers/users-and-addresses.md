---
title: Users & addresses
description: Customer accounts and their saved addresses; what an admin can safely change, what to leave alone, and where staff accounts are managed instead.
---

# Users & addresses

<span class="sidebar-path">Customers → Users</span> and <span class="sidebar-path">Customers → User Addresses</span>

On a store's admin these screens list the store's **customers**: everyone who registered on the storefront or was created for an order. Your own team members are not managed here. Staff roles, invitations and the owner are handled as described in [Roles & team](/admin/getting-started/roles-and-team).

## What you see

Columns of the user list:

| Column | Meaning |
|---|---|
| **User** | Name, email and avatar. The name falls back to the username, then the email. |
| **Contact** | Phone and username. |
| **Location** | City and country. |
| **Active** | Can the account sign in. |
| **Staff**, **Superuser** | Privilege flags. Customers have both off. |
| **Social** | Which social links are filled in. |
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

Two tabs on the same page list the customer's saved addresses (Title, First Name, Last Name, City, Country, Is Main, Phone) and newsletter subscriptions (Topic, Status, Subscribed At, Unsubscribed At), each with a link to the full record.

Buttons: the account page has **Adjust loyalty points for this user** (superusers only). The list has bulk actions to export the selected rows as CSV or XML, capped at ten thousand rows.

## Addresses

<span class="sidebar-path">Customers → User Addresses</span> lists every saved delivery address across customers.

| Column | Meaning |
|---|---|
| **Address** | Title, street and number, city. |
| **Contact Person** | Recipient name and the owner's email. |
| **Location** | City, country, zip code. |
| **Is Main** | The customer's default address. Exactly one per customer. |
| **Phone** | Recipient phone. |
| **Created at** | |

Filters: **Is Main**, **Floor**, **Location Type**, **Country**, **Region**, **Created at** range. Search matches the owner's email and username, the title, recipient name, street and city.

The form groups **Address Owner** (user, title), **Contact Person**, **Address Details** (street, number, city, zip code, country, region), **Additional Information** (floor, location type, notes, is main) and **Contact Information** (phone). Ticking **Is Main** on one address automatically clears it on the customer's other addresses.

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

1. Open the account and click **Adjust loyalty points for this user**.
2. The default is 100 points; the allowed range is minus to plus ten thousand. Every adjustment is written to the points ledger with your name and cannot be undone except by another adjustment. See [Tiers & points](/admin/loyalty/tiers-and-points).

## Things to know

- **Do not set passwords for customers.** The change-password link exists on the form, but a password typed by staff is a password staff know. Ask the customer to use the storefront's forgotten-password flow instead.
- **Do not tick Staff or Superuser on a customer.** Staff is the API's admin flag, so it grants far more than a sidebar. Team access goes through [Roles & team](/admin/getting-started/roles-and-team). The fields are read-only for non-superusers for exactly this reason.
- **Email verification** is not resent from this screen. Verified addresses live under <span class="sidebar-path">System → Security & Access → Email Addresses</span>, which superusers can inspect; see [Security & access](/admin/settings/security-and-access). An unverified customer can request a new verification email from the storefront's sign-in page.
- **Changing the email** changes the login. Do it only on the customer's explicit request, and remember the old address stays on past orders.
- **Language** on the account is the language used for that customer's emails.
- The **Last Activity** column is the last time the record itself changed, not the last login.
- **Guest orders** have no user row. They appear only in [Orders](/admin/sales/orders).

## Related

- [Subscriptions](/admin/customers/subscriptions)
- [Data exports (GDPR)](/admin/customers/data-exports)
- [Tiers & points](/admin/loyalty/tiers-and-points)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Orders](/admin/sales/orders)
