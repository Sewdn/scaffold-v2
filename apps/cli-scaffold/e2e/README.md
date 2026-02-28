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
bun run e2e:report
# or with a specific report file
bun run e2e/report-viewer.ts .e2e-reports/run-2026-02-28T16-31-48.json
```

View detailed validation results for a single scenario:

```bash
bun run e2e:report:scenario minimal-project
# or with a specific report and --scenario flag
bun run e2e/report-viewer.ts .e2e-reports/run-latest.json -- --scenario backend-only
```

## Adding a Scenario

0. **Check [SCENARIOS.md](./SCENARIOS.md)** for the scenario spec and copy the Steps/Validations template.
1. **Create a scenario file** in `e2e/scenarios/` (e.g. `my-scenario.ts`):

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
- **Workspace base**: Scaffolded projects are created in a temp dir under `os.tmpdir()` (e.g. `/tmp` or `/var/folders/...`) and **removed after each scenario**. Set `SCAFFOLD_E2E_WORKSPACE_DIR` to use a different base (e.g. `/tmp/scaffold-e2e` or `~/tmp/scaffold-e2e`).
- **Keep on failure**: Set `SCAFFOLD_E2E_KEEP_TEMP=1` to retain temp dirs for debugging.
- **Reports**: Written to `apps/cli-scaffold/.e2e-reports/`; ignored via root `.gitignore`.

**Note:** The folders `e2e-frontend-test`, `e2e-nextjs-test`, etc. in the project root are from **manual** `scaffold project` runs (which create projects in the current directory). The automated E2E suite uses temp dirs and cleans up. To remove leftover manual test projects: `rm -rf e2e-*-test`.
