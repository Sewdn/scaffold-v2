# svc-elysia-api: add-plugin

## Command

```
scaffold svc-elysia-api add-plugin <name>
```

## Description

Add an Elysia plugin.

## Injection Target

- **Artifact:** `src/plugins/<name>.ts`
- **Registry:** App chain or plugins registry

## Status

Proposed

## Underlying Technology

Elysia plugin: `Elysia()` instance with routes, derive, state. Composable; merge with `.use()`. Can wrap external libs.

## Best Practices & Engineering Patterns

Plugin per feature (auth, swagger, etc.). Export typed plugin. Use state for plugin-scoped data. Document dependencies.

## Effect Library Usage

Plugin can wrap Effect Layer; provide service via derive. `Effect.tryPromise` in plugin handlers. Compose with app.

## Implementation Considerations

Stub: `{{pluginName}}`, `{{routes}}`. Registry: app chain. Compose: `app.use(myPlugin)`.

## Alternative Technology Considerations

Hono: middleware. Fastify: plugins. Elysia: first-class plugins. Same composition pattern.
