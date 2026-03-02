# svc-auth: add-guard

## Command

```
scaffold svc-auth add-guard <name>
```

## Description

Add a guard (e.g. role check, permission check).

## Injection Target

- **Artifact:** `src/guards/<name>.ts`
- **Registry:** `src/guards/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Guard: authorization check after authentication. Role-based (RBAC), permission-based, or custom. Runs in request pipeline; returns allow/deny. Integrates with Elysia middleware.

## Best Practices & Engineering Patterns

Guards run after strategy; assume valid session. Fail closed: deny if unclear. Composable guards (role AND permission). Return 403 with clear reason.

## Effect Library Usage

Guard returns `Effect<void, Forbidden>`. Use `Effect.fail(Forbidden)` when check fails. Compose guards with `Effect.gen` (all must pass). Provide via Layer for route middleware.

## Implementation Considerations

Stub variables: `{{GuardName}}`, `{{requiredRole}}`, `{{requiredPermission}}`. File: `src/guards/<name>.ts`. Elysia `derive` or `beforeHandle` for guard application.

## Alternative Technology Considerations

CASL, AccessControl for permission libs. Custom guards: simple, explicit. WorkOS/Clerk: built-in RBAC. Effect: typed error channel for guard failures.
