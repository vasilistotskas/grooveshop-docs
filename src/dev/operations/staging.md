---
title: Staging
description: The staging namespace, its basic-auth gate and the asset paths exempted from it, the refresh script that clones production into it, what to re-enter afterwards, Mailpit, and what staging cannot reproduce.
---

# Staging

Staging is an internal dry-run environment on the same K3s cluster as
production, in the `grooveshop-staging` namespace, with its own Postgres,
RabbitMQ, Redis and Meilisearch. It is defined by the `overlays/staging`
kustomize overlay plus the `app-grooveshop-staging` Argo Application, which
is **manual sync only**. After a refresh it mirrors production's tenant
topology: the same stores, each on a `-staging` hostname, plus the platform
control plane at `platform-staging.grooveshop.space`, the shared asset
origins `assets-staging.grooveshop.space` and
`static-staging.grooveshop.space`, and this documentation site at
`docs-staging.grooveshop.space`.

## Access

Every HTML, API and static route on staging sits behind a Traefik
BasicAuth middleware
(`overlays/staging/middleware-basic-auth.yaml`, secret `staging-basic-auth`,
key `users`, htpasswd format, `removeHeader: true` so Django never sees the
`Authorization` header as a token). The plaintext password lives only in
`untracked/secrets/unsealed/staging/`; the cluster holds the bcrypt line.

### Exempted paths, and why

`overlays/staging/ingress-staging.yaml` routes a few prefixes through
separate Ingress objects **without** the basic-auth middleware:

| Path or host | Reason |
|---|---|
| `/_nuxt`, `/_ipx` on the storefront host | The browser fetches the Nuxt module graph, image proxy and font files (`/_nuxt/fonts`) without credentials. A 401 on a `/_nuxt` chunk does not show an error page; hydration silently hangs and the page looks dead. |
| the media-stream host (`/media_stream-image`) | Images are loaded by `<img>` tags, same reasoning; the media origin has its own rate limiting. |
| `/mcp`, `/.well-known/ucp`, `/.well-known/ard.json`, `/.well-known/ai-catalog.json`, `/feeds`, `/acp`, `/chat` on the storefront host | Agent-gateway surfaces called by external agents; they have their own rate-limit middlewares. |
| `/stripe/webhook`, `/viva-wallet/webhook/`, `/boxnow/webhook/` on the API host | Provider webhooks cannot send basic-auth (`overlays/staging/ingress-webhooks.yaml`). |

Everything else keeps the gate: the API host, the platform host, the
static host, and the documentation host. Production splits the docs host
so only `/dev` needs credentials; staging does not bother, because the
whole host is already behind the staging gate
(`overlays/staging/ingress-docs.yaml`).

## Hostnames

Tenant storefront and API hosts are the production names with a
`-staging` suffix; the platform hosts are the three listed above. The
`REWRITES` table in `scripts/staging-refresh.sh` (step 5) and the
per-tenant Ingress overlays under `overlays/staging/tenants/` must agree;
a tenant present in one and not the other either fails DNS or 404s at
`tenant/resolve`. A platform default is never a tenant's hostname.

## Refreshing from production

```bash
kubectl config use-context <production cluster>
./scripts/staging-refresh.sh        # prompts unless --yes
```

The script (`scripts/staging-refresh.sh`) refuses to run against any
other kubectl context, then:

1. `pg_dump`s production's database in custom format, excluding the
   schemas and extensions the Zalando operator owns, and gates on the dump
   size before anything irreversible.
2. Drops and recreates the staging database.
3. `pg_restore`s into it.
4. Copies the production media across. Longhorn does not cross namespaces
   without explicit CSI configuration, so this is a `tar` stream out of the
   production backend pod to a local archive, then a one-shot busybox pod
   in the staging namespace that mounts **only** the staging media PVC,
   wipes it and extracts the archive.
5. Rewrites every production hostname to its staging twin and re-provisions
   the platform control-plane host, without which the backend startup
   probe never passes.
6. Runs `manage.py meilisearch_sync_all_indexes --all-tenants` to rebuild
   the search indexes from the restored rows.
7. Runs `manage.py seed_demo_store --schema demo` to refresh the demo
   tenant.
8. Pipes `scripts/staging-arm-features.py` into `manage.py shell` against
   the first store's clone: every plan flag and `extra_settings` row on,
   Viva forced to demo mode, Meta CAPI off, one promotion of each kind, a
   B2B price list. The script supplies no third-party credentials, is
   idempotent, and refuses to run against a non-staging primary domain.
   Two things follow it, both part of the same step: `clear_cache --all`,
   which walks every active tenant schema itself, and a rollout restart of
   the frontend Deployment so the Nuxt pods drop any half-warm
   tenant-resolve state from before the database was swapped underneath
   them.

Wall time is 15 to 30 minutes. It **wipes staging**: anything created
there since the last refresh is gone. It is for making a dry-run realistic,
not a precondition for a sync.

### Re-enter the sandbox credentials after every refresh

Per-merchant credentials live on the `Tenant` row, not in env, so the
restore brings production's live keys across and the arming script blanks
the dangerous ones. After every refresh, in the staging admin under the
tenant's Payments and Shipping sections, re-enter:

| Integration | What to set |
|---|---|
| Viva Wallet | demo merchant id, API key, client id and secret; `viva_wallet_live_mode` off; the demo source code; the webhook registered on the demo dashboard against the staging API host |
| Stripe | test secret and publishable keys, then `manage.py bootstrap_stripe --schema <tenant>` to re-provision the dj-stripe API key and webhook endpoint |
| BoxNow | stage partner credentials, warehouse id, webhook secret; give BoxNow the staging webhook URL |
| ACS | stays **off**; ACS has no test environment and the production credentials would issue real vouchers |
| Analytics and Meta CAPI | blank; `META_CAPI_ENABLED` stays false so staging purchases never land in the production dataset |

Two rows also still point at production after a restore: `django_site`
and the tenant's `TenantDomain`. Step 5 rewrites them; if a dry-run reads
`tenant/resolve` and gets 404, check those first.

## Mailpit

Staging never sends real mail. `overlays/staging/mailpit.yaml` deploys
Mailpit, and the backend and celery-worker patches set `EMAIL_HOST` to
`mailpit` with no credentials. It is not published on a hostname because
the cloned customer data would sit behind basic-auth alone; port-forward
to read it:

```bash
kubectl -n grooveshop-staging port-forward svc/mailpit 8025:8025
```

The admin's site dropdown links to it, for platform superusers, when
`ADMIN_MAILPIT_URL` is set.

## What staging cannot reproduce

- **Production's Redis page cache.** The Nitro SWR cache is Redis and
  independent of the database, so a refreshed staging renders fresh and
  looks correct while production serves the pre-deploy page. See
  [Caches & purging](/dev/operations/caches).
- **Real carrier and payment traffic.** ACS is off, Viva is demo, Stripe
  is test.
- **Production load.** The overlay patches pin both HPAs to a single
  replica rather than removing them: `backend-hpa-patch.yaml` and
  `frontend-hpa-patch.yaml` each set `minReplicas` and `maxReplicas` to 1,
  so the autoscaler still exists and can never scale. The backend,
  frontend, celery-worker, media-stream, static and docs Deployments are
  each patched to `replicas: 1` as well.

## Sync

```bash
argocd app sync app-grooveshop-staging
argocd app wait app-grooveshop-staging --health --timeout 1200
```

or the `kubectl patch` form in [Deploying](/dev/operations/deploying). The
PreSync hook runs the same steps as production. Watch it with
`kubectl -n grooveshop-staging logs -f -l app.kubernetes.io/component=backend-prepare`.

## Failure modes

- **Storefront loads a blank page**: a build-asset path is behind
  basic-auth again; check the assets Ingress.
- **`tenant/resolve` 404 after a refresh**: hostname rewrite did not run
  or the tenant overlay is missing; compare `REWRITES` with
  `overlays/staging/tenants/`.
- **A staging checkout charged a real card**: `viva_wallet_live_mode` was
  left on; the arming script forces it off, re-run it.
- **Refresh aborted after step 3**: `pg_restore` exited non-zero on
  operator-owned objects; the exclude flags in step 1 exist for this.

## Source

| File | Role |
|---|---|
| `grooveshop-infrastructure/manifests/app-directory/app-grooveshop-staging.yaml` | Manual-sync Application |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/middleware-basic-auth.yaml` | BasicAuth middleware |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/ingress-staging.yaml` | Ingresses and exemptions |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/ingress-webhooks.yaml` | Webhook exemptions |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/ingress-docs.yaml`, `ingress-platform-assets.yaml` | Documentation host and the neutral platform asset origins |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/patches/backend-hpa-patch.yaml`, `frontend-hpa-patch.yaml` | HPAs pinned to one replica |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/mailpit.yaml`, `patches/backend-deployment-patch.yaml` | Mailpit |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/tenants/` | Per-tenant Ingress overlays |
| `grooveshop-infrastructure/scripts/staging-refresh.sh` | Refresh script |
| `grooveshop-infrastructure/scripts/staging-arm-features.py` | Feature arming, step 8 |
| `grooveshop-infrastructure/docs/staging.md` | The runbook this page distils |
