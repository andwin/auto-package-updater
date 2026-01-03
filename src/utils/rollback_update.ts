import { execa } from 'execa'
import type PackageManager from '../types/package_manager'
import installPackages from './install_packages'

const rollbackUpdate = async (packageManager: PackageManager) => {
  await execa`git checkout .`

  await installPackages(packageManager)
}

export default rollbackUpdate
