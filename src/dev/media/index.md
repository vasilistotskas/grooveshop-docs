---
title: Media stream (NestJS)
description: What the media stream service is, how it processes and caches images per tenant, its entry points, and how to run it.
---

# Media stream (NestJS)

`grooveshop-media-stream` is a NestJS service that fetches original images
from the backend, resizes and converts them with Sharp, caches the result
across memory, Redis and disk, and streams it to the browser. The
storefront builds its URLs directly against this service; nothing goes
through Nuxt.

## Responsibilities

- Serve `GET /media_stream-image/media/:tenantSchema/uploads/…/:width/:height/:fit/:position/:background/:trimThreshold/:quality.:format`
  and the equivalent `static/images/…` route; every segment is mandatory
  and validated, and the tenant is in the path
  (`src/MediaStream/API/config/image-sources.config.ts`).
- Fetch originals only from an allowlist of hosts: the static list in
  `VALIDATION_ALLOWED_DOMAINS`, which in the cluster holds the in-cluster
  Service names, plus the tenant domains polled from Django's
  `GET /api/v1/tenant/internal/domains`
  (`Validation/services/tenant-domains.service.ts`).
- Process synchronously with admission control, per-resource
  deduplication and a per-pipeline timeout; overload answers 503 with
  `Retry-After` rather than the default image (`Processing/`).
- Cache under the `image:{schema}:…` namespace in memory and Redis, with
  `.rsc`/`.rsm` pairs on disk, and flush one tenant on request
  (`POST /admin/cache/flush-tenant` with `x-internal-secret`) (`Cache/`,
  `Storage/`).
- Report health, Prometheus metrics and a Redis-persisted circuit breaker
  (`Health/`, `Metrics/`, `HTTP/`).

## Entry points

All source lives under `src/MediaStream/`, one NestJS module per domain:
`API`, `Cache`, `Config`, `Correlation`, `Health`, `HTTP`, `Metrics`,
`Processing`, `RateLimit`, `Storage`, `Validation`, plus `common/` helpers.
`common/utils/config-schema.util.ts` is the single source of truth for
every configuration key and its environment variable.

## Commands

```bash
pnpm install
pnpm run dev            # watch mode on :3003, needs Redis
pnpm run build && pnpm run prod
pnpm run lint:ci
pnpm run type-check
pnpm run test           # unit + integration (vitest)
pnpm run test:e2e
pnpm run cache:clear    # Redis + file system cache
```

## Reference

The repository's own `docs/` folder is copied in at build time under
[Media stream reference](/dev/media/reference/): the per-request log line,
the metrics and the LogsQL / PromQL queries that use them
(`docs/observability.md` in `grooveshop-media-stream`). The repository's
`CLAUDE.md` covers the rest until more of it is written; the URL contract
with the storefront is described under
[Architecture](/dev/platform/architecture).
