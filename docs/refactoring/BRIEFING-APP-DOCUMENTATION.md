# Sub-Agent Briefing: Extract `@workspace/app-documentation`

## Task

Extract the documentation (Starlight/Astro) app type into a new package `packages/app-documentation`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md`. This app type uses a **scripts phase** (no stubs).

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/documentation/index.ts`

- **Phase type:** `scripts`
- Uses `bun create astro@latest` with starlight template
- App dir prefix: `docs` (from `APP_TYPE_PREFIX['documentation']`)

**Script steps:**
1. `bun create astro@latest {{appDir}}` (interactive)
2. `argsForNonInteractive`: `['astro@latest', '{{appDir}}', '--template', 'starlight', '--install', '--no-git']`

---

## Target Package Structure

```
packages/app-documentation/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts        # createDocumentationAppType factory
    ├── config.ts       # Script steps
    └── e2e/
        └── scenarios/
            ├── index.ts
            └── documentation.ts
```

---

## Implementation Checklist

1. **Create package**
2. **Create config.ts** — `getScriptSteps(ctx)` with create astro starlight
3. **Create index.ts** — `createDocumentationAppType()` → `{ documentation }`
4. **Create E2E scenarios** — move `11-documentation-app.ts`
   - App dir: `docs-docs` when app name is "docs" (dirName = `docs-docs`)
   - Validators: path checks, build, lint as appropriate
5. **Update registry** — use factory
6. **Update scenario registry** — add loader, remove 11-documentation-app from CORE
7. **Delete** `apps/cli-scaffold/src/app-types/documentation/`

---

## Scenario Scope

**documentation-app**: Project with Starlight/Astro docs app.
- Steps: `project e2e-docs --apps documentation --app-names docs --non-interactive`
- Validators: path checks, build, lint

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=documentation-app bun test apps/cli-scaffold/e2e/`
