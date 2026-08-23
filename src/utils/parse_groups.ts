const parseGroups = (groups: string[] | undefined): string[][] =>
  (groups ?? []).map((group) =>
    group
      .split(',')
      .map((packageName) => packageName.trim())
      .filter(Boolean),
  )

export default parseGroups
