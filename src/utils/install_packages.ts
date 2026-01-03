import { execa } from 'execa'
import type PackageManager from '../types/package_manager'

const installPackagesForPnpm = async () => {
  await execa`pnpm install`
}

const implementationForPackageManager: Record<
  PackageManager,
  () => Promise<void>
> = {
  pnpm: installPackagesForPnpm,
}

const installPackages = async (packageManager: PackageManager) => {
  await implementationForPackageManager[packageManager]()
}

export default installPackages
