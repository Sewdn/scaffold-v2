# svc-search: add-search-route

## Command

```
scaffold svc-search add-search-route <name>
```

## Description

Add a search API route.

## Injection Target

- **Artifact:** `src/routes/<name>.ts`
- **Registry:** Routes registry

## Status

Proposed

## Underlying Technology

Elysia route + Elasticsearch Query DSL. Search API (multi_match, bool, filters). Pagination (from/size or search_after).

## Best Practices & Engineering Patterns

Validate query params with Zod. Use filters for exact match; query for scoring. Limit result size; support cursor pagination.

## Effect Library Usage

`Effect.tryPromise` for search. Inject `SearchService` via Context. Typed errors for query/validation failures.

## Implementation Considerations

Stub: `{{routeName}}`, `{{indexName}}`. Registry: routes. Env: `ELASTICSEARCH_URL`.

## Alternative Technology Considerations

Meilisearch: simpler query API. ES: full Query DSL. Route logic is provider-agnostic with adapter.
