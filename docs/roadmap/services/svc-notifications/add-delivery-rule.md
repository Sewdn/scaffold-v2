# svc-notifications: add-delivery-rule

## Command

```
scaffold svc-notifications add-delivery-rule <name>
```

## Description

Add a delivery rule (when/how to send).

## Injection Target

- **Artifact:** `src/rules/<name>.ts`
- **Registry:** `src/rules/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Rule: condition (time, user segment, event) + channel + template. Evaluated at send time. Queue for async delivery.

## Best Practices & Engineering Patterns

Rules as declarative config. Check preferences before applying. Debounce/throttle for high-volume. Log rule application.

## Effect Library Usage

`Effect.gen` for rule evaluation + delivery. Inject `NotificationsService` via Context. Typed errors for rule failures.

## Implementation Considerations

Stub: `{{ruleName}}`, `{{condition}}`, `{{channel}}`, `{{template}}`. Registry: `src/rules/index.ts`.

## Alternative Technology Considerations

Rule engine is provider-agnostic. Inngest: event-driven. Custom: full control. Same rule model.
