import { execa } from 'execa'
import type Update from '../types/update'

const commitUpdate = async (update: Update) => {
  const message = `Updating package ${update.value.pkg} in ${update.value.workspace.name}`

  await execa('git', ['add', '--all'])
  await execa('git', ['commit', '-m', message])
}

export default commitUpdate
