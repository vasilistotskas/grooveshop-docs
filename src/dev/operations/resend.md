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
`settings.py` (`EMAIL_TRANSPORT`, `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`),
`emails/webhooks.py`, `emails/svix.py`, `emails/events.py`, `emails/suppression.py`, `docs/emails.md` in the
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

The order matters, and the platform enforces it: the switch is guarded three
ways while `EMAIL_TRANSPORT=resend`.

- **Deploy guard.** `migration_preflight`, step 0 of the PreSync hook, runs
  the database system checks first. `emails.E001` is an error naming every
  active, not suspended store that sends from its own verified domain and
  has no Resend key, so the hook fails before any pod rolls and the previous
  release keeps sending over SMTP. Nothing is half-switched.
- **Save-time validation.** The tenant admin refuses to save such a store
  (ticking From Email verified without a key, or clearing the key of a
  verified store), with the error on the Resend API key field.
- **Dashboards.** The platform dashboard lists each such store ("Emails
  can't be sent from the store's domain until its Resend key is saved") and the store's
  own dashboard tells its owner and admins that its emails are not being sent
  and to contact support.

The checklist:

1. For **each store on its own verified domain** (webside today): create its
   team and key as above and save the key on its tenant row. The save-time
   validation does not apply yet (the transport is still `smtp`), so check the
   store's page yourself; the deploy guard in step 4 is what proves it.
2. Create the platform team's key (sending access on the platform sender
   domain) and seal it as `RESEND_API_KEY` into `backend-secrets` with
   `kubeseal --merge-into`, never a full `seal.sh` run (it rebuilds the whole
   Secret from the plaintext). Sync that SealedSecret **before** the setting
   below: a production process with `EMAIL_TRANSPORT=resend` and no key
   refuses to start, and the PreSync hook is such a process.
3. Set `EMAIL_TRANSPORT=resend` on the backend, worker, beat and flower
   containers (the same four that carry the relay settings). `settings.py`
   then requires `RESEND_API_KEY` and no longer requires
   `EMAIL_HOST_PASSWORD`.
4. Deploy. If a verified store still has no key the PreSync hook fails with
   `emails.E001` naming it: save its key (or set the transport back to
   `smtp`) and sync again. Nothing has rolled.
5. Send one real mail from each kind of store (a store on its own domain, a
   store on the platform sender, a platform mail such as a password reset) and
   check, in the Resend dashboard and the `EmailLog` row: the message exists
   with the `schema` and `log` tags; `provider_message_id` equals the id
   Resend shows; the customer list headers (`List-Unsubscribe`, and
   `List-Unsubscribe-Post` on a marketing mail) survived; the
   `Idempotency-Key` equals the row's uuid.
6. Watch the Resend dashboard for the first hour. The rollback is to set
   `EMAIL_TRANSPORT=smtp` again; nothing else changes.

## The webhook

Resend reports what became of a message (delivered, delayed, bounced, marked
as spam, failed, suppressed) to a webhook, and the platform records it on the
`EmailLog` row and keeps a suppression list. One endpoint path serves every
host, `POST /resend/webhook/` (`emails/webhooks.py`); which host a team
registers decides whose secret verifies it.

| Team | Endpoint to register | Signing secret kept in |
|---|---|---|
| The platform's (platform mail and every store without its own domain) | `https://<platform host>/resend/webhook/` | `RESEND_WEBHOOK_SECRET`, sealed into `backend-secrets` with `kubeseal --merge-into` |
| A store with its own team | `https://<that store's API host>/resend/webhook/` | the store's tenant row, "Resend webhook signing secret" in the platform admin |

There is no fallback between the two: a store's host never accepts the
platform's secret, and the platform host never accepts a store's. A host
with no secret answers 503 and Resend retries until one is set, so register
the endpoint after the secret exists.

Subscribe each endpoint to **sent, delivered, delivery_delayed, bounced,
complained, failed and suppressed**, and not to opened or clicked: the
platform does not track opens or clicks. An event it does not act on is
recorded and changes nothing.

What each event does (the full table is in the Django repository's
`docs/emails.md`):

- `delivered`, `delivery_delayed`, `failed` and `suppressed` set the log
  row's status; a temporary bounce counts as delayed. The status only moves
  forward, because events arrive out of order.
- A **permanent bounce** suppresses the address for every email. A **spam
  complaint** suppresses it for marketing only and opts it out of every
  marketing type, so a receipt still reaches a customer who complained about
  a newsletter. A mail the platform would send to a suppressed address is
  skipped and logged; a required one (a receipt, a security code) is also
  logged as a warning.
- The suppression list is per store (and one in `public` for the platform's
  own mail), keeps only a hash and a masked address, and is kept until
  removed. Resend keeps its own team-wide list as well, and no API removes an
  address from it: a removal must be done in both places.

Add the endpoint, save the secret, then send one real mail and look at its
`EmailLog` row: the status moves to `delivered` and an event appears.

### Rotating a signing secret

Resend shows a new secret for an endpoint when you roll it. Save it in the
place the table names, then roll it in Resend; while the old secret is still
valid Resend signs with both, and the platform accepts either signature, so
nothing is dropped. A store's secret is replaced on its tenant row, the
platform's by `kubeseal --merge-into` and a sync.

## Key rotation

- **A store's key or webhook secret**: create the new one in the store's
  Resend team, replace it on the tenant row, send one mail, then delete the
  old one in Resend. Update the password manager entry.
- **The platform key**: create the new key, `kubeseal --merge-into` it,
  sync, confirm one send, delete the old key.

## Failure modes

- **The webhook answers 400.** The signature does not match (the wrong secret
  for that host, a body changed on the way) or the timestamp is more than five
  minutes old (a replay, or a server clock far off). Nothing about the
  request is logged. Check the secret for the host the endpoint points at.
- **The webhook answers 413.** The body is over 256 KB; Resend's events are
  far smaller, so something else is posting.
- **The webhook answers 503.** That host has no signing secret. Save it
  (see the table above); Resend retries.
- **An event never changes a row.** It matches a row only by both the `log`
  tag and the provider id. An event whose row is not there yet is retried a
  few times (a fast event can beat the send's own write of the id) and then
  fails as a recorded task failure; one for a store that does not exist, or
  for another store than the endpoint's own, is dropped with a warning.

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
