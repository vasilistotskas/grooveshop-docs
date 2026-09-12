---
title: Security & access
description: The five identity lists under System → Security & Access, whose records they hold on a store's admin, and the safe actions on each.
---

# Security & access

<span class="sidebar-path">System → Security & Access</span>

**Platform operators only.** The whole **System** section is gated on the platform superuser flag (`admin/permissions.py`, `admin/mixins.py`). Store Owners and Admins do not see it. This page exists so an Owner knows what the platform can do on request, and so an operator knows what each list contains.

On a store's admin these lists show that **store's customers**: the identity apps (`allauth.account`, `allauth.mfa`, `allauth.socialaccount`, `knox`) live inside each store's schema, and the sessions app keeps a copy per store. Platform staff identities live on the platform console instead.

## User Sessions

Columns: **User**, **Created at**, **Last seen at**, **IP**, **User agent**. Search: user id, username, IP.

One row per signed-in browser or app of a customer. Activity tracking is on, so **Last seen at** updates as the customer browses.

Safe actions:

- **Delete** a row to sign that device out. The customer stays signed in elsewhere.
- Delete all rows of a user to sign them out everywhere, for example after they report a stolen phone.

## MFA Authenticators

Columns: **User**, **Type** (TOTP, recovery codes, WebAuthn), **Created at**, **Last used at**. Filters: type, dates.

One row per second factor a customer has enrolled. See [Signing in & MFA](/admin/getting-started/login-and-mfa) for what each type is.

Safe actions:

- **Delete** a customer's TOTP or WebAuthn row when they have lost the device and their recovery codes, after verifying their identity through another channel. They can sign in with password alone afterwards and re-enrol.
- Do not edit rows; the secrets are not meant to be changed by hand.

## Social Accounts

Columns: **User**, **UID**, **Provider**. Filter: provider. Search: UID and the user's email or name.

One row per linked Google (or other provider) identity.

Safe actions:

- **Delete** to unlink a provider from a customer account. The customer can still sign in with password or link again.

Which providers exist is platform configuration; which ones your store offers is the `SOCIAL_LOGIN_PROVIDERS` setting, see [Store settings](/admin/settings/store-settings).

## Email Addresses

Columns: **Email**, **User**, **Primary**, **Verified**. Filters: primary, verified. Search: email and the user's fields.

A customer may have several addresses; one is primary. Verification is mandatory before the account is usable.

Safe actions:

- **Mark selected email addresses as verified** (bulk action) when a customer cannot receive the verification code and you have confirmed the address by other means.
- Change **Primary** only from the customer's own request.

## API Tokens

Columns: **Digest**, **User**, **Created**, **Expiry**. Search: digest, token key, user email.

Bearer tokens issued to a customer's browser or app by the storefront login. A token lives seven days and is extended on use up to thirty days after creation; each user may hold at most ten (`REST_KNOX` in `settings.py`).

Safe actions:

- **Delete** a token to revoke it immediately.
- Creating a token from the admin shows the secret once in a message; it cannot be recovered later. There is rarely a reason to do this for a customer.

## Things to know

- Nothing here touches the platform staff who sign in to the admin. A staff password reset or session revocation is done on the platform console.
- The **Groups** entry under <span class="sidebar-path">System → Configuration</span> is Django's permission groups; store roles do not use it (see [Roles & team](/admin/getting-started/roles-and-team)).
- The **Shipping Providers** entry under System → Configuration is the same list as <span class="sidebar-path">Shipping → Shipping Providers</span>.

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Audit & logs](/admin/system/audit-and-logs)
