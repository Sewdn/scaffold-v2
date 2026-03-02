# Sub-Agent Briefing: Extract `@workspace/app-backend`

## Task

Extract the backend app type into a new package `packages/app-backend`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md` and using `@workspace/app-cli` as the reference implementation.

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/backend/`

- `index.ts` — exports `backend: AppTypeConfig` using `createGeneratePhase`
- `stubs/src/index.ts.stub` — Elysia server with CORS, Swagger, health route

**Dependencies:** `DEP_ELYSIA`, `DEP_ELYSIA_SWAGGER`, `DEP_ELYSIA_CORS`, `DEP_EFFECT` (from `../packages/dependencies.js`)

**Config:** Generate phase with:
- `stubsDir`: `join(__dirname, 'stubs')`
- `getMerge`: scripts `{ start: 'bun run src/index.ts' }`
- `getDependencies`: `[DEP_ELYSIA, DEP_ELYSIA_SWAGGER, DEP_ELYSIA_CORS, DEP_EFFECT]`
- No custom `getMkdirPaths` (defaults to `['src']`)

---

## Target Package Structure

```
packages/app-backend/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts        # createBackendAppType factory
│   ├── config.ts       # BACKEND_APP_* constants, getPackageMerge
│   └── e2e/
│       └── scenarios/
│           ├── index.ts
│           └── backend-only.ts
└── stubs/
    └── src/
        └── index.ts.stub
```

---

## Implementation Checklist

1. **Create package**
   - `packages/app-backend/package.json` with `@workspace/app-backend`, exports `"."` and `"./e2e/scenarios"`
   - Dependencies: `@workspace/core-utils`; dev: `@workspace/core-e2e`, `@workspace/typescript-config`, `typescript`
   - Add to root `workspaces` in monorepo

2. **Create `src/config.ts`**
   - `BACKEND_APP_SCRIPTS`: `{ start: 'bun run src/index.ts' }`
   - `BACKEND_APP_MKDIR_PATHS`: `['src']`
   - `getPackageMerge(ctx)`: return `{ scripts: { ...BACKEND_APP_SCRIPTS } }`

3. **Create `src/index.ts`**
   - `CreateBackendAppTypeOptions` interface (like `CreateCliAppTypeOptions` but no expansion/defaults)
   - `createBackendAppType(opts)` → returns `{ backend }` where `backend` is `AppTypeConfig`
   - Use `opts.createGeneratePhase` with `stubsDir`, `getMerge`, `getDependencies`, `getMkdirPaths`
   - `getDependencies` returns `[...opts.deps]` (deps passed from registry)

4. **Copy stubs**
   - Move `apps/cli-scaffold/src/app-types/backend/stubs/` → `packages/app-backend/stubs/`
   - Ensure `{{{appName}}}` (triple mustache) is used for unescaped output in stubs

5. **Create E2E scenarios**
   - Move `apps/cli-scaffold/e2e/scenarios/02-backend-only.ts` → `packages/app-backend/src/e2e/scenarios/backend-only.ts`
   - Update imports: use `@workspace/core-e2e` for types and validators
   - Export from `packages/app-backend/src/e2e/scenarios/index.ts` as `scenarios`
   - Scenario must validate only backend scaffolding (pathExists, hasScript, buildSucceeds)

6. **Update registry**
   - In `apps/cli-scaffold/src/app-types/registry.ts`:
     - Import `createBackendAppType` from `@workspace/app-backend`
     - Replace inline `backend` with:  
       `const { backend } = createBackendAppType({ createGeneratePhase, deps: [DEP_ELYSIA, ...] });`
   - Add `@workspace/app-backend` to `apps/cli-scaffold` dependencies

7. **Update scenario registry**
   - Add `() => import('@workspace/app-backend/e2e/scenarios')` to `APP_TYPE_SCENARIO_LOADERS`
   - Remove `02-backend-only` from `CORE_SCENARIO_LOADERS`

8. **Delete old backend app-type**
   - Remove `apps/cli-scaffold/src/app-types/backend/` (entire directory)

---

## Scenario Scope

**backend-only**: Project with backend app only.
- Steps: `project e2e-backend --apps backend --app-names api --non-interactive`
- Validators: `pathExists('apps/backend-api')`, `hasScript('build')`, `buildSucceeds()`
- Do NOT include backend+mcp combined scenario (09) — that stays in core or is split later

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=backend-only bun test apps/cli-scaffold/e2e/`
- Run `bun run build` from monorepo root
- Ensure no references to `../app-types/backend` remain in cli-scaffold
