import { expect, test } from 'vitest'
import type Update from '../types/update'
import buildBatches from './build_batches'

const reactInWww: Update = {
  packageName: 'react',
  workspace: { name: 'www', root: false },
  versionDiff: 'major',
  currentVersion: '18.3.1',
  latestVersion: '19.2.0',
}

const reactDomInWww: Update = {
  packageName: 'react-dom',
  workspace: { name: 'www', root: false },
  versionDiff: 'major',
  currentVersion: '18.3.1',
  latestVersion: '19.2.0',
}

const sassInWww: Update = {
  packageName: 'sass',
  workspace: { name: 'www', root: false },
  versionDiff: 'patch',
  currentVersion: '1.96.0',
  latestVersion: '1.96.1',
}

const vitestInWww: Update = {
  packageName: 'vitest',
  workspace: { name: 'www', root: false },
  versionDiff: 'major',
  currentVersion: '3.2.4',
  latestVersion: '4.0.16',
}

const vitestUiInWww: Update = {
  packageName: '@vitest/ui',
  workspace: { name: 'www', root: false },
  versionDiff: 'major',
  currentVersion: '3.2.4',
  latestVersion: '4.0.16',
}

const reactInAdmin: Update = {
  packageName: 'react',
  workspace: { name: 'admin', root: false },
  versionDiff: 'major',
  currentVersion: '18.3.1',
  latestVersion: '19.2.0',
}

const reactDomInAdmin: Update = {
  packageName: 'react-dom',
  workspace: { name: 'admin', root: false },
  versionDiff: 'major',
  currentVersion: '18.3.1',
  latestVersion: '19.2.0',
}

test('put every update in its own batch when no groups are provided', () => {
  const updates: Update[] = [reactInWww, reactDomInWww, sassInWww]
  const combine = false
  const groups: string[][] = []
  const expected: Update[][] = [[reactInWww], [reactDomInWww], [sassInWww]]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('put every update in a single batch and ignore groups when combine is enabled', () => {
  const updates: Update[] = [reactInWww, reactDomInWww, sassInWww]
  const combine = true
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [[reactInWww, reactDomInWww, sassInWww]]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('merge grouped packages into one batch when they belong to the same workspace', () => {
  const updates: Update[] = [reactInWww, reactDomInWww, sassInWww]
  const combine = false
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [[reactInWww, reactDomInWww], [sassInWww]]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('keep grouped packages in separate batches when they belong to different workspaces', () => {
  const updates: Update[] = [reactInWww, reactDomInAdmin]
  const combine = false
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [[reactInWww], [reactDomInAdmin]]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('merge grouped packages per workspace when the same group matches in several workspaces', () => {
  const updates: Update[] = [
    reactInWww,
    reactInAdmin,
    reactDomInWww,
    reactDomInAdmin,
  ]
  const combine = false
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [
    [reactInWww, reactDomInWww],
    [reactInAdmin, reactDomInAdmin],
  ]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('put a grouped package in its own batch when it is the only selected group member', () => {
  const updates: Update[] = [reactInWww, sassInWww]
  const combine = false
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [[reactInWww], [sassInWww]]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('place a grouped batch at the position of its first selected member', () => {
  const updates: Update[] = [sassInWww, reactInWww, vitestInWww, reactDomInWww]
  const combine = false
  const groups = [['react', 'react-dom']]
  const expected: Update[][] = [
    [sassInWww],
    [reactInWww, reactDomInWww],
    [vitestInWww],
  ]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})

test('build one batch per group when several groups are provided', () => {
  const updates: Update[] = [
    reactInWww,
    vitestInWww,
    reactDomInWww,
    vitestUiInWww,
  ]
  const combine = false
  const groups = [
    ['react', 'react-dom'],
    ['vitest', '@vitest/ui'],
  ]
  const expected: Update[][] = [
    [reactInWww, reactDomInWww],
    [vitestInWww, vitestUiInWww],
  ]

  const result = buildBatches(updates, combine, groups)

  expect(result).toEqual(expected)
})
