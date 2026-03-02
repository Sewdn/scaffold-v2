# svc-auth: add-role

## Command

```
scaffold svc-auth add-role <name>
```

## Description

Add a role definition with permissions.

## Injection Target

- **Artifact:** `src/roles/<name>.ts`
- **Registry:** `src/roles/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Role: named permission set (admin, editor, viewer). Stored in domain or config. Used by guards for RBAC. Can map to WorkOS/Clerk roles or custom DB table.

## Best Practices & Engineering Patterns

Define roles explicitly; avoid stringly-typed checks. Role hierarchy optional (admin implies editor). Permissions as array or set. Assign in session or lookup by user id.

## Effect Library Usage

Role check returns `Effect<void, Forbidden>`. Use `Effect.fail` when user lacks role. Role definitions can be const; lookup via Effect service if from DB.

## Implementation Considerations

Stub variables: `{{RoleName}}`, `{{permissions}}`. File: `src/roles/<name>.ts`. Export role enum or const. Guard imports role; no circular deps with domain.

## Alternative Technology Considerations

WorkOS/Clerk: managed roles. CASL: ability-based. Custom: simple RBAC. Domain package can hold role types; svc-auth holds implementation and guards.
