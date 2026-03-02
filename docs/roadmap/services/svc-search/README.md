# svc-search Package

**Description:** Full-text search (Elasticsearch, Meilisearch, OpenSearch).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-index](add-index.md) | Add an index definition | `src/indexes/<name>.ts` |
| [add-mapping](add-mapping.md) | Add field mapping for index | Index config |
| [add-synonym-set](add-synonym-set.md) | Add synonym set | `src/synonyms/<name>.ts` |
| [add-search-route](add-search-route.md) | Add a search API route | `src/routes/<name>.ts` |

## Underlying Technology

Elasticsearch (primary), OpenSearch, Meilisearch. Index mappings, analyzers, synonym sets. Query DSL for full-text search.

## Best Practices & Engineering Patterns

Define index mappings explicitly; use analyzers for text fields. Synonym sets for query expansion. Paginate results; use scroll for bulk.

## Effect Library Usage

`Effect.tryPromise` for ES client calls. `SearchService` via Context/Layer. Typed errors: `IndexError`, `QueryError`. Compose with config Layer.

## Implementation Considerations

Stub: `{{indexName}}`, `{{mappingName}}`. Registry: `src/indexes/index.ts`. Env: `ELASTICSEARCH_URL`, `ES_API_KEY`.

## Alternative Technology Considerations

Meilisearch: simpler, typo-tolerant. OpenSearch: AWS fork of ES. Typesense: fast, open-source. ES: full-featured, mature.
