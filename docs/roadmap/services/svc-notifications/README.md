# svc-notifications Package

**Description:** Push/in-app notifications.

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-channel](add-channel.md) | Add a notification channel | `src/channels/<name>.ts` |
| [add-template](add-template.md) | Add a notification template | `src/templates/<name>.ts` |
| [add-preference-group](add-preference-group.md) | Add user preference group | `src/preferences/<name>.ts` |
| [add-delivery-rule](add-delivery-rule.md) | Add a delivery rule | `src/rules/<name>.ts` |

## Underlying Technology

Push: FCM, APNs. In-app: WebSocket or polling. Channels: email (Resend), SMS (Twilio). Preference storage in DB or Redis.

## Best Practices & Engineering Patterns

User preference groups (opt-in/opt-out). Template-based content. Delivery rules (time, channel). Idempotent delivery.

## Effect Library Usage

`Effect.tryPromise` for delivery. `NotificationsService` via Context/Layer. Typed errors: `DeliveryError`, `PreferenceError`. Compose with channel Layers.

## Implementation Considerations

Stub: `{{channelName}}`, `{{templateName}}`. Registry: `src/channels/index.ts`, `src/templates/index.ts`. Env: `FCM_*`, `APNS_*`, etc.

## Alternative Technology Considerations

OneSignal: multi-channel. Firebase: FCM. Pusher: WebSocket. Resend: email. Channel adapters for portability.
