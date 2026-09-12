/**
 * Quote frontmatter `title` / `description` values that YAML would
 * otherwise misparse (a `: ` inside the sentence, a leading quote, `#`,
 * `[`, `{`, `&`, `*`, `!`, `|`, `>`, `%`, `@`, or a backtick). Idempotent;
 * leaves already-quoted values alone. Run before `vitepress build` when a
 * page fails with "incomplete explicit mapping pair".
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src')
const KEYS = new Set(['title', 'description'])
const UNSAFE = /: |^["'#[{&*!|>%@`]|\s#|: *$/

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (full.endsWith('.md')) yield full
  }
}

let changed = 0
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8')
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm) continue
  const fixed = fm[1].split(/\r?\n/).map((line) => {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m || !KEYS.has(m[1])) return line
    const value = m[2]
    if (!value || /^["']/.test(value) || !UNSAFE.test(value)) return line
    return `${m[1]}: ${JSON.stringify(value)}`
  }).join('\n')
  if (fixed !== fm[1]) {
    writeFileSync(file, text.replace(fm[1], fixed))
    changed++
    console.log(`fix-frontmatter: ${file.slice(SRC.length + 1)}`)
  }
}
console.log(`fix-frontmatter: ${changed} file(s) changed`)
