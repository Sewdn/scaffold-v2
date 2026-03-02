# Domain: add-value-object

## Command

```
scaffold domain add-value-object <name>
```

## Description

Add an immutable value object for domain modeling.

## Injection Target

- **Artifact:** `src/value-objects/<name>.ts`
- **Registry:** `src/value-objects/index.ts` (optional)

## Status

Planned

## Underlying Technology

DDD value object: immutable, no identity, defined by attributes. TypeScript type or `readonly` interface. Used inside entities or as standalone domain concepts (Money, Address, etc.).

## Best Practices & Engineering Patterns

Immutability: return new instances on "changes". Equality by value. Keep small and focused. Use for validation-heavy concepts (email, phone, coordinates).

## Effect Library Usage

Value object construction can return `Effect.succeed(vo)` or `Effect.fail(InvalidValueObject)`. Use in Effect.gen for validated creation. No Context needed for pure VOs.

## Implementation Considerations

Stub variables: `{{ValueObjectName}}`, `{{fields}}`. File: `src/value-objects/<name>.ts`. Barrel export. Consider `brand` or branded types for nominal typing.

## Alternative Technology Considerations

Zod for parsing/validation. Effect Schema for composable validation. io-ts for runtime types. Value objects stay pure; validation can be Effect-based.
