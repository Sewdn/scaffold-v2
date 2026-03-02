# GraphQL API App Type

**Description:** GraphQL API (Pothos, Yoga, or GraphQL.js).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-type](add-type.md) | Add a GraphQL type | `src/schema/types/<name>.ts` |
| [add-resolver](add-resolver.md) | Add a resolver (query/mutation) | `src/resolvers/<name>.ts` |
| [add-schema](add-schema.md) | Add a schema module | `src/schema/<name>.ts` |
| [add-datasource](add-datasource.md) | Add a data source | `src/datasources/<name>.ts` |

## Underlying Technology

**Pothos** (schema builder) + **GraphQL Yoga** (server) or GraphQL.js. Pothos provides type-safe, code-first schema construction; Yoga integrates with Bun/Elysia and handles subscriptions, file uploads, and persisted operations.

## Best Practices & Engineering Patterns

- **Code-first vs schema-first:** Pothos is code-first; define types in TypeScript; schema is generated. Use SDL for external tooling when needed.
- **Resolver organization:** Group resolvers by domain; use DataLoader for N+1 prevention; batch data sources.
- **Schema composition:** Modular schema via `mergeType` or `extendType`; build schema from `src/schema/` modules.

## Effect Library Usage

- **Resolvers:** Wrap resolver logic in `Effect`; use `Effect.runPromise` at gateway; `Context` for data sources and services.
- **Data sources:** Inject via Effect `Context`; use `Effect.gen` for async data fetching with typed errors.
- **Errors:** `Effect.fail` with `GraphQLError` or custom codes; map to HTTP status in Yoga layer.

## Implementation Considerations

- **Registry:** Schema composition in `src/schema/index.ts`; resolver registration in `src/resolvers/index.ts`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{typeName}}` for Pothos builder; `{{schemaName}}` for schema modules.
- **Naming:** PascalCase for types; camelCase for fields; kebab-case for file names.

## Alternative Technology Considerations

- **GraphQL.js:** Lower-level; schema-first SDL; more manual resolver wiring. Pothos preferred for type safety and DX.
- **Apollo Server:** Mature alternative; Yoga aligns better with Bun/Elysia and modern stack.
