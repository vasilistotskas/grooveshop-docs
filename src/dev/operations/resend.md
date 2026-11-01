---
title: Resend setup
description: "How a store's mail reaches Resend: one team per store with its own verified domain, the platform team for the rest, the keys, how to switch production from SMTP to the HTTP API, the live-send check, and key rotation."
---

# Resend setup

Transactional mail can leave over SMTP or over Resend's HTTP API
(`settings.EMAIL_TRANSPORT`, `smtp` or `resend`). The HTTP API returns a
message id and carries hidden tags, which is what delivery events are matched
on; SMTP returns neither. Production sends over SMTP until the switch below
is made; staging stays on Mailpit. The code wins over this page.

Source: `emails/transport.py`, `emails/resend.py`, `emails/sender.py`
(`own_sender`), `tenant/credentials.py` (`tenant_resend_api_key`),
`tenant/models.py` (`Tenant.resend_api_key`, `Tenant.resend_webhook_secret`),
`settings.py` (`EMAIL_TRANSPORT`, `RESEND_API_KEY`), `docs/emails.md` in the
Django repository, [Secrets](/dev/operations/secrets).

## Who sends through which team

| Mail | Resend team | Key |
|---|---|---|
| A store with its own verified domain (`from_email` set and `from_email_verified` ticked) | that store's own team | `Tenant.resend_api_key`, encrypted on the tenant row |
| A store without its own domain (sent as `"{store}" <DEFAULT_FROM_EMAIL>`) | the platform's team | `RESEND_API_KEY` (env, `backend-secrets`) |
| The platform's own mail (billing notices, staff password reset, health and backup alerts) | the platform's team | `RESEND_API_KEY` |

There is **no fallback** from a store's key to the platform's. A store that
sends as its own domain and has no key fails the send (`ResendNotConfigured`,
the `EmailLog` row is `failed`), because Resend refuses a domain the
platform's team does not own. The reason for one team per store is that
Resend's suppression list, quota and history belong to a team: one store's
complaint must not block an address for another store.

## Onboard a store with its own domain

Resend has no API for creating teams, so the first two steps are done by
hand in the Resend dashboard.

1. Create a Resend team for the store and add the store's sending domain.
   Publish the DKIM TXT and the two CNAMEs Resend returns, and wait until the
   domain is verified. Leave the apex MX and apex SPF alone: inbound mail
   for the store's addresses is not Resend's.
2. In that team create an API key restricted to **sending access on that
   domain**, and (once the webhook exists) a webhook endpoint with its
   signing secret. Check the team's plan: the free tier is capped per day.
3. In the platform's tenant admin, tab "Email & Security", set **Resend API
   key** and **Resend webhook signing secret** on the store's row, then tick
   **From Email verified** (with **From Email** set). Both are encrypted at
   rest ([Secret encryption](/dev/django/reference/secret-encryption)) and
   editable by platform staff only; a store role sees "set / not set".
4. Save the key and the secret in the platform's password manager in the
   same step. They exist nowhere else in readable form.

Never put a store's key in `backend-secrets`: that Secret holds the
platform's own `RESEND_API_KEY` only.

## Switch production from SMTP to the HTTP API

Do this once, after the platform's team exists, and verify one live send
before leaving it on.

1. Create the platform team's key (sending access on the platform sender
   domain) and seal it as `RESEND_API_KEY` into `backend-secrets` with
   `kubeseal --merge-into`, never a full `seal.sh` run (it rebuilds the whole
   Secret from the plaintext). Sync the SealedSecret **before** the setting
   below: a production process with `EMAIL_TRANSPORT=resend` and no key
   refuses to start, and the PreSync hook is such a process.
2. Set `EMAIL_TRANSPORT=resend` on the backend, worker, beat and flower
   containers (the same four that carry the relay settings). `settings.py`
   then requires `RESEND_API_KEY` and no longer requires
   `EMAIL_HOST_PASSWORD`.
3. Send one real mail (a test store's order or a password reset) and check,
   in the Resend dashboard and the `EmailLog` row: the message exists with
   the `schema` and `log` tags; `provider_message_id` equals the id Resend
   shows; the customer list headers (`List-Unsubscribe`, and
   `List-Unsubscribe-Post` on a marketing mail) survived; the
   `Idempotency-Key` equals the row's uuid.
4. Watch the Resend dashboard for the first hour. The rollback is to set
   `EMAIL_TRANSPORT=smtp` again; nothing else changes.

Give every store on its own domain its key **before** the switch, or its
mail fails (see the table above), and verify each of them with one send.

## Key rotation

- **A store's key or webhook secret**: create the new one in the store's
  Resend team, replace it on the tenant row, send one mail, then delete the
  old one in Resend. Update the password manager entry.
- **The platform key**: create the new key, `kubeseal --merge-into` it,
  sync, confirm one send, delete the old key.

## Failure modes

- **A store's mail is `failed` with `ResendNotConfigured`.** See the table:
  its own verified domain with no `resend_api_key`, or an empty
  `RESEND_API_KEY`. The task does not retry it.
- **`failed` with `HTTPError http 403` or `422`.** A key that cannot send for
  that domain, or a rejected request: permanent, not retried. The log row
  and the task log carry Resend's error name (`validation_error`, ...), never
  its message or the recipient.
- **`HTTPError http 429` or `5xx`, a timeout.** Retried by the task with
  backoff. Resend allows 10 requests per second per team, shared by every
  store on the platform's team.
- **A row stays `queued`.** The process died between creating the row and the
  provider answering; check the Resend dashboard before resending.
- **A demo store's own mailbox never appears in Resend.** Both transports
  drop it before sending, by design.
