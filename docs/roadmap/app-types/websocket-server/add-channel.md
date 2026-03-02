# WebSocket Server: add-channel

## Command

```
scaffold websocket-server add-channel <name>
```

## Description

Add a channel/room handler.

## Injection Target

- **Artifact:** `src/channels/<name>.ts`
- **Registry:** Channel registration

## Status

Proposed

---

## Underlying Technology

**Elysia WS** or **ws** channel/room handlers. Channels manage pub/sub, room membership; handlers join/leave, broadcast.

## Best Practices & Engineering Patterns

- **Channel handlers:** One channel per room type (e.g. `chat`, `notifications`); subscribe on message.
- **Broadcast scope:** Broadcast to room only; avoid global broadcast for scale.
- **State:** Use in-memory Map or Redis for room membership; persist if needed.

## Effect Library Usage

- **Async handlers:** Wrap channel logic in `Effect.gen`; `Effect.runPromise` at boundary.
- **Context:** Inject services via Effect `Context`; channels receive for pub/sub, DB.
- **Errors:** `Effect.fail` with typed errors; map to close or error message.

## Implementation Considerations

- **Registry:** Channels in `src/channels/`; register in WS setup by channel name.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{channelName}}`; export `xxxChannel` or `createXxxChannel`.
- **Naming:** `chat`, `notifications`, `presence`; file `channels/chat.ts`.

## Alternative Technology Considerations

- **Hono WS channels:** Similar pattern; Elysia WS preferred for Bun.
- **Socket.io rooms:** Higher-level; Elysia WS/ws use manual room management.
