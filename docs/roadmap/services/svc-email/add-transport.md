# svc-email: add-transport

## Command

```
scaffold svc-email add-transport <name>
```

## Description

Add a transport config (SMTP, Resend, SendGrid).

## Injection Target

- **Artifact:** `src/transports/<name>.ts`
- **Registry:** `src/transports/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Resend API, SendGrid API, Nodemailer (SMTP). Transport-specific config (API key, from address, webhook URL).

## Best Practices & Engineering Patterns

Validate transport config with Zod. Use env vars for secrets. Support multiple transports via registry.

## Effect Library Usage

`Effect.tryPromise` for API calls. Transport via Context/Layer. Typed errors: `TransportError`, `ConfigError`.

## Implementation Considerations

Stub: `{{transportName}}`. Registry: `src/transports/index.ts`. Env: `RESEND_API_KEY`, `SENDGRID_API_KEY`.

## Alternative Technology Considerations

Postmark, AWS SES, Mailgun. Resend: modern; SendGrid: mature. Nodemailer: self-hosted SMTP.
