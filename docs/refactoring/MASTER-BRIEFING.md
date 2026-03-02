# App Type Package Refactoring — Master Briefing

## Goal

Extract each app type from `apps/cli-scaffold/src/app-types/` into a **self-contained package** under `packages/`, following the conventions established by `@workspace/app-cli`. Each package will:

- Own its configuration, stubs, and app-type logic
- Be independently versionable and maintainable
- Use logic from core packages (`@workspace/core-utils`, `@workspace/core-e2e`)
- Export a factory (`createXAppType`) consumed by the registry
- Include its own E2E scenarios (focused, no hybrid tests)

---

## Reference Implementation: `@workspace/app-cli`

**Location:** `packages/app-cli/`

### Package Structure

```
packages/app-cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Main export: createCliAppType, cliCommand, scaffoldCliExampleDefaults
│   ├── config.ts             # Constants, getPackageMerge, CLI_APP_* exports
│   ├── scaffold-defaults.ts   # scaffoldCliExampleDefaults (post-scaffold hooks)
│   ├── expansion/
│   │   ├── index.ts          # cliCommand (Commander subcommand)
│   │   ├── add-command.ts    # add-command expansion
│   │   └── add-service.ts    # add-service expansion
│   └── e2e/
│       └── scenarios/
│           ├── index.ts      # Exports scenarios array
│           ├── cli-basic.ts
│           └── cli-expansion.ts
└── stubs/
    ├── bin/run.js.stub
    ├── src/
    │   ├── index.ts.stub
    │   └── commands/index.ts.stub
    └── expansion/
        ├── command.ts.stub
        └── service.ts.stub
```

### package.json Conventions

- `name`: `@workspace/app-{type}` (e.g. `@workspace/app-cli`)
- `exports`:
  - `.` → `./src/index.ts`
  - `./e2e/scenarios` → `./src/e2e/scenarios/index.ts` (for scenario registry)
- `dependencies`: `@workspace/core-utils`, runtime deps for expansion (e.g. commander, effect)
- `devDependencies`: `@workspace/core-e2e`, `@workspace/typescript-config`, `typescript`

### Factory Pattern

```typescript
// packages/app-cli/src/index.ts
export interface CreateCliAppTypeOptions {
  createGeneratePhase: (input: {
    stubsDir: string;
    getMerge?: (ctx: unknown) => Record<string, unknown>;
    getDependencies: () => string[];
    getMkdirPaths?: () => string[];
  }) => GeneratePhase;
  deps: readonly string[];
}

export function createCliAppType(opts: CreateCliAppTypeOptions) {
  const phase = opts.createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as PackageMergeContext),
    getDependencies: () => [...opts.deps, ...CLI_APP_UI_DEPENDENCIES],
    getMkdirPaths: () => [...CLI_APP_MKDIR_PATHS],
  });

  const cli = {
    id: 'cli',
    description: 'Command-line interface (Effect + Commander)',
    phases: [phase],
  };

  return {
    cli,
    cliCommand,           // Only CLI has expansion commands
    scaffoldCliExampleDefaults,  // Only CLI has post-scaffold defaults
  };
}
```

The registry calls: `createCliAppType({ createGeneratePhase, deps: [DEP_COMMANDER, DEP_EFFECT] })`.

### Integration with cli-scaffold

1. **Registry** (`apps/cli-scaffold/src/app-types/registry.ts`):
   - Imports `createCliAppType` from `@workspace/app-cli`
   - Adds `cli` to `ALL_APP_TYPES`

2. **Main program** (`apps/cli-scaffold/src/index.ts`):
   - Imports `cliCommand` from `@workspace/app-cli`
   - Registers with `program.addCommand(cliCommand)`

3. **Project/App commands** (`commands/project.ts`, `commands/app.ts`):
   - Import `scaffoldCliExampleDefaults` from `@workspace/app-cli`
   - After scaffolding a CLI app, call it (unless `--no-example-command` / `--no-example-service`)

4. **Scenario registry** (`apps/cli-scaffold/e2e/services/scenario-registry.ts`):
   - Loads `@workspace/app-cli/e2e/scenarios` for CLI-specific scenarios

### Stub Conventions

- Stubs use **Mustache** via `renderTemplate` from `@workspace/core-utils`
- Context keys: `projectName`, `appName`, `appDir`, plus app-specific (e.g. `commandName`, `commandClass`)
- Use `{{{var}}}` for unescaped output in code (e.g. `{{{appName}}}`)
- Stub files end with `.stub`; output path strips `.stub`

### E2E Scenario Conventions

- Each scenario file exports `scenario: Scenario`
- `src/e2e/scenarios/index.ts` exports `scenarios: readonly Scenario[]`
- Use validators from `@workspace/core-e2e`: `pathExists`, `hasScript`, `buildSucceeds`, `lintSucceeds`, `cliHelpShowsCommands`, `devStarts`, `fileContains`
- Scenarios cover **only** features of that app type (no hybrid/cross-type)

---

## App Type Categories

| Category       | App Types                          | Phase Type | Stubs | Expansion | Defaults |
|----------------|------------------------------------|------------|-------|-----------|----------|
| **Generate**   | cli, backend, mcp-server           | generate   | Yes   | CLI only  | CLI only |
| **Scripts**    | frontend-nextjs, frontend-vite, frontend-tanstack, slide-deck, documentation | scripts | No*   | No        | No       |

*Frontend/Script types use `bun create` / `bunx` and do not have stub-based generation.

---

## Dependency Management

- App-type packages **do not** import from `apps/cli-scaffold` (to avoid circular deps)
- Dependencies (e.g. `DEP_ELYSIA`, `DEP_MCP_SDK`) are passed from the registry, which imports from `apps/cli-scaffold/src/packages/dependencies.ts`
- App packages can define their own dep constants and export them if the registry needs them (or accept deps via factory options)

---

## Registry Pattern

Each app package exports a factory. The registry imports and calls it:

```typescript
// registry.ts
const { backend } = createBackendAppType({
  createGeneratePhase: createGeneratePhase as CreateBackendAppTypeOptions['createGeneratePhase'],
  deps: [DEP_ELYSIA, DEP_ELYSIA_SWAGGER, DEP_ELYSIA_CORS, DEP_EFFECT],
});
```

The factory returns `{ backend }` (or `{ mcpServer }`, etc.) — an `AppTypeConfig` to add to `ALL_APP_TYPES`.

---

## Post-Refactoring State

1. **Remove** app-type code from `apps/cli-scaffold/src/app-types/{type}/`
2. **Add** `@workspace/app-{type}` to `apps/cli-scaffold` dependencies
3. **Update** registry to use `createXAppType` from each package
4. **Move** app-specific scenarios from `apps/cli-scaffold/e2e/scenarios/` to `packages/app-{type}/src/e2e/scenarios/`
5. **Update** `scenario-registry.ts` to load each app package's scenarios
6. **Remove** moved scenarios from core scenario loaders

---

## Testing Requirements

- Each app package's scenarios must pass: `bun test apps/cli-scaffold/e2e/` (with optional `SCAFFOLD_E2E_SCENARIO=...` filter)
- Scenarios are **self-contained**: only test that app type's scaffolding behavior
- Use `@workspace/core-e2e` for validators; do not duplicate validator logic
