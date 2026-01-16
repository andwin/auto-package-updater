# Auto Package Updater

Automatically update npm packages one at a time, running tests after each update and committing successful updates to git.

## Features

- Updates packages individually with automatic test verification
- Rolls back failed updates automatically
- Creates a git commit for each successful update
- Supports pnpm workspaces
- Interactive package selection
- Filter by workspace, package name, or version diff (patch/minor/major)

## Usage

```bash
npx auto-package-updater [options]
```

### Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--help` | `-h` | Display usage guide |
| `--workspace <name>` | `-w` | Filter by workspace name (can be used multiple times) |
| `--package <name>` | `-p` | Filter by package name (can be used multiple times) |
| `--max-version-diff <diff>` | `-m` | Filter by max version diff: `patch`, `minor`, or `major` |
| `--test <command>` | | Custom test command (default: `pnpm test`) |
| `--pre-update <command>` | | Command to run before each update |

### Examples

```bash
# Update all packages interactively
auto-package-updater

# Only patch updates in a specific workspace and a with max version diff of patch
auto-package-updater -w admin -m patch

# Use a custom test command
auto-package-updater --test "npm run test:ci"

# Filter for specific packages
auto-package-updater -p sass -p dayjs
```
