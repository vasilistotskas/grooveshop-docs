---
title: Roles & team
description: Add and remove team members, choose their role, and understand what Staff, Admin and Owner may do.
---

# Roles & team

<span class="sidebar-path">Memberships (via the command palette or /admin/tenant/usertenantmembership/)</span>

A team member is a platform staff account plus a **membership** in your store. The membership carries the role. Admin and Owner manage memberships; Staff cannot open the list.

## What you see

The memberships list is not in the sidebar. Reach it by pressing **Ctrl+K** (or **⌘K**), typing the person's email, and picking the membership result, or by opening `/admin/tenant/usertenantmembership/` directly.

Columns: **User**, **Tenant**, **Role**, **Is active**, **Created at**. Filters: role, active, tenant (always your own store). Search: user email, username, store name.

The form has four fields:

| Field | Meaning |
|---|---|
| **User** | The platform staff account. The dropdown lists platform identities only, never your storefront customers. |
| **Tenant** | Always your store. |
| **Role** | Staff, Admin or Owner. An Admin does not see the Owner option. |
| **Is active** | Untick to suspend access without deleting the row. |

## What each role can do

| Capability | Staff | Admin | Owner |
|---|---|---|---|
| View, add, edit catalog, blog, sales, shipping, customers, loyalty | yes | yes | yes |
| Delete records | no | yes | yes |
| Extra Settings | no | yes | yes |
| Store profile (name, branding, colours, socials, pixels, payment and courier credentials) | no | yes | yes |
| Team memberships | no | yes | yes |
| Edit or remove an Owner, make someone Owner | no | no | yes |
| System section (audit logs, reconciliation, security lists) | no | no | no |

The last row is deliberate: the **System** section is for platform operators. See [Welcome](/admin/) for the full picture.

Where the store profile lives: search "Tenant" in the command palette or open `/admin/tenant/tenant/`. Admin and Owner see their own store row only, and only the fields in the merchant allowlist are editable (`tenant/role_scopes.py`, `TENANT_SELF_EDITABLE_FIELDS`). Plan, billing terms, feature flags, the store slug and the default currency are read-only there; the platform sets them.

## Tasks

### Add a team member

1. Ask the platform to create the person's staff account if they do not have one. A store cannot create platform accounts.
2. Press **Ctrl+K**, type "membership", open the memberships list, click **Add**.
3. Pick the **User**, leave **Tenant** as your store, pick the **Role**, keep **Is active** ticked.
4. **Save**. The person can sign in immediately.

### Change a role

1. Open the membership.
2. Change **Role** and **Save**.

An Admin cannot open an Owner's row for editing and cannot choose Owner as a role. Only an Owner can.

### Remove a team member

Either untick **Is active** (reversible) or delete the row. Owner rows can only be changed or deleted by an Owner.

## Things to know

- **At least one Owner.** The platform reserves the Owner role so that every store has someone who cannot be locked out by an Admin. Do not remove the last Owner; make another person Owner first.
- Roles are per store. The same staff account can be Owner of one store and Staff of another.
- Permissions are derived from the role at request time (`tenant/auth_backends.py`). There are no Django groups to maintain; the **Groups** screen under System is a platform tool.
- Staff see the **Settings → Extra Settings** entry in the sidebar but get "permission denied" when they open it. That is expected.
- Suspending a membership does not end the person's current browser session; it takes effect on their next request, which then fails the membership check.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Store settings](/admin/settings/store-settings)
- [Welcome](/admin/)
