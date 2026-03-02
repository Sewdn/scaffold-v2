# Sub-Agent Briefing: Extract `@workspace/app-mcp-server`

## Task

Extract the MCP server app type into a new package `packages/app-mcp-server`, following the conventions in `docs/refactoring/MASTER-BRIEFING.md` and using `@workspace/app-cli` as the reference implementation.

---

## Current Implementation (Source of Truth)

**Location:** `apps/cli-scaffold/src/app-types/mcp-server/`

- `index.ts` — exports `mcpServer: AppTypeConfig` using `createGeneratePhase`
- `stubs/src/index.ts.stub` — MCP server with example tool, stdio transport

**Dependencies:** `DEP_EFFECT`, `DEP_MCP_SDK` (from `../packages/dependencies.js`)

**Config:** Generate phase with:
- `stubsDir`: `join(__dirname, 'stubs')`
- `getMerge`: scripts `{ build: 'tsc -b' }`
- `getDependencies`: `[DEP_MCP_SDK, DEP_EFFECT]`
- `getMkdirPaths`: `['src', 'src/tools']`

---

## Target Package Structure

```
packages/app-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts        # createMcpServerAppType factory
│   ├── config.ts       # MCP_APP_* constants, getPackageMerge
│   └── e2e/
│       └── scenarios/
│           ├── index.ts
│           └── mcp-server-only.ts
└── stubs/
    └── src/
        └── index.ts.stub
```

---

## Implementation Checklist

1. **Create package**
   - `packages/app-mcp-server/package.json` with `@workspace/app-mcp-server`
   - Exports: `"."`, `"./e2e/scenarios"`
   - Dependencies: `@workspace/core-utils`; dev: `@workspace/core-e2e`, `@workspace/typescript-config`, `typescript`

2. **Create `src/config.ts`**
   - `MCP_APP_SCRIPTS`: `{ build: 'tsc -b' }`
   - `MCP_APP_MKDIR_PATHS`: `['src', 'src/tools']`
   - `getPackageMerge(ctx)`: return `{ scripts: { ...MCP_APP_SCRIPTS } }`

3. **Create `src/index.ts`**
   - `CreateMcpServerAppTypeOptions` interface
   - `createMcpServerAppType(opts)` → returns `{ mcpServer }`
   - Phase uses `getMkdirPaths: () => [...MCP_APP_MKDIR_PATHS]`

4. **Copy stubs**
   - Move `apps/cli-scaffold/src/app-types/mcp-server/stubs/` → `packages/app-mcp-server/stubs/`
   - Stub uses `{{{appName}}}` for unescaped output

5. **Create E2E scenarios**
   - Create `mcp-server-only.ts`: project with MCP server app only
   - Steps: `project e2e-mcp --apps mcp-server --app-names mcp --non-interactive`
   - Validators: `pathExists('apps/mcp-mcp')`, `pathExists('apps/mcp-mcp/package.json')`, `hasScript('build')`, `buildSucceeds()`
   - Export from `src/e2e/scenarios/index.ts`
   - Note: `09-backend-plus-mcp` combines backend + mcp; keep that in core for now, or create a minimal mcp-only scenario here

6. **Update registry**
   - Import `createMcpServerAppType` from `@workspace/app-mcp-server`
   - Replace inline `mcpServer` with factory call
   - Add `@workspace/app-mcp-server` to cli-scaffold dependencies

7. **Update scenario registry**
   - Add `() => import('@workspace/app-mcp-server/e2e/scenarios')` to `APP_TYPE_SCENARIO_LOADERS`

8. **Delete old mcp-server app-type**
   - Remove `apps/cli-scaffold/src/app-types/mcp-server/` (entire directory)

---

## Scenario Scope

**mcp-server-only**: Project with MCP server app only.
- Steps: `project e2e-mcp --apps mcp-server --app-names mcp --non-interactive`
- Validators: path checks, build, lint as appropriate
- Self-contained; no backend or other app types

---

## Validation

- Run `SCAFFOLD_E2E_SCENARIO=mcp-server-only bun test apps/cli-scaffold/e2e/`
- Run `bun run build`
- Ensure no references to `../app-types/mcp-server` remain
