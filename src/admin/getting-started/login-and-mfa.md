---
title: Signing in & MFA
description: How the admin login works, which account can enter, what multi-factor authentication your customers get, and how sessions end.
---

# Signing in & MFA

<span class="sidebar-path">/admin/login/</span>

The admin has its own login page, separate from the storefront account login. It accepts only platform staff accounts that hold an active membership in this store.

## What you see

The login form asks for **Email** and **Password**. A language switcher (Greek, English, German) is shown in the header; it changes the admin's interface language, not your store's.

After a successful login you land on the [Dashboard](/admin/getting-started/dashboard).

## Tasks

### Sign in

1. Open `https://<your-store-domain>/admin/`.
2. Enter the email and password of your staff account.
3. Click **Log in**.

The admin checks the credentials against the platform's staff directory only (`admin/forms.py`, `tenant/auth_backends.py`). Two things must be true for the login to succeed:

- the account is an active staff account on the platform, and
- it has an active membership (Staff, Admin or Owner) in the store whose domain you opened.

A customer account registered on your storefront cannot sign in to the admin, even if it uses the same email address. Staff of another store cannot open your admin either, because the membership check is per store.

### Change your password

1. Open the user menu (your name in the top-right corner).
2. Click **Change password**.
3. Enter the old password and the new one twice.

Changing your password signs out every other browser session of yours. Your current session stays.

### Sign out

Open the user menu and click **Log out**. Sessions otherwise expire two weeks after login; they are not extended by activity (`SESSION_COOKIE_AGE` in `settings.py`).

### Sign a device out remotely

There is no self-service list of your own admin sessions. If a device you no longer control is signed in, change your password: that invalidates the other sessions.

Platform operators can additionally revoke sessions from <span class="sidebar-path">System → Security & Access → User Sessions</span>; see [Security & access](/admin/settings/security-and-access). On a store's admin that list holds the store's customer sessions, not staff sessions.

## Multi-factor authentication

The admin login itself has no second factor today. `settings.py` declares `DJANGO_ADMIN_FORCE_ALLAUTH`, but nothing in the code base reads it, so the admin form is a plain email-and-password form. Keep staff passwords strong and unique.

Your **customers** do get MFA on the storefront, through the account pages. The configuration in `settings.py` (`MFA_*`, `ACCOUNT_*`) gives them:

| Method | Details |
|---|---|
| Authenticator app (TOTP) | Six-digit codes, rotating every thirty seconds. The entry in the customer's app is labelled with your store's name (the **TOTP issuer** field on the store profile, falling back to the store name). |
| Recovery codes | Ten single-use codes generated when TOTP is enabled. |
| Passkeys / WebAuthn | Passkey login and passkey sign-up are enabled. A passkey is bound to your store's primary domain, so it works only on that domain. |
| Login by code | Instead of a password a customer can request a six-digit code by email. The code lasts five minutes and allows three attempts. |
| Email verification | Mandatory, by six-digit code, five-minute validity. |

Social login (Google and others) is available when the platform has configured a provider; the **SOCIAL_LOGIN_PROVIDERS** setting lets you restrict which providers your store offers. See [Store settings](/admin/settings/store-settings).

## Things to know

- The admin URL is language-prefixed for non-default languages: `/admin/` is Greek, `/en/admin/` is English, `/de/admin/` is German.
- The admin never lists the platform staff accounts; those live on the platform console. Your team is managed through memberships, see [Roles & team](/admin/getting-started/roles-and-team).
- If a staff member leaves, deactivate their membership rather than sharing a password. Removing the platform staff flag (a platform action) also cuts off any API access they had.

## Related

- [Roles & team](/admin/getting-started/roles-and-team)
- [Security & access](/admin/settings/security-and-access)
- [FAQ & troubleshooting](/admin/faq)
