# svc-elysia-api: add-resource

## Command

```
scaffold svc-elysia-api add-resource <name>
```

## Description

Add CRUD routes, service, and types for an entity.

## Injection Target

- **Artifact:** `src/resources/<name>/` (route, service, types)
- **Registry:** Routes registry

## Status

Proposed

## Underlying Technology

Resource: CRUD routes (list, get, create, update, delete) + service layer + Zod types. Aligns with domain entity.

## Best Practices & Engineering Patterns

One resource per entity. Service encapsulates business logic. Routes thin; delegate to service. Pagination for list.

## Effect Library Usage

`Effect.tryPromise` in service methods. Inject repository/service via Context. Typed errors: NotFound, ValidationError. Compose with Prisma Layer.

## Implementation Considerations

Stub: `{{resourceName}}`, `{{entityName}}`, `{{fields}}`. Registry: `src/resources/`. Depends: domain, svc-prisma.

## Alternative Technology Considerations

tRPC: procedures. Elysia: REST. Same resource pattern: routes + service + types. Framework-agnostic service.
