# WebSocket Server App Type

**Description:** WebSocket server (Elysia WS or ws).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-channel](add-channel.md) | Add a channel/room handler | `src/channels/<name>.ts` |
| [add-handler](add-handler.md) | Add a message handler | `src/handlers/<name>.ts` |
| [add-middleware](add-middleware.md) | Add connection middleware | `src/middleware/<name>.ts` |

## Underlying Technology

**Elysia WS** (Bun-native) or **ws** (Node.js). Elysia WS integrates with Elysia HTTP; `ws` is standalone. Both support rooms, broadcast, connection lifecycle.

## Best Practices & Engineering Patterns

- **Channel handlers:** One handler per message type or channel; route by `message.type` or path.
- **Connection lifecycle:** Handle `open`, `close`, `error`; use middleware for auth on connect.
- **Broadcast/rooms:** Use channel-based rooms for pub/sub; avoid global broadcast for scale.

## Effect Library Usage

- **Async handlers:** Wrap message handlers in `Effect.gen`; `Effect.runPromise` at handler boundary.
- **Context:** Inject services via Effect `Context`; handlers receive for DB, pub/sub.
- **Errors:** `Effect.fail` with typed errors; map to close codes or error messages.

## Implementation Considerations

- **Registry:** Handlers in `src/handlers/`; channels in `src/channels/`; middleware in `src/middleware/`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{channelName}}`; export `xxxHandler`, `xxxChannel`.
- **Naming:** `chat`, `notifications`; file `handlers/chat.ts`, `channels/notifications.ts`.

## Alternative Technology Considerations

- **Hono vs Elysia WS:** Hono has WS support; Elysia WS preferred for Bun/scaffold-v2.
- **Socket.io:** Higher-level; Elysia WS/ws are lighter; Socket.io for fallback transports.
