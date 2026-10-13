---
title: Roles & team
description: Add and remove team members, choose their role, and understand what Staff, Admin and Owner may do.
---

# Roles & team

<span class="sidebar-path">Settings → Team</span>

A team member is a platform staff account plus a **membership** in your store. The membership carries the role. Admin and Owner manage memberships; Staff do not see the **Team** entry at all.

## What you see

**Team** lists your store's memberships. You can also reach a membership by pressing **Ctrl+K** (or **⌘K**), typing the person's email, and picking the membership result.

Columns: **User**, **Tenant**, **Role**, **Is active**, **Created at**. Filters: role, active, tenant. Search: user email, username, store name. You only ever see your own store's rows, whatever you type.

The form has four fields:

| Field | Meaning |
|---|---|
| **User** | The platform staff account. The dropdown lists platform identities only, never your storefront customers. |
| **Tenant** | Always your store. |
| **Role** | Staff, Admin or Owner. An Admin does not get the Owner option. |
| **Is active** | Untick to suspend access without deleting the row. |

## What each role can do

| Capability | Staff | Admin | Owner |
|---|---|---|---|
| View, add, edit sales, catalog, customers, marketing, content and shipping; payment methods, shipping providers, VAT rates; preview email templates | yes | yes | yes |
| Delete records | no | yes | yes |
| <span class="sidebar-path">Settings → Store Settings</span> | no | yes | yes |
| <span class="sidebar-path">Settings → Cache</span> | no | yes | yes |
| <span class="sidebar-path">Settings → Store Profile</span> (name, branding, colours, socials, pixels, payment, courier and myDATA credentials) | no | yes | yes |
| <span class="sidebar-path">Settings → Team</span> | no | yes | yes |
| Edit or remove an Owner, make someone Owner | no | no | yes |
| System section in the sidebar (audit logs, reconciliation, identity lists, Stripe) | no | no | no |

The last row is deliberate: the **System** section is for platform operators. See [Welcome](/admin/) for the full picture, and [Security & access](/admin/settings/security-and-access) for one caveat about the identity lists.

The sidebar follows this table: an entry a role cannot open is not listed for that role, so Staff never see Store Profile, Team, Store Settings or Cache, and no store role sees System. What the store's plan and settings switch off is hidden for every role alike; see [Welcome](/admin/).

Where the store profile lives: <span class="sidebar-path">Settings → Store Profile</span> opens straight on your store's own record. Admin and Owner see their own store row only, and can edit only part of it. Editable: store name and description, contact email, default language, branding and colours, social links, analytics pixels (Google Analytics, Meta, TikTok), Google Ads conversion tracking (the `AW-` conversion ID plus one label per action — purchase, add to cart, begin checkout, add payment info, page view; a label without the ID is refused, and every event is sent with the real order or cart value rather than a placeholder), your Viva Wallet, Stripe, ACS, BoxNow and myDATA credentials, and the authenticator-app issuer name. Read-only, because the platform sets them: your plan and billing dates, every plan feature switch, the store's short name, and the currency.

## Tasks

### Add a team member

1. Ask the platform to create the person's staff account if they do not have one. A store cannot create platform accounts.
2. Open <span class="sidebar-path">Settings → Team</span> and click **Add**.
3. Pick the **User**, leave **Tenant** as your store, pick the **Role**, keep **Is active** ticked.
4. **Save**. The person can sign in immediately.

### Change a role

1. Open the membership.
2. Change **Role** and **Save**.

An Admin cannot open an Owner's row for editing and cannot choose Owner as a role. Only an Owner can.

### Remove a team member

Either untick **Is active** (reversible) or delete the row. Owner rows can only be changed or deleted by an Owner.

## Things to know

- **Keep more than one Owner.** Nothing stops an Owner from removing the last Owner row, and once it is gone no Admin can put it back — only the platform can. Promote the next person before you remove yourself.
- Roles are per store. The same staff account can be Owner of one store and Staff of another.
- Permissions come from the role itself. There is nothing to assign or maintain beyond picking the role, and the permission-groups screen the platform uses has no part in it.
- A colleague who cannot find **Store Settings**, **Cache**, **Store Profile** or **Team** in the sidebar has the Staff role. That is expected: the entries are left out rather than shown and refused. Change the role if they need them.
- Suspending a membership does not close the person's open browser tab. It takes effect on their next click, which then fails the membership check.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Store settings](/admin/settings/store-settings)
- [Welcome](/admin/)
