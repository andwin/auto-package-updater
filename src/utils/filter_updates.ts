import type Update from '../types/update'
import type VersionDiff from '../types/version_diff'
import versionDiffValues from './version_diff_values'

const filterUpdates = (
  updates: Update[],
  packages: string[] | undefined = [],
  maxVersionDiff: VersionDiff | undefined,
): Update[] => {
  let filteredUpdates = [...updates]

  if (maxVersionDiff) {
    filteredUpdates = filteredUpdates.filter((update) => {
      return (
        versionDiffValues[update.value.diff as VersionDiff] >=
        versionDiffValues[maxVersionDiff]
      )
    })
  }

  if (packages.length) {
    filteredUpdates = filteredUpdates.filter((update) =>
      packages.includes(update.value.pkg),
    )
  }

  return filteredUpdates
}

export default filterUpdates
