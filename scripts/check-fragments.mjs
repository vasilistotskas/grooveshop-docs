/**
 * Fails the build when a link names a heading its target page does not have.
 *
 * VitePress fails the build for a link to a page that does not exist, but it
 * does not look at the part after `#`. A heading that is renamed keeps every
 * link to it building, and the reader lands at the top of the page instead of
 * the section. This reads the built HTML, so it checks the ids VitePress
 * really wrote (it strips accents from a heading's id and from a link's
 * fragment alike), for every page, the synced reference trees included.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(path)
    else if (entry.name.endsWith('.html')) yield path
  }
}

const pages = new Map()
for (const page of htmlFiles(DIST)) {
  const html = readFileSync(page, 'utf8')
  pages.set(page, {
    html,
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])),
  })
}

/** The built file a link's path part leads to, from the page that holds the link. */
function targetOf(from, path) {
  if (path === '') return from
  const base = path.startsWith('/') ? join(DIST, path) : resolve(dirname(from), path)
  if (base.endsWith('.html')) return base
  return existsSync(`${base}.html`) ? `${base}.html` : join(base, 'index.html')
}

const shown = path => relative(DIST, path).split(sep).join('/')
const dead = []

for (const [page, { html }] of pages) {
  // The page's own content and its outline; the site chrome above it links to no heading.
  const content = html.slice(Math.max(html.indexOf('<main'), 0))
  for (const match of content.matchAll(/<a\s[^>]*href="([^"#]*)#([^"]+)"/g)) {
    const [, path, fragment] = match
    if (/^[a-z][a-z0-9+.-]*:/i.test(path)) continue
    const target = pages.get(targetOf(page, path.replaceAll('&amp;', '&')))
    // A link to a page that is not built is VitePress's own dead-link error.
    if (!target) continue
    const id = decodeURIComponent(fragment)
    if (!target.ids.has(id)) dead.push(`${shown(page)} links to ${path}#${id}`)
  }
}

if (dead.length > 0) {
  for (const line of new Set(dead)) console.error(`check-fragments: ${line}`)
  console.error('check-fragments: no such heading on the target page. A renamed heading needs its links updated.')
  process.exit(1)
}

console.log(`check-fragments: ${pages.size} page(s), every linked heading exists`)
