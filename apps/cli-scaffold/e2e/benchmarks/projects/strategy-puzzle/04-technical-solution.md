# Strategy Puzzle — Technical Solution / Architecture

## System Overview

Strategy Puzzle is a web application with:

- A **frontend** for lobby, game list, and per-game board
- An **API** for REST operations and WebSocket (or SSE) for real-time event sync
- A **data service** that owns the event store and exposes append/query operations
- A **CLI** for administrative operations (games, events, players)
- **Event sourcing**: all game actions stored as immutable events; state materialized by replay
- **Bidirectional sync**: game events flow backend ↔ client; both sides materialize state independently

## Architecture Guidelines

### Monorepo Structure

- **Apps**: frontend (web), API (backend + WebSocket), CLI (administration)
- **Packages**: domain (types, event definitions, materialization logic), svc-game-events (event store, append, query)
- **Shared materialization**: Same projection logic used by API and frontend (in domain or shared package)

### Technology Preferences

- **Frontend**: React-based SPA. Real-time updates via WebSocket client.
- **API**: REST for lobby/game CRUD; WebSocket (or SSE) for event stream. Lightweight framework with WS support.
- **CLI**: Command-line framework (e.g. oclif) for admin commands.
- **Data Service**: TypeScript package. Event store (append-only). Exposes `appendEvent`, `getEventsForGame`, `listGamesForPlayer`.
- **Event Store**: In-memory or SQLite for MVP; design for append-only, ordered by (game_id, sequence).
- **Language**: TypeScript throughout.

### Event Sourcing Model

1. **Events**: Immutable records. Types: `GameCreated`, `PlayerJoined`, `MovePlayed`, `GameEnded`.
2. **Event Store**: Append-only. Keyed by game_id; ordered by sequence_number.
3. **Materialization**: Pure function `materialize(events: GameEvent[]): GameState`. Same on backend and client.
4. **Validation**: Before appending `MovePlayed`, materialize current state, check move is legal and it's player's turn.

### Components to Set Up

1. **Data Service (svc-game-events)**
   - Owns event store (append-only, per-game, ordered by sequence)
   - Exposes: `appendEvent(gameId, event)`, `getEventsForGame(gameId)`, `listGamesForPlayer(playerId)`, `listOpenGames()`
   - Does NOT materialize state; that is done by callers (API, client)
   - Depends on domain (event types, no projection logic required in service if projection lives in domain)

2. **Domain Package**
   - Event types: `GameCreated`, `PlayerJoined`, `MovePlayed`, `GameEnded` (with payloads)
   - `materialize(events): GameState` — shared projection logic
   - Game rules: `isValidMove(state, move, player)` — used for validation before append
   - Types: Game, GameEvent, GameState, Player

3. **API Application**
   - Integrates data service and domain (materialization, validation)
   - REST: `POST /games` (create), `POST /games/:id/join`, `GET /games`, `GET /games/:id`, `GET /games/:id/events` (for catch-up)
   - WebSocket: connection per client; subscribe to games; on `appendEvent`, push new event to subscribed clients; on client message (move intent), validate, append, broadcast
   - CORS and WS origin validation

4. **CLI Application**
   - Integrates data service
   - Commands: `games list`, `games show <id>`, `games create`, `events list <gameId>`, `events append <gameId> <type> <payload>` (admin/debug)
   - Same event store; no real-time broadcast from CLI

5. **Frontend Application**
   - **Lobby**: Create game, list open games, join game, list my games
   - **Game list**: All my games; highlight/badge "your turn"; click to open game
   - **Game view**: Board (from materialized state), submit move, see opponent move in real time
   - **Real-time**: WebSocket connection; on event received, append to local event buffer, re-run materialization, re-render
   - **Catch-up**: On connect/reconnect, fetch events since last known sequence; replay; materialize; render
   - **State materialization**: Client runs same `materialize(events)` as backend; no server round-trip for display

### Data Flow

- **Create/Join game**: Client → API (REST) → Data service (append GameCreated/PlayerJoined)
- **Submit move**: Client → API (WebSocket message) → Validate via materialize → Data service (append MovePlayed) → Broadcast to both clients
- **Receive event**: API → WebSocket push → Client appends to buffer → Client materializes → UI updates
- **Reconnect**: Client → API (GET /games/:id/events?since=N) → Client replays events → Materializes → Renders

### Bidirectional Sync

- **Backend → Client**: On new event appended, push to WebSocket subscribers for that game.
- **Client → Backend**: Client sends move intent; backend validates, appends, then broadcasts (including to sender for confirmation).
- **Independence**: Backend materializes for validation; client materializes for display. Both use same logic and event stream.

### Non-Functional Requirements

- **Build**: Full monorepo builds successfully.
- **Real-time**: Sub-second latency for move propagation when both players online.
- **Consistency**: Event ordering per game; no lost events; idempotent append (optional: idempotency key for retries).
- **Reconnection**: Client can catch up after disconnect without data loss.

## MVP Implementation Notes

- Event store: in-memory or SQLite. Table/collection: (game_id, sequence, event_type, payload, timestamp).
- No auth: player identified by session ID or generated ID. Stored in GameCreated/PlayerJoined.
- Simple game: e.g. tic-tac-toe or connect-four for MVP—minimal rules, easy to validate.
- WebSocket: one connection per client; client subscribes to game IDs they're in. Backend pushes events for those games.
- Materialization: keep in domain package; import from both API and frontend (or build a shared bundle).
- Game list "your turn": materialize each game; if current_turn_player === me, highlight.
- CLI: useful for seeding test games, inspecting event stream, debugging.
