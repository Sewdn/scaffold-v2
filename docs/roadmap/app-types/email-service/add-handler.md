# Email Service: add-handler

## Command

```
scaffold email-service add-handler <name>
```

## Description

Add a send handler (e.g. welcome, reset password).

## Injection Target

- **Artifact:** `src/handlers/<name>.ts`
- **Registry:** Handler registration

## Status

Proposed

---

## Underlying Technology

**Resend/Nodemailer** send handlers. Handlers compose transport + template; invoked by API, queue, or cron. One handler per email type.

## Best Practices & Engineering Patterns

- **Handler patterns:** One handler per use case (welcome, reset, invoice); inject transport and template.
- **Template engines:** Use React Email or Handlebars; pass data to template; render HTML.
- **Queue integration:** Handlers called from queue worker; retry on failure; dead-letter on max retries.

## Effect Library Usage

- **Handlers:** Wrap send logic in `Effect.gen`; `Effect.runPromise` at handler boundary.
- **Context:** Inject transport and template service via Effect `Context`; handlers receive.
- **Errors:** `Effect.fail` with typed errors; map to retry or dead-letter in queue.

## Implementation Considerations

- **Registry:** Handlers in `src/handlers/`; register by name (e.g. `welcome`, `reset-password`).
- **Stubs:** `{{name}}`, `{{Name}}`, `{{handlerName}}`; export `xxxHandler` or `sendXxxEmail`.
- **Naming:** `welcome`, `reset-password`, `invoice`; file `handlers/welcome.ts`.

## Alternative Technology Considerations

- **Inline in API:** Fine for small apps; separate handlers for queue, reuse.
- **SendGrid/Mailgun:** Similar handler pattern; Resend preferred.
