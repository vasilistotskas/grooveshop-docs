import assert from 'node:assert/strict'
import { join, resolve } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { WORKSPACE, repoDir } from './workspace.mjs'

// Before each test too: the gates are run with GROOVESHOP_DJANGO_API_DIR set
// (a worktree of an unmerged branch), and `pnpm test` in that shell would
// otherwise read it in the test of the default.
function clearOverrides() {
  delete process.env.GROOVESHOP_DJANGO_API_DIR
  delete process.env.GROOVESHOP_STOREFRONT_UI_NODE_NUXT_DIR
}

beforeEach(clearOverrides)
afterEach(clearOverrides)

test('a repository is a sibling under the workspace by default', () => {
  assert.equal(repoDir('grooveshop-django-api'), join(WORKSPACE, 'grooveshop-django-api'))
})

test('GROOVESHOP_<REPO>_DIR points one repository elsewhere and leaves the others', () => {
  process.env.GROOVESHOP_DJANGO_API_DIR = join('some', 'worktree')
  assert.equal(repoDir('grooveshop-django-api'), resolve('some', 'worktree'))
  assert.equal(repoDir('grooveshop-media-stream'), join(WORKSPACE, 'grooveshop-media-stream'))
})

test('the variable name drops the grooveshop- prefix and turns - into _', () => {
  process.env.GROOVESHOP_STOREFRONT_UI_NODE_NUXT_DIR = join('somewhere')
  assert.equal(repoDir('grooveshop-storefront-ui-node-nuxt'), resolve('somewhere'))
})
