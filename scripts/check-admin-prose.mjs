/**
 * Guard: the tenant-admin guide must name nothing from the codebase.
 *
 * The reader is a shop owner, not a developer, so a source path, a module or
 * class name or a Django setting is noise that makes the page look written for
 * someone else. See "The admin guide names nothing from the codebase" in
 * AUTHORING.md for the rule and the rewrite table.
 *
 * What stays allowed, because the reader actually sees or types it:
 *   - on-screen labels, sidebar paths, admin URLs they may paste
 *   - keys listed on Settings → Store Settings, and stored choice values the
 *     admin renders in columns and matches in its search box. Both allowlists
 *     are READ FROM THE DJANGO SOURCE at run time rather than duplicated here,
 *     so a new key or choice never trips this guard and a removed one stops
 *     being allowed.
 *
 * Developer pages under src/dev are exempt: citing sources is required there.
 *
 * Exit 1 on any violation. Run: pnpm check:admin
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WORKSPACE = resolve(process.env.GROOVESHOP_WORKSPACE ?? join(REPO, '..'))
const ROOTS = [join(REPO, 'src', 'admin'), join(REPO, 'src', 'el', 'admin')]

const SKIP_DIRS = new Set(['node_modules', '.git', '.venv', 'dist', '.output', '.nuxt', 'staticfiles', '__pycache__'])

/** Files under `dir` matching `match` (defaults to markdown). */
function* walk(dir, match = /\.md$/) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full, match)
    else if (match.test(full)) yield full
  }
}

/**
 * Uppercase tokens the owner legitimately reads, types or searches for:
 *
 *   - keys on the Settings → Store Settings screen, which lists the key itself
 *   - stored choice values, which the admin shows verbatim in columns and
 *     filters and which the search box matches on, so a page telling the owner
 *     to search for one is giving a real instruction, not citing code
 *
 * Both are read from the Django source at run time rather than duplicated here,
 * so a new key or choice never trips the guard and a removed one stops being
 * allowed.
 */
function allowedUppercaseTokens() {
  const djangoRoot = join(WORKSPACE, 'grooveshop-django-api')
  const settings = join(djangoRoot, 'settings.py')
  if (!existsSync(settings)) {
    console.warn(`check-admin-prose: ${settings} not found — skipping the uppercase-token check`)
    return null
  }
  const allowed = new Set()

  const text = readFileSync(settings, 'utf8')
  const start = text.indexOf('EXTRA_SETTINGS_DEFAULTS')
  if (start !== -1) {
    for (const m of text.slice(start, start + 120_000).matchAll(/"name":\s*"([A-Z][A-Z0-9_]+)"/g)) {
      allowed.add(m[1])
    }
  }

  // TextChoices / Choices members: `PAY_ON_DELIVERY = "PAY_ON_DELIVERY", _("…")`
  let enumFiles = 0
  for (const file of walk(djangoRoot, /[\\/]enum[\\/][\w-]+\.py$|[\\/]enums?\.py$/)) {
    enumFiles++
    for (const m of readFileSync(file, 'utf8').matchAll(/^\s{4}([A-Z][A-Z0-9_]+)\s*=\s*["(]/gm)) {
      allowed.add(m[1])
    }
  }

  // A PARTIAL checkout must not half-apply this rule. `settings.py` sits at the
  // repository root, so a sparse checkout of `docs/` still exposes it while the
  // per-app enum modules are absent — which allowlisted the setting keys but
  // not the stored choice values, and failed CI on prose that is correct.
  // Either the whole source is present or the uppercase rule is skipped.
  if (!enumFiles) {
    console.warn('check-admin-prose: no enum modules found (partial checkout?) — skipping the uppercase-token check')
    return null
  }
  return allowed
}

const VISIBLE_TOKENS = allowedUppercaseTokens()

const RULES = [
  {
    id: 'source-path',
    // a/b.py, core/templates/admin/index.html, shared/utils/csp.ts …
    re: /\b[a-z_][\w-]*(?:\/[\w.-]+)+\.(?:py|ts|mts|vue|mjs|cjs|js|html|yaml|yml)\b/g,
    why: 'source file path',
  },
  {
    id: 'bare-module',
    re: /\b(?:settings|manage|urls|models|admin|views|serializers|tasks|signals|forms)\.py\b/g,
    why: 'module name',
  },
  {
    id: 'dev-phrasing',
    re: /\b(?:is built by|rendered by|declared in the code|at request time|in the code ?base|source file|the codebase)\b/gi,
    why: 'developer phrasing',
  },
]

/** SNAKE_CASE tokens only, so plain acronyms (ACS, COD, VAT, GDPR) never match. */
const SNAKE = /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g

/**
 * Backtick spans, paired left to right, and the shape of a code identifier
 * inside one. Pairing properly matters: a single regex reaching across two
 * spans would treat the prose between them as code and flag brand names such
 * as BoxNow that legitimately sit there.
 */
const SPAN = /`([^`\n]+)`/g
const CODEY = /^[A-Z][a-z]+[A-Z][A-Za-z]*$|\w\(|UNFOLD\[|__\w/

let violations = 0
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = relative(REPO, file).replace(/\\/g, '/')
    const lines = readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, i) => {
      const hits = []
      for (const rule of RULES) {
        rule.re.lastIndex = 0
        for (const m of line.matchAll(rule.re)) hits.push(`${rule.why}: ${m[0]}`)
      }
      for (const m of line.matchAll(SPAN)) {
        if (CODEY.test(m[1])) hits.push(`code identifier in backticks: ${m[1]}`)
      }
      if (VISIBLE_TOKENS) {
        for (const m of line.matchAll(SNAKE)) {
          if (!VISIBLE_TOKENS.has(m[0])) hits.push(`code constant the owner never sees: ${m[0]}`)
        }
      }
      for (const h of hits) {
        console.error(`${rel}:${i + 1}  ${h}`)
        violations++
      }
    })
  }
}

if (violations) {
  console.error(`\ncheck-admin-prose: ${violations} violation(s).`)
  console.error('The admin guide is for shop owners. Rewrite in their terms; see AUTHORING.md.')
  process.exit(1)
}
console.log('check-admin-prose: clean — the admin guide names nothing from the codebase.')
