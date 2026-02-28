# Scaffold CLI v2

A command-orchestration CLI tool for setting up TypeScript monorepos with Turborepo and Bun workspaces. Scaffold v2 uses a layered approach: template files (Mustache stubs) are copied and rendered; underlying commands (bun, bunx, npx, shell) are orchestrated in sequence to extend the generated code; dependency management for TypeScript packages is consolidated and centralized.

## Vision and Approach

### Layered Approach

Scaffold v2 orchestrates underlying commands in the right sequence and uses template files where appropriate:

- **Template files are copied and rendered**: Mustache stub files (`.stub`) for app types (backend, CLI, MCP) and optional packages (domain, svc-config, ui, ui-lib)
- **Extra commands extend the generated code**: e.g. `bun create vite@latest`, `bun create astro@latest`, `bun add`, patch scripts
- **Dependency management is consolidated and centralized**: Version constants and profiles in `packages/dependencies.ts`
- **Reproducible and transparent**: Every step is explicit; umbrella commands invoke subcommand sequences

### Composable Command Architecture

Commands are organized as umbrella templates that invoke subcommand templates. For example, `scaffold project` runs a sequence that includes `scaffold init` (base structure) plus optional app creation.

### Effect-First

The CLI uses the [Effect](https://effect.website/) TypeScript library for orchestration, error handling, and composability. New applications and packages include Effect as a dependency by default.

---

## CLI API (AI Agent Focus)

This section documents the stable CLI API for AI agents to scaffold projects without generating code manually.

| Command | Description | Key Args/Flags |
|---------|-------------|----------------|
| `scaffold project <name>` | Create monorepo + optionally add apps | `--apps`, `--app-names`, `--non-interactive` |
| `scaffold init <name>` | Initialize base monorepo structure only | |
| `scaffold app <name> --type <type>` | Add application to existing project | `--type`: see below |
| `scaffold service <name>` | Add service package | |
| `scaffold ui <name>` | Add UI package | |
| `scaffold component <name> --package <pkg>` | Add component to UI package | |
| `scaffold module <name>` | Add module (service + UI packages) | |
| `scaffold package <name> --type <ui\|service>` | Add generic package | |

### Supported Application Types

- `frontend-nextjs` — Next.js frontend application
- `frontend-vite` — Vite frontend application
- `cli` — Command-line interface (no Oclif)
- `backend` — Backend API (Elysia.js)
- `mcp-server` — Model Context Protocol server
- `slide-deck` — Reveal.js presentation
- `documentation` — Starlight/Astro documentation site

The app type registry is extensible; new types can be added by registering a command template.

---

## Technical Decisions

- **No Oclif**: The CLI uses **@effect/cli** or **Commander.js** + Effect to avoid obfuscated errors during development.
- **Monorepo structure**: Always Turborepo + Bun workspaces. No template variants.
- **CLI apps**: New CLI applications use Effect + Commander.js (or @effect/cli), not Oclif.

---

## Target Audience

- **AI agents (primary)**: Documented CLI API for scaffolding without generating code manually. Engineers instruct agents to scaffold applications and projects, then implement business logic.
- **Engineers**: Use the CLI directly or via an MCP server that exposes these commands.

---

## Installation

```bash
# From the monorepo
bun install
bun run build
```

## Documentation

The documentation site (`apps/docs-docs`, Starlight/Astro) is scaffolded with the CLI itself:

```bash
bun run docs        # Start docs dev server
bun run docs:build  # Build docs for production
bun run landing     # Start marketing landing page (Vite + Shadcn)
```

```bash
# Run the CLI (from scaffold-v2 root)
bun run scaffold project my-project
bun run scaffold app my-app --type frontend-vite

# Or use the binary directly (after linking or from apps/cli-scaffold)
bun run apps/cli-scaffold/src/index.ts init my-app
```

---

## Example Workflows (AI Agents)

### Create a new monorepo with apps

```bash
bun run scaffold project my-app --apps frontend-vite,backend --app-names web,api
```

### Initialize base structure only, then add apps manually

```bash
bun run scaffold init my-app
cd my-app
bun run scaffold app web --type frontend-vite
bun run scaffold app api --type backend
```

### Add a service package

```bash
cd my-project
bun run scaffold service auth
```

### Add a module (service + UI packages)

```bash
bun run scaffold module auth
```

### Add a component to a UI package

```bash
bun run scaffold component Button --package ui-lib
```

---

## Testing

```bash
bun test                    # All tests
bun run test:e2e            # E2E scaffold scenarios only
```

E2E tests run scaffold commands in temporary directories, validate output, and clean up. See `apps/cli-scaffold/e2e/README.md` for adding scenarios.

---

## Extending with New App Types

App types are registered in the command template registry. Each type maps to a `CommandTemplate` with a sequence of steps (bun, bunx, shell, etc.). To add a new type:

1. Define a `CommandTemplate` with `id`, `description`, and `steps`
2. Register it in the app type registry
3. Expose it via the `scaffold app --type` option
