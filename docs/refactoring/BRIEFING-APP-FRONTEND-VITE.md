# Sub-Agent Briefing: Extract `@workspace/app-frontend-vite`

## Task

Extract the frontend-vite app type into a new package `packages/app-frontend-vite`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md`. This app type uses a **scripts phase** (no stubs).

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/frontend-vite/index.ts`

- Single file exporting `frontendVite: AppTypeConfig`
- **Phase type:** `scripts`
- Uses `bunx create-vite@latest` with `react-ts` template, then `bun add react react-dom effect`
- `isReactFrontend: true`

**Script steps:**
1. `bunx create-vite@latest {{appDir}} --template react-ts` (argsForNonInteractive same)
2. `bun add react react-dom effect` in `{{appDir}}`

---

## Target Package Structure

```
packages/app-frontend-vite/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts        # createFrontendViteAppType factory
    ├── config.ts       # Script steps
    └── e2e/
        └── scenarios/
            ├── index.ts
            └── frontend-vite.ts
```

---

## Implementation Checklist

1. **Create package** — same pattern as app-frontend-nextjs
2. **Create config.ts** — `getScriptSteps(ctx)` with create-vite and add steps
3. **Create index.ts** — `createFrontendViteAppType()` → `{ frontendVite }`
4. **Create E2E scenarios** — move `15-frontend-vite.ts`, use validators: pathExists, buildSucceeds, lintSucceeds, devStarts(5000)
5. **Update registry** — use factory, add dependency
6. **Update scenario registry** — add loader, remove from CORE
7. **Delete** `apps/cli-scaffold/src/app-types/frontend-vite/`

---

## Scenario Scope

**frontend-vite**: Project with Vite + React frontend.
- Steps: `project e2e-vite --apps frontend-vite --app-names web --non-interactive`
- Validators: path checks, build, lint, devStarts(5000)

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=frontend-vite bun test apps/cli-scaffold/e2e/`
- Ensure `isReactFrontend: true` is preserved
