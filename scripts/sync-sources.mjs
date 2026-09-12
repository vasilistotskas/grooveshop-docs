/**
 * Copy per-service reference docs from their sibling repositories into
 * src/, and write the sidebar manifest that .vitepress/sidebars/dev.ts
 * reads.
 *
 * Sources are declared in .vitepress/sources.ts. The workspace root (the
 * directory holding every grooveshop-* repo) defaults to the parent of this
 * repo and can be overridden with GROOVESHOP_WORKSPACE, which is what CI
 * does after checking the sibling repos out next to this one.
 *
 * A missing source is an error, not a warning: a build that silently
 * drops a reference tree would ship dead sidebar links.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WORKSPACE = resolve(process.env.GROOVESHOP_WORKSPACE ?? join(REPO, '..'))
const SRC = join(REPO, 'src')
const MANIFEST = join(REPO, '.vitepress', 'generated', 'reference-manifest.json')

// .vitepress/sources.ts is TypeScript; Node strips the types on import on
// the Node line we require, so there is a single declaration.
const { DOC_SOURCES } = await import('../.vitepress/sources.ts')

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else yield full
  }
}

function titleOf(text, fallback) {
  const h1 = text.match(/^#\s+(.+?)\s*$/m)
  return h1 ? h1[1].replace(/`/g, '') : fallback
}

/**
 * Reference pages are plain Markdown written for GitHub, so they may hold
 * `{{ … }}` or bare `<tags>` in prose that Vue's template compiler would
 * choke on. Wrapping the body in a four-colon `v-pre` container keeps it
 * as Markdown (headings, tables and code still render) while turning off
 * template compilation. Four colons so that any `:::` container inside
 * the source nests correctly.
 */
function wrapVPre(text) {
  const fm = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  const head = fm ? fm[0] : ''
  const body = text.slice(head.length)
  return `${head}:::: v-pre\n${body.trim()}\n::::\n`
}

const manifest = []

for (const source of DOC_SOURCES) {
  const from = join(WORKSPACE, source.from)
  const to = join(SRC, source.to)
  if (!existsSync(from)) {
    console.error(`sync-sources: missing ${from} — check out the repository next to this one or set GROOVESHOP_WORKSPACE`)
    process.exit(1)
  }

  rmSync(to, { recursive: true, force: true })
  mkdirSync(to, { recursive: true })

  const copied = []
  for (const file of walk(from)) {
    if (!file.endsWith('.md')) continue
    const rel = relative(from, file).replace(/\\/g, '/')
    const text = readFileSync(file, 'utf8')
    const dest = join(to, rel)
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, wrapVPre(text))
    copied.push({ rel, title: titleOf(text, rel.replace(/\.md$/, '')) })
  }
  copied.sort((a, b) => a.rel.localeCompare(b.rel))

  const base = `/${source.to.replace(/\\/g, '/')}/`
  const items = copied.map(({ rel, title }) => {
    const slug = rel.replace(/\.md$/, '')
    const link = slug.endsWith('/index') ? `${base}${slug.slice(0, -'index'.length)}` : `${base}${slug}`
    return { text: title, link }
  })

  // Landing page for the group so /dev/<svc>/reference/ itself resolves.
  const index = [
    '---',
    `title: ${source.title}`,
    `description: Reference docs copied verbatim from ${source.from} at build time.`,
    '---',
    '',
    `# ${source.title}`,
    '',
    `Copied verbatim from \`${source.from}\` in its own repository at build time. Edit the source file there, not here.`,
    '',
    ...items.map(i => `- [${i.text}](${i.link})`),
    '',
  ].join('\n')
  writeFileSync(join(to, 'index.md'), index)

  manifest.push({ id: source.id, title: source.title, base, items: [{ text: 'Index', link: base }, ...items] })
  console.log(`sync-sources: ${source.id} — ${copied.length} file(s) → ${relative(REPO, to)}`)
}

mkdirSync(dirname(MANIFEST), { recursive: true })
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
