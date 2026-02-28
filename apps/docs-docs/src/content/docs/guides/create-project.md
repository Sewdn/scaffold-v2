---
title: Create a Project
description: Create new monorepo projects with scaffold project and scaffold init
---

## scaffold project

Creates a complete monorepo with optional apps in one command.

```bash
bun run scaffold project <name> [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--apps <types...>` | Comma-separated app types to add (e.g. `frontend-vite,backend`) |
| `--app-names <names...>` | Names for each app (e.g. `web,api`). Must match order of `--apps` |
| `--non-interactive` | Skip prompts; required for CI/AI agents |

### Examples

```bash
# Minimal project (base structure only)
bun run scaffold project my-app --non-interactive

# Frontend + backend
bun run scaffold project my-app --apps frontend-vite,backend --app-names web,api --non-interactive

# Full-stack with CLI
bun run scaffold project my-app --apps frontend-nextjs,backend,cli --app-names web,api,tool --non-interactive
```

## scaffold init

Initializes the base monorepo structure **without** adding applications. Use when you want to add apps incrementally.

```bash
bun run scaffold init <name> [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--packages <ids...>` | Optional packages to add: `domain`, `svc-config`, `ui`, `ui-lib` |
| `--non-interactive` | Skip prompts |

### Examples

```bash
# Base structure only
bun run scaffold init my-app --non-interactive

# With domain and config packages
bun run scaffold init my-app --packages domain,svc-config --non-interactive

# With UI infrastructure for frontends
bun run scaffold init my-app --packages ui,ui-lib --non-interactive
```

## Project structure created

- `package.json` with Turborepo scripts (`build`, `lint`, `dev`)
- `turbo.json` for task orchestration
- `packages/typescript-config` and `packages/eslint-config`
- Optional: `packages/domain`, `packages/svc-config`, `packages/ui`, `packages/ui-lib`
