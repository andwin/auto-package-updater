type CommandError = Error & { stdout?: string; stderr?: string }

export default CommandError
