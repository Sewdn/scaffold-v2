# Email Service App Type

**Description:** Email sending service (Resend, Nodemailer).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-template](add-template.md) | Add an email template | `src/templates/<name>.ts` |
| [add-handler](add-handler.md) | Add a send handler (e.g. welcome, reset) | `src/handlers/<name>.ts` |
| [add-transport](add-transport.md) | Add a transport config | `src/transports/<name>.ts` |

## Underlying Technology

**Resend** (modern API) or **Nodemailer** (SMTP). Resend for transactional email; Nodemailer for self-hosted SMTP. Both support templates, attachments.

## Best Practices & Engineering Patterns

- **Template engines:** Use React Email, MJML, or Handlebars for HTML templates; separate layout from content.
- **Handler patterns:** One handler per email type (welcome, reset, invoice); inject transport and template.
- **Retry/queue:** Use queue (e.g. BullMQ) for retries; avoid blocking on send failure.

## Effect Library Usage

- **Handlers:** Wrap send logic in `Effect.gen`; `Effect.runPromise` at handler boundary.
- **Context:** Inject transport and template service via Effect `Context`; handlers receive.
- **Errors:** `Effect.fail` with typed errors; map to retry or dead-letter.

## Implementation Considerations

- **Registry:** Handlers in `src/handlers/`; transports in `src/transports/`; templates in `src/templates/`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{templateName}}`; export `xxxHandler`, `xxxTransport`.
- **Naming:** `welcome`, `reset-password`; file `handlers/welcome.ts`, `templates/welcome.tsx`.

## Alternative Technology Considerations

- **Resend vs Nodemailer:** Resend for SaaS; Nodemailer for self-hosted SMTP.
- **SendGrid/Mailgun:** Similar APIs; Resend is simpler and developer-friendly.
