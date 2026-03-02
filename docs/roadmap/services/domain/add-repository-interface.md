# Domain: add-repository-interface

## Command

```
scaffold domain add-repository-interface <name>
```

## Description

Add a repository interface for an entity (persistence abstraction).

## Injection Target

- **Artifact:** `src/repositories/<name>-repository.ts`
- **Registry:** `src/repositories/index.ts` (optional)

## Status

Planned

## Underlying Technology

Repository pattern: abstraction over persistence. Interface in domain; implementation in svc-prisma. Methods: `findById`, `save`, `delete`, etc. Returns domain entities, not Prisma models.

## Best Practices & Engineering Patterns

One repository per aggregate root. Interface defines contract; implementation handles mapping (Prisma model ↔ entity). Use `Option` or `Effect.fail(NotFound)` for missing entities.

## Effect Library Usage

Repository methods return `Effect<Entity, NotFound | DbError>`. Provide implementation via Context/Layer. Use `Effect.gen` in implementation for multi-step queries. Inject PrismaClient in impl.

## Implementation Considerations

Stub variables: `{{EntityName}}`, `{{RepositoryName}}`, `{{methods}}`. File: `src/repositories/<name>-repository.ts`. Domain defines interface; svc-prisma implements.

## Alternative Technology Considerations

Generic repository vs. specific per entity. Drizzle/TypeORM repositories: same pattern, different ORM. Effect Context replaces manual DI for repository injection.
