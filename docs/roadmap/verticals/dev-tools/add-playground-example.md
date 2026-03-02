# Dev Tools: add-playground-example

## Command

```
scaffold dev-tools add-playground-example <name>
```

## Description

Playground example: request/response.

## Injection Target

- **Frontend:** `src/examples/<name>.ts` (request config, sample payload)
- **Playground UI:** Example selector, run button
- **Components:** `src/components/PlaygroundExample.tsx` (optional)

## Co-generation

- `frontend add-component` (example card)
- `svc-api-spec` (example in OpenAPI)

## Technology & Patterns

- **ui-lib** (example card), **svc-api-spec** (OpenAPI example). Effect for run→display. Alternatives: Swagger UI.

## Status

Planned
