# WebSocket Server: add-handler

## Command

```
scaffold websocket-server add-handler <name>
```

## Description

Add a message handler for WebSocket events.

## Injection Target

- **Artifact:** `src/handlers/<name>.ts`
- **Registry:** Handler registration

## Status

Proposed

---

## Underlying Technology

**Elysia WS** or **ws** message handlers. Handlers process incoming messages; send responses; may broadcast to channels/rooms.

## Best Practices & Engineering Patterns

- **Message routing:** Route by `message.type` or `message.channel`; one handler per type.
- **Channel handlers:** Delegate to channel logic for room-specific behavior; keep handler thin.
- **Error handling:** Catch errors; send error message to client; avoid crashing connection.

## Effect Library Usage

- **Async handlers:** Wrap logic in `Effect.gen`; `Effect.runPromise` at handler boundary.
- **Context:** Inject services via Effect `Context`; handlers receive for DB, pub/sub.
- **Errors:** `Effect.fail` with typed errors; map to client error message.

## Implementation Considerations

- **Registry:** Handlers in `src/handlers/`; register in WS setup by message type.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{messageType}}`; export `xxxHandler` or `handleXxx`.
- **Naming:** `chat`, `ping`, `subscribe`; file `handlers/chat.ts`.

## Alternative Technology Considerations

- **Socket.io events:** Similar concept; Elysia WS uses raw message routing.
- **tRPC over WS:** Use tRPC for typed RPC; raw WS for low-level control.
