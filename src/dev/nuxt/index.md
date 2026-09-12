---
title: Storefront (Nuxt)
description: What the Nuxt storefront is, its responsibilities and entry points, and how to run it.
---

# Storefront (Nuxt)

`grooveshop-storefront-ui-node-nuxt` is the customer-facing storefront: a
Nuxt 4 server-rendered application (Vue 3, TypeScript, Nuxt UI v4, Pinia)
that serves every tenant's shop on that tenant's own domain and proxies
all data calls to the Django API.

## Responsibilities

- Resolve the tenant from the request host and render the store's
  branding, locales and feature set from the resolve payload
  (`server/middleware/0.tenant.ts`, `app/stores/tenant`).
- Proxy `/api/...` to Django: validate input with the generated Zod
  schemas, forward with tenant headers, validate the response
  (`server/api/**`, `server/utils/auth.ts`, `shared/openapi/`).
- Hold the customer session (allauth session token plus Knox token) in a
  sealed cookie and drive login, signup, MFA and social flows
  (`server/api/_allauth/**`, `app/composables/useAllAuth*.ts`).
- Cache anonymous renders per tenant and per device class in Redis, and
  expose the purge route Django calls (`nuxt.config.ts: routeRules`,
  `server/api/admin/cache/purge`).
- Build image URLs for the media stream, emit the CSP, sitemap, RSS, PWA
  manifest and the `.well-known` metadata that points agents at the
  gateway and the OAuth server (`app/providers/media-stream.ts`,
  `shared/utils/csp.ts`, `server/routes/**`).
- Connect to Django's notifications WebSocket on the client
  (`app/plugins/websocket.client.ts`).

## Entry points

| Area | Path |
|---|---|
| Pages, layouts, components, composables, stores, plugins, middleware | `app/` |
| Nitro server: proxy routes, middleware, plugins, utils | `server/` |
| Shared types, constants, Zod schemas, generated OpenAPI code | `shared/` |
| Locale config and translations | `i18n/` |
| Custom modules (cookie consent, comment purge) | `modules/` |
| Path-scoped rules that document each area | `.claude/rules/*.md` |

## Commands

```bash
pnpm install
pnpm dev              # dev server on :3000
pnpm build && pnpm start
pnpm lint:ci          # what CI runs
pnpm typecheck        # nuxt typecheck, the required gate
pnpm test             # vitest, all projects
pnpm generate:schema && pnpm openapi-ts && pnpm sync:schema   # regenerate the API contract
```

## Status of this section

The storefront section of these docs is not written yet. Until it is, the
repository's `CLAUDE.md` and the rule files under `.claude/rules/` are the
guide; the cross-service behaviour is covered under
[Architecture](/dev/platform/architecture) and
[Multi-tenancy](/dev/platform/multi-tenancy).
