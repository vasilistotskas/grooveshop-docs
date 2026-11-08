---
title: Sign-in & password
description: How you get into the admin, how you change your password, what to do if you forgot it and when the session ends.
---

# Sign-in & password

You sign in to the admin with the account the platform team gave you. It is separate from a customer account on the store.

## What you see

The sign-in page has two fields, **Email Address** and **Password**, and a **Log in** button. After signing in you land on the [Dashboard](/admin/getting-started/dashboard).

## Tasks

### Sign in

1. Open your store's address with `/admin/` at the end.
2. Enter your email and password.
3. Click **Log in**.

Signing in works only if your account is a member of this store's team and your membership is **Active**. See [Roles & team](/admin/getting-started/roles-and-team).

### Change your password

1. Click your name at the bottom of the sidebar.
2. Click **Change password**.
3. Enter the old password and the new one twice.

The change signs out every other device you use. The device you are on stays signed in.

### I forgot my password

1. On the sign-in page, click **Forgotten your password or username?**.
2. Enter the email of your account and click **Send the link**.
3. Open the email. It comes in the store's language and its link works once, for one hour.
4. Choose the new password twice and click **Change my password**.
5. Sign in with the new password.

The page says the same thing whether or not the address has an account, so it reveals nothing to a stranger. It sends a link only to an active team account that may sign in to this store. A link that was used, has expired or is for another store is refused; ask for a new one. Asking too often in a short time is refused for a while.

The reset does not sign you in. Platform team accounts are still asked for their authenticator code afterwards.

### Too many wrong passwords

Wrong passwords are counted, and after too many the sign-in page answers **Too many failed sign-in attempts. Try again later.** Even the right password is refused while that message shows.

- When the platform can tell where an attempt comes from (the usual case on your store's address), five wrong passwords for one account from the same place (the same internet connection) within 15 minutes lock that account from that place only. You and your colleagues can still sign in from anywhere else.
- Wrong passwords for one account add up across every place: after 50 within 15 minutes the account is locked everywhere. When the platform cannot tell where attempts come from, this is the only limit on the account.
- Twenty wrong passwords from one place within 15 minutes, whatever the accounts, lock that place for every account.

The lock ends 15 minutes after the first wrong attempt. Trying again while it lasts does not make it longer.

To get back in at once, reset your password with **Forgotten your password or username?** (see above). The reset lifts the lock on your account. It does not lift a lock on the place itself (twenty wrong passwords from your connection, for any accounts): that one ends on its own when its 15 minutes are up. Your platform team can also unlock your account.

### "Sign-in is temporarily unavailable"

If the page says **Sign-in is temporarily unavailable, try again shortly.**, the platform cannot count sign-in attempts for a moment and refuses every sign-in on purpose, so nobody can guess passwords while the count is down. Wait a few minutes and try again. If it lasts, [contact support](/admin/help/contact-support).

### Sign out

Click your name at the bottom of the sidebar, then **Log out**.

### Sign out a device you no longer control

Change your password. That signs out every other device.

## Things to know

- A session ends two weeks after you sign in, even if you keep working in the admin.
- The store's sign-in asks your team (Owner, Admin, Staff) only for email and password. Use a strong password you do not use anywhere else, and give every person their own account.
- Platform team accounts, which can open every store, also need a second step: after the password, the same page asks for a six-digit code from an authenticator app, or a recovery code. If the sign-in page asks you for a code, the account you used is a platform team account, not a store account. After five wrong codes, further tries are refused (**Too many wrong codes. Try again in a few minutes.**) until 15 minutes have passed since the first code you tried. A platform team account that signs in to the API with a token gives the same code there, and must first set up its authenticator by signing in to the admin once.
- A customer account cannot get into the admin, even with the same email as yours.
- When a colleague leaves, untick **Active** on their membership. They lose access on their next click.
- You change the admin language from your account menu (Greek, English, German). It changes only your own view.

## Related

- [Roles & team](/admin/getting-started/roles-and-team)
- [When to contact support](/admin/help/contact-support)
- [FAQ](/admin/faq)
