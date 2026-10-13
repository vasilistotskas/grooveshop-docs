---
title: Security & access
description: "The identity lists under System → Security & Access, whose records they hold on a store's admin, and the safe actions on each."
---

# Security & access

<span class="sidebar-path">System → Security & Access</span>

**Platform operator tools.** The whole **System** section, collapsed at the bottom of the sidebar, is shown only to platform operators, so a store Owner, Admin or Staff member never sees these entries. Hidden is not the same as sealed off, though: unlike the audit and reconciliation screens, most of these are not locked at the page itself. The last section explains what that means for you.

On a store's admin the lists show that **store's customers**. Platform staff identities live on the platform console instead, and nothing here touches them.

## User Sessions

Columns: **User**, **Created at**, **Last seen at**, **IP**, **User agent**. Search: user id, username, IP. No filters.

One row per signed-in browser or app of a customer. Activity tracking is on, so **Last seen at** updates as the customer browses.

Safe actions:

- **Delete** a row to sign that device out. The customer stays signed in elsewhere.
- Delete all rows of a user to sign them out everywhere, for example after they report a stolen phone.

## MFA Authenticators

Columns: **User**, **Type** (authenticator app, recovery codes, passkey), **Created at**, **Last used at**. Filters: type, created date, last-used date. There is no search box.

One row per second factor a customer has enrolled. See [Signing in & MFA](/admin/getting-started/login-and-mfa) for what each type is.

Safe actions:

- **Delete** a customer's authenticator-app or passkey row when they have lost the device and their recovery codes, after verifying their identity through another channel. They can sign in with password alone afterwards and enrol again.
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

- **Mark selected email addresses as verified** (bulk action) when a customer cannot receive the verification code and you have confirmed the address by other means. Each address that flips reports back by name.
- Change **Primary** only from the customer's own request.

## API Tokens

Columns: **Digest**, **User**, **Created**, **Expiry**. Search: digest, token key, user email.

Bearer tokens issued to a customer's browser or app by the storefront login. A token lives seven days, is extended on use up to thirty days after it was created, and each customer may hold at most ten.

Safe actions:

- **Delete** a token to revoke it immediately.
- Creating a token from this screen shows the secret once, in a message at the top of the page, and it cannot be recovered afterwards. There is rarely a reason to do this for a customer.

## Social Login Apps, OAuth Clients and OAuth Tokens

Three more entries in the same menu hold configuration rather than customer records:

- **Social Login Apps**: the store's registration with each sign-in provider (Google and the others) behind the storefront's social login. Which of them your store offers is still the `SOCIAL_LOGIN_PROVIDERS` setting.
- **OAuth Clients**: the outside applications, such as AI shopping agents, that may ask a customer to link their account to the store.
- **OAuth Tokens**: the tokens issued to those applications when a customer agrees. Delete one to cut that application off from that customer.

A store role cannot open OAuth Clients or OAuth Tokens at all, whatever address is typed.

## Things to know

- **These screens are hidden, not blocked.** The audit ledgers and the reconciliation screens refuse to open for anyone but a platform operator, whatever address you type. Apart from OAuth Clients and OAuth Tokens, these do not: an Owner or Admin who has the address can open them and delete rows, and Staff can open them and add or edit but not delete. Treat that as a reason to keep the Admin role to people you would trust with a customer's sign-in, not as an invitation.
- Nothing here touches the platform staff who sign in to the admin. A staff password reset or session revocation is done on the platform console.
- Permission groups are a platform tool and play no part in store roles. The group screen is not listed anywhere in a store's admin any more, and a store role cannot open it whatever address is typed; it is managed on the platform console. See [Roles & team](/admin/getting-started/roles-and-team).
- The other platform-owned lists a store's admin used to show — store addresses, the record of cache purges, the schedule of recurring work, countries and regions — now refuse to open on a store's address too. They are listed under [Welcome](/admin/).

## Related

- [Signing in & MFA](/admin/getting-started/login-and-mfa)
- [Users & addresses](/admin/customers/users-and-addresses)
- [Audit & logs](/admin/system/audit-and-logs)
