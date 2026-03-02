# svc-search: add-mapping

## Command

```
scaffold svc-search add-mapping <name>
```

## Description

Add field mapping for an index.

## Injection Target

- **Artifact:** Index config (mapping definition)

## Status

Proposed

## Underlying Technology

Elasticsearch mapping: field types (text, keyword, date, nested). Analyzers (standard, custom). Applied to index at creation or via PutMapping.

## Best Practices & Engineering Patterns

`text` + `keyword` subfield for searchable + sortable. Use `nested` for arrays of objects. Avoid `dynamic: true` in prod.

## Effect Library Usage

`Effect.tryPromise` for PutMapping. Inject `SearchService` via Context. Typed errors for invalid mapping.

## Implementation Considerations

Stub: `{{mappingName}}`, `{{fields}}`. Config: index mapping block. Registry: index definition.

## Alternative Technology Considerations

Meilisearch: schema from first doc. ES: explicit control. OpenSearch: same as ES.
