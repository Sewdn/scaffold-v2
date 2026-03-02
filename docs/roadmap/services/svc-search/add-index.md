# svc-search: add-index

## Command

```
scaffold svc-search add-index <name>
```

## Description

Add an index definition for full-text search.

## Injection Target

- **Artifact:** `src/indexes/<name>.ts`
- **Registry:** `src/indexes/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Elasticsearch index definition. Mappings (field types, analyzers); settings (shards, replicas). CreateIndex API.

## Best Practices & Engineering Patterns

Explicit mappings avoid dynamic mapping surprises. Use `keyword` for exact match; `text` for full-text. Version index definitions.

## Effect Library Usage

`Effect.tryPromise` for index creation. Inject `SearchService` via Context. Typed errors for mapping/settings failures.

## Implementation Considerations

Stub: `{{indexName}}`, `{{mappings}}`. Registry: `src/indexes/index.ts`. Env: `ELASTICSEARCH_URL`.

## Alternative Technology Considerations

Meilisearch: schema inferred. OpenSearch: ES-compatible. ES: full control over mappings.
