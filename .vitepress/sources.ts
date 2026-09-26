/**
 * Per-service reference docs that live next to their code and are copied
 * into the site at build time by scripts/sync-sources.mjs.
 *
 * `from` is relative to the workspace root (the parent of this repo, where
 * every GrooveShop repository is checked out as a sibling); `to` is
 * relative to `src/`. The copied tree is gitignored.
 *
 * Adding a service later (Nuxt, agent gateway, infra) is one more entry
 * here plus a checkout of its repository in BOTH .github/workflows/ci.yml
 * and .github/workflows/docker.yml: the image build syncs the sources too,
 * and a missing source fails it.
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
  {
    id: 'media',
    title: 'Media stream reference',
    from: 'grooveshop-media-stream/docs',
    to: 'dev/media/reference',
  },
]
