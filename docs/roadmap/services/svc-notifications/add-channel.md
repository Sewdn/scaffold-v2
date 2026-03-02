# svc-notifications: add-channel

## Command

```
scaffold svc-notifications add-channel <name>
```

## Description

Add a notification channel (email, push, SMS, in-app).

## Injection Target

- **Artifact:** `src/channels/<name>.ts`
- **Registry:** `src/channels/index.ts` (optional)

## Status

Proposed

## Underlying Technology

FCM (push), APNs (iOS), Resend (email), Twilio (SMS). Channel adapter interface. Config: API keys, endpoints.

## Best Practices & Engineering Patterns

Adapter pattern for each channel. Validate payload per channel. Handle rate limits. Log delivery status.

## Effect Library Usage

`Effect.tryPromise` for send. Channel via Context/Layer. Typed errors: `ChannelError`, `RateLimitError`. Compose with transport Layers.

## Implementation Considerations

Stub: `{{channelName}}`, `{{adapter}}`. Registry: `src/channels/index.ts`. Env: `FCM_*`, `RESEND_*`, etc.

## Alternative Technology Considerations

OneSignal: unified push. Firebase: FCM. Pusher: WebSocket. Channel interface is adapter-agnostic.
