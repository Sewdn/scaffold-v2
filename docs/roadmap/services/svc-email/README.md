# svc-email Package

**Description:** Email delivery (Resend, SendGrid, Nodemailer).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-template](add-template.md) | Add an email template | `src/templates/<name>.ts` |
| [add-transport](add-transport.md) | Add a transport config | `src/transports/<name>.ts` |
| [add-webhook-handler](add-webhook-handler.md) | Add a webhook handler | `src/webhooks/<name>.ts` |
| [add-queue-handler](add-queue-handler.md) | Add a queue-based send handler | `src/queue/<name>.ts` |

## Underlying Technology

Resend (primary), SendGrid, Nodemailer. React Email or MJML for templates. Webhooks for delivery/bounce events.

## Best Practices & Engineering Patterns

Validate recipient/from via Zod. Use queue for async sends; idempotent webhook handlers. Rate-limit outbound; retry with backoff.

## Effect Library Usage

`Effect.tryPromise` for API calls. `EmailService` via Context/Layer. Typed errors: `SendError`, `ValidationError`. Compose with queue Layer.

## Implementation Considerations

Stub: `{{templateName}}`, `{{transportName}}`. Registry: `src/templates/index.ts`, `src/transports/index.ts`. Env: `RESEND_API_KEY`, `SVC_EMAIL_*`.

## Alternative Technology Considerations

SendGrid: mature, high volume. Postmark: transactional focus. AWS SES: cost-effective. Resend: modern DX, React Email.
