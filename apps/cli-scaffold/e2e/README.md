# E2E Tests

End-to-end tests for the scaffold CLI. Uses **Effect** for dependency injection, logging, metrics, and test orchestration.

## Scenarios

For a full list of planned and implemented scenarios with validation criteria, see [SCENARIOS.md](./SCENARIOS.md).

## Architecture

- **Effect services** (DI): `E2EConfig`, `FileSystem`, `ScaffoldRunner`, `ValidatorExecutor`, `ScenarioRegistry`
- **Layers**: `E2ELiveLayer` composes all services
- **Logging**: `Effect.log` with timestamps, levels, fiber IDs
- **Metrics**: `Metric.counter`, `Metric.timer` for scenario counts and duration (when enabled)
- **Errors**: `ScaffoldExecutionError`, `ValidationError` (tagged errors)
- **Turbo**: Validators run from project root so `bun run build` / `lint` / `dev` use Turborepo for parallel execution across packages

## Running Tests

```bash
bun test e2e/
# or from apps/cli-scaffold
bun run test:e2e
```

Each run produces structured report files in `.e2e-reports/`:

- `run-latest.json` — most recent run (overwritten each time)
- `run-{timestamp}.json` — timestamped history

## Report Visualization

View the latest E2E report in the terminal:

```bash
# From monorepo root or apps/cli-scaffold
bun run e2e:report
# or with a specific report file
bun run e2e/report-viewer.ts .e2e-reports/run-2026-02-28T16-31-48.json
```

View detailed validation results for a single scenario:

```bash
# From monorepo root or apps/cli-scaffold
bun run e2e:report:scenario minimal-project
# or with a specific report and --scenario flag
bun run e2e/report-viewer.ts .e2e-reports/run-latest.json -- --scenario backend-only
```

## Distributed App-Type Scenarios

App-types can provide their own E2E scenarios, validators, and types for self-containment and future package extraction. The scenario registry loads from:

- **Core scenarios**: `e2e/scenarios/` — shared scenarios (project, init, backend, frontend, etc.)
- **App-type scenarios**: `@workspace/app-cli/e2e/scenarios` — app-type packages export scenarios

Each app-type package exports a `scenarios` array. Example: `@workspace/app-cli` contains CLI scenarios. To add scenarios for a new app-type:

1. Create `packages/app-<type>/src/e2e/scenarios/` with scenario files
2. Export `scenarios: readonly Scenario[]` from `scenarios/index.ts`
3. Add the package export and register in `e2e/services/scenario-registry.ts`:

```ts
const APP_TYPE_SCENARIO_LOADERS = [
  () => import('@workspace/app-cli/e2e/scenarios'),
  // () => import('@workspace/app-<your-type>/e2e/scenarios'),
];
```

## Adding a Scenario

0. **Check [SCENARIOS.md](./SCENARIOS.md)** for the scenario spec and copy the Steps/Validations template.
1. **Create a scenario file** — in `e2e/scenarios/` for core scenarios, or in `packages/app-<type>/src/e2e/scenarios/` for app-type packages:

```ts
import { pathExists, hasScript, buildSucceeds } from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'my-scenario',
  description: 'Brief description of what this tests',
  steps: [
    { command: 'init', args: ['project-name', '--non-interactive'] },
    { command: 'service', args: ['auth'] },
  ],
  validators: [
    pathExists('packages/svc-auth'),
    hasScript('build'),
    buildSucceeds(),
  ],
};
```

2. **Register the scenario** in `e2e/services/scenario-registry.ts`:

```ts
const SCENARIO_LOADERS = [
  () => import('../scenarios/minimal-project.js'),
  () => import('../scenarios/my-scenario.js'),
];
```

## Built-in Validators

- `pathExists(relativePath)` — File or directory exists
- `fileContains(path, string | RegExp)` — File content check
- `hasScript(scriptName)` — Root `package.json` has script
- `buildSucceeds()` — `bun run build` (Turbo: TypeScript compilation across packages)
- `lintSucceeds()` — `bun run lint` (Turbo: ESLint across packages)
- `devStarts(timeoutMs?, subdir?)` — `bun run dev` starts without errors; brief warmup, verify no crash, then kill. Optional `subdir` runs dev from an app directory.

## Configuration

- **Scenario filter**: Set `SCAFFOLD_E2E_SCENARIO=frontend-vite` to run only scenarios whose id matches (e.g. `frontend-vite`, `backend-only`). Useful for iterating on a single scenario.
- **Workspace base**: Scaffolded projects are created in `<monorepo-root>/.e2e-workspace/` (cwd-independent). Temp dirs are **always removed after each scenario**, even when tests fail. Set `SCAFFOLD_E2E_WORKSPACE_DIR` to override (e.g. `/tmp/scaffold-e2e`).
- **Keep on failure**: Set `SCAFFOLD_E2E_KEEP_TEMP=1` to retain temp dirs for debugging.
- **Reports**: Written to `apps/cli-scaffold/.e2e-reports/`; ignored via root `.gitignore`.
