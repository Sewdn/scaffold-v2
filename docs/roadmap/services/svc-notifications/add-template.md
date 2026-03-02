# svc-notifications: add-template

## Command

```
scaffold svc-notifications add-template <name>
```

## Description

Add a notification template.

## Injection Target

- **Artifact:** `src/templates/<name>.ts`
- **Registry:** `src/templates/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Template with placeholders (e.g. `{{userName}}`). Multi-channel: HTML (email), plain (SMS), JSON (push). Zod for template vars.

## Best Practices & Engineering Patterns

Validate template vars with Zod. Support channel-specific variants. Escape user content. Version templates.

## Effect Library Usage

`Effect.sync` for render; `Effect.tryPromise` for delivery. Inject template registry via Context. Typed errors for missing vars.

## Implementation Considerations

Stub: `{{templateName}}`, `{{vars}}`, `{{channels}}`. Registry: `src/templates/index.ts`.

## Alternative Technology Considerations

Handlebars, Mustache for templating. React Email for email. Same pattern: vars + render + channel.
