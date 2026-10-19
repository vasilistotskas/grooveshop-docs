import type { MarkdownRenderer } from 'vitepress'
import { DOC_SOURCES } from '../../sources.ts'

/** `src/`-relative folders that scripts/sync-sources.mjs fills. */
const SYNCED_DIRS = DOC_SOURCES.map(source => `${source.to}/`)

/** Whether markdown-it's `env` belongs to a page copied from a source repository. */
export function isSyncedPage(env: unknown): boolean {
  const relativePath = (env as { relativePath?: unknown } | undefined)?.relativePath
  if (typeof relativePath !== 'string') return false
  const path = relativePath.replace(/\\/g, '/')
  return SYNCED_DIRS.some(dir => path.startsWith(dir))
}

/**
 * Parses the synced reference pages with markdown-it's `html` option off.
 *
 * Those pages are GitHub Markdown written in other repositories, where a
 * placeholder such as `<email>` is plain text. On this site markdown-it
 * passes raw HTML through, and VitePress's component plugin lets a line
 * that starts with an unknown tag open an HTML block, even in the middle
 * of a paragraph. The tag then reaches Vue's template compiler, which
 * fails the whole build on an element it never sees closed. The `v-pre`
 * wrapper the sync adds does not help: it stops interpolation and
 * directives, not the HTML parser.
 *
 * With `html` off, the block and inline HTML rules (markdown-it's and the
 * component plugin's) match nothing, so a tag is text, escaped like any
 * other, and a code span that wraps onto a line starting with a tag stays
 * one code span. Headings, tables, links, autolinks and fenced code do not
 * depend on the option. Pages written in this repository keep raw HTML.
 *
 * Parsing is synchronous, so the option is restored before any other page
 * is parsed.
 */
export function syncedSourcesPlugin(md: MarkdownRenderer): void {
  const parse = md.parse.bind(md)
  md.parse = (src, env) => {
    if (!isSyncedPage(env)) return parse(src, env)
    const html = md.options.html
    md.options.html = false
    try {
      return parse(src, env)
    } finally {
      md.options.html = html
    }
  }
}
