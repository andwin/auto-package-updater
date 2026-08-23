import { afterEach, expect, test, vi } from 'vitest'
import { verifyGroups } from './verify_groups'

const consoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(() => undefined)
const processExit = vi.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`process.exit(${code})`)
})

afterEach(() => {
  consoleError.mockClear()
  processExit.mockClear()
})

test('accept when no groups are provided', () => {
  const groups: string[][] = []

  verifyGroups(groups)

  expect(consoleError).not.toHaveBeenCalled()
  expect(processExit).not.toHaveBeenCalled()
})

test('accept groups that do not share any package', () => {
  const groups = [
    ['react', 'react-dom'],
    ['vitest', '@vitest/ui'],
  ]

  verifyGroups(groups)

  expect(consoleError).not.toHaveBeenCalled()
  expect(processExit).not.toHaveBeenCalled()
})

test('reject a group with fewer than two package names', () => {
  const groups = [['react']]

  expect(() => verifyGroups(groups)).toThrow()

  expect(consoleError).toHaveBeenCalledWith(
    'Invalid --group: "react". A group needs at least two package names',
  )
  expect(processExit).toHaveBeenCalledWith(1)
})

test('reject a group that lists the same package more than once', () => {
  const groups = [['react', 'react']]

  expect(() => verifyGroups(groups)).toThrow()

  expect(consoleError).toHaveBeenCalledWith(
    'Invalid --group: "react,react" lists the same package more than once',
  )
  expect(processExit).toHaveBeenCalledWith(1)
})

test('reject a package that is listed in more than one group', () => {
  const groups = [
    ['react', 'react-dom'],
    ['react', 'preact'],
  ]

  expect(() => verifyGroups(groups)).toThrow()

  expect(consoleError).toHaveBeenCalledWith(
    'Invalid --group: "react" is listed in more than one group',
  )
  expect(processExit).toHaveBeenCalledWith(1)
})
