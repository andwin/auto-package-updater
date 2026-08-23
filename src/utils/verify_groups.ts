export const verifyGroups = (groups: string[][]) => {
  const seenPackages = new Set<string>()

  for (const group of groups) {
    if (group.length < 2) {
      console.error(
        `Invalid --group: "${group.join(',')}". A group needs at least two package names`,
      )
      process.exit(1)
    }

    for (const packageName of group) {
      if (seenPackages.has(packageName)) {
        console.error(
          `Invalid --group: "${packageName}" is listed in more than one group`,
        )
        process.exit(1)
      }

      seenPackages.add(packageName)
    }
  }
}
