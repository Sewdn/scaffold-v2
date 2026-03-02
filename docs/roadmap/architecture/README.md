# Architectural Patterns for Expansion

All expansion commands must adhere to these patterns to ensure **deterministic, AI-agent-friendly** expansion.

## Documents in this section

- [registry-pattern.md](registry-pattern.md) — Registry over entry, insert markers
- [stub-location.md](stub-location.md) — Stub paths, expansion/ directory
- [naming-conventions.md](naming-conventions.md) — kebab-case, PascalCase, camelCase
- [dependency-injection.md](dependency-injection.md) — Factory, context patterns
- [co-generation.md](co-generation.md) — Expansion dependencies
- [validation.md](validation.md) — Pre/post expansion validators
- [multi-app-support.md](multi-app-support.md) — --app flag, multi-app resolution
- [implementation-checklist.md](implementation-checklist.md) — Checklist per expansion

## Underlying Technology

Expansion relies on **Mustache** (`renderTemplate`) for stub rendering, **fs/promises** for file I/O, and **Commander** for CLI structure. Registry patching uses string search + slice (no regex). Stubs live under `app-types/<id>/stubs/expansion/`.

## Best Practices & Engineering Patterns

Follow the **plugin/registry pattern** (e.g. Babel plugins, ESLint rules): main entry stays static; registries grow via insert markers. Use **factory/context patterns** for DI. Reference TanStack Create add-on philosophy for modular, composable expansion.

## Effect Library Usage

Effect could wrap multi-step expansion: `Effect.gen` for orchestration, `Effect.try` for file I/O, `Layer` for composing expansion steps. Current sync/async Node APIs could be wrapped for typed error handling and composability.

## Implementation Considerations

Edge cases: idempotency (skip if import/registration exists), multi-app resolution (require `--app` when ambiguous), AST vs string-based patching trade-offs. Prefer string search + slice over regex for stability.

## Alternative Technology Considerations

**Templates:** EJS vs Mustache — Mustache is logic-less and safer for AI-generated content; EJS allows arbitrary JS. **Patching:** codemods (jscodeshift) vs string replace — string replace is simpler and deterministic; AST-based (ts-morph) offers structure but adds complexity.
