# Worker: add-task

## Command

```
scaffold worker add-task <name>
```

## Description

Add a one-off task handler.

## Injection Target

- **Artifact:** `src/tasks/<name>.ts`

## Status

Proposed

---

## Underlying Technology

**Bun workers** — One-off task handler; invoked manually or by orchestrator. No queue; fire-and-forget or awaited.

## Best Practices & Engineering Patterns

- **Single responsibility:** One task = one purpose; compose via orchestrator if needed.
- **CLI-invokable:** Tasks often run from CLI or script; support `bun run task:name`.
- **Idempotency:** Design for re-runs; use deterministic behavior where possible.

## Effect Library Usage

- **Handler:** Implement as `Effect<void, TaskError>`; run with `Effect.runPromise` at entry.
- **Context:** Inject dependencies via `Context`; provide via `Layer` at CLI/script level.
- **Errors:** `Effect.fail` with clear message; exit code mapping for CLI.

## Implementation Considerations

- **Registry patch:** Register task in task registry for CLI discovery; use marker comment.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{description}}`.
- **Idempotency:** Skip if `src/tasks/<name>.ts` exists; merge into registry.

## Alternative Technology Considerations

- **Turborepo tasks:** Monorepo task runner; different from background worker tasks.
- **One-off vs recurring:** Task = one-off; cron = recurring; scaffold distinguishes both.
