---
title: Environments & domains
description: Local, staging and production; the platform and tenant domain families; and where configuration and secrets live in each environment.
---

# Environments & domains

Three environments, one cluster for two of them. Staging is a namespace
twin of production on the same K3s cluster, refreshed from a production
clone and synced by hand. Production auto-syncs from git. Local runs the
backing services in Docker and the applications on your machine.

## Local

**Django.** `docker-compose.yml` includes two files: `infra.compose.yml`
(PostgreSQL, Redis, RabbitMQ, Meilisearch, pgAdmin, RedisInsight, Mailpit)
and `app.compose.yml` (`backend-init` for migrations, `backend`,
`celery_worker`, `celery_beat`, `celery_flower`). Run only the
infrastructure and the app on the host for a normal dev loop:

```bash
docker compose -f infra.compose.yml up -d
cp .env.example .env
uv sync --locked --all-extras --dev
uv run python manage.py migrate_schemas
uv run python manage.py runserver
```

Configuration is a single `.env` read by `settings.py`; `SYSTEM_ENV` is
`dev`, `production` or `ci`. Every request needs a tenant: `localhost`
must exist as a `TenantDomain` row (`server/utils/tenant.ts` strips the
port before resolving), so create the platform row with
`bootstrap_platform` and a store with `tenant_create`.

**Storefront.** `cp .env.example .env`, then `pnpm install` and `pnpm dev`.
`NUXT_API_BASE_URL` points at the local Django API; `NUXT_CACHE_BASE` can
be `memory`.

**Media stream.** `pnpm install`, `pnpm run dev`; `BACKEND_URL` points at
the image origin and Redis must be running.

**Gateway.** Export the variables from `.env.example` (`DJANGO_BASE_URL`,
`REDIS_URL`, `INTERNAL_EVENTS_SECRET`, `ASSETS_HOST`, `ENV=development`)
and `go run ./cmd/gateway`.

## Staging

| Property | Value |
|---|---|
| Namespace | `grooveshop-staging`, isolated Postgres, Redis, RabbitMQ and Meilisearch |
| Argo CD | `app-grooveshop-staging`, **manual sync only**; `appset-grooveshop-staging-tenants` generates one Application per `overlays/staging/tenants/*` |
| Access | Traefik basic auth (`middleware-basic-auth.yaml`, secret `staging-basic-auth`) on HTML and API hosts; the asset origins and the payment/carrier webhook paths are exempt (`ingress-webhooks.yaml`) |
| Platform hosts | `platform-staging.grooveshop.space`, `assets-staging.grooveshop.space`, `static-staging.grooveshop.space`, `docs-staging.grooveshop.space` |
| Email | The backend and Celery worker patches set `EMAIL_HOST=mailpit` (`overlays/staging/patches/backend-deployment-patch.yaml`); the inbox is reached with `kubectl port-forward svc/mailpit 8025:8025`, never through an ingress, because the database is a clone of production |
| Gateway | `ENV=staging`: production network rules, sandbox payment-handler label |

`scripts/staging-refresh.sh` in the infrastructure repo dumps and restores
production's database and media into staging, rewrites production
hostnames to their staging twins, rebuilds the search indexes, re-seeds
the demo tenant and arms every feature on the clone
(`scripts/staging-arm-features.py`). Two consequences to remember every
time:

- The refresh **re-clones production's credentials** over the tenant
  rows. Re-enter the sandbox Viva, Stripe and BoxNow sets afterwards; ACS
  stays off because it has no test environment, and analytics and Meta
  CAPI stay blank so staging never reports into production datasets.
- Deploying a new image tag to staging is a manual `argocd app sync` after
  the pins in `manifests/app-directory/app-grooveshop-staging.yaml` change.

The full runbook is `grooveshop-infrastructure/docs/staging.md`; the docs
page is [Staging](/dev/operations/staging).

## Production

| Property | Value |
|---|---|
| Namespace | `grooveshop` |
| Argo CD | `app-grooveshop` with `automated` sync, `prune` and `selfHeal`: a push to the infrastructure repo deploys. `appset-grooveshop-tenants` generates a `tenant-<slug>` Application from every directory under `overlays/production/tenants/` |
| Edge | Cloudflare proxies the zones in front of Traefik; the real client IP arrives in `CF-Connecting-IP` and is forwarded to Django as `X-Real-IP` (`grooveshop-storefront-ui-node-nuxt/server/utils/auth.ts`) |
| TLS | cert-manager with the `letsencrypt-http01-cluster-issuer` ClusterIssuer, one Certificate per host, HTTP-01 through Traefik; a new host needs DNS pointing at the cluster before its certificate can issue |
| Ingress middlewares | `redirect-https`, `security-headers`, `compress-responses`, `rate-limit-api`, `rate-limit-agent`, `rate-limit-chat`, `limit-attachment-body` (`base/ingress-traefik.yaml`, `base/middleware-ratelimit.yaml`, `base/middleware-body-limit.yaml`), plus `platform-basic-auth` on the control plane and `docs-basic-auth` on this site's developer tree |
| Image pins | Six places in `manifests/app-directory/app-grooveshop.yaml`: five kustomize images (Django, storefront, media stream, gateway, docs) and the PreSync hook's Helm tag, which must equal the Django tag |

The PreSync hook Job runs four steps once per deploy before any pod rolls:
`migrate_schemas`, `collectstatic`, the Meilisearch index-settings apply and
the recommendation-slot backfill. Migrations must therefore be
backwards-compatible with the running image. See
[Deploying](/dev/operations/deploying).

## Domain families

### Platform hosts

All under `grooveshop.space`, shared by every tenant and owned by none. A
tenant hostname must never appear as a platform default.

| Host | Serves | Manifest |
|---|---|---|
| `platform.grooveshop.space` | The control plane (Django public schema), behind basic auth | `overlays/production/ingress-platform.yaml` |
| `assets.grooveshop.space` | The media stream, the default image origin | `overlays/production/ingress-platform-assets.yaml` |
| `static.grooveshop.space` | Static nginx, the default static origin | same file |
| `payments.grooveshop.space` | UCP payment-handler documents served by the gateway | `overlays/production/ingress-payments-handler.yaml` |
| `docs.grooveshop.space` | This site; `/dev` behind basic auth | `overlays/production/ingress-docs.yaml` |

Staging twins carry a `-staging` suffix on the first label.

### Tenant hosts

A tenant's hostnames are `TenantDomain` rows, not configuration. The
standard set is the primary domain, `www.` and `api.`; the infra template
(`overlays/production/tenants/TEMPLATE/ingress.yaml`) provisions ingresses
and certificates for exactly those three and path-routes the agent
surfaces on the primary host. A white-label tenant may add
`assets.<domain>` and `static.<domain>` rows and the matching ingress
hosts; only then does the resolve payload report `assetsDomain` and
`staticDomain`. Unmapped custom domains reach a low-priority HTTP-only
catch-all that redirects to HTTPS and forwards to the storefront
(`ingress-tenant-catchall.yaml`).

## Configuration conventions

| Kind | Where | Rule |
|---|---|---|
| Platform-wide settings | ConfigMaps `backend-config`, `frontend-config`, `media-stream-config`, `agent-gateway-config` in `base/`, patched per overlay under `overlays/<env>/patches/` | Infrastructure endpoints, timeouts, transport settings, feature defaults. Never a per-merchant value |
| Secrets | Sealed Secrets committed under `overlays/<env>/sealed-*.yaml`; plaintext stays in the gitignored `untracked/secrets/unsealed/` and is sealed with `seal.sh` | `base/` carries no secrets. Reloader restarts pods on change |
| Per-tenant values | The `Tenant` row, edited in the platform admin | Payment and carrier credentials, pixel ids, socials, chat and ACP tokens, branding, locales. An empty field means the integration is off for that store |
| Storefront public config | `NUXT_PUBLIC_*` (`runtimeConfig.public` in `nuxt.config.ts`) | Serialised into every tenant's HTML, so it may hold only platform-neutral values: the platform Django host name, media and static origins, the site defaults used when no tenant resolves |
| Storefront private config | `NUXT_*` without `PUBLIC` | `NUXT_API_BASE_URL` (in-cluster), `NUXT_SESSION_PASSWORD`, `NUXT_CACHE_PURGE_TOKEN`, OAuth client secrets, Redis |
| Environment switch | `SYSTEM_ENV` (Django), `ENV` (gateway), `NODE_ENV` (media stream) | Environment differences are config values, not conditionals; the gateway refuses to boot on an unknown `ENV` |

Build-time and runtime are kept apart in the storefront image: the CI
build writes a `.env` from non-sensitive GitHub *variables* and
placeholder secrets, and real secrets are supplied only at runtime through
the sealed `frontend-secrets`
(`grooveshop-storefront-ui-node-nuxt/.github/workflows/docker.yml`). See
[Secrets](/dev/operations/secrets) for why.

## Invariants

- Production deploys are a git push; staging deploys are a git push plus a
  manual sync.
- The Django image tag moves in two places per Application file, together.
- Every public hostname is either a platform host under
  `grooveshop.space` or a `TenantDomain` row.
- Secrets are sealed per overlay and never baked into an image.

## Failure modes

- A tenant ingress references a host with no DNS record: the certificate
  never issues and the HTTP-01 challenge loops; verify with `dig` first.
- The PreSync hook tag is bumped without the kustomize pin, or the other
  way round: the first direction migrates tables out from under old pods,
  the second fails safe but deletes the failed Job's logs
  (`grooveshop-infrastructure/CLAUDE.md`).
- A child Application reports "Synced" against old pins after a push: the
  root app has not refreshed yet; force a hard refresh and verify the
  running images, not the sync status (`docs/deploying.md`).
- Staging serves 401 on a `/_nuxt` chunk: basic auth was applied to a
  build-asset prefix; those prefixes are exempt by design.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/docker-compose.yml`, `infra.compose.yml`, `app.compose.yml` | Local stack |
| `grooveshop-django-api/.env.example` | Django configuration keys |
| `grooveshop-django-api/tenant/management/commands/bootstrap_platform.py`, `tenant_create.py` | Local and production provisioning |
| `grooveshop-storefront-ui-node-nuxt/.env.example`, `nuxt.config.ts` | Storefront configuration |
| `grooveshop-storefront-ui-node-nuxt/.github/workflows/docker.yml` | Build-time versus runtime secrets |
| `grooveshop-agent-gateway/.env.example`, `internal/config` | Gateway configuration, `ENV` handling |
| `grooveshop-media-stream/.env.example` | Media stream configuration |
| `grooveshop-infrastructure/manifests/app-directory/app-grooveshop.yaml`, `app-grooveshop-staging.yaml` | Sync policy and image pins |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/` | ConfigMaps, middlewares, Deployments |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/production/` | Platform ingresses, sealed secrets, tenant overlays |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/overlays/staging/` | Basic auth, Mailpit, webhook exemptions |
| `grooveshop-infrastructure/manifests/app-constructs/cert-manager/setup/issuers/letsencrypt-http01.cluster-issuer.yaml` | HTTP-01 issuer |
| `grooveshop-infrastructure/docs/staging.md`, `docs/deploying.md`, `docs/tenant-onboarding.md` | Runbooks |
