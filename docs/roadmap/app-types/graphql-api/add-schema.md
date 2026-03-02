# GraphQL API: add-schema

## Command

```
scaffold graphql-api add-schema <name>
```

## Description

Add a schema module.

## Injection Target

- **Artifact:** `src/schema/<name>.ts`
- **Registry:** Schema composition

## Status

Proposed

---

## Underlying Technology

**Pothos** schema modules. Each module exports `builder` extensions or type definitions; composed in `buildSchema()` or `createSchema()`.

## Best Practices & Engineering Patterns

- **Modular schema:** One domain per file; use `extendType` for extending Query/Mutation; `mergeType` for shared types.
- **Code-first:** Define types via Pothos builder; avoid raw SDL unless integrating with external tools.
- **Schema stitching:** Import from `src/schema/` and merge; keep schema tree shallow.

## Effect Library Usage

- **Resolvers in schema:** Use `Effect.runPromise` inside resolver; or return `Effect` from resolver if Yoga supports.
- **Context:** Pass Effect `Context` for data sources; schema modules receive context from builder.
- **Errors:** `Effect.fail` with `GraphQLError`; map in resolver or at gateway.

## Implementation Considerations

- **Registry:** Schema composition in `src/schema/index.ts`; append `builder.queryType()` / `builder.mutationType()`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{schemaName}}`; export `xxxSchema` or `extendXxxType`.
- **Naming:** `user`, `product`; file `schema/user.ts` exports `UserSchema` or `extendUserSchema`.

## Alternative Technology Considerations

- **Inline in single file:** Works for small apps; modular preferred for scale.
- **SDL-first:** Use `graphql-tools` or `@graphql-tools/schema`; Pothos code-first preferred for type safety.
