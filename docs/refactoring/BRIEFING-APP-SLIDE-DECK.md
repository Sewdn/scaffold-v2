# Sub-Agent Briefing: Extract `@workspace/app-slide-deck`

## Task

Extract the slide-deck (Reveal.js) app type into a new package `packages/app-slide-deck`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md`. This app type uses a **scripts phase** (no stubs).

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/slide-deck/index.ts`

- **Phase type:** `scripts`
- Uses `bun create vite@latest` with `vanilla-ts` template, then `bun add reveal.js`
- App dir prefix: `slides` (from `APP_TYPE_PREFIX['slide-deck']`)

**Script steps:**
1. `bun create vite@latest {{appDir}}` (interactive)
2. `argsForNonInteractive`: `['vite@latest', '{{appDir}}', '--template', 'vanilla-ts']`
3. `bun add reveal.js` in `{{appDir}}`

---

## Target Package Structure

```
packages/app-slide-deck/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts        # createSlideDeckAppType factory
    ├── config.ts       # Script steps
    └── e2e/
        └── scenarios/
            ├── index.ts
            └── slide-deck.ts
```

---

## Implementation Checklist

1. **Create package**
2. **Create config.ts** — `getScriptSteps(ctx)` with create-vite and add reveal.js
3. **Create index.ts** — `createSlideDeckAppType()` → `{ slideDeck }`
4. **Create E2E scenarios** — move `10-slide-deck-app.ts`
   - Note: scenario expects `apps/slides-slides` when app name is "slides" (dirName = `slides-slides`)
   - Validators: pathExists('apps/slides-slides'), buildSucceeds, lintSucceeds
5. **Update registry** — use factory
6. **Update scenario registry** — add loader, remove 10-slide-deck-app from CORE
7. **Delete** `apps/cli-scaffold/src/app-types/slide-deck/`

---

## Scenario Scope

**slide-deck-app**: Project with Reveal.js slide deck app.
- Steps: `project e2e-slides --apps slide-deck --app-names slides --non-interactive`
- Validators: path checks, build, lint

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=slide-deck-app bun test apps/cli-scaffold/e2e/`
