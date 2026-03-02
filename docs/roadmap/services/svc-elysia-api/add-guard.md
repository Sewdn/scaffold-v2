# svc-elysia-api: add-guard

## Command

```
scaffold svc-elysia-api add-guard <name>
```

## Description

Add a guard (auth, validation, etc.).

## Injection Target

- **Artifact:** `src/guards/<name>.ts`
- **Registry:** `src/guards/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Elysia guard: `onBeforeHandle` that checks condition (auth, validation). Return or throw to short-circuit. Use with `.guard()`.

## Best Practices & Engineering Patterns

Guards for auth (JWT, session), rate limit, validation. Fail fast; return 401/403. Reuse guards across routes.

## Effect Library Usage

`Effect.tryPromise` for async guard (e.g. verify JWT). Elysia integrates async. Typed errors for guard failures.

## Implementation Considerations

Stub: `{{guardName}}`, `{{checkType}}`. Registry: `src/guards/index.ts`. Depends: svc-auth, svc-workos.

## Alternative Technology Considerations

Hono: similar. Elysia: type-safe guard context. Same auth/validation pattern.
