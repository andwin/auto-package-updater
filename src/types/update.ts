import type Workspace from './workspace'

type Update = {
  packageName: string
  workspace: Workspace
  versionDiff: string
  currentVersion: string
  latestVersion: string
}

export default Update
