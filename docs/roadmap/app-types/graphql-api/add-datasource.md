# GraphQL API: add-datasource

## Command

```
scaffold graphql-api add-datasource <name>
```

## Description

Add a data source for resolvers.

## Injection Target

- **Artifact:** `src/datasources/<name>.ts`

## Status

Proposed

---

## Underlying Technology

**Pothos/Yoga** data layer. Data sources abstract backend services (e.g. Prisma, REST APIs); resolvers consume them via Context or DI.

## Best Practices & Engineering Patterns

- **Single responsibility:** One data source per domain/entity; avoid coupling multiple backends.
- **Batching:** Use DataLoader pattern for list/relation lookups; implement `batchLoad` for N+1 prevention.
- **Caching:** Consider TTL or request-scoped cache for read-heavy sources.

## Effect Library Usage

- **Context:** Inject data sources via Effect `Context`; resolvers receive `DataSource` in context.
- **Async:** Use `Effect.gen` for async fetches; `Effect.catchAll` for error mapping.
- **Services:** Wrap Prisma, HTTP clients in Effect services; compose in resolver pipeline.

## Implementation Considerations

- **Registry:** Register in `src/datasources/index.ts` or via Context provider.
- **Stubs:** `{{name}}`, `{{Name}}`; export `createXxxDataSource()` or `XxxDataSource` service.
- **Naming:** `svc-*` or `datasource-*` prefix; `UserDataSource`, `createUserDataSource`.

## Alternative Technology Considerations

- **Inline in resolvers:** Fine for trivial cases; separate data sources for reuse and testability.
- **GraphQL.js DataLoader:** Same pattern; Pothos integrates with DataLoader from context.
