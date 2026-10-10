/**
 * Fails the build when a page loads a JavaScript file over budget up front.
 *
 * Replaces Vite's chunk-size warning (switched off in .vitepress/config.mts),
 * which flags every chunk over 500 kB, lazy or not. On this site the large
 * chunks are all lazy: the local search index and Mermaid's layout engines.
 * What a reader pays on every page is the module script and the
 * `modulepreload` links in its HTML, so that is what this checks, per file,
 * against the same 500 kB Vite uses.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const BUDGET_BYTES = 500 * 1000

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(path)
    else if (entry.name.endsWith('.html')) yield path
  }
}

const initial = /<script type="module" src="([^"]+)"|<link rel="modulepreload" href="([^"]+)"/g
const sizes = new Map()
const offenders = new Map()
let pages = 0

for (const page of htmlFiles(DIST)) {
  pages++
  for (const match of readFileSync(page, 'utf8').matchAll(initial)) {
    const url = match[1] ?? match[2]
    if (!url.startsWith('/')) continue
    if (!sizes.has(url)) sizes.set(url, statSync(join(DIST, url)).size)
    if (sizes.get(url) > BUDGET_BYTES) {
      const list = offenders.get(url) ?? []
      list.push(relative(DIST, page))
      offenders.set(url, list)
    }
  }
}

if (offenders.size > 0) {
  for (const [url, list] of offenders) {
    console.error(
      `check-initial-load: ${url} is ${Math.round(sizes.get(url) / 1000)} kB, `
      + `loaded up front by ${list.length} page(s), e.g. ${list[0]}`,
    )
  }
  console.error(`check-initial-load: budget is ${BUDGET_BYTES / 1000} kB per initially loaded file.`)
  process.exit(1)
}

const largest = Math.max(...sizes.values())
console.log(
  `check-initial-load: ${pages} page(s), ${sizes.size} initially loaded file(s), `
  + `largest ${Math.round(largest / 1000)} kB (budget ${BUDGET_BYTES / 1000} kB)`,
)
