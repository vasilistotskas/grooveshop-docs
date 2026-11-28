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
| `/mcp` | MCP server (streamable HTTP): the UCP checkout tools and `get_order`, ergonomic commerce tools, account tools for linked shoppers. A UCP platform's RFC 9421 signature is verified on a request that carries one, and `get_order` takes only signed ones: [Signed platform calls](/dev/flows/agentic-commerce#signed-platform-calls) |
| `/mcp/admin` | The store's own team's read-only MCP server (`internal/adminmcp`), behind a staff bearer: [Store-admin tools over MCP](/dev/flows/staff-mcp) |
| `GET /.well-known/ucp` | UCP business profile, including the platform payment handler |
| `GET /mcp/server-card`, `/.well-known/ard.json`, `/.well-known/ai-catalog.json` | Agent discovery: the MCP Server Card, the ARD manifest and the AI Catalog, the last two cut from one entry (`internal/mcpsrv/discovery.go`); see [Agentic commerce](/dev/flows/agentic-commerce) |
| `/acp/checkout_sessions*` | ACP agentic checkout REST (create, get, update, complete, cancel), gated per tenant by the tenant's own `acpBearerToken` |
| `/feeds/*` | Product feeds: `google.xml`, `meta.xml`, `tiktok.xml`, `acp.json` |
| `POST /chat` | First-party shopping chatbot (SSE) over an OpenAI-compatible provider; the model key is per tenant |
| `/internal/*` | Cluster-only: Django's order-event push and feed invalidation, shared-secret header |
| `/healthz`, `/readyz`, `/metrics` | Process-only liveness, readiness gated on Redis and the startup check of the signing keys (Django health is reported in the body but never flips it), Prometheus |

Every tenant gate (`agentCommerceEnabled`, `productFeedsEnabled`,
`agentHostedPaymentEnabled`) is a boolean Django folds and emits on the
resolve payload; a disabled surface answers 404. Catalogue, cart and
checkout calls are anonymous and therefore always see retail prices; only
`/api/v1/agent/*` forwards an agent's bearer.

## Entry points

| Package | Role |
|---|---|
| `cmd/gateway` | Wiring (config, clients, mux) and `serve`, the one piece of logic: the shutdown windows (a 10 second drain, then a final window that holds an order completion to its end), the read and idle timeouts, and the context that ends every request and MCP tool call at the cut. See [Shutdown and logs](/dev/flows/agentic-commerce#shutdown-and-logs) |
| `internal/server` | Route table (`routes.go`) and internal routes |
| `internal/tenant` | Host-only tenant resolution, caching, feature gates |
| `internal/django` | Typed API client with forwarded headers and error sentinels |
| `internal/mcpsrv`, `internal/ucp`, `internal/acp`, `internal/feeds`, `internal/chat`, `internal/checkout` | One package per surface |
| `internal/identity` | Bearer verification for both MCP servers, with the RFC 9728 challenge |
| `internal/httpsig` | RFC 9421 signatures: signing the order webhooks, verifying a platform's requests |
| `internal/mcptool` | What every MCP tool answers with (`ToolError`) and `Add`, which registers each tool and logs and counts each call |
| `internal/adminmcp` | The store-admin MCP server on `/mcp/admin` |
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

Do not add `-race` locally: it needs cgo, and the local Go builds with
`CGO_ENABLED=0` and no C compiler, so it fails at once. CI runs it.

## Configuration

Settings are environment variables read once by `config.Load`
(`internal/config/config.go`; `.env.example` lists them with their defaults).
Per-tenant values (branding, locale, feature flags, keys) are never environment:
they arrive on `tenant/resolve`. `Load` fails fast, so a value that would boot
and then misbehave stops the pod at start instead:

| Setting | Refused when |
|---|---|
| `ENV` | not `production`, `staging`, `development` or `test`. It also sets the UCP payment handler's environment (only `production` reads as production), whether local webhook endpoints are allowed, and the secret's minimum length |
| `LOG_LEVEL` | not a level `slog` parses |
| `DJANGO_BASE_URL` | not an absolute http or https URL with a host, or one carrying user info, a query or a fragment |
| `DJANGO_PUBLIC_HOST`, `ASSETS_HOST`, `STAFF_CONNECT_HOST` | not a bare host: holding any of `/ ? # @` or a blank, as a scheme or a path would |
| `STOREFRONT_DEFAULT_LOCALE` | not a lowercase language code such as `el` |
| `CHAT_EFFORT` | not one of the chat-completions API's `reasoning_effort` values (`none` to `max`) |
| `MEDIA_IMAGE_URL_TEMPLATE`, `FEED_IMAGE_URL_TEMPLATE` | missing `{assets_host}` or `{path}`, holding a placeholder other than those and `{schema}`, or not expanding (with `ASSETS_HOST`) to an absolute http or https URL |
| `INTERNAL_EVENTS_SECRET` | not a valid header value (a control character, a leading or trailing blank), or, in production and staging, shorter than 32 characters |
| `SIGNING_KEY_ENCRYPTION_KEY` | missing (in every `ENV`), or not standard base64 of exactly 32 bytes (`openssl rand -base64 32`). It seals each store's UCP signing key in Redis. Once Redis answers, a key that opens none of the sealed keys it holds ends the process, rather than let a new key replace a published one |
| `UCP_SIGNATURE_MAX_AGE`, `UCP_SIGNATURE_CLOCK_SKEW` | the window (five minutes and one minute by default) a platform's request signature's `created` and `expires` are held to, when it carries them. Zero, negative or malformed values are refused like every duration |
| `FEED_STALE_TTL` | shorter than `FEED_FRESH_TTL` |
| Every TTL, timeout, rate and limit | zero, negative or malformed |

`DJANGO_BASE_URL`, `DJANGO_PUBLIC_HOST`, `REDIS_URL`, `INTERNAL_EVENTS_SECRET`,
`ASSETS_HOST`, `STOREFRONT_DEFAULT_LOCALE`, `STAFF_CONNECT_HOST` and
`SIGNING_KEY_ENCRYPTION_KEY` are required, and a missing one is named in the
error. `REDIS_URL` names the gateway's own Redis, never the platform's shared
one: [The gateway's own Redis](/dev/flows/agentic-commerce#the-gateway-s-own-redis). `ENV` defaults to
`production`, and the `.env.example` placeholder for the secret is shorter than
production and staging accept, so it boots only under `ENV=development` or
`test`.

## Source

| File | Role |
|---|---|
| `grooveshop-agent-gateway/AGENTS.md`, `grooveshop-agent-gateway/.claude/rules/ucp.md` | The surface map and the conventions the code keeps |
| `grooveshop-agent-gateway/cmd/gateway/serve.go` | The shutdown windows and the timeouts |
| `grooveshop-agent-gateway/internal/mcpsrv/signature.go` | Platform signature verification on `/mcp` |
| `grooveshop-agent-gateway/internal/mcptool/mcptool.go` | The `tool call` log line and `gateway_tool_calls_total` |
| `grooveshop-agent-gateway/internal/config/config.go`, `grooveshop-agent-gateway/.env.example` | Every setting and what `Load` refuses |

## Status of this section

The gateway section of these docs is not written yet. The repository's
`AGENTS.md` is the guide until then, and the end-to-end flow is described
under [Agentic commerce](/dev/flows/agentic-commerce).
