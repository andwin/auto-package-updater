import fs from 'node:fs/promises'
import type CommandError from '../types/command_error'
import type Update from '../types/update'
import describeUpdate from './describe_update'

const logfile = 'patchup.log'

export const clear = async () => {
  await fs.unlink(logfile).catch(() => {})
}

export const log = async (updates: Update[], error: CommandError) => {
  const packages = updates.map(describeUpdate).join(', ')

  let logMessage = `❌ Updating ${packages} failed`
  logMessage += `\n\n${error.message}`
  if (error.stderr) {
    logMessage += `\n\n${error.stderr}`
  }
  if (error.stdout) {
    logMessage += `\n\n${error.stdout}`
  }
  logMessage += `\n\n`

  await fs.appendFile(logfile, logMessage)
}
