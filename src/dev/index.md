---
title: How to use these docs
description: What the developer documentation covers, how it is organised, and how AI agents should consume it.
---

# How to use these docs

This tree describes the GrooveShop platform for people and agents who change
it. It is English-only and sits behind credentials because it documents
internal architecture, business flows and operational procedures.

## The rule that governs everything here

**The code is the source of truth.** Every page names the repository files
it describes. When a page and the code disagree, the code wins and the page
is a bug: fix the page in the same change as the code.

Pages are of three kinds:

| Kind | Where | What it is |
|---|---|---|
| Platform and flows | `/dev/platform/`, `/dev/flows/` | Cross-service narratives written for this site. Each ends with a **Source** table of file paths. |
| Service guides | `/dev/django/`, `/dev/operations/` | How one service is built and operated, distilled from that repository's `CLAUDE.md` and code. |
| Reference | `/dev/<service>/reference/` | Copied verbatim at build time from the owning repository's `docs/` folder. Read-only here. |

## Repositories

The platform is five repositories checked out side by side in one workspace
folder. Each is deployed independently and has its own `CLAUDE.md`.

| Repository | Service | Port |
|---|---|---|
| `grooveshop-django-api` | Django REST API, admin panel, Celery workers | 8000 |
| `grooveshop-storefront-ui-node-nuxt` | Nuxt storefront (SSR, proxies the API) | 3000 |
| `grooveshop-media-stream` | NestJS image processing | 3003 |
| `grooveshop-agent-gateway` | Go protocol adapter: MCP, UCP, ACP, feeds, chat | 8080 |
| `grooveshop-infrastructure` | Kubernetes manifests, Argo CD, Traefik | — |

This site is a sixth repository, `grooveshop-docs`, published at
`docs.grooveshop.space`. The admin guide there is public; this developer
tree sits behind basic auth at the ingress.

## Where to start

1. [Platform overview](/dev/platform/overview) — what the product is and who uses it.
2. [Architecture](/dev/platform/architecture) — how the services connect.
3. [Multi-tenancy](/dev/platform/multi-tenancy) — the constraint that shapes every change.
4. The flow you are about to touch, under **Flows**.
5. The owning service's guide and reference.

## For AI agents

- `/dev/llms.txt` lists every developer page with a one-line description; `/dev/llms-full.txt` is the whole tree in one file. Both require the same credentials as this page.
- `/llms.txt` and `/llms-full.txt` cover the public admin guide only.
- Prefer the repository checkout over this site when you have it: the synced reference pages are copies, and `CLAUDE.md` in each repository carries the coding conventions this site does not repeat.
- Never act on a version number found in prose; read `pyproject.toml`, `package.json`, `go.mod` or the manifests.

## Other services

The storefront, agent gateway, media stream and infrastructure sections are
placeholders for now; their repositories' `CLAUDE.md` files remain the guide
until those sections are written.
