# Co-Generation

## Principle

When expansion A logically depends on B, the CLI can run B first or prompt the user.

## Options

1. **Explicit:** `scaffold backend add-route users --with-service` → runs `add-service users` first
2. **Implicit:** `add-route` checks for service; if missing, prompts or auto-runs
3. **Declarative:** Config declares `expansionDependencies: { 'add-route': ['add-service'] }`

## Implementation

- Define `expansionDependencies` in app-type config
- Before executing expansion X, run required expansions with derived args
- Idempotency: skip if dependent artifact already exists

## Underlying Technology

Co-generation uses **config-driven** `expansionDependencies` (declarative). CLI runs expansions sequentially via `fs.existsSync` or `pathExists` checks. No orchestration framework; imperative execution of expansion commands.

## Best Practices & Engineering Patterns

**Dependency graph** pattern: expansions declare dependencies; execution order derived. **Declarative config** over imperative logic. **Idempotency:** Check artifact existence before running dependent expansion. Reference npm scripts, Turborepo task dependencies.

## Effect Library Usage

`Effect.gen` for orchestration: run B, then A. `Layer` for composing expansion steps with dependencies. `Effect.try` for each expansion step. Effect's dependency graph could replace explicit `expansionDependencies` with typed Layer composition.

## Implementation Considerations

**Edge cases:** Circular deps, missing optional deps. **Idempotency:** Skip dependent expansion if artifact exists. **Multi-app:** Dependencies resolve per-app. **Prompt vs auto-run:** User preference for implicit vs explicit.

## Alternative Technology Considerations

**Turborepo-style:** Declare deps; run in topological order. **Explicit flags:** `--with-service` vs implicit check. **Declarative vs imperative:** Config-driven is easier to extend; imperative is more explicit. **AST vs string:** N/A for dependency resolution.
