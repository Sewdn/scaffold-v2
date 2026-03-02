# GraphQL API: add-resolver

## Command

```
scaffold graphql-api add-resolver <name>
```

## Description

Add a resolver (query or mutation).

## Injection Target

- **Artifact:** `src/resolvers/<name>.ts`
- **Registry:** Resolver registration

## Status

Proposed

---

## Underlying Technology

**Pothos/Yoga** resolvers. Resolvers implement Query/Mutation/Subscription fields; receive data via Context or data sources.

## Best Practices & Engineering Patterns

- **Thin resolvers:** Delegate to services or data sources; keep resolver logic minimal.
- **Procedure patterns:** Group by operation (query vs mutation); use consistent naming (e.g. `userById`, `createUser`).
- **N+1 prevention:** Use DataLoader; batch in data source layer.

## Effect Library Usage

- **Resolvers:** Wrap logic in `Effect.gen`; `Effect.runPromise` at gateway; `Context` for services.
- **Async handlers:** Use `Effect` for all async work; typed errors via `Effect.fail`.
- **Context:** Inject `UserService`, `DataSource` via Effect `Context`; resolvers receive in args.

## Implementation Considerations

- **Registry:** Register in `src/resolvers/index.ts`; extend `builder.queryType()` / `builder.mutationType()`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{fieldName}}`; export `xxxResolver` or `resolveXxx`.
- **Naming:** `userById`, `createUser`; file `resolvers/user.ts`.

## Alternative Technology Considerations

- **GraphQL.js resolvers:** Manual `resolvers` map; Pothos preferred for type safety and DX.
- **Apollo Server:** Similar resolver pattern; Yoga aligns with Bun/Elysia.
