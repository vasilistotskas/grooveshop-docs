/**
 * Post-build artefacts, written into dist/ after `vitepress build`.
 *
 *   <route>.md              raw markdown twin of every page
 *   dist/llms.txt           sectioned index of the PUBLIC pages
 *   dist/llms-full.txt      full text of those pages
 *   dist/dev/llms.txt       sectioned index of the developer docs
 *   dist/dev/llms-full.txt  full text of the developer docs
 *   dist/sitemap.xml        public pages only, with hreflang alternates
 *   dist/robots.txt         allows the guide, disallows /dev/
 *
 * Three decisions worth knowing, all made for machine readers:
 *
 * 1. ONE LOCALE. The guide is mirrored 1:1 in Greek, which is the point for a
 *    shop owner and pure duplication for a model: it doubled the corpus for no
 *    new information, and Greek is wider in UTF-8, so it dominated the bytes.
 *    The corpora carry the root locale only and say where the translation is.
 *    The SITEMAP is the opposite case and still carries both, because search
 *    engines must see the Greek pages.
 * 2. SECTIONED INDEXES. llmstxt.org groups links under H2s so a reader can
 *    take one section instead of the whole file. A flat list of ninety-odd
 *    entries is an all-or-nothing read.
 * 3. MARKDOWN TWINS. Index entries point at `<route>.md`, served next to the
 *    HTML, so a model never parses a rendered page to read a document. The
 *    HTML URL is named alongside it for humans.
 *
 * The /dev prefix sits behind basic-auth at the ingress, so its corpora and
 * markdown twins inherit that gate; the split keeps internal architecture out
 * of the public corpus while still giving an authenticated agent one file.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(REPO, 'src')
const DIST = join(REPO, 'dist')
// `||`, not `??`: the Dockerfile declares DOCS_SITE_URL as a build ARG, so an
// image built without it exports an EMPTY string rather than leaving it unset.
// Nullish coalescing would keep that empty value and emit a sitemap of relative
// URLs, which the sitemap protocol rejects.
const SITE_URL = (process.env.DOCS_SITE_URL || 'https://docs.grooveshop.space').replace(/\/$/, '')

if (!existsSync(DIST)) {
  console.error('postbuild: dist/ is missing — run `vitepress build` first')
  process.exit(1)
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (full.endsWith('.md')) yield full
  }
}

function parse(file) {
  const raw = readFileSync(file, 'utf8')
  let body = raw
  const fm = {}
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (m) {
    body = raw.slice(m[0].length)
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/)
      if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
    }
  }
  const h1 = body.match(/^#\s+(.+?)\s*$/m)
  const rel = relative(SRC, file).replace(/\\/g, '/')
  const route = `/${rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')}`
  return {
    rel,
    route,
    url: `${SITE_URL}${route}`,
    // The markdown twin sits beside the HTML. An index route (`/admin/`)
    // has no filename to hang `.md` on, so it becomes `/admin/index.md`.
    mdUrl: `${SITE_URL}${route.endsWith('/') ? `${route}index.md` : `${route}.md`}`,
    mdPath: rel,
    title: fm.title ?? h1?.[1] ?? route,
    description: fm.description ?? '',
    body: body.trim(),
    isDev: rel.startsWith('dev/'),
    isGreek: rel.startsWith('el/'),
  }
}

/** Heading a page is filed under in the index. */
const SECTION_TITLES = {
  'admin/getting-started': 'Getting started',
  'admin/catalog': 'Catalog',
  'admin/storefront': 'Storefront',
  'admin/blog': 'Blog',
  'admin/sales': 'Sales',
  'admin/b2b': 'B2B (wholesale)',
  'admin/shipping': 'Shipping',
  'admin/customers': 'Customers',
  'admin/loyalty': 'Loyalty',
  'admin/localization': 'Localization',
  'admin/settings': 'Settings',
  'admin/system': 'System',
  'dev/platform': 'Platform',
  'dev/flows': 'End-to-end flows',
  'dev/django': 'Django API',
  'dev/operator': 'Platform operator',
  'dev/operations': 'Operations',
  'dev/api': 'API reference',
  'dev/nuxt': 'Other services',
  'dev/gateway': 'Other services',
  'dev/media': 'Other services',
  'dev/infra': 'Other services',
}

function sectionFor(page) {
  if (page.rel.includes('/reference/')) return 'Per-service reference (synced from the owning repository)'
  const dir = page.rel.replace(/\/[^/]+\.md$/, '')
  if (SECTION_TITLES[dir]) return SECTION_TITLES[dir]
  if (page.rel === 'admin/index.md' || page.rel === 'dev/index.md') return 'Start here'
  if (page.rel === 'index.md') return 'Start here'
  if (page.rel === 'admin/faq.md') return 'Help'
  return 'Other'
}

/** Sections in reading order; anything unlisted sorts to the end. */
const SECTION_ORDER = [
  'Start here', 'Getting started', 'Catalog', 'Storefront', 'Blog', 'Sales',
  'B2B (wholesale)', 'Shipping', 'Customers', 'Loyalty', 'Localization',
  'Settings', 'System', 'Help',
  'Platform', 'Platform operator', 'End-to-end flows', 'Django API',
  'Per-service reference (synced from the owning repository)',
  'Operations', 'API reference', 'Other services', 'Other',
]

function index(title, summary, list, notes = []) {
  const lines = [`# ${title}`, '', `> ${summary}`, '']
  for (const note of notes) lines.push(note, '')
  const grouped = new Map()
  for (const page of list) {
    const section = sectionFor(page)
    if (!grouped.has(section)) grouped.set(section, [])
    grouped.get(section).push(page)
  }
  const sections = [...grouped.keys()].sort(
    (a, b) => (SECTION_ORDER.indexOf(a) + 1 || 99) - (SECTION_ORDER.indexOf(b) + 1 || 99),
  )
  for (const section of sections) {
    lines.push(`## ${section}`, '')
    for (const p of grouped.get(section)) {
      lines.push(`- [${p.title}](${p.mdUrl})${p.description ? `: ${p.description}` : ''}`)
    }
    lines.push('')
  }
  return `${lines.join('\n')}\n`
}

function full(title, list) {
  const parts = [`# ${title}`, '']
  for (const p of list) {
    parts.push('---', '', `<!-- ${p.url} -->`, '', p.body, '')
  }
  return `${parts.join('\n')}\n`
}

const xmlEscape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Every Greek admin page mirrors an English one at the same path under /el/,
 * so each pair is announced to search engines with hreflang alternates. A page
 * without a twin (there should be none) is emitted on its own.
 */
function sitemap(list) {
  const byRoute = new Map(list.map(p => [p.route, p]))
  const twin = (route) => {
    if (route === '/') return '/el/'
    if (route === '/el/') return '/'
    return route.startsWith('/el/') ? route.slice(3) : `/el${route}`
  }
  const entries = list.map((p) => {
    const other = byRoute.get(twin(p.route))
    const links = other
      ? [
          `    <xhtml:link rel="alternate" hreflang="${p.route.startsWith('/el') ? 'el' : 'en'}" href="${xmlEscape(p.url)}"/>`,
          `    <xhtml:link rel="alternate" hreflang="${other.route.startsWith('/el') ? 'el' : 'en'}" href="${xmlEscape(other.url)}"/>`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(p.route.startsWith('/el') ? other.url : p.url)}"/>`,
        ].join('\n')
      : ''
    return `  <url>\n    <loc>${xmlEscape(p.url)}</loc>\n${links ? `${links}\n` : ''}  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`
}

function write(rel, text) {
  const target = join(DIST, rel)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, text)
  return Buffer.byteLength(text)
}

const pages = [...walk(SRC)].map(parse).sort((a, b) => a.route.localeCompare(b.route))

// Markdown twins: every page, both locales. A Greek reader's agent should be
// able to fetch the Greek page it is looking at, even though the corpora index
// the English one.
let twinBytes = 0
for (const page of pages) {
  const heading = [
    '<!--',
    `  ${page.url}`,
    '  Markdown source of this page. The rendered page is at the URL above.',
    '-->',
    '',
  ].join('\n')
  twinBytes += write(page.mdPath, heading + page.body + '\n')
}
console.log(`postbuild: ${pages.length} markdown twin(s) (${twinBytes} bytes)`)

const publicPages = pages.filter(p => !p.isDev && !p.isGreek)
const devPages = pages.filter(p => p.isDev)
const greekCount = pages.filter(p => p.isGreek).length

for (const [rel, text] of [
  ['llms.txt', index(
    'GrooveShop documentation',
    'Tenant-admin guide for the GrooveShop e-commerce platform: how to run a store from its admin panel.',
    publicPages,
    [
      `Every page is also published in Greek at the same path under \`/el/\`, and those ${greekCount} translations are omitted here because they duplicate the English text.`,
      'Links point at the markdown source of each page. Drop the `.md` for the rendered page.',
      'Developer documentation (architecture, flows, per-service reference, operations) lives under `/dev/` and requires credentials.',
    ],
  )],
  ['llms-full.txt', full('GrooveShop documentation (tenant-admin guide)', publicPages)],
  ['dev/llms.txt', index(
    'GrooveShop developer documentation',
    'Architecture, flows, per-service reference and operations for the GrooveShop platform. Every page names the source files it describes; the code is the source of truth.',
    devPages,
    ['Links point at the markdown source of each page. Drop the `.md` for the rendered page.'],
  )],
  ['dev/llms-full.txt', full('GrooveShop developer documentation', devPages)],
  ['sitemap.xml', sitemap(pages.filter(p => !p.isDev))],
  ['robots.txt', [
    'User-agent: *',
    'Allow: /',
    '# Credentialed developer documentation — never indexable.',
    'Disallow: /dev/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')],
]) {
  console.log(`postbuild: ${rel} (${write(rel, text)} bytes)`)
}

console.log(
  `postbuild: ${publicPages.length} public page(s) indexed, `
  + `${greekCount} Greek translation(s) excluded from the corpora, `
  + `${devPages.length} developer page(s)`,
)
