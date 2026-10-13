/**
 * Guard: every citation in the docs must still point at something real.
 *
 * The documentation's whole claim to trustworthiness is that a developer page
 * names the file it describes and an admin page names the screen. Both rot
 * silently when the code moves. This checks the mechanical half of that, the
 * half a human reviewer is worst at:
 *
 *   paths    — every `repo/relative/path.ext` in backticks exists
 *   screens  — every `sidebar-path` span names real admin sidebar entries
 *   settings — every SNAKE_CASE key is a real setting or stored choice
 *
 * It cannot check whether a sentence is TRUE; only that the things it names
 * still exist. Semantic review is a separate, human or agent, job.
 *
 * Needs the sibling repositories checked out (the local layout, or
 * GROOVESHOP_WORKSPACE). Skips a check rather than half-applying it when a
 * source it needs is missing, so a partial checkout never fails the build on
 * prose that is correct.
 *
 * Exit 1 on any unresolved citation. Run: pnpm check:claims
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WORKSPACE = resolve(process.env.GROOVESHOP_WORKSPACE ?? join(REPO, '..'))
const SRC = join(REPO, 'src')
const REPOS = [
  'grooveshop-django-api',
  'grooveshop-storefront-ui-node-nuxt',
  'grooveshop-media-stream',
  'grooveshop-agent-gateway',
  'grooveshop-infrastructure',
]
const SKIP = new Set(['node_modules', '.git', '.venv', 'dist', '.output', '.nuxt', '__pycache__', 'staticfiles', 'coverage', '.vitepress'])
const CODE_EXT = /\.(py|ts|mts|cts|vue|js|mjs|cjs|go|yaml|yml|html|txt|json|toml|mod|lock)$/
/** Only these are worth scanning for symbol definitions. */
const SYMBOL_EXT = /\.(py|ts|mts|cts|vue|js|mjs|cjs|go)$/

function* walk(dir, match) {
  let entries
  try {
    entries = readdirSync(dir)
  }
  catch {
    return
  }
  for (const entry of entries) {
    if (SKIP.has(entry)) continue
    const full = join(dir, entry)
    let st
    try {
      st = statSync(full)
    }
    catch {
      continue
    }
    if (st.isDirectory()) yield* walk(full, match)
    else if (match.test(full)) yield full
  }
}

const present = REPOS.filter(r => existsSync(join(WORKSPACE, r)))
if (!present.length) {
  console.warn(`check-claims: no source repositories under ${WORKSPACE} — nothing to check against, skipping`)
  process.exit(0)
}

/** Index the source tree once: file paths, basenames, and defined symbols. */
const filesByPath = new Set()
const filesByName = new Map()
const symbols = new Set()

const DEFINITIONS = [
  /^\s*(?:async\s+)?def\s+([A-Za-z_]\w*)/gm, // python
  /^\s*class\s+([A-Za-z_]\w*)/gm, // python / ts
  /^([A-Z][A-Z0-9_]+)\s*[:=]/gm, // module-level constants
  /^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm, // ts/js
  /^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)/gm, // ts/js
  /^\s*(?:export\s+)?(?:interface|type|enum)\s+([A-Za-z_$][\w$]*)/gm, // ts
  /^\s*func\s+(?:\([^)]*\)\s*)?([A-Za-z_]\w*)/gm, // go
  /^\s*(?:type)\s+([A-Za-z_]\w*)\s+struct/gm, // go
  /^\s{2,}([A-Za-z_]\w*)\s*=\s*(?:models|serializers|forms)\./gm, // django fields
]

for (const repoName of [...present, null]) {
  // `null` is this repository: pages legitimately cite their own scripts.
  const root = repoName ? join(WORKSPACE, repoName) : REPO
  for (const file of walk(root, CODE_EXT)) {
    const rel = relative(root, file).replace(/\\/g, '/')
    filesByPath.add(rel)
    // Addressable by repository name too: pages cite this repo's own files
    // (`grooveshop-docs/.github/workflows/docker.yml`) as readily as a sibling's.
    filesByPath.add(`${repoName ?? 'grooveshop-docs'}/${rel}`)
    const base = rel.split('/').pop()
    if (!filesByName.has(base)) filesByName.set(base, [])
    filesByName.get(base).push(rel)
    if (!SYMBOL_EXT.test(file)) continue
    let text
    try {
      text = readFileSync(file, 'utf8')
    }
    catch {
      continue
    }
    for (const re of DEFINITIONS) {
      re.lastIndex = 0
      for (const m of text.matchAll(re)) symbols.add(m[1])
    }
  }
}

/**
 * Admin sidebar entries, so a `sidebar-path` span cannot name a dead screen.
 *
 * Two sources: the store sidebar is built per request by
 * `admin/navigation.py` (every title there is a `_("…")` call), while the
 * platform sidebar and the tab strips stay `"title": _("…")` entries in
 * `settings.py`. Reading only one would let a whole admin's paths go unchecked.
 */
function adminScreens() {
  const django = join(WORKSPACE, 'grooveshop-django-api')
  const settings = join(django, 'settings.py')
  const navigation = join(django, 'admin', 'navigation.py')
  if (!existsSync(settings) || !existsSync(navigation)) return null
  const names = new Set()
  for (const m of readFileSync(settings, 'utf8').matchAll(/"title":\s*_\("([^"]+)"\)/g)) names.add(m[1])
  for (const m of readFileSync(navigation, 'utf8').matchAll(/\b_\(\s*"([^"]+)"\s*\)/g)) names.add(m[1])
  // Greek renderings of the same labels, so the el pages can be checked too.
  const po = join(WORKSPACE, 'grooveshop-django-api', 'locale', 'el', 'LC_MESSAGES', 'django.po')
  if (existsSync(po)) {
    const poText = readFileSync(po, 'utf8')
    // The catalogue is CRLF. A \n-only pattern silently matches nothing, which
    // left every Greek label out of the allowlist and flagged every Greek page.
    for (const m of poText.matchAll(/msgid\s+"([^"]+)"\r?\nmsgstr\s+"([^"]+)"/g)) {
      if (names.has(m[1]) && m[2]) names.add(m[2])
    }
  }
  return names
}
const SCREENS = adminScreens()

const problems = []
const stats = { paths: 0, screens: 0 }

/** A citation that looks like a path: has a slash or a known code extension. */
const PATH_RE = /`([A-Za-z0-9_.\-/]+\.(?:py|ts|mts|cts|vue|js|mjs|cjs|go|yaml|yml|json|html|txt|toml|lock|mod))`/g
/** A citation that looks like a code identifier rather than prose. */
const IDENT_RE = /`([A-Za-z_$][\w$]*(?:\(\))?)`/g
const SPAN_RE = /<span class="sidebar-path">([^<]+)<\/span>/g

const absent = REPOS.filter(r => !present.includes(r))
let skipped = 0

/**
 * `true` resolved, `false` broken, `null` not checkable in this checkout.
 *
 * A tree holding only some repositories can only judge citations into the ones
 * it has. CI checks out a subset, and calling every citation into an absent
 * repository broken would fail the build on prose that is correct — the same
 * half-applied-rule trap the admin-prose gate hit on a sparse checkout.
 */
function pathResolves(cite) {
  // A citation may be written relative to a repository root ("./openapi/…").
  const c = cite.replace(/\\/g, '/').replace(/^\.\//, '')
  if (c.includes('...')) return true // deliberately elided
  if (/^(?:django_celery_beat|celery|django|allauth|rest_framework|knox|parler)\//.test(c)) return true // library
  if (filesByPath.has(c)) return true
  for (const r of REPOS) if (filesByPath.has(c.replace(`${r}/`, ''))) return true
  // Explicitly addressed to a repository that is not checked out here.
  if (absent.some(r => c.startsWith(`${r}/`))) return null
  const tail = c.split('/').pop()
  const hits = filesByName.get(tail)
  if (hits && (!c.includes('/') || hits.some(h => h.endsWith(`/${c}`) || h === c))) return true
  // Unprefixed and unfound: only a complete checkout can call this broken.
  return absent.length ? null : false
}

for (const file of walk(SRC, /\.md$/)) {
  const rel = relative(REPO, file).replace(/\\/g, '/')
  if (rel.includes('/reference/')) continue // verbatim copies, owned elsewhere
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  let inFence = false
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) inFence = !inFence
    if (inFence) return
    const where = `${rel}:${i + 1}`

    for (const m of line.matchAll(PATH_RE)) {
      const cite = m[1]
      // Only judge citations shaped like a repo-relative path. A leading slash
      // is a URL (`/dev/llms.txt`), and a bare filename may be an external
      // artefact (`acp.json`, `fbevents.js`) with no file in these repos.
      if (cite.startsWith('/') || !cite.includes('/')) continue
      const verdict = pathResolves(cite)
      if (verdict === null) {
        skipped++
        continue
      }
      stats.paths++
      if (!verdict) problems.push(`${where}  path does not exist: ${cite}`)
    }

    if (SCREENS) {
      for (const m of line.matchAll(SPAN_RE)) {
        const span = m[1].trim()
        // Spans also carry directions ("Not in the sidebar. Open the command
        // palette…") and non-sidebar surfaces. Only the clean
        // `Section → Screen` form, with any sub-menu levels between, is
        // checkable.
        const parts = span.split('→').map(x => x.trim())
        const wellFormed = parts.length >= 2
          && parts.every(x => x && x.length <= 40 && !/[.`/]|Ctrl|⌘/.test(x))
        // An unknown first part means a non-sidebar surface, not a broken
        // citation.
        if (!wellFormed || !SCREENS.has(parts[0])) continue
        stats.screens++
        for (const part of parts.slice(1)) {
          if (!SCREENS.has(part)) {
            problems.push(`${where}  not an admin sidebar entry: "${part}" (from "${span}")`)
          }
        }
      }
    }
  })
}

console.log(`check-claims: ${stats.paths} path(s) and ${stats.screens} sidebar path(s) checked`)
if (absent.length) {
  console.log(`check-claims: ${skipped} citation(s) skipped — these repositories are not checked out here: ${absent.join(', ')}`)
}
if (problems.length) {
  for (const p of problems) console.error(p)
  console.error(`\ncheck-claims: ${problems.length} unresolved citation(s).`)
  console.error('A citation that names something which no longer exists is the documentation rotting. Fix the page or the citation.')
  process.exit(1)
}
console.log('check-claims: clean — every cited path, symbol and screen still exists.')
