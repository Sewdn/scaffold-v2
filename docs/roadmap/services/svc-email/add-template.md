# svc-email: add-template

## Command

```
scaffold svc-email add-template <name>
```

## Description

Add an email template (HTML, text, MJML).

## Injection Target

- **Artifact:** `src/templates/<name>.ts`
- **Registry:** `src/templates/index.ts` (optional)

## Status

Proposed

## Underlying Technology

React Email, MJML, or plain HTML/text. Resend/SendGrid template APIs. Zod for template input validation.

## Best Practices & Engineering Patterns

Type template props; validate with Zod. Support HTML + plain-text fallback. Use consistent layout wrapper.

## Effect Library Usage

`Effect.sync` for template render; `Effect.tryPromise` for send. Inject `EmailService` via Context. Typed errors for render/send failures.

## Implementation Considerations

Stub: `{{templateName}}`, `{{propsSchema}}`. Registry: `src/templates/index.ts`. Env: `RESEND_API_KEY`.

## Alternative Technology Considerations

MJML for responsive HTML. Handlebars/EJS for simple templates. React Email: component-based, type-safe.
