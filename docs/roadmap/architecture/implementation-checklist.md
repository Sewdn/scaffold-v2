# Implementation Checklist

For each expansion command:

- [ ] Create registry file in base scaffold with insert marker
- [ ] Add `expansion/` stubs under `app-types/<id>/stubs/` or `packages/<id>/stubs/`
- [ ] Implement `patchXxxRegistry()` with idempotent insert
- [ ] Use `formatEntityName`, `toPascalCase`, `toCamelCase` consistently
- [ ] Add entity-specific validators
- [ ] Add E2E scenario with expansion steps + validators
- [ ] Stubs use factory/context pattern; document injection points
- [ ] (Optional) Define `expansionDependencies` for co-generation

## Underlying Technology

Checklist items map to: **Mustache** stubs, **string search + slice** for registry patching, **fs/promises** for file ops, **formatEntityName** utilities. No AST; no framework beyond Commander.

## Best Practices & Engineering Patterns

**Checklist-driven development** ensures consistency across expansions. **Registry + marker** pattern from plugin systems. **Pre/post validation** from generator tooling. Reference Yeoman, Plop, Create React App for scaffolding patterns.

## Effect Library Usage

Effect could wrap expansion steps: `Effect.gen` for orchestration, `Effect.try` for I/O. `Layer` for composing patch steps. Effect's typed errors would improve error reporting. Current sync/async flow is a candidate for Effect migration.

## Implementation Considerations

**Idempotency:** Check before insert; skip if exists. **Edge cases:** empty registry, missing marker, multi-app resolution. **AST vs string:** String-based patching is sufficient; AST (ts-morph) for complex edits. **E2E:** Run validators after each expansion step.

## Alternative Technology Considerations

**EJS vs Mustache:** Mustache for logic-less safety. **Codemods vs string replace:** String replace for simple inserts. **ts-morph:** For complex edits; adds weight. **Effect vs plain async:** Effect for typed errors and composition; plain async for simplicity.
