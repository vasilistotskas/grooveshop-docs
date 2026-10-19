---
title: Customers & addresses
description: Your customers' accounts and their saved addresses; what you can correct, what only the customer changes, and how they protect their sign-in.
---

# Customers & addresses

Here you find every customer who has an account on your store, and the delivery addresses they have saved. Your own team is not here; you manage it on [Roles & team](/admin/getting-started/roles-and-team).

<span class="sidebar-path">Customers → Customers</span> and <span class="sidebar-path">Customers → Addresses</span>

## What you see

The customer list shows for each customer:

| Column | What it shows |
|---|---|
| **User** | Name, email and photo. If the name is missing, the username is shown. |
| **Contact** | Phone and username. |
| **Location** | City and country. |
| **Active** | Whether the account can sign in. |
| **Engagement** | Active and total newsletter subscriptions, and how many addresses are saved. |
| **Last Activity** | The last time anything on the account changed. It is not the last sign-in. |
| **Created At** | The date they registered. |

Search finds a customer by email, name, phone, city or address. In the filters on the right, **User Status** quickly separates inactive customers and customers with or without subscriptions.

A customer's page has the tabs **Account**, **Profile**, **Address**, **Social**, **Permissions** and **Loyalty & Engagement**. Three more tabs show their **User Addresses**, their newsletter **User Subscriptions** and their **Orders**, newest first, each linking to the order.

The **Addresses** list shows every saved address of every customer. The **Is Main** column marks each customer's default address.

## Tasks

### Find a customer and their orders

1. Open <span class="sidebar-path">Customers → Customers</span>.
2. Type their email, name or phone in the search box.
3. Open the customer and click the **Orders** tab.

### Deactivate an account

1. Open the customer and go to the **Permissions** tab.
2. Untick **Active** and click **Save**.

The customer can no longer sign in. Orders, addresses and points stay as they were. To restore the account, tick **Active** again.

### Correct a profile or an address

1. Change the details on the **Profile** or **Address** tab and save.
2. For a delivery address, open it from the customer's **User Addresses** tab or from <span class="sidebar-path">Customers → Addresses</span>.

Orders already placed do not change. They keep the details they had at the time of purchase.

### Change the main address

Each customer has only one main address, and the form does not switch it for you.

1. Open the current main address, untick **Is Main** and save.
2. Open the new address, tick **Is Main** and save.

If you do step 2 first, saving fails with a message that only one main address is allowed.

### Export a list of customers

1. Filter the list, for example with **User Status**.
2. Select the rows and choose **Export selected to CSV** or **Export selected to XML**.

An export takes up to ten thousand rows. For more, narrow the filter first.

## Customer sign-in security

Your customers can protect their account from the **Security** page of their account on the store:

| Method | How it works |
|---|---|
| Authenticator app | A six-digit code that changes every 30 seconds. In the customer's app the account shows your store's name. |
| Recovery codes | Ten single-use codes, for when the customer does not have their phone. |
| Passkey | Sign-in without a password, using the device's fingerprint or PIN. It works only on your store's address. |
| Email sign-in code | The customer asks for a six-digit code by email instead of typing a password. The code is valid for 5 minutes. |

Every new account confirms its email with a six-digit code before it can be used.

You change the name customers see in their authenticator app in the **TOTP Issuer** field, under <span class="sidebar-path">Settings → Store Profile</span>. Left blank, the store name is used.

If a customer loses their phone and has no recovery codes, you cannot help them from this screen. See what to send on [When to contact support](/admin/help/contact-support).

## Things to know

- **Only the customer changes their email.** It is how they sign in and reset their password, so it is locked on the customer's page. Ask them to change it from their account.
- **Do not set passwords for customers.** If they forgot theirs, they click "Forgot password?" on the store's sign-in page.
- **The Permissions tab** has switches that grant access to the admin. They are locked for store roles. Add your staff on [Roles & team](/admin/getting-started/roles-and-team).
- **Loyalty points** show on the **Loyalty & Engagement** tab but cannot be changed here. Ask the platform team to add or remove points by hand. See [Loyalty](/admin/customers/loyalty).
- **Customer emails** go out in the language the customer chose on the store. That choice is not shown on this screen.
- **Guest orders** have no customer account. You find them only under [Orders](/admin/sales/orders).
- **Deleting an account:** the customer deletes their own account from the store. See [Data export (GDPR)](/admin/customers/data-exports).

## Related

- [Newsletter subscriptions](/admin/customers/subscriptions)
- [Favourites](/admin/customers/favourites)
- [Data export (GDPR)](/admin/customers/data-exports)
- [Loyalty](/admin/customers/loyalty)
- [Orders](/admin/sales/orders)
