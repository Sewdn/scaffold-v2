---
title: E2E Scenarios
description: End-to-end test scenarios for Scaffold CLI
---

## Running E2E tests

```bash
bun run test:e2e
```

Tests run scaffold commands in temporary directories, validate output, and clean up.

## Report visualization

Each run produces JSON reports in `apps/cli-scaffold/.e2e-reports/`:

- **run-latest.json** — overwritten on each run
- **run-{timestamp}.json** — historical runs

```bash
bun run e2e:report                     # Summary of latest run
bun run e2e:report:scenario <id>       # Detailed view for one scenario
```

## Validation strategy

Scaffolded projects are validated using Turborepo:

1. **Build** — TypeScript compilation across all packages
2. **Lint** — ESLint across all packages
3. **Dev runtime** — Brief startup check (optional per scenario)

## Scenario catalog (selected)

| ID                            | Description                          |
| ----------------------------- | ------------------------------------ |
| `minimal-project`             | Base monorepo, no apps               |
| `backend-only`                | Project with backend app             |
| `init-with-optional-packages` | Init with domain, svc-config         |
| `service-package`             | Init + add service                   |
| `ui-package`                  | Init + add UI package                |
| `module-creation`             | Init + add module                    |
| `component-in-ui-lib`         | Init with ui, ui-lib + add component |

See `apps/cli-scaffold/e2e/SCENARIOS.md` for the full catalog and implementation status.
