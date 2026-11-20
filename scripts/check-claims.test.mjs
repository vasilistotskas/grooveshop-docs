import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { after, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { OVERRIDE_VARIABLE } from './workspace.mjs'

const SCRIPTS = dirname(fileURLToPath(import.meta.url))
const roots = []

after(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true })
})

/**
 * Runs the real gate over a throwaway site and workspace: the script reads its
 * pages from the repository it sits in, so it is copied beside a `src/` of one
 * page. `repos` maps a repository name to the files it holds; a repository that
 * is not listed is not checked out, which is what CI looks like for the private
 * grooveshop-infrastructure.
 */
function runGate({ page, repos }) {
  const root = mkdtempSync(join(tmpdir(), 'check-claims-'))
  roots.push(root)
  const docs = join(root, 'grooveshop-docs')
  mkdirSync(join(docs, 'scripts'), { recursive: true })
  for (const name of ['check-claims.mjs', 'workspace.mjs']) copyFileSync(join(SCRIPTS, name), join(docs, 'scripts', name))
  mkdirSync(join(docs, 'src', 'dev'), { recursive: true })
  writeFileSync(join(docs, 'src', 'dev', 'page.md'), page)
  for (const [repo, files] of Object.entries(repos)) {
    for (const file of files) {
      const full = join(root, repo, file)
      mkdirSync(dirname(full), { recursive: true })
      writeFileSync(full, '')
    }
  }
  // The run's own environment, minus any GROOVESHOP_<REPO>_DIR the caller has
  // set to check a branch: those would point the fixture at a real checkout.
  const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !OVERRIDE_VARIABLE.test(name)))
  env.GROOVESHOP_WORKSPACE = resolve(root)
  const run = spawnSync(process.execPath, [join(docs, 'scripts', 'check-claims.mjs')], { env, encoding: 'utf8' })
  return { status: run.status, output: `${run.stdout}${run.stderr}` }
}

const CODE = { 'grooveshop-media-stream': ['src/app.module.ts'] }

test('a bare path found in a checked-out repository resolves', () => {
  const { status } = runGate({ page: 'See `src/app.module.ts`.\n', repos: CODE })
  assert.equal(status, 0)
})

test('a bare path found nowhere fails although a repository is not checked out', () => {
  const { status, output } = runGate({ page: 'See `tests/integration/admin/test_action_permissions.py`.\n', repos: CODE })
  assert.equal(status, 1)
  assert.match(output, /page\.md:1 {2}path does not exist: tests\/integration\/admin\/test_action_permissions\.py/)
})

test('the failure says to name the repository when the path may belong to the one not checked out', () => {
  const { output } = runGate({ page: 'See `manifests/app-root.yaml`.\n', repos: CODE })
  assert.match(output, /cite it as `grooveshop-infrastructure\/<its full path from that repository's root>`/)
  assert.doesNotMatch(output, /grooveshop-infrastructure\/manifests\/app-root\.yaml/)
})

test('a path addressed to a repository that is not checked out is skipped, not failed', () => {
  const { status, output } = runGate({ page: 'See `grooveshop-infrastructure/manifests/app-root.yaml`.\n', repos: CODE })
  assert.equal(status, 0)
  assert.match(output, /1 citation\(s\) skipped/)
})

test('a path addressed to a checked-out repository must exist there', () => {
  const infra = { ...CODE, 'grooveshop-infrastructure': ['manifests/app-root.yaml'] }
  assert.equal(runGate({ page: 'See `grooveshop-infrastructure/manifests/app-root.yaml`.\n', repos: infra }).status, 0)
  const missing = runGate({ page: 'See `grooveshop-infrastructure/manifests/gone.yaml`.\n', repos: infra })
  assert.equal(missing.status, 1)
  assert.match(missing.output, /path does not exist: grooveshop-infrastructure\/manifests\/gone\.yaml/)
})

test('a bare path that exists only in grooveshop-infrastructure fails with the full path, wherever the gate runs', () => {
  // The verdict must not depend on whether the private repository is present.
  const infra = { ...CODE, 'grooveshop-infrastructure': ['manifests/app-constructs/grooveshop/base/backend.yaml'] }
  const { status, output } = runGate({ page: 'See `base/backend.yaml`.\n', repos: infra })
  assert.equal(status, 1)
  assert.match(output, /write `grooveshop-infrastructure\/manifests\/app-constructs\/grooveshop\/base\/backend\.yaml`/)
})

test('a path qualified with a checked-out repository never resolves through another repository', () => {
  // `src/app.module.ts` exists in the media repository only.
  const infra = { ...CODE, 'grooveshop-infrastructure': ['manifests/app-root.yaml'] }
  const { status, output } = runGate({ page: 'See `grooveshop-infrastructure/src/app.module.ts`.\n', repos: infra })
  assert.equal(status, 1)
  assert.match(output, /path does not exist: grooveshop-infrastructure\/src\/app\.module\.ts/)
})

test('a path qualified with a repository that is not checked out is skipped even if another has the file', () => {
  const { status, output } = runGate({ page: 'See `grooveshop-infrastructure/src/app.module.ts`.\n', repos: CODE })
  assert.equal(status, 0)
  assert.match(output, /1 citation\(s\) skipped/)
})

test('a shell script citation is checked like any other path', () => {
  const repos = { 'grooveshop-media-stream': ['src/app.module.ts', 'scripts/smoke.sh'] }
  assert.equal(runGate({ page: 'See `grooveshop-media-stream/scripts/smoke.sh`.\n', repos }).status, 0)
  const missing = runGate({ page: 'See `grooveshop-media-stream/scripts/missing.sh`.\n', repos })
  assert.equal(missing.status, 1)
  assert.match(missing.output, /path does not exist: grooveshop-media-stream\/scripts\/missing\.sh/)
  assert.equal(runGate({ page: 'See `scripts/missing.sh`.\n', repos }).status, 1)
})
