# Validation

## Pre-Expansion

- Project root exists (`package.json`)
- Target app/package exists
- Registry file exists before patching

## Post-Expansion Validators

| Validator | Purpose |
|-----------|---------|
| `pathExists(path)` | Target file/dir exists |
| `fileContains(path, s)` | Registry contains expected import |
| `hasScript(name)` | package.json has build/lint scripts |
| `buildSucceeds()` | `bun run build` exits 0 |
| `lintSucceeds()` | `bun run lint` exits 0 |
| `cliHelpShowsCommands(appDir, commands)` | CLI `--help` lists added commands |

## When to Run

- E2E scenarios: run validators after all expansion steps
- Optional: `--validate` flag on expansion commands

## Underlying Technology

Validators use **fs/promises** (`access`, `readFile`), **child_process** (`execSync` for build/lint), `pathExists`, `fileContains` (string search). No AST; string-based checks. CLI help parsing via `spawnSync` + stdout capture.

## Best Practices & Engineering Patterns

**Pre/post validation** pattern from generators (Yeoman, Plop). **Layered checks:** path exists → content contains → build succeeds. **E2E validators** for integration tests. Reference Vitest, Jest for test structure.

## Effect Library Usage

`Effect.try` for each validator (file I/O, process exec). `Effect.gen` for sequential validation. `Effect.all` for parallel validators. Effect's `Either` for pass/fail with typed errors. Layer could compose validators as services.

## Implementation Considerations

**Edge cases:** Build fails for unrelated reasons, flaky lint. **Idempotency:** Validators are read-only. **Multi-app:** Run validators per target app. **CI:** Validators should be deterministic; avoid time-dependent checks.

## Alternative Technology Considerations

**ts-morph:** Type-check file content; heavier. **String search:** Lightweight for `fileContains`. **Exec vs spawn:** `execSync` for build/lint; consider timeout. **Snapshot testing:** Overkill for expansion; validators are sufficient.
