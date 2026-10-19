# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`grooveshop-docs` is the documentation site for the GrooveShop platform,
published at `docs.grooveshop.space`. It is a VitePress site (the 2.x line,
pinned exactly in `package.json`) with two audiences:

| Section | Path | Language | Visibility |
|---|---|---|---|
| Tenant-admin guide | `src/admin/` and `src/el/admin/` | en + el, 1:1 mirrored | public |
| Developer / AI-agent docs | `src/dev/` | en only | behind basic-auth at the ingress |

The root locale is English; Greek lives under `/el/`. The developer tree is
English-only by decision, so it has no `/el/dev/` twin.

## Commands

```bash
pnpm install --frozen-lockfile
pnpm sync:sources     # copy sibling repos' docs/ into src/dev/<svc>/reference (gitignored)
pnpm dev              # sync + dev server
pnpm build            # vitepress build + postbuild artefacts into dist/
pnpm build:full       # sync + build (what CI does)
pnpm preview          # serve dist/
pnpm check:admin      # fails if the admin guide names anything from the codebase
pnpm check:claims     # fails if a page cites a file that no longer exists, or a sidebar path the admin menu does not have
                      # (needs the sibling repos; it reports what it could not check)
pnpm typecheck        # vue-tsc over .vitepress/
```

`sync:sources` expects every GrooveShop repository checked out as a sibling
of this one (the local monorepo layout); set `GROOVESHOP_WORKSPACE` to point
elsewhere, and `GROOVESHOP_SOURCES` to read the synced docs from a different
root than the gates read the code from (CI does). Sources are declared in
`.vitepress/sources.ts`; what a release publishes is pinned in
`sources.lock.json` (see Deployment).

## Layout

- `.vitepress/config.mts` — site config: locales, sidebars, local search, Mermaid, dead-link policy.
- `.vitepress/sidebars/` — `admin-en.ts` and `admin-el.ts` must list the same paths; `dev.ts` appends the synced reference groups from `.vitepress/generated/reference-manifest.json`.
- `.vitepress/plugins/mermaid/` — fenced ```` ```mermaid ```` blocks render through `<Mermaid>`; no third-party VitePress plugin is used anywhere (none supports VitePress 2).
- `scripts/sync-sources.mjs` — copies per-service reference docs in. `scripts/postbuild.mjs` — after every build writes `llms.txt` / `llms-full.txt` for the public tree and, separately, under `dist/dev/`, plus `sitemap.xml` (public pages only, hreflang pairs) and `robots.txt` (disallows `/dev/`). `scripts/check-initial-load.mjs` — the last step of `pnpm build`: fails when a page loads a JS file over 500 kB up front (Vite's own chunk warning is off, because the search index and Mermaid's layouts are large but lazy). `scripts/fix-frontmatter.mjs` — quotes frontmatter values that YAML would misparse; run it if a build fails with "incomplete explicit mapping pair".
- The site has no `lastUpdated` and no VitePress `sitemap` option, both on purpose — see the comments in `.vitepress/config.mts`. Do not re-enable either without reading them.
- `docker/` — the site is served by `nginx-unprivileged`; `nginx.conf` is baked into the image (`try_files` handles `cleanUrls`).

## Authoring rules

These are the quality gate that makes the docs usable by AI agents. They are not optional.

- **Source of truth is the code.** Every developer page names the files it describes (repo-relative paths in backticks) in a "Source" line or table, so an agent can verify before acting. If a claim cannot be tied to a file, do not make it.
- **No dependency versions in prose** (workspace rule). Name a major only where it changes how code is written.
- **Greek is written natively**, never machine-translated, and every Greek admin page has the same path as its English twin under `/el/`. Add a page to both sidebars in the same change.
- **The admin guide names NOTHING from the codebase.** No file paths, module, class, constant or app-label names, no "built by"/"rendered by" phrasing. The reader is a shop owner. On-screen labels, sidebar paths, admin URLs and the keys listed in Settings → Store Settings are allowed, because the reader sees those. Full rule and rewrite examples in `AUTHORING.md`. Developer pages are the opposite and must cite sources.
- **Admin how-tos name the sidebar path exactly as Unfold renders it**, e.g. `Sales → Orders` or `Customers → Wholesale → Business Customers`. The store sidebar is built per request in the Django repo's `admin/navigation.py` (`store_sidebar`); the platform console's is `UNFOLD_PLATFORM` in `settings.py`. If a title there changes, the docs change; Greek pages use the title's `msgstr` from `locale/el/LC_MESSAGES/django.po`.
- **Screenshots are optional and never load-bearing.** The text must be correct on its own.
- **Dead links fail the build.** Keep it that way; the only exemption is the synced `reference/` trees, whose links point at source files in their own repository.
- **Synced reference pages are read-only here.** Edit them in the owning repository (`grooveshop-django-api/docs/…`); the next build picks them up.
- **Every admin page follows the same shape**: purpose → where to find it → step-by-step tasks → gotchas → related pages. Every flow page: summary → diagram → steps with the code path for each → invariants → failure modes → source table.
- Diagrams are Mermaid in fenced blocks, never images.
- Frontmatter `title` and `description` are required on every page: they feed `llms.txt`, the sitemap and search.
- **A frontmatter value containing `: ` must be wrapped in double quotes**, or the YAML parser fails the build (`incomplete explicit mapping pair`). `pnpm exec node scripts/fix-frontmatter.mjs` fixes a whole tree.

## Repository visibility

This repository is **public**. The developer tree (cluster topology, deploy
runbooks, the security model, much of it derived from the private
`grooveshop-infrastructure` repository) is therefore readable on GitHub, and the
basic-auth gate on `/dev/` only keeps the rendered pages out of search engines
and casual browsing. Never commit credentials, tenant data or anything from an
`untracked/` tree here. The site has no `editLink` in the theme.

The release image is a deliberate exception. It contains the developer pages,
and the Docker Hub repository holding it is **public** (decided 2026-09-12), so
the cluster keeps pulling anonymously like every other image and needs no
`imagePullSecrets`. The material is architecture and procedure, never
credentials or tenant data, and the basic-auth gate still keeps it off the open
web. If that trade is ever revisited, making the image private means a sealed
pull secret and the only authenticated pull in the cluster.

## Deployment

**A `docs:` commit cuts a release here, unlike every other repository in the
workspace.** The default rules give `docs:` no version at all, which in a
documentation repo means the most natural commit type for the actual product
change silently ships nothing: the commit lands on `main`, no release is cut,
no image is built, and the site keeps serving the previous version. A
`releaseRules` entry in `package.json` maps `docs` to a patch. `ci:` and
`chore:` still cut nothing, which is correct — they do not change the site.


CI (`.github/workflows/ci.yml`) builds on every push and cuts a semantic
release on `main`; the published release triggers `docker.yml`, which pushes
`gro0ve/grooveshop-docs:vX.Y.Z`. The build itself is
`.github/workflows/build.yml`, shared by `ci.yml` and `sources.yml`.

**The synced reference docs are pinned, and the pin moves on its own.**
`sources.lock.json` holds, per source, a commit and the git tree id of its
`docs/` at that commit; `build.yml` and `docker.yml` check the sources out
at that commit, so the image publishes exactly what CI checked.
`.github/workflows/sources.yml` (hourly, on a `source-docs-changed`
repository dispatch, or by hand) runs `scripts/source-lock.mjs resolve`,
which reads each source's `main` through the GitHub API; when a `docs/`
tree moved, it builds the site with the new pins and commits them as
`docs(sources): sync reference docs (…)` with `DOCS_TOKEN`. That push
releases like any `docs:` commit. Never hand-edit the lock; run the
workflow, or `node scripts/source-lock.mjs resolve` and commit the result.
A failed sync run (a source's docs break a gate) commits nothing and shows
red in the Actions tab: fix the page here or the source, then re-run it.

The image is pinned in
`grooveshop-infrastructure/manifests/app-directory/app-grooveshop.yaml`
(kustomize image `grooveshop-docs`) and served by `base/docs.yaml`. Bump with
the infra repo's `/update-deploy-version` skill.
