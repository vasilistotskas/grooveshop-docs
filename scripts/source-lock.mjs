/**
 * Pin the per-service reference docs a release publishes.
 *
 * `sources.lock.json` records, for every entry in .vitepress/sources.ts, a
 * commit of the source repository and the git tree id of the synced
 * directory at that commit. A tree id is a hash of the directory's content,
 * so it moves when, and only when, a synced file changes: a Django release
 * that touches no `docs/` file leaves the lock (and the site) alone.
 *
 *   node scripts/source-lock.mjs resolve
 *     Reads each source's `main` through the GitHub API and rewrites the
 *     lock for every source whose tree moved. Prints what moved. Under
 *     GitHub Actions it also writes `changed`, `lock` (the new file, one
 *     line) and `subject` (a commit subject) to $GITHUB_OUTPUT.
 *
 *   node scripts/source-lock.mjs refs
 *     Writes `<id>=<commit>` for every source to $GITHUB_OUTPUT, for the
 *     checkouts in build.yml and docker.yml.
 *
 * GITHUB_TOKEN, when set, authenticates the API calls (the repositories are
 * public, so it only lifts the rate limit).
 */
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LOCK = join(REPO, 'sources.lock.json')
const BRANCH = 'main'

const { DOC_SOURCES } = await import('../.vitepress/sources.ts')

function readLock() {
  return JSON.parse(readFileSync(LOCK, 'utf8'))
}

function output(name, value) {
  if (!process.env.GITHUB_OUTPUT) return
  appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`)
}

async function github(path) {
  const headers = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) {
    throw new Error(`GET ${path}: ${response.status} ${await response.text()}`)
  }
  return response.json()
}

/** The commit `main` points at and the tree id of `dir` in it. */
async function latest(source) {
  const commit = await github(`/repos/${source.repository}/commits/${BRANCH}`)
  // The tree of the commit itself, not of `main` again: `main` may move
  // between the two calls, and the pair must describe one commit.
  let tree = commit.commit.tree.sha
  for (const part of source.path.split('/')) {
    const listing = await github(`/repos/${source.repository}/git/trees/${tree}`)
    const entry = listing.tree.find(item => item.path === part && item.type === 'tree')
    if (!entry) throw new Error(`${source.repository}@${commit.sha} has no ${source.path}/`)
    tree = entry.sha
  }
  return { commit: commit.sha, tree }
}

async function resolveLock() {
  const lock = readLock()
  const moved = []
  for (const source of DOC_SOURCES) {
    const next = await latest(source)
    const pinned = lock[source.id]
    if (pinned?.tree === next.tree) {
      console.log(`source-lock: ${source.id} unchanged (${source.path}/ tree ${next.tree.slice(0, 7)})`)
      continue
    }
    console.log(`source-lock: ${source.id} ${pinned?.commit.slice(0, 7) ?? 'none'} → ${next.commit.slice(0, 7)}`)
    lock[source.id] = next
    moved.push(`${source.id} ${next.commit.slice(0, 7)}`)
  }
  const text = `${JSON.stringify(lock, null, 2)}\n`
  if (moved.length) writeFileSync(LOCK, text)
  output('changed', moved.length ? 'true' : 'false')
  output('lock', JSON.stringify(lock))
  output('subject', `docs(sources): sync reference docs (${moved.join(', ')})`)
}

function writeRefs() {
  const lock = readLock()
  for (const source of DOC_SOURCES) {
    const pinned = lock[source.id]
    if (!pinned) throw new Error(`sources.lock.json has no entry for ${source.id}`)
    console.log(`source-lock: ${source.id}=${pinned.commit}`)
    output(source.id, pinned.commit)
  }
}

const mode = process.argv[2]
if (mode === 'resolve') await resolveLock()
else if (mode === 'refs') writeRefs()
else {
  console.error('usage: node scripts/source-lock.mjs resolve|refs')
  process.exit(2)
}
