import type Workspace from '../types/workspace'

const filterWorkspaces = (
  workspaces: Workspace[],
  filter: string[] = [],
): Workspace[] => {
  if (!filter.length) return workspaces

  return workspaces.filter((workspace) => filter.includes(workspace.name))
}

export default filterWorkspaces
