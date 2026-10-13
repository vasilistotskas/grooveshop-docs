/**
 * Guard: every citation in the docs must still point at something real.
 *
 * The documentation's whole claim to trustworthiness is that a developer page
 * names the file it describes and an admin page names the screen. Both rot
 * silently when the code moves. This checks the mechanical half of that, the
 * half a human reviewer is worst at:
 *
 *   paths    — every `repo/relative/path.ext` in backticks exists
 *   screens  — every `sidebar-path` span is a real route through the admin
 *              sidebar, section → entry → sub-entry, in English or Greek
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

/*
 * Admin sidebar structure, so a `sidebar-path` span cannot name a dead screen
 * or send the reader to the wrong menu: every cited path must be a real
 * section → entry → sub-entry route, not merely a set of real labels.
 *
 * The store sidebar is built per request by `admin/navigation.py:
 * store_sidebar`, as nested calls — `_group(_("Sales"), [page(…, _("Orders")),
 * _menu(_("Wholesale"), "icon", [page(…), …]), …])`. The platform sidebar is
 * the `UNFOLD_PLATFORM["SIDEBAR"]["navigation"]` literal in `settings.py`,
 * dicts with "title" and "items". Both are read as Python source: a scanner
 * that matches brackets and splits on top-level commas while skipping strings
 * and comments, which is all their shape needs. Neither file is imported —
 * that needs Django, a database and a tenant.
 *
 * The reading is generic over the helpers: an entry is a call (or a dict)
 * whose title is its first positional `_("…")` argument (or "title") and
 * whose children are its first list argument (or "items"). Only `_group(`,
 * the section marker, is named. A call with no title argument takes the first
 * `_("…")` in the body of the module function it calls (`_store_profile`).
 * If the structure cannot be found, the check FAILS rather than passing
 * quietly with nothing to compare against.
 */

const OPEN = { '(': ')', '[': ']', '{': '}' }

/** Index just past the string literal whose opening quote is at `i`. */
function skipString(src, i) {
  const q = src[i]
  const end = src.startsWith(q.repeat(3), i) ? q.repeat(3) : q
  let j = i + end.length
  while (j < src.length) {
    if (src[j] === '\\') j += 2
    else if (src.startsWith(end, j)) return j + end.length
    else j++
  }
  return j
}

/** Python source with its `#` comments removed and its strings intact. */
function stripComments(src) {
  let out = ''
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (c === '"' || c === '\'') {
      const end = skipString(src, i)
      out += src.slice(i, end)
      i = end - 1
    }
    else if (c === '#') {
      const nl = src.indexOf('\n', i)
      i = (nl === -1 ? src.length : nl) - 1
    }
    else {
      out += c
    }
  }
  return out
}

/**
 * Walk `src` outside strings, calling `visit(i, depth)` for every character at
 * its bracket depth; `visit` returning true stops the walk at that index.
 */
function scan(src, visit, from = 0) {
  let depth = 0
  for (let i = from; i < src.length; i++) {
    const c = src[i]
    if (c === '"' || c === '\'') {
      i = skipString(src, i) - 1
      continue
    }
    if (OPEN[c]) depth++
    if (visit(i, depth)) return i
    if (c === ')' || c === ']' || c === '}') depth--
  }
  return -1
}

/** Index of the bracket that closes the one at `open`, or -1. */
function closing(src, open) {
  return scan(src, (i, depth) => depth === 1 && ')]}'.includes(src[i]) && i > open, open)
}

/** Top-level pieces of `src` split on `sep`. */
function splitTop(src, sep = ',') {
  const parts = []
  let start = 0
  scan(src, (i, depth) => {
    if (depth === 0 && src[i] === sep) {
      parts.push(src.slice(start, i))
      start = i + 1
    }
    return false
  })
  parts.push(src.slice(start))
  return parts.map(p => p.trim()).filter(Boolean)
}

/** Index of the first top-level ` if ` (a conditional expression), or -1. */
function topLevelIf(src) {
  return scan(src, (i, depth) => depth === 0 && /\sif\s/.test(src.slice(i, i + 4)))
}

const TITLE = /^_\(\s*(?:"([^"\\]*)"|'([^'\\]*)')\s*\)$/

/** The entry itself, without `if …` gating or wrapping parentheses. */
function unwrap(expr) {
  let e = expr.trim()
  for (;;) {
    const cond = topLevelIf(e)
    if (cond !== -1) e = e.slice(0, cond).trim()
    if (e.startsWith('(') && closing(e, 0) === e.length - 1) e = e.slice(1, -1).trim()
    else return e
  }
}

/** `{"key": value, …}` body as a Map of unquoted key to value source. */
function dictEntries(body) {
  const entries = new Map()
  for (const pair of splitTop(body)) {
    const colon = scan(pair, (i, depth) => depth === 0 && pair[i] === ':')
    if (colon === -1) continue
    entries.set(pair.slice(0, colon).trim().replace(/^["']|["']$/g, ''), pair.slice(colon + 1).trim())
  }
  return entries
}

/** The entries of a `[…]` list source. */
function listItems(src, defs) {
  const e = unwrap(src)
  if (!e.startsWith('[')) return []
  return splitTop(e.slice(1, closing(e, 0))).map(item => entry(item, defs)).filter(Boolean)
}

/** A sidebar entry `{ title, children }` from a call or dict source, or null. */
function entry(src, defs) {
  const e = unwrap(src)
  if (e.startsWith('{')) {
    const fields = dictEntries(e.slice(1, closing(e, 0)))
    const t = TITLE.exec(fields.get('title') ?? '')
    return { title: t ? (t[1] ?? t[2]) : null, children: listItems(fields.get('items') ?? '', defs) }
  }
  const call = /^([A-Za-z_][\w.]*)\s*\(/.exec(e)
  if (!call) return null
  const open = call[0].length - 1
  let title = null
  let children = []
  for (const arg of splitTop(e.slice(open + 1, closing(e, open)))) {
    if (/^\*\*|^[A-Za-z_]\w*\s*=[^=]/.test(arg)) continue // **extra, keyword=…
    const t = TITLE.exec(arg)
    if (t && title === null) title = t[1] ?? t[2]
    else if (arg.startsWith('[') && !children.length) children = listItems(arg, defs)
  }
  return { title: title ?? defs.get(call[1]) ?? null, children }
}

/** First `_("…")` in the body of each module-level function. */
function functionTitles(src) {
  const defs = new Map()
  const starts = [...src.matchAll(/^def\s+([A-Za-z_]\w*)\s*\(/gm)]
  starts.forEach((m, k) => {
    const body = src.slice(m.index, k + 1 < starts.length ? starts[k + 1].index : src.length)
    const t = /\b_\(\s*(?:"([^"\\]*)"|'([^'\\]*)')\s*\)/.exec(body)
    if (t) defs.set(m[1], t[1] ?? t[2])
  })
  return defs
}

/** The store sidebar's sections, from `store_sidebar` in navigation.py. */
function storeSections(src) {
  const start = src.search(/^def\s+store_sidebar\s*\(/m)
  if (start === -1) return []
  const next = src.slice(start + 1).search(/^(?:def|class)\s/m)
  const body = src.slice(start, next === -1 ? src.length : start + 1 + next)
  const defs = functionTitles(src)
  const sections = []
  for (const m of body.matchAll(/\b_group\s*\(/g)) {
    const open = m.index + m[0].length - 1
    const close = closing(body, open)
    if (close !== -1) sections.push(entry(body.slice(m.index, close + 1), defs))
  }
  return sections.filter(Boolean)
}

/**
 * The platform sidebar's sections, from `UNFOLD_PLATFORM` in settings.py.
 * Scanned from the assignment onward only, so nothing earlier in that long
 * file can throw the string tracking off.
 */
function platformSections(settingsSource) {
  const m = /^UNFOLD_PLATFORM\s*=\s*\{/m.exec(settingsSource)
  if (!m) return []
  const src = stripComments(settingsSource.slice(m.index))
  const open = src.indexOf('{')
  const sidebar = unwrap(dictEntries(src.slice(open + 1, closing(src, open))).get('SIDEBAR') ?? '')
  if (!sidebar.startsWith('{')) return []
  return listItems(dictEntries(sidebar.slice(1, closing(sidebar, 0))).get('navigation') ?? '', new Map())
}

/** Greek `msgstr` per English `msgid`, so the el pages are checked too. */
function greekLabels(poPath) {
  const labels = new Map()
  if (!existsSync(poPath)) return labels
  // The catalogue is CRLF. A \n-only pattern silently matches nothing.
  for (const m of readFileSync(poPath, 'utf8').matchAll(/msgid\s+"([^"]+)"\r?\nmsgstr\s+"([^"]+)"/g)) {
    if (!labels.has(m[1])) labels.set(m[1], m[2])
  }
  return labels
}

const PATH_SEP = '\u0000'

/**
 * `null` when the Django repository is absent; otherwise every route the two
 * sidebars can render (English and Greek), their section titles, every label,
 * and what could not be read.
 */
function adminSidebar() {
  const django = join(WORKSPACE, 'grooveshop-django-api')
  const settings = join(django, 'settings.py')
  const navigation = join(django, 'admin', 'navigation.py')
  if (!existsSync(settings) || !existsSync(navigation)) return null
  const unreadable = []
  const store = storeSections(stripComments(readFileSync(navigation, 'utf8')))
  if (!store.some(s => s.title && s.children.length)) unreadable.push('the store sidebar in admin/navigation.py (store_sidebar)')
  const platform = platformSections(readFileSync(settings, 'utf8'))
  if (!platform.some(s => s.title && s.children.length)) unreadable.push('the platform sidebar in settings.py (UNFOLD_PLATFORM)')

  const greek = greekLabels(join(django, 'locale', 'el', 'LC_MESSAGES', 'django.po'))
  const paths = new Set()
  const sections = new Set()
  const labels = new Set()
  for (const tr of [t => t, t => greek.get(t) ?? t]) {
    const walk = (prefix, nodes) => {
      for (const n of nodes) {
        if (!n.title) continue
        const path = [...prefix, tr(n.title)]
        labels.add(path.at(-1))
        paths.add(path.join(PATH_SEP))
        walk(path, n.children)
      }
    }
    for (const s of [...store, ...platform]) {
      if (!s.title) {
        walk([], s.children) // the untitled Dashboard section: labels only
        continue
      }
      const section = tr(s.title)
      sections.add(section)
      labels.add(section)
      walk([section], s.children)
      // A sub-menu left with one page the viewer may open renders as that
      // page, directly under the section.
      for (const item of s.children) {
        for (const child of item.children) {
          if (child.title) paths.add([section, tr(child.title)].join(PATH_SEP))
        }
      }
    }
  }
  return { paths, sections, labels, unreadable }
}
const SIDEBAR = adminSidebar()

const problems = []
for (const what of SIDEBAR?.unreadable ?? []) {
  problems.push(`could not read ${what}: its shape changed, so update adminSidebar() in scripts/check-claims.mjs`)
}
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

    if (SIDEBAR) {
      for (const m of line.matchAll(SPAN_RE)) {
        const span = m[1].trim()
        // Spans also carry directions ("Not in the sidebar. Open the command
        // palette…") and non-sidebar surfaces. Only the clean
        // `Section → Screen` form, with any sub-menu levels between, is
        // checkable.
        const parts = span.split('→').map(x => x.trim())
        const wellFormed = parts.length >= 2
          && parts.every(x => x && x.length <= 40 && !/[.`/]|Ctrl|⌘/.test(x))
        if (!wellFormed) continue
        if (!SIDEBAR.sections.has(parts[0])) {
          // A sidebar label that is not a section means the path skips the
          // levels above it; anything else is a non-sidebar surface.
          if (SIDEBAR.labels.has(parts[0])) {
            problems.push(`${where}  sidebar path does not start at its section: "${span}"`)
          }
          continue
        }
        stats.screens++
        if (SIDEBAR.paths.has(parts.join(PATH_SEP))) continue
        let depth = 1
        while (SIDEBAR.paths.has(parts.slice(0, depth + 1).join(PATH_SEP))) depth++
        problems.push(`${where}  "${parts[depth]}" is not under "${parts.slice(0, depth).join(' → ')}" in the admin sidebar (from "${span}")`)
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
