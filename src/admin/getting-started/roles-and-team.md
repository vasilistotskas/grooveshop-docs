---
title: Roles & team
description: Add and remove team members, choose their role and see what Staff, Admin and Owner may do.
---

# Roles & team

<span class="sidebar-path">Settings → Team</span>

This is where you decide who gets into your store's admin and with which role. Admins and Owners see **Team**.

## What you see

A list with one row per member of your store. Columns: **Member**, **Role**, **Active**, **Created At**. You can filter by role and by **Active**. The list has no search.

A member's form has three fields:

| Field | Meaning |
|---|---|
| **Email address** | Only when you add someone: the exact email of the person's existing platform account. Afterwards the form shows the **Member** instead, and it cannot be changed. |
| **Role** | **Staff**, **Admin** or **Owner**. An Admin does not see the Owner choice. |
| **Active** | Untick it to cut access without deleting the member. |

## Tasks

### Add a member

1. If the person has no platform account, ask the platform team to create one. A store cannot create accounts.
2. Open <span class="sidebar-path">Settings → Team</span> and click **Add**.
3. Type the person's **Email address** exactly as their account has it, and choose the **Role**. Leave **Active** ticked.
4. Click **Save**. The person can sign in straight away.

The form does not list people to choose from. An address with no platform account is refused, and so is someone who is already on the team.

The form opens with the role **Member**. That role gives no access at all, so always change it.

### Change a role

1. Open the member from the list.
2. Change the **Role** and click **Save**.

Only an Owner can change another Owner or make someone an Owner.

### Remove a member

Untick **Active** (easy to undo) or delete the member. On their next click the person loses access.

A store must always keep at least one active Owner. The last one cannot be removed, made inactive or given another role; make someone else Owner first.

## What each role can do

| Capability | Staff | Admin | Owner |
|---|---|---|---|
| View, add and edit sales, catalog, customers, marketing, content and shipping | yes | yes | yes |
| Payment methods, shipping providers, VAT rates, email templates | yes | yes | yes |
| Delete | no | yes | yes |
| [Store Profile](/admin/settings/store-profile) | no | yes | yes |
| [Store Settings](/admin/settings/store-settings) | no | yes | yes |
| [Cache](/admin/settings/cache) | no | yes | yes |
| [Storefront texts](/admin/content/storefront-texts) | view only | yes | yes |
| Team | no | yes | yes |
| Edit or remove an Owner | no | no | yes |

Whatever a role cannot open does not even appear in its sidebar.

## Things to know

- **Always keep two Owners.** Nothing stops the last Owner from being removed, and after that only the platform team can appoint a new one. Appoint the next Owner before you remove yourself.
- A role applies to one store. The same person can be Owner in one store and Staff in another.
- There are no other permissions to set up. The role decides everything.
- If a colleague cannot find **Store Settings**, **Cache**, **Store Profile** or **Team**, their role is Staff. Change it if they need those.

## Related

- [Sign-in & password](/admin/getting-started/sign-in)
- [Store profile](/admin/settings/store-profile)
- [Welcome](/admin/)
