# E2E Test Scenarios

Catalog of scaffold CLI end-to-end test scenarios with growing complexity. Use this file as the source of truth when implementing scenarios.

## Report Generation & Visualization

Each E2E run produces structured JSON reports in `apps/cli-scaffold/.e2e-reports/`:

- **run-latest.json** — overwritten on each run
- **run-{timestamp}.json** — historical runs for comparison

Report schema: `runId`, `timestamp`, `totalScenarios`, `passed`, `failed`, `totalDurationMs`, `scenarios[]` (each with `scenarioId`, `description`, `status`, `durationMs`, `validationResults`).

**Visualize reports:**

```bash
bun run e2e:report                                    # Summary of latest run
bun run e2e:report:scenario <scenario-id>            # Detailed view for one scenario
bun run e2e/report-viewer.ts [path] [--scenario id]  # With specific report file
```

---

## Turbo-Based Validation Strategy

Scaffolded projects use **Turborepo** for monorepo task orchestration. All validation must leverage Turbo for efficient, parallelized execution:

- **Root scripts** (`package.json`): `build`, `lint`, `dev` delegate to `turbo build`, `turbo lint`, `turbo dev`
- **Validators run from project root** so Turbo can:
  - Build packages in parallel according to the dependency graph (`^build`)
  - Lint all packages in parallel
  - Start dev runtimes across apps (with `cache: false`, `persistent: true`)
- **Validation order**: Run `build` first (TypeScript compilation across all packages), then `lint`, then `devStarts` (brief runtime check). Turbo handles parallelism within each task.

---

## Scenario Template

When implementing a scenario, copy this template:

```markdown
## Scenario ID: `scenario-id`

**Status:** Implemented | Planned | Blocked  
**Complexity:** 1-5 (1=minimal, 5=full-stack)  
**Description:** One-line summary

### Steps

1. `scaffold <command> <args>`
2. ...

### Validations

- [ ] Path: `path/to/check`
- [ ] File contains: `string|regex`
- [ ] Script: `script-name`
- [ ] **Build succeeds** — `bun run build` (Turbo: TypeScript compilation across packages)
- [ ] **Lint succeeds** — `bun run lint` (Turbo: ESLint across packages)
- [ ] **Dev runtime starts** — `bun run dev` starts without errors; brief warmup, verify no crash, then kill

### Implementation Notes

- Scenario file: `scenarios/scenario-id.ts`
- Blockers / special considerations
```

---

## Scenario Catalog

### 1. minimal-project

**Status:** Implemented  
**Complexity:** 1  
**Description:** Base monorepo with no apps and no optional packages.

#### Steps

1. `scaffold init e2e-minimal --non-interactive`

#### Validations

- [x] Path: `package.json`
- [x] Path: `turbo.json`
- [x] Path: `packages/typescript-config`
- [x] Script: `build`
- [x] Build succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/01-minimal-project.ts`

---

### 2. backend-only

**Status:** Implemented  
**Complexity:** 2  
**Description:** Project with backend (Elysia) app only.

#### Steps

1. `scaffold project e2e-backend --apps backend --app-names api --non-interactive`

#### Validations

- [x] Path: `package.json`
- [x] Path: `apps/backend-api`
- [x] Path: `apps/backend-api/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/02-backend-only.ts`

---

### 3. init-with-optional-packages

**Status:** Implemented  
**Complexity:** 2  
**Description:** Init with domain and svc-config optional packages.

#### Steps

1. `scaffold init e2e-opt --packages domain,svc-config --non-interactive`

#### Validations

- [x] Path: `packages/domain`
- [x] Path: `packages/svc-config`
- [x] Path: `packages/domain/package.json`
- [x] Path: `packages/svc-config/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/03-init-with-optional-packages.ts`

---

### 4. service-package

**Status:** Implemented  
**Complexity:** 2  
**Description:** Init then add service package.

#### Steps

1. `scaffold init e2e-svc --non-interactive`
2. `scaffold service auth` (run from project dir)

#### Validations

- [x] Path: `packages/svc-auth`
- [x] Path: `packages/svc-auth/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [ ] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/04-service-package.ts`
- Second step runs with cwd = project directory

---

### 5. ui-package

**Status:** Implemented  
**Complexity:** 2  
**Description:** Init then add UI package.

#### Steps

1. `scaffold init e2e-ui --non-interactive`
2. `scaffold ui shared`

#### Validations

- [x] Path: `packages/ui-shared`
- [x] Path: `packages/ui-shared/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [ ] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/05-ui-package.ts`
- Second step runs with cwd = project directory

---

### 6. module-creation

**Status:** Implemented  
**Complexity:** 3  
**Description:** Init then add module (service + UI packages).

#### Steps

1. `scaffold init e2e-mod --non-interactive`
2. `scaffold module users`

#### Validations

- [x] Path: `packages/svc-users`
- [x] Path: `packages/ui-users`
- [x] Path: `packages/svc-users/package.json`
- [x] Path: `packages/ui-users/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/06-module-creation.ts`

---

### 7. component-in-ui-lib

**Status:** Implemented  
**Complexity:** 3  
**Description:** Init with ui, ui-lib, then add component to ui-lib.

#### Steps

1. `scaffold init e2e-comp --packages ui,ui-lib --non-interactive`
2. `scaffold component Button --package ui-lib`

#### Validations

- [x] Path: `packages/ui`
- [x] Path: `packages/ui-lib`
- [x] Path: `packages/ui-lib/src/components/Button`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/07-component-in-ui-lib.ts`

---

### 9. backend-plus-mcp

**Status:** Implemented  
**Complexity:** 3  
**Description:** Project with backend and MCP server apps.

#### Steps

1. `scaffold project e2e-bm --apps backend,mcp-server --app-names api,mcp --non-interactive`

#### Validations

- [x] Path: `apps/backend-api`
- [x] Path: `apps/mcp-mcp`
- [x] Path: `apps/backend-api/package.json`
- [x] Path: `apps/mcp-mcp/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] Dev runtime starts

#### Implementation Notes

- Scenario file: `scenarios/09-backend-plus-mcp.ts`
- MCP server stub uses `@modelcontextprotocol/sdk` with `StdioServerTransport` and `server.connect()`

---

### 10. slide-deck-app

**Status:** Implemented  
**Complexity:** 2  
**Description:** Project with Reveal.js slide deck app.

#### Steps

1. `scaffold project e2e-slides --apps slide-deck --app-names slides --non-interactive`

#### Validations

- [x] Path: `apps/slides-slides`
- [x] Path: `apps/slides-slides/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/10-slide-deck-app.ts`

---

### 11. documentation-app

**Status:** Implemented  
**Complexity:** 2  
**Description:** Project with Starlight/Astro documentation app.

#### Steps

1. `scaffold project e2e-docs --apps documentation --app-names docs --non-interactive`

#### Validations

- [x] Path: `apps/docs-docs`
- [x] Path: `apps/docs-docs/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/11-documentation-app.ts`

---

### 12. full-packages-stack

**Status:** Implemented  
**Complexity:** 3  
**Description:** Init with all optional packages (domain, svc-config, ui, ui-lib).

#### Steps

1. `scaffold init e2e-full --packages domain,svc-config,ui,ui-lib --non-interactive`

#### Validations

- [x] Path: `packages/domain`
- [x] Path: `packages/svc-config`
- [x] Path: `packages/ui`
- [x] Path: `packages/ui-lib`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/12-full-packages-stack.ts`
- `timeoutMs: 150_000` — init + build + lint for all packages takes ~65–90s

---

### 13. incremental-full-stack

**Status:** Implemented  
**Complexity:** 4  
**Description:** Init, add backend app, service package, module in sequence.

#### Steps

1. `scaffold init e2e-incr --non-interactive`
2. `scaffold app api --type backend --non-interactive`
3. `scaffold service auth`
4. `scaffold module users`

#### Validations

- [x] Path: `apps/backend-api`
- [x] Path: `packages/svc-auth`
- [x] Path: `packages/svc-users`
- [x] Path: `packages/ui-users`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] Dev runtime starts (5000ms)

#### Implementation Notes

- Scenario file: `scenarios/13-incremental-full-stack.ts`
- Steps 2–4 run with cwd = project directory
- `timeoutMs: 150_000` for build + lint + devStarts (~65s typical)

---

### 14. package-generic

**Status:** Implemented  
**Complexity:** 2  
**Description:** Init then add generic package with type service.

#### Steps

1. `scaffold init e2e-pkg --non-interactive`
2. `scaffold package utils --type service`

#### Validations

- [x] Path: `packages/svc-utils` — service type creates svc- prefix
- [x] Path: `packages/svc-utils/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/14-package-generic.ts`
- Service type creates `packages/svc-utils` (svc- prefix)

---

### 15. frontend-vite

**Status:** Implemented  
**Complexity:** 2  
**Description:** Project with Vite + React frontend app.

#### Steps

1. `scaffold project e2e-vite --apps frontend-vite --app-names web --non-interactive`

#### Validations

- [x] Path: `apps/frontend-web`
- [x] Path: `apps/frontend-web/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] Dev runtime starts

#### Implementation Notes

- Scenario file: `scenarios/15-frontend-vite.ts`
- Uses `argsForNonInteractive` with `--template react-ts` for non-interactive Vite scaffolding

---

### 16. frontend-nextjs

**Status:** Implemented  
**Complexity:** 2  
**Description:** Project with Next.js frontend app.

#### Steps

1. `scaffold project e2e-nextjs --apps frontend-nextjs --app-names web --non-interactive`

#### Validations

- [x] Path: `apps/frontend-web`
- [x] Path: `apps/frontend-web/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] Dev runtime starts

#### Implementation Notes

- Scenario file: `scenarios/16-frontend-nextjs.ts`
- Uses `argsForNonInteractive` with full flags for non-interactive Next.js scaffolding
- `devStarts(5000, 'apps/frontend-web')` runs Next.js dev from app dir (avoids Turbo TTY issues)
- `timeoutMs: 180_000` for Next.js build (~3 min)

---

### 17. frontend-tanstack

**Status:** Implemented  
**Complexity:** 3  
**Description:** Project with TanStack Start frontend app (requires TanStack CLI).

#### Steps

1. `scaffold project e2e-tanstack --apps frontend-tanstack --app-names web --non-interactive`

#### Validations

- [x] Path: `apps/frontend-web`
- [x] Path: `apps/frontend-web/package.json`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)

#### Implementation Notes

- Scenario file: `scenarios/17-frontend-tanstack.ts`
- Uses `bunx @tanstack/cli create` during scaffold; no devStarts (TanStack CLI creates full app; build and lint suffice)
- Longer timeout (150s) for TanStack build

---

### CLI app-type scenarios (`@workspace/app-cli`)

Scenarios for CLI scaffolding live in `packages/app-cli/src/e2e/scenarios/` (import from `@workspace/app-cli/e2e/scenarios`).

### cli-basic

**Status:** Implemented  
**Complexity:** 2  
**Description:** CLI app with default example command (hello) and service (example-service).

#### Steps

1. `scaffold project e2e-cli-basic --apps cli --app-names tools --non-interactive`

#### Validations

- [x] Path: `apps/cli-tools`
- [x] Path: `apps/cli-tools/src/commands/hello.ts`
- [x] Path: `apps/cli-tools/src/services/example-service.ts`
- [x] Path: `apps/cli-tools/src/commands/index.ts`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] CLI help shows command: `hello`

#### Implementation Notes

- Scenario file: `packages/app-cli/src/e2e/scenarios/cli-basic.ts`
- Tests default scaffolding (no `--no-example-*` flags)

### cli-expansion

**Status:** Implemented  
**Complexity:** 3  
**Description:** CLI app without default examples, then expand with `add-command` and `add-service`.

#### Steps

1. `scaffold project e2e-cli-expand --apps cli --app-names tools --non-interactive --no-example-command --no-example-service`
2. `scaffold cli add-command add-user --description "Add a new user"`
3. `scaffold cli add-command list-items --description "List all items"`
4. `scaffold cli add-service user-service`

#### Validations

- [x] Path: `apps/cli-tools`
- [x] Path: `apps/cli-tools/src/commands/add-user.ts`
- [x] Path: `apps/cli-tools/src/commands/list-items.ts`
- [x] Path: `apps/cli-tools/src/services/user-service.ts`
- [x] Path: `apps/cli-tools/src/commands/index.ts`
- [x] Script: `build`
- [x] Build succeeds (Turbo)
- [x] Lint succeeds (Turbo)
- [x] CLI help shows commands: `add-user`, `list-items`

#### Implementation Notes

- Scenario file: `packages/app-cli/src/e2e/scenarios/cli-expansion.ts`
- Uses `--no-example-command` and `--no-example-service` for a minimal base before expansion

---

## Non-Interactive Support Summary

All scaffold commands and app types support non-interactive mode:

| Command     | Non-interactive flag | Required args                                                |
| ----------- | -------------------- | ------------------------------------------------------------ |
| `init`      | `--non-interactive`  | name, optional: `--packages`, `--domain`, etc.               |
| `project`   | `--non-interactive`  | name, `--apps`, `--app-names`                                |
| `app`       | `--non-interactive`  | name, `--type`                                               |
| `create`    | `--non-interactive`  | name (others inferred)                                       |
| `service`   | (no prompts)         | name                                                         |
| `module`    | (no prompts)         | name                                                         |
| `ui`        | (no prompts)         | name                                                         |
| `component` | (no prompts)         | name, `--package`                                            |
| `package`   | (no prompts)         | name, `--type`                                               |
| `cli`       | (no prompts)         | `add-command`/`add-service` + name, `--app`, `--description` |

| App type                 | `argsForNonInteractive` support                 |
| ------------------------ | ----------------------------------------------- |
| frontend-vite            | Yes — `--template react-ts`                     |
| frontend-nextjs          | Yes — full flags                                |
| frontend-tanstack        | Yes — no `--interactive`                        |
| slide-deck               | Yes — `--template vanilla-ts`                   |
| documentation            | Yes — `--template starlight --install --no-git` |
| backend, cli, mcp-server | Inherently non-interactive (stub-based)         |

---

## Implementation Checklist

When implementing a scenario:

1. Copy the scenario section from this file
2. Create `scenarios/NN-<scenario-id>.ts` (two-digit prefix: 01, 02, …) following the [Adding a Scenario](../README.md#adding-a-scenario) guide
3. Register in `services/scenario-registry.ts`
4. Update the scenario Status to Implemented above
