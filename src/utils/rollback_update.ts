import { execa } from 'execa'
import type PackageManager from '../types/package_manager'
import installPackagesBeforeUpdate from './install_packages_before_update'

const rollbackUpdate = async (packageManager: PackageManager) => {
  await execa`git checkout .`

  await installPackagesBeforeUpdate(packageManager)
}

export default rollbackUpdate
