# Email Service: add-transport

## Command

```
scaffold email-service add-transport <name>
```

## Description

Add a transport configuration.

## Injection Target

- **Artifact:** `src/transports/<name>.ts`

## Status

Proposed

---

## Underlying Technology

**Resend** or **Nodemailer** transport config. Transport defines SMTP/API credentials, defaults; used by handlers to send.

## Best Practices & Engineering Patterns

- **Environment config:** Store API key in env; load in transport; avoid hardcoding.
- **Multiple transports:** Support dev (console), staging (Resend test), prod (Resend); switch by env.
- **Defaults:** Set `from`, `replyTo` in transport; override per handler when needed.

## Effect Library Usage

- **Context:** Inject transport via Effect `Context`; handlers receive `EmailTransport` service.
- **Config:** Load config with `Effect.sync` or `Effect.promise`; fail fast on missing env.
- **Services:** Wrap Resend/Nodemailer client in Effect service; expose `send(options)`.

## Implementation Considerations

- **Registry:** Transports in `src/transports/`; register in app Context or DI.
- **Stubs:** `{{name}}`, `{{Name}}`; export `xxxTransport` or `createXxxTransport`.
- **Naming:** `resend`, `smtp`, `console`; file `transports/resend.ts`.

## Alternative Technology Considerations

- **Resend vs Nodemailer:** Resend for API; Nodemailer for SMTP.
- **SendGrid/Mailgun:** Similar; Resend preferred for simplicity.
