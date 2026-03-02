---
title: Project Structure
description: Standard monorepo layout created by Scaffold CLI
---

## Overview

```
<project>/
├── apps/                    # Applications
│   ├── frontend-*/          # Frontend apps (Next.js, Vite, TanStack)
│   ├── backend-*/          # Backend APIs (Elysia)
│   ├── cli-*/               # CLI tools
│   ├── mcp-*/               # MCP servers
│   ├── docs-*/              # Documentation (Starlight/Astro)
│   └── slides-*/            # Slide decks (Reveal.js)
├── packages/                # Shared packages
│   ├── typescript-config/  # Shared TS config
│   ├── domain/             # Shared business types (optional)
│   ├── svc-config/         # Config service (optional)
│   ├── ui/                 # Core UI (Shadcn) (optional)
│   ├── ui-lib/             # Custom components (optional)
│   ├── svc-*/              # Service packages
│   └── ui-*/               # UI packages
├── package.json
├── turbo.json
└── tsconfig.json
```

## Workspace conventions

- **Apps**: `apps/<prefix>-<name>` (e.g. `apps/frontend-web`)
- **Services**: `packages/svc-<name>` (e.g. `packages/svc-auth`)
- **UI packages**: `packages/ui-<name>` (e.g. `packages/ui-dashboard`)
- **Modules**: `packages/svc-<name>` + `packages/ui-<name>` (e.g. `svc-users`, `ui-users`)

## Turbo tasks

- `build`: Compiles TypeScript across all packages (with `^build` dependency ordering)
- `lint`: Runs oxlint across all packages
- `dev`: Starts development servers (cache disabled, persistent)
