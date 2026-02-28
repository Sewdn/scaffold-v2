---
title: CLI Commands
description: Complete reference for all Scaffold CLI commands
---

## Command overview

| Command | Description | Key Args/Flags |
|---------|-------------|----------------|
| `scaffold project <name>` | Create monorepo + optionally add apps | `--apps`, `--app-names`, `--non-interactive` |
| `scaffold init <name>` | Initialize base monorepo structure only | `--packages`, `--non-interactive` |
| `scaffold app <name> --type <type>` | Add application to existing project | `--type`, `--with-ui`, `--non-interactive` |
| `scaffold service <name>` | Add service package | |
| `scaffold ui <name>` | Add UI package | |
| `scaffold component <name> --package <pkg>` | Add component to UI package | `--package` |
| `scaffold module <name>` | Add module (service + UI packages) | |
| `scaffold package <name> --type <ui\|service>` | Add generic package | `--type` |

## scaffold project

```bash
scaffold project <name> [--apps <types...>] [--app-names <names...>] [--non-interactive]
```

Creates a new monorepo. Optionally adds apps when `--apps` and `--app-names` are provided.

## scaffold init

```bash
scaffold init <name> [--packages <ids...>] [--non-interactive]
```

Creates base monorepo structure (Turbo, TypeScript, ESLint). Optional packages: `domain`, `svc-config`, `ui`, `ui-lib`.

## scaffold app

```bash
scaffold app <name> --type <type> [--with-ui] [--no-with-ui] [--non-interactive]
```

Adds an application. See [App Types](/reference/app-types/) for valid types.

## scaffold service

```bash
scaffold service <name>
```

Adds `packages/svc-<name>`.

## scaffold ui

```bash
scaffold ui <name>
```

Adds `packages/ui-<name>`.

## scaffold component

```bash
scaffold component <name> --package <package-name>
```

Adds a component to an existing UI package.

## scaffold module

```bash
scaffold module <name>
```

Adds `packages/svc-<name>` and `packages/ui-<name>`.

## scaffold package

```bash
scaffold package <name> --type <ui|service>
```

Adds a generic package with the specified type.
