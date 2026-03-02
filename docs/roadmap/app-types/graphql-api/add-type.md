# GraphQL API: add-type

## Command

```
scaffold graphql-api add-type <name>
```

## Description

Add a GraphQL type definition.

## Injection Target

- **Artifact:** `src/schema/types/<name>.ts`
- **Registry:** Schema composition

## Status

Proposed

---

## Underlying Technology

**Pothos** schema builder. Types define GraphQL object/input/union types; built via `builder.objectType()`, `builder.inputObjectType()`, etc.

## Best Practices & Engineering Patterns

- **Code-first types:** Define in TypeScript; Pothos generates schema; no manual SDL.
- **Schema composition:** Use `builder.objectType()` in `src/schema/types/`; import in schema modules.
- **Relations:** Use `t.relation()` for Prisma; lazy relations for circular refs.

## Effect Library Usage

- **Field resolvers:** Use `Effect.runPromise` inside field resolver; or `Effect` if Yoga supports.
- **Context:** Pass Effect `Context` for data sources; types receive context from builder.
- **Services:** Inject via Context for resolvers that need backend calls.

## Implementation Considerations

- **Registry:** Types imported in `src/schema/index.ts` or schema modules; compose via builder.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{typeName}}`; export `XxxType` or `xxxObjectType`.
- **Naming:** PascalCase for types (`User`, `CreateUserInput`); `user.ts` for `User` type.

## Alternative Technology Considerations

- **GraphQL.js:** Define types in SDL; Pothos preferred for type safety and IDE support.
- **TypeGraphQL:** Decorator-based; Pothos is simpler and avoids decorators.
