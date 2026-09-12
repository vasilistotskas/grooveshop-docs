---
title: Signing in & MFA
description: How the admin login works, which account can enter, what multi-factor authentication your customers get, and how sessions end.
---

# Signing in & MFA

<span class="sidebar-path">/admin/login/</span>

The admin has its own login page, separate from the storefront account login. It accepts only platform staff accounts that hold an active membership in this store.

## What you see

A short form with two fields, **Email Address** and **Password**, and a **Log in** button. Nothing else: no password-reset link, and no language switcher.

After a successful login you land on the [Dashboard](/admin/getting-started/dashboard).

## Tasks

### Sign in

1. Open `https://<your-store-domain>/admin/`.
2. Enter the email and password of your staff account.
3. Click **Log in**.

The login checks your credentials against the platform's staff directory only. Two things must be true for it to succeed:

- the account is an active staff account on the platform, and
- it has an active membership (Staff, Admin or Owner) in the store whose domain you opened.

A customer account registered on your storefront cannot sign in to the admin, even if it uses the same email address. Staff of another store cannot open your admin either, because the membership is checked per store.

### Change your password

1. Open the user menu (your name in the top-right corner).
2. Click **Change password**.
3. Enter the old password and the new one twice.

Changing your password ends every other browser session of yours. The one you are using stays signed in.

### Sign out

Open the user menu and click **Log out**. Sessions otherwise expire two weeks after you sign in, and using the panel does not extend them.

### Sign a device out remotely

There is no self-service list of your own admin sessions. If a device you no longer control is signed in, change your password: that ends the other sessions.

The **User Sessions** list under <span class="sidebar-path">System → Security & Access</span> is a different thing. On a store's admin it holds that store's **customer** sessions, not staff sessions. See [Security & access](/admin/settings/security-and-access).

## Multi-factor authentication

**The admin login has no second factor today.** It is a plain email-and-password form. Keep staff passwords strong and unique, and do not share an account between people — a membership per person is free.

Your **customers** do get multi-factor authentication on the storefront, through the account pages:

| Method | Details |
|---|---|
| Authenticator app (TOTP) | Six-digit codes, rotating every thirty seconds. The entry in the customer's app is labelled with your store's name (the **TOTP issuer** field on the store profile, falling back to the store name). |
| Recovery codes | Ten single-use codes, generated when the authenticator app is enrolled. |
| Passkeys | Passkey login and passkey sign-up are both available. A passkey is bound to your store's primary domain, so it works only on that domain. |
| Login by code | Instead of a password a customer can request a six-digit code by email. The code lasts five minutes and allows three attempts. |
| Email verification | Mandatory, by six-digit code, five-minute validity. |

Social login (Google and others) is available when the platform has configured a provider for your domain; the `SOCIAL_LOGIN_PROVIDERS` setting lets you restrict which of them your store offers. See [Store settings](/admin/settings/store-settings).

## Things to know

- The admin address carries the language for anything but Greek: `/admin/` is Greek, `/en/admin/` is English, `/de/admin/` is German. Greek, English and German are also offered in the header switcher once you are signed in; it changes your own view only, never your storefront.
- The admin never lists the platform staff accounts; those live on the platform console. Your team is managed through memberships, see [Roles & team](/admin/getting-started/roles-and-team).
- If a staff member leaves, untick **Is active** on their membership rather than sharing a password. Removing their platform staff flag is a platform action and also cuts off any API access they had.

## Related

- [Roles & team](/admin/getting-started/roles-and-team)
- [Security & access](/admin/settings/security-and-access)
- [FAQ & troubleshooting](/admin/faq)
