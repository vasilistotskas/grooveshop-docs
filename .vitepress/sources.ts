/**
 * Per-service reference docs that live next to their code and are copied
 * into the site at build time by scripts/sync-sources.mjs.
 *
 * `from` is relative to the workspace root (the parent of this repo, where
 * every GrooveShop repository is checked out as a sibling); `to` is
 * relative to `src/`. The copied tree is gitignored.
 *
 * Adding a service later (Nuxt, agent gateway, media stream, infra) is one
 * more entry here plus a checkout step in .github/workflows/ci.yml.
 */
export interface DocSource {
  /** Stable id, also the sidebar group key. */
  id: string
  /** Human title for the generated reference index. */
  title: string
  from: string
  to: string
}

export const DOC_SOURCES: DocSource[] = [
  {
    id: 'django',
    title: 'Django API reference',
    from: 'grooveshop-django-api/docs',
    to: 'dev/django/reference',
  },
]
