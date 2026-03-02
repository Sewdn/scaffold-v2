# svc-search: add-synonym-set

## Command

```
scaffold svc-search add-synonym-set <name>
```

## Description

Add a synonym set for search expansion.

## Injection Target

- **Artifact:** `src/synonyms/<name>.ts`
- **Registry:** `src/synonyms/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Elasticsearch synonym filter. Format: `term1, term2 => synonym` or `term1, term2`. Applied in analyzer chain.

## Best Practices & Engineering Patterns

Use synonym filter in custom analyzer. Two-way vs one-way synonyms. Update via reindex or index settings.

## Effect Library Usage

`Effect.tryPromise` for index settings update. Inject `SearchService` via Context. Typed errors for invalid synonym format.

## Implementation Considerations

Stub: `{{synonymSetName}}`, `{{synonyms}}`. Registry: `src/synonyms/index.ts`. File or inline in settings.

## Alternative Technology Considerations

Meilisearch: no built-in synonyms (custom). Typesense: synonym support. ES: full synonym control.
