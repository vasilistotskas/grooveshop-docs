/**
 * Per-service reference docs that live next to their code and are copied
 * into the site at build time by scripts/sync-sources.mjs.
 *
 * `from` is relative to the workspace root (the parent of this repo, where
 * every GrooveShop repository is checked out as a sibling); `to` is
 * relative to `src/`. The copied tree is gitignored.
 *
 * What a release publishes is pinned in `sources.lock.json`: the source
 * repository's commit and the git tree of its `path` at that commit.
 * `.github/workflows/sources.yml` moves the pin when the tree on `main`
 * changes, and CI and the image build check the sources out at the pinned
 * commit. A local `pnpm sync:sources` reads the sibling checkouts as they
 * are.
 *
 * Adding a service later (Nuxt, agent gateway, infra) is one more entry
 * here, one more key in `sources.lock.json`, and its locked checkout in
 * BOTH .github/workflows/build.yml and .github/workflows/docker.yml: the
 * image build syncs the sources too, and a missing source fails it.
 */
export interface DocSource {
  /** Stable id, also the sidebar group key and the key in sources.lock.json. */
  id: string
  /** Human title for the generated reference index. */
  title: string
  /** `owner/name` on GitHub, read by scripts/source-lock.mjs. */
  repository: string
  /** The synced directory inside that repository. */
  path: string
  from: string
  to: string
}

export const DOC_SOURCES: DocSource[] = [
  {
    id: 'django',
    title: 'Django API reference',
    repository: 'vasilistotskas/grooveshop-django-api',
    path: 'docs',
    from: 'grooveshop-django-api/docs',
    to: 'dev/django/reference',
  },
  {
    id: 'media',
    title: 'Media stream reference',
    repository: 'vasilistotskas/grooveshop-media-stream',
    path: 'docs',
    from: 'grooveshop-media-stream/docs',
    to: 'dev/media/reference',
  },
]
