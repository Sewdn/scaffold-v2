# MCP Server: add-prompt

## Command

```
scaffold mcp-server add-prompt <name>
```

## Description

Add a prompt template for MCP prompts.

## Injection Target

- **Artifact:** `src/prompts/<name>.ts`

## Status

Planned

---

## Underlying Technology

**@modelcontextprotocol/sdk** — `listPrompts`, `getPrompt`; prompt templates with named arguments for AI model consumption.

## Best Practices & Engineering Patterns

- **Argument schema:** Define prompt arguments with JSON Schema; use `.describe()` for clarity.
- **Template format:** Markdown or plain text; support variable substitution.
- **Naming:** Use `snake_case` for prompt names; descriptive argument names.

## Effect Library Usage

- **Context:** Inject template sources via Effect `Context`; prompts resolved from `Layer`.
- **Validation:** Use `Effect` to validate prompt args before rendering.
- **Composition:** Compose prompt fragments with `Effect.gen` for complex prompts.

## Implementation Considerations

- **Registry patch:** Append prompt to `prompts` registry in server setup.
- **Stub variables:** `{{name}}`, `{{description}}`, `{{arguments}}`.
- **Idempotency:** Skip if `src/prompts/<name>.ts` exists.

## Alternative Technology Considerations

- **Dynamic prompts:** Predefined vs runtime-generated; scaffold supports static templates.
- **Prompt versioning:** Consider naming for prompt variants (e.g. `prompt_v2`).
