/**
 * Post-build artefacts, written into dist/ after `vitepress build`.
 *
 *   dist/llms.txt            index of every PUBLIC page (admin guide, en + el)
 *   dist/llms-full.txt       full text of those public pages
 *   dist/dev/llms.txt        index of the developer docs
 *   dist/dev/llms-full.txt   full text of the developer docs
 *   dist/sitemap.xml         public pages only, with hreflang alternates
 *   dist/robots.txt          allows the guide, disallows /dev/
 *
 * The /dev prefix sits behind basic-auth at the ingress, so the split keeps
 * internal architecture out of the public corpus while still giving an
 * authenticated agent one file to load. llms.txt follows https://llmstxt.org.
 *
 * The sitemap is built here rather than by VitePress's own `sitemap` option:
 * on the 2.x line that option logs "generating sitemap ✓" and writes nothing
 * (verified against this exact version in a clean container), and even when it
 * works it would list the credentialed /dev/ pages, which must never appear in
 * a public sitemap.
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
    title: fm.title ?? h1?.[1] ?? route,
    description: fm.description ?? '',
    body: body.trim(),
    isDev: rel.startsWith('dev/'),
  }
}

const pages = [...walk(SRC)].map(parse).sort((a, b) => a.route.localeCompare(b.route))
const publicPages = pages.filter(p => !p.isDev)
const devPages = pages.filter(p => p.isDev)

function index(title, summary, list) {
  const lines = [`# ${title}`, '', `> ${summary}`, '', '## Pages', '']
  for (const p of list) {
    lines.push(`- [${p.title}](${p.url})${p.description ? `: ${p.description}` : ''}`)
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
  console.log(`postbuild: ${rel} (${Buffer.byteLength(text)} bytes)`)
}

write('llms.txt', index(
  'GrooveShop documentation',
  'Tenant-admin guide for the GrooveShop e-commerce platform, in Greek and English. Developer documentation lives under /dev/ and requires credentials.',
  publicPages,
))
write('llms-full.txt', full('GrooveShop documentation (public pages)', publicPages))
write('dev/llms.txt', index(
  'GrooveShop developer documentation',
  'Architecture, flows, per-service reference and operations for the GrooveShop platform. Every page names the source files it describes; the code is the source of truth.',
  devPages,
))
write('dev/llms-full.txt', full('GrooveShop developer documentation', devPages))
write('sitemap.xml', sitemap(publicPages))
write('robots.txt', [
  'User-agent: *',
  'Allow: /',
  '# Credentialed developer documentation — never indexable.',
  'Disallow: /dev/',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n'))

console.log(`postbuild: ${publicPages.length} public page(s), ${devPages.length} developer page(s)`)
