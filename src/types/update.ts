import type Workspace from './workspace'

type Update = {
  name: string
  value: {
    pkg: string
    workspace: Workspace
    diff: string
  }
}

export default Update
