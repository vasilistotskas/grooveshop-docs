/**
 * A page synced from a source repository must build whatever HTML-looking
 * text it holds (.vitepress/plugins/synced-sources). Each case renders a
 * page through VitePress's own Markdown renderer and compiles the result
 * the way the build does, as a Vue template; a compile error here is the
 * "Element is missing end tag" that fails `vitepress build`.
 *
 * Run with `pnpm test`.
 */
import assert from 'node:assert/strict'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createMarkdownRenderer } from 'vitepress'
import { compileTemplate } from 'vue/compiler-sfc'
import { mermaidPlugin } from '../.vitepress/plugins/mermaid/index.ts'
import { syncedSourcesPlugin } from '../.vitepress/plugins/synced-sources/index.ts'
import { DOC_SOURCES } from '../.vitepress/sources.ts'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src')
const md = await createMarkdownRenderer(SRC, {
  config(md) {
    md.use(mermaidPlugin)
    md.use(syncedSourcesPlugin)
  },
})

const SYNCED = `${DOC_SOURCES[0].to}/fixture.md`
const AUTHORED = 'dev/fixture.md'

/** The body as scripts/sync-sources.mjs writes it: inside a `v-pre` container. */
const synced = body => `:::: v-pre\n${body}\n::::\n`

async function render(source, relativePath) {
  const html = await md.renderAsync(source, { relativePath })
  const { errors } = compileTemplate({ source: `<div>${html}</div>`, filename: relativePath, id: 'fixture' })
  return { html, errors }
}

test('a code span wrapping onto a line that starts with a tag builds and stays one code span', async () => {
  const { html, errors } = await render(synced(
    '- **Lost authenticator:** `manage.py reset_staff_mfa\n  <email>` (run with cluster access) removes it.',
  ), SYNCED)
  assert.deepEqual(errors, [])
  assert.match(html, /<code>manage\.py reset_staff_mfa &lt;email&gt;<\/code>/)
})

test('a tag in prose, at a line start or inline, builds as text', async () => {
  const { html, errors } = await render(synced(
    'Run the command for one store:\n\n<schema>\n\nThen send it to <email> and <b>check</b>.',
  ), SYNCED)
  assert.deepEqual(errors, [])
  assert.match(html, /&lt;schema&gt;/)
  assert.match(html, /send it to &lt;email&gt; and &lt;b&gt;check&lt;\/b&gt;/)
})

test('links, autolinks, tables and fenced code still render on a synced page', async () => {
  const { html, errors } = await render(synced([
    'See [Order system](./order-system.md) and <https://example.com>.',
    '',
    '| Setting | Default |',
    '|---|---|',
    '| `X` | 1 |',
    '',
    '```python',
    'print("<email>")',
    '```',
  ].join('\n')), SYNCED)
  assert.deepEqual(errors, [])
  assert.match(html, /<a href="\.\/order-system\.html">Order system<\/a>/)
  assert.match(html, /<a href="https:\/\/example\.com"/)
  assert.match(html, /<table[\s>]/)
  assert.match(html, /<pre class="shiki/)
})

test('a page written here keeps raw HTML', async () => {
  const { html, errors } = await render('Go to <span class="sidebar-path">Sales → Orders</span>.', AUTHORED)
  assert.deepEqual(errors, [])
  assert.match(html, /<span class="sidebar-path">Sales → Orders<\/span>/)
})

test('without the plugin\'s scope, the same synced text fails to compile', async () => {
  const { errors } = await render(synced(
    '- `manage.py reset_staff_mfa\n  <email>` removes it.',
  ), AUTHORED)
  assert.notDeepEqual(errors, [], 'the fixture no longer reproduces the build failure the plugin prevents')
})
