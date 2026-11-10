/**
 * Where the sibling repositories are, read in one place by every script that
 * needs them (sync-sources, check-claims, check-admin-prose).
 *
 *   GROOVESHOP_WORKSPACE  the directory holding every grooveshop-* repository
 *                         (default: the parent of this repository)
 *   GROOVESHOP_<REPO>_DIR one repository somewhere else, e.g. a git worktree of
 *                         a branch: GROOVESHOP_DJANGO_API_DIR=/path/to/worktree
 *                         <REPO> is the repository name without the
 *                         `grooveshop-` prefix, upper-cased, `-` as `_`
 *                         (DJANGO_API, STOREFRONT_UI_NODE_NUXT, MEDIA_STREAM,
 *                         AGENT_GATEWAY, INFRASTRUCTURE)
 *
 * The override is what checks the docs against a branch of a sibling
 * repository before it merges, without switching the branch of its main
 * checkout.
 */
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const WORKSPACE = resolve(process.env.GROOVESHOP_WORKSPACE ?? join(REPO, '..'))

/** Absolute path of a sibling repository, honouring its `GROOVESHOP_<REPO>_DIR`. */
export function repoDir(name) {
  const key = name.replace(/^grooveshop-/, '').toUpperCase().replace(/-/g, '_')
  const override = process.env[`GROOVESHOP_${key}_DIR`]
  return override ? resolve(override) : join(WORKSPACE, name)
}
