#!/usr/bin/env node

import detectPackageManager from './utils/detect_package_panager'
import verifyGitRepo from './utils/verify_git_repo'

const run = async () => {
  await verifyGitRepo()
  const packageManager = await detectPackageManager()
  console.log(`Using ${packageManager} as package manager`)
}

run()
