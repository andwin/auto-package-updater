import { execa } from 'execa'

const runCustomCommand = async (command: string) => {
  try {
    await execa(command, { shell: true })
  } catch (e) {
    ;(e as Error).message = `Custom command failed: ${command}`
    throw e
  }
}

export default runCustomCommand
