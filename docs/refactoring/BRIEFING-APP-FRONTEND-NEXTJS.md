# Sub-Agent Briefing: Extract `@workspace/app-frontend-nextjs`

## Task

Extract the frontend-nextjs app type into a new package `packages/app-frontend-nextjs`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md`. This app type uses a **scripts phase** (no stubs).

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/frontend-nextjs/index.ts`

- Single file exporting `frontendNextjs: AppTypeConfig`
- **Phase type:** `scripts` (not `generate`)
- Uses `bun create next-app@latest` and `bun add effect`
- `isReactFrontend: true`

**Script steps:**
1. `bun create next-app@latest {{appDir}} --use-bun` (interactive)
2. `argsForNonInteractive`: `['next-app@latest', '{{appDir}}', '--typescript', '--tailwind', '--eslint', '--app', '--src-dir', '--no-import-alias', '--no-react-compiler']`
3. `bun add effect` in `{{appDir}}`

---

## Target Package Structure

```
packages/app-frontend-nextjs/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts        # createFrontendNextjsAppType factory
    ├── config.ts       # Script steps, constants
    └── e2e/
        └── scenarios/
            ├── index.ts
            └── frontend-nextjs.ts
```

No `stubs/` — this app type uses `bun create` only.

---

## Implementation Checklist

1. **Create package**
   - `packages/app-frontend-nextjs/package.json`
   - Exports: `"."`, `"./e2e/scenarios"`
   - Dependencies: none (or minimal); dev: `@workspace/core-e2e`, `@workspace/typescript-config`, `typescript`

2. **Create `src/config.ts`**
   - `getScriptSteps(ctx: AppTypeContext)`: return the CommandStep array (same as current inline)
   - Use template substitution: `{{appDir}}` from context

3. **Create `src/index.ts`**
   - `CreateFrontendNextjsAppTypeOptions` — may be empty or accept overrides
   - `createFrontendNextjsAppType(opts?)` → returns `{ frontendNextjs }`
   - `frontendNextjs` = `{ id: 'frontend-nextjs', description: '...', isReactFrontend: true, phases: [{ type: 'scripts', getSteps }] }`

4. **Create E2E scenarios**
   - Move logic from `apps/cli-scaffold/e2e/scenarios/16-frontend-nextjs.ts` → `packages/app-frontend-nextjs/src/e2e/scenarios/frontend-nextjs.ts`
   - Use `pathExists('apps/frontend-web')`, `buildSucceeds()`, `lintSucceeds()`, `devStarts(5000)` or `devStarts(5000, 'apps/frontend-web')` (Next.js often needs subdir for dev)
   - Export from `scenarios/index.ts`
   - Self-contained: only Next.js scaffolding

5. **Update registry**
   - Import `createFrontendNextjsAppType` from `@workspace/app-frontend-nextjs`
   - Replace `frontendNextjs` with `createFrontendNextjsAppType().frontendNextjs` (or equivalent)
   - Add `@workspace/app-frontend-nextjs` to cli-scaffold dependencies

6. **Update scenario registry**
   - Add `() => import('@workspace/app-frontend-nextjs/e2e/scenarios')` to `APP_TYPE_SCENARIO_LOADERS`
   - Remove `16-frontend-nextjs` from `CORE_SCENARIO_LOADERS`

7. **Delete old frontend-nextjs app-type**
   - Remove `apps/cli-scaffold/src/app-types/frontend-nextjs/` (entire directory)

---

## Scenario Scope

**frontend-nextjs**: Project with Next.js frontend app.
- Steps: `project e2e-nextjs --apps frontend-nextjs --app-names web --non-interactive`
- Validators: path checks, build, lint, devStarts
- Note: Next.js build can be slow; consider `timeoutMs` if needed

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=frontend-nextjs bun test apps/cli-scaffold/e2e/`
- Run `bun run build`
- Ensure `isReactFrontend` is preserved for UI package injection logic in project/app commands
