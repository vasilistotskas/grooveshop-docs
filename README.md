# grooveshop-docs

Documentation site for the GrooveShop platform, published at
[docs.grooveshop.space](https://docs.grooveshop.space).

- **Admin guide** (`/admin/`, `/el/admin/`) — how to run a store from the
  admin panel, in English and Greek.
- **Developer docs** (`/dev/`) — architecture, flows, per-service reference
  and operations for engineers and AI agents. Served behind basic-auth.

## Develop

```bash
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` first copies the per-service reference docs from the sibling
repositories (`../grooveshop-django-api/docs`, …) into `src/dev/<service>/reference/`;
see `.vitepress/sources.ts`. Those copies are gitignored — edit the originals.

`pnpm build` writes the static site to `dist/`, then adds `llms.txt` and
`llms-full.txt` (public pages), the same pair under `dist/dev/` for the
credentialed developer tree, a `sitemap.xml` of public pages with hreflang
pairs, and a `robots.txt` that disallows `/dev/`. See `CLAUDE.md` for the
authoring rules and `AUTHORING.md` for the page templates.
