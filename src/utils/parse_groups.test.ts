import { expect, test } from 'vitest'
import parseGroups from './parse_groups'

test('return no groups when the option is not provided', () => {
  const groups = undefined
  const expected: string[][] = []

  const result = parseGroups(groups)

  expect(result).toEqual(expected)
})

test('split each group on comma', () => {
  const groups = ['react,react-dom', 'vitest,@vitest/ui']
  const expected = [
    ['react', 'react-dom'],
    ['vitest', '@vitest/ui'],
  ]

  const result = parseGroups(groups)

  expect(result).toEqual(expected)
})

test('trim whitespace around package names', () => {
  const groups = ['react , react-dom']
  const expected = [['react', 'react-dom']]

  const result = parseGroups(groups)

  expect(result).toEqual(expected)
})

test('drop empty package names', () => {
  const groups = ['react,,react-dom,']
  const expected = [['react', 'react-dom']]

  const result = parseGroups(groups)

  expect(result).toEqual(expected)
})
