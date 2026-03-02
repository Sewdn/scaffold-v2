# MCP Server: add-resource

## Command

```
scaffold mcp-server add-resource <name>
```

## Description

Add a resource template for MCP resources.

## Injection Target

- **Artifact:** `src/resources/<name>.ts`

## Status

Planned

---

## Underlying Technology

**@modelcontextprotocol/sdk** — `ResourceTemplate` for URI-pattern resources; `listResources`, `readResource` for discovery and content.

## Best Practices & Engineering Patterns

- **URI patterns:** Use `resource://server/<type>/<id>`-style URIs for resource identification.
- **MIME types:** Set correct `mimeType` for text, markdown, or binary content.
- **Lazy loading:** Resources can be fetched on demand; avoid loading all at startup.

## Effect Library Usage

- **Context:** Provide resource backends via Effect `Context`; resources read from `Layer`.
- **Async:** Use `Effect.async` or `Effect.promise` for resource fetch; map errors to MCP format.
- **Caching:** Optional `Effect`-based cache layer for frequently accessed resources.

## Implementation Considerations

- **Registry patch:** Register resource template in server `resources` config.
- **Stub variables:** `{{name}}`, `{{uriPattern}}`, `{{mimeType}}`.
- **Idempotency:** Skip if `src/resources/<name>.ts` exists.

## Alternative Technology Considerations

- **Static resources:** File-based resources vs dynamic; choose based on content source.
- **Resource vs Tool:** Use resources for read-only context; tools for actions.
