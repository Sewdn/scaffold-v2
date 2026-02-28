---
title: Add Applications
description: Add new applications to an existing project
---

## scaffold app

Adds an application to an existing project. Run from the project root.

```bash
bun run scaffold app <name> --type <type> [options]
```

### Required arguments

| Argument | Description |
|----------|-------------|
| `name` | App name (e.g. `web`, `api`, `docs`) |
| `--type <type>` | App type — see [App Types](/reference/app-types/) |

### Options

| Flag | Description |
|------|-------------|
| `--with-ui` | Include UI and UI-lib packages (React frontends only) |
| `--no-with-ui` | Do not include UI packages |
| `--non-interactive` | Skip prompts; required for CI/AI agents |

### Examples

```bash
# Add a Vite frontend
bun run scaffold app web --type frontend-vite --non-interactive

# Add a backend API
bun run scaffold app api --type backend --non-interactive

# Add a CLI tool
bun run scaffold app tool --type cli --non-interactive

# Add a documentation site
bun run scaffold app docs --type documentation --non-interactive

# Add a slide deck
bun run scaffold app slides --type slide-deck --non-interactive

# Add an MCP server
bun run scaffold app mcp --type mcp-server --non-interactive
```

### Naming conventions

- App names are formatted as kebab-case
- Directory prefix is based on type: `frontend-*`, `backend-*`, `cli-*`, `docs-*`, `slides-*`, `mcp-*`
- Example: `web` + `frontend-vite` → `apps/frontend-web`
