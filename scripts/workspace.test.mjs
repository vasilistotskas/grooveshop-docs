import assert from 'node:assert/strict'
import { join, resolve } from 'node:path'
import { afterEach, beforeEach, test } from 'node:test'
import { OVERRIDE_VARIABLE, WORKSPACE, overrideVariable, repoDir } from './workspace.mjs'

// Before each test too: the gates are run with GROOVESHOP_DJANGO_API_DIR set
// (a worktree of an unmerged branch), and `pnpm test` in that shell would
// otherwise read it in the test of the default. Every override goes, by the
// shape the module gives the name, not a list kept here: the next repository
// a test asks for would be missing from a list.
function clearOverrides() {
  for (const name of Object.keys(process.env)) {
    if (OVERRIDE_VARIABLE.test(name)) delete process.env[name]
  }
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
  assert.equal(overrideVariable('grooveshop-media-stream'), 'GROOVESHOP_MEDIA_STREAM_DIR')
  assert.match(overrideVariable('grooveshop-storefront-ui-node-nuxt'), OVERRIDE_VARIABLE)
  process.env.GROOVESHOP_STOREFRONT_UI_NODE_NUXT_DIR = join('somewhere')
  assert.equal(repoDir('grooveshop-storefront-ui-node-nuxt'), resolve('somewhere'))
})
