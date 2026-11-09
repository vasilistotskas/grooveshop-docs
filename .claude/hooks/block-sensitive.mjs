/**
 * PreToolUse hook: refuse edits to files that hold credentials or that a tool
 * must regenerate.
 *
 * Sibling of the same-named hook in the other repos and of the workspace
 * root's `guard-paths.mjs`. They cannot share a file — each repo is a separate
 * checkout — so they are kept structurally identical instead: the same
 * first-match-wins RULES table, the same universal rules at the top, and only
 * the repo-specific rules differing below. When you change one, change them
 * all.
 *
 * The reference rule is the important one here: those files are overwritten by
 * `pnpm dev` / `pnpm build:full` from each repository's own `docs/` folder, so
 * an edit made here is silently lost on the next sync.
 *
 * Receives JSON on stdin: { tool_name, tool_input: { file_path, ... } }
 * Exit 0 = allow, exit 2 = block with stderr as the reason.
 */
import { readFileSync } from 'node:fs'

let input = {}
try {
  input = JSON.parse(readFileSync(0, 'utf8'))
}
catch {
  // A malformed payload must not wedge the edit.
  process.exit(0)
}

const filePath = input.tool_input?.file_path || ''
if (!filePath) process.exit(0)

const p = filePath.split('\\').join('/')
const base = p.split('/').pop()

/** [test, reason] pairs. First match wins. */
const RULES = [
  // ---- universal: every repo in the workspace has these ----
  [() => /(^|\/)\.env($|\.)/.test(p) && base !== '.env.example',
    'Environment files hold live credentials. Edit .env.example instead.'],
  [() => base === 'settings.local.json',
    'settings.local.json is per-machine. Put shared config in settings.json.'],
  [() => /\.dec\.ya?ml$/.test(base) || /(^|\/)unsealed[-_]/.test(p),
    'Decrypted secret payload. Re-seal with kubeseal instead of editing.'],

  // ---- repo-specific ----
  [() => /(^|\/)src\/dev\/[^/]+\/reference\//.test(p),
    'src/dev/<section>/reference/ holds copies synced from the sibling repositories and is overwritten on the next sync. Edit the file in the owning repository\'s docs/ folder, then run pnpm dev or pnpm build:full.'],
  [() => /(^|\/)\.vitepress\/generated\//.test(p),
    '.vitepress/generated/ is written by the sync and build scripts. Change the script or its source, then re-run pnpm dev or pnpm build:full.'],
  [() => base === 'sources.lock.json',
    'sources.lock.json pins the synced docs and is written by scripts/source-lock.mjs. Run node scripts/source-lock.mjs resolve (or the sources.yml workflow) and commit the result.'],
  [() => base === 'CHANGELOG.md',
    'CHANGELOG.md is written by semantic-release. Never hand-edit it; the commit messages drive it.'],
  [() => base === 'pnpm-lock.yaml',
    'pnpm-lock.yaml is written by pnpm. Edit package.json and run pnpm install.'],
  [() => base === 'package-lock.json',
    'This project uses pnpm; do not add an npm lockfile.'],
  [() => /(^|\/)dist\//.test(p),
    'dist/ is build output. Edit the source and re-run the build.'],
]

const hit = RULES.find(([test]) => {
  try {
    return test()
  }
  catch {
    return false
  }
})

if (hit) {
  process.stderr.write(`BLOCKED: ${filePath} must not be edited by hand. ${hit[1]}`)
  process.exit(2)
}
