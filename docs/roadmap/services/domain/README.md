# Domain Package

**Description:** Shared business logic and types.

**Status:** Planned

## Expansion Commands

| Command                                                 | Description                                 | Spec                                    |
| ------------------------------------------------------- | ------------------------------------------- | --------------------------------------- |
| [add-entity](add-entity.md)                             | Add a domain entity (aggregate root)        | `src/entities/<name>.ts`                |
| [add-value-object](add-value-object.md)                 | Add an immutable value object               | `src/value-objects/<name>.ts`           |
| [add-event](add-event.md)                               | Add a domain event type                     | `src/events/<name>.ts`                  |
| [add-repository-interface](add-repository-interface.md) | Add a repository interface for an entity    | `src/repositories/<name>-repository.ts` |
| [add-type](add-type.md)                                 | Add a shared type/interface (DTO, API type) | `src/types/<name>.ts`                   |

## Underlying Technology

Domain-Driven Design (DDD): entities, value objects, aggregates, domain events. Pure TypeScript types and interfaces. Shared across svc-_ and ui-_ packages; no runtime framework dependency.

## Best Practices & Engineering Patterns

Aggregate roots own consistency boundaries; entities have identity; value objects are immutable. Repository interfaces in domain; implementations in svc-prisma. Domain events for cross-aggregate communication.

## Effect Library Usage

Domain types flow through Effect pipelines. Use `Effect.fail` with domain error types (e.g. `InvalidEntity`, `DomainViolation`). Context/Layer for repository and service dependencies. Effect.gen for multi-step domain logic.

## Implementation Considerations

Barrel exports from `src/entities/index.ts`, `src/value-objects/index.ts`, etc. Stub variables: `{{EntityName}}`, `{{fieldNames}}`, `{{EventName}}`. Keep domain free of Prisma/DB imports.

## Alternative Technology Considerations

Alternatives: Zod schemas for runtime validation, io-ts, Branded types. Domain package stays framework-agnostic; Effect integrates via types and error channels.
