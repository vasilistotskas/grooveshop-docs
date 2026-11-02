# grooveshop-docs

[![CI](https://github.com/vasilistotskas/grooveshop-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/vasilistotskas/grooveshop-docs/actions/workflows/ci.yml)

The GrooveShop documentation site, published at
[docs.grooveshop.space](https://docs.grooveshop.space).

GrooveShop is a multi-tenant e-commerce platform: a Django API, a Nuxt
storefront, an image service, a gateway for AI agents and the Kubernetes
infrastructure, each in its own repository. This site documents it for two
readers: shop owners who run a store from the admin panel, and the engineers
and AI agents who work on the code. It is a VitePress 2 site, served as a
static nginx image from the platform's own cluster.

## What it publishes

| Section | Path | Language | Access |
|---|---|---|---|
| Admin guide: getting started, catalog, sales, customers, shipping, marketing, content, settings | [`/admin/`](https://docs.grooveshop.space/admin/), [`/el/admin/`](https://docs.grooveshop.space/el/admin/) | English and Greek, page for page | public |
| Developer reference: platform architecture, multi-tenancy, end-to-end flows, operations, per-service reference | [`/dev/`](https://docs.grooveshop.space/dev/) | English | behind basic auth |

The build also writes `llms.txt` and `llms-full.txt` for the public pages and a
separate pair under `/dev/`, a `sitemap.xml` of public pages with hreflang
pairs, and a `robots.txt` that disallows `/dev/`.

The source of `/dev/` is public in this repository; the basic-auth gate only
keeps the rendered pages out of search engines and casual browsing.

## Getting started

Prerequisites: Node (see `engines` in `package.json`) and pnpm (pinned in
`packageManager`), and the other GrooveShop repositories checked out as
siblings of this one.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` first runs `pnpm sync:sources`, which copies the per-service
reference docs (today `grooveshop-django-api/docs` and
`grooveshop-media-stream/docs`, declared in `.vitepress/sources.ts`) into
`src/dev/<service>/reference/`. Those copies are gitignored: edit the originals
in their own repository. Set `GROOVESHOP_WORKSPACE` if the siblings live
somewhere else.

## Common commands

```bash
pnpm build:full      # sync sources, build to dist/, write the llms/sitemap/robots files (what CI does)
pnpm preview         # serve dist/
pnpm typecheck       # vue-tsc over .vitepress/
pnpm test            # synced reference pages build whatever HTML-looking text they hold
pnpm check:admin     # fails if the admin guide names anything from the codebase
pnpm check:claims    # fails if a page cites a file that no longer exists (needs the sibling repos)
```

## Writing docs

`CLAUDE.md` holds the rules and `AUTHORING.md` the page templates. In short:

- Every developer page names the source files it describes; the code wins over the page.
- The admin guide names nothing from the codebase. It uses the sidebar paths
  and labels a shop owner sees.
- Greek is written natively. Every admin page exists at the same path in both
  languages, and `.vitepress/sidebars/admin-en.ts` and `admin-el.ts` list the
  same paths.
- Diagrams are Mermaid blocks. Dead links fail the build.

## Project layout

```
src/admin/          English admin guide
src/el/admin/       Greek admin guide
src/dev/            developer reference (synced reference/ trees are gitignored)
.vitepress/         config, sidebars, sources.ts, theme and local plugins
scripts/            source sync and lock, postbuild, the check:* gates
docker/             Dockerfile and nginx.conf for the release image
sources.lock.json   the source-repository commits a release publishes
```

## Deployment and release

- CI (`.github/workflows/ci.yml`) builds every pull request and every push to `main`, and runs
  semantic-release on `main`. Unlike the other GrooveShop repositories, a
  `docs:` commit cuts a patch release here.
- A published release triggers `docker.yml`, which pushes
  `gro0ve/grooveshop-docs:vX.Y.Z` to Docker Hub.
- The synced reference docs are pinned in `sources.lock.json`.
  `sources.yml` moves the pins when a source repository's `docs/` changes (on
  a repository dispatch, hourly, or by hand) and commits them as a `docs:`
  commit, which releases. Never hand-edit the lock.
- The image is deployed through
  [grooveshop-infrastructure](https://github.com/vasilistotskas/grooveshop-infrastructure)
  (Argo CD), like every other service.

## Related repositories

- [grooveshop-django-api](https://github.com/vasilistotskas/grooveshop-django-api): Django REST API, admin and Celery workers; the system of record for every tenant.
- [grooveshop-storefront-ui-node-nuxt](https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt): Nuxt SSR storefront, one deployment serving every tenant's store.
- [grooveshop-media-stream](https://github.com/vasilistotskas/grooveshop-media-stream): NestJS image processing and caching service.
- [grooveshop-agent-gateway](https://github.com/vasilistotskas/grooveshop-agent-gateway): Go gateway for AI agents (MCP, UCP, ACP, product feeds, storefront chat).
- [grooveshop-infrastructure](https://github.com/vasilistotskas/grooveshop-infrastructure) (private): Kubernetes manifests for the K3s cluster, deployed by Argo CD.
