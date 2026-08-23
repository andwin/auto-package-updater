import type Update from '../types/update'

const buildBatches = (
  updates: Update[],
  combine: boolean,
  groups: string[][],
): Update[][] => {
  if (combine) return [updates]

  const batches: Update[][] = []
  const batchesByKey = new Map<string, Update[]>()

  for (const update of updates) {
    const groupIndex = groups.findIndex((group) =>
      group.includes(update.packageName),
    )

    if (groupIndex === -1) {
      batches.push([update])
      continue
    }

    const key = `${groupIndex}:${update.workspace.name}`
    const batch = batchesByKey.get(key)

    if (batch) {
      batch.push(update)
      continue
    }

    const newBatch = [update]
    batchesByKey.set(key, newBatch)
    batches.push(newBatch)
  }

  return batches
}

export default buildBatches
