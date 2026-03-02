# MCP Server App Type

**Description:** Model Context Protocol server (MCP SDK).

**Status:** Planned

## Expansion Commands

| Command                         | Description                                  | Spec                                  |
| ------------------------------- | -------------------------------------------- | ------------------------------------- |
| [add-tool](add-tool.md)         | Add a tool definition and register in server | `src/tools/<name>.ts`, tools registry |
| [add-resource](add-resource.md) | Add a resource template                      | `src/resources/<name>.ts`             |
| [add-prompt](add-prompt.md)     | Add a prompt template                        | `src/prompts/<name>.ts`               |

## Underlying Technology

**@modelcontextprotocol/sdk** — Official MCP SDK for tool, resource, and prompt definitions. Stdio or SSE transport. JSON-RPC 2.0 protocol.

## Best Practices & Engineering Patterns

- **Tool schemas:** Use Zod for input validation; export JSON Schema for MCP tool definitions.
- **Resources:** URI-based resource templates; use `ResourceTemplate` for dynamic content.
- **Prompts:** Structured prompt templates with named arguments for AI consumption.

## Effect Library Usage

- **Tool handlers:** Wrap handler logic in `Effect`; use `Effect.runPromise` at the MCP boundary.
- **Context:** Inject services via Effect `Context`; provide resources through `Layer`.
- **Errors:** Map `Effect.fail` to MCP error responses with proper codes.

## Implementation Considerations

- **Registry patching:** Append tool/resource/prompt registrations to server setup; use marker comments.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{description}}` for artifact generation.
- **Idempotency:** Skip if artifact exists; merge into registry only when new.

## Alternative Technology Considerations

- **Custom MCP impl:** Possible to implement MCP over raw stdio/HTTP without SDK; SDK preferred for spec compliance.
- **Other transports:** SSE vs stdio; choose based on deployment (CLI vs long-lived server).
