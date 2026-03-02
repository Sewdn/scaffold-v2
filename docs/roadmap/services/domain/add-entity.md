# Domain: add-entity

## Command

```
scaffold domain add-entity <name>
```

## Description

Add a domain entity (aggregate root) with identity and business logic.

## Injection Target

- **Artifact:** `src/entities/<name>.ts`
- **Registry:** `src/entities/index.ts` (optional)

## Status

Planned

## Underlying Technology

DDD entity: has identity (id), mutable state, encapsulates business rules. TypeScript interface or class. Referenced by repositories; maps to Prisma models in persistence layer.

## Best Practices & Engineering Patterns

One entity per aggregate root when possible. Encapsulate invariants; expose behavior methods. Use value objects for complex attributes. Avoid anemic entities.

## Effect Library Usage

Entity creation/validation can return `Effect.succeed(entity)` or `Effect.fail(InvalidEntity)`. Repository methods return `Effect<Entity, NotFound>`. Use Effect.gen for entity lifecycle logic.

## Implementation Considerations

Stub variables: `{{EntityName}}`, `{{idField}}`, `{{fields}}`. File: `src/entities/<name>.ts`. Register in `entities/index.ts`. No Prisma imports.

## Alternative Technology Considerations

Class-based entities vs. interface + factory. Zod for runtime validation of entity shape. Effect Schema for encoding/decoding with validation.
