---
title: Agent gateway (Go)
description: What the agent gateway is, the protocol surfaces it serves, its entry points, and how to run it.
---

# Agent gateway (Go)

`grooveshop-agent-gateway` is a Go microservice that makes every tenant
storefront shoppable by AI agents. One binary serves several protocol
surfaces on the storefront's own domain; Traefik path-routes them to it.
It is a protocol adapter: all commerce state lives in Django, sessions and
caches live in Redis, and it holds no database and no payment-provider
secrets.

## Surfaces

| Path | Surface |
|---|---|
| `/mcp` | MCP server (streamable HTTP): the UCP checkout tools, ergonomic commerce tools, account tools for linked shoppers |
| `GET /.well-known/ucp` | UCP business profile, including the platform payment handler |
| `/acp/checkout_sessions*` | ACP agentic checkout REST (create, get, update, complete, cancel), gated per tenant by the tenant's own `acpBearerToken` |
| `/feeds/*` | Product feeds: `google.xml`, `meta.xml`, `tiktok.xml`, `acp.json` |
| `POST /chat` | First-party shopping chatbot (SSE) over an OpenAI-compatible provider; the model key is per tenant |
| `/internal/*` | Cluster-only: Django's order-event push and feed invalidation, shared-secret header |
| `/healthz`, `/readyz`, `/metrics` | Process-only liveness, readiness gated on Redis only (Django health is reported in the body but never flips it), Prometheus |

Every tenant gate (`agentCommerceEnabled`, `productFeedsEnabled`,
`agentHostedPaymentEnabled`) is a boolean Django folds and emits on the
resolve payload; a disabled surface answers 404. Catalogue, cart and
checkout calls are anonymous and therefore always see retail prices; only
`/api/v1/agent/*` forwards an agent's bearer.

## Entry points

| Package | Role |
|---|---|
| `cmd/gateway` | Wiring only: config, clients, mux, graceful shutdown |
| `internal/server` | Route table (`routes.go`) and internal routes |
| `internal/tenant` | Host-only tenant resolution, caching, feature gates |
| `internal/django` | Typed API client with forwarded headers and error sentinels |
| `internal/mcpsrv`, `internal/ucp`, `internal/acp`, `internal/feeds`, `internal/chat`, `internal/checkout` | One package per surface |
| `internal/identity` | Optional bearer verification with the RFC 9728 challenge |
| `internal/storefront` | Every link back into the Nuxt storefront |
| `testdata/fixtures/django/` | Recorded upstream responses guarding DTO drift |

## Commands

```bash
go build ./...
go test ./internal/...
go test -tags integration ./internal/integration/...   # needs Docker
golangci-lint run
go run ./cmd/gateway                                    # export the .env.example variables first
```

Do not add `-race` locally on a 32-bit toolchain; CI runs it.

## Status of this section

The gateway section of these docs is not written yet. The repository's
`CLAUDE.md` is the guide until then, and the end-to-end flow is described
under [Agentic commerce](/dev/flows/agentic-commerce).
