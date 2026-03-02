# MCP Server: add-tool

## Command

```
scaffold mcp-server add-tool <name>
```

## Description

Add a tool definition and register in server.

## Injection Target

- **Artifact:** `src/tools/<name>.ts`
- **Registry:** Tools registry / server setup

## Status

Planned

---

## Underlying Technology

**@modelcontextprotocol/sdk** — `listTools`, `callTool`; tool definitions use JSON Schema. Zod schemas convert to MCP-compatible input schema.

## Best Practices & Engineering Patterns

- **Zod schemas:** Define input with `z.object()`; use `.describe()` for parameter docs.
- **Handler separation:** Keep tool handler thin; delegate to service layer.
- **Naming:** Use `snake_case` for tool names per MCP convention.

## Effect Library Usage

- **Handler:** Implement as `Effect<Result, ToolError>`; run with `Effect.runPromise` in MCP callback.
- **Context:** Access services via `Effect.gen` + `Context`; compose with `Layer.provide`.
- **Errors:** `Effect.fail(new ToolError(...))` for structured error responses.

## Implementation Considerations

- **Registry patch:** Append `tools.set(name, handler)` or equivalent to tools registry.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{description}}`, `{{inputSchema}}`.
- **Idempotency:** Skip if `src/tools/<name>.ts` exists; merge into registry idempotently.

## Alternative Technology Considerations

- **Raw JSON-RPC:** Could implement tools without SDK; SDK handles transport and spec details.
- **Effect-native MCP:** Future: MCP server built on Effect for full type-safe tool composition.
