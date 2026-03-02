# Sub-Agent Briefing: Extract `@workspace/app-frontend-tanstack`

## Task

Extract the frontend-tanstack (TanStack Start) app type into a new package `packages/app-frontend-tanstack`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md`. This app type uses a **scripts phase** with `@tanstack/cli` and a patch step.

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/frontend-tanstack/index.ts`

- **Phase type:** `scripts`
- Uses `@tanstack/cli create` and an `exec` step for `patchScriptPath`
- `isReactFrontend: true`

**Script steps:**
1. `mkdir -p {{appDir}}`
2. `bunx @tanstack/cli create {{appName}} --target-dir {{appDir}} --no-git` (interactive) / `--no-git` only for non-interactive
3. `exec`: `node {{patchScriptPath}} @{{projectName}}/{{appName}}` with cwd `{{appDir}}`

Context must include: `patchScriptPath`, `projectName`, `appName`, `appDir`.

---

## Target Package Structure

```
packages/app-frontend-tanstack/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts        # createFrontendTanstackAppType factory
    ├── config.ts       # Script steps (needs patchScriptPath from context)
    └── e2e/
        └── scenarios/
            ├── index.ts
            └── frontend-tanstack.ts
```

---

## Implementation Checklist

1. **Create package**
2. **Create config.ts** — `getScriptSteps(ctx)` where ctx includes `patchScriptPath`, `projectName`, `appName`, `appDir` (supplied by project/app commands)
3. **Create index.ts** — factory returns `{ frontendTanstack }` with scripts phase
4. **Create E2E scenarios** — move `17-frontend-tanstack.ts`
5. **Update registry** — use factory
6. **Update scenario registry** — add loader, remove from CORE
7. **Delete** `apps/cli-scaffold/src/app-types/frontend-tanstack/`

---

## Important: Context and Patch Script

The `patchScriptPath` points to `apps/cli-scaffold/scripts/patch-package-json.mjs`. This is provided by the **orchestrator** when running steps — the app-type package does not own this script. The context (`AppTypeContext`) is built by project.ts and app.ts and includes `patchScriptPath`. The factory's `getSteps` receives this context.

Ensure `getSteps(ctx)` uses `ctx.patchScriptPath`, `ctx.projectName`, `ctx.appName`, `ctx.appDir` for template substitution in the step definitions.

---

## Scenario Scope

**frontend-tanstack**: Project with TanStack Start app.
- Steps: `project e2e-ts --apps frontend-tanstack --app-names web --non-interactive`
- Validators: path checks, build, lint, devStarts as appropriate

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=frontend-tanstack bun test apps/cli-scaffold/e2e/`
- Ensure patch step works (package name gets patched in generated project)
