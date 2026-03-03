# Strategy Puzzle — Project Scope (Solution Space)

## High-Level Goals

1. **Lobby & Matchmaking** — Create games or find opponents.
2. **Multi-Game Support** — Several games in parallel per player.
3. **"Your Turn" UX** — Navigate easily; highlight games requiring action.
4. **Event Sourcing** — All actions as immutable events; state derived by replay.
5. **Real-Time Sync** — Events synchronized bidirectionally backend ↔ client.
6. **Independent Materialization** — Backend and client each materialize state from events.

## Epic Features

### Epic 1: Event Store & Game Events

- Append-only event store per game
- Event types: GameCreated, PlayerJoined, MovePlayed, GameEnded
- Sequence numbers; query by game_id ordered by sequence

### Epic 2: State Materialization

- Projection: replay events → GameState (board, turn, winner)
- Same logic on backend and client
- Used for validation and display

### Epic 3: Game Lobby

- Create game (waiting for opponent)
- Join game (link or lobby list)
- List open games; list my games

### Epic 4: Multi-Game UI

- Game list with status (your turn, opponent's turn, finished)
- Highlight games where it's your turn
- Navigate between games; per-game board view

### Epic 5: Turn-Based Gameplay

- Submit move (validated against materialized state)
- Enforce turn order; append MovePlayed; broadcast
- Detect win/draw; append GameEnded

### Epic 6: Real-Time Event Sync

- WebSocket (or SSE) bidirectional
- Backend: on new event, push to connected clients
- Client: send action; backend appends and broadcasts
- Reconnection: fetch events since N; replay; catch up

### Epic 7: Matchmaking (Phase 2)

- "Find opponent" — auto-match waiting players

### Epic 8: Replay (Phase 3)

- Replay game from events; export history

## Roadmap

### MVP (Phase 1)

- Event store (in-memory or SQLite); append-only GameEvents
- State materialization (shared logic in domain)
- Lobby: create, join, list open, list my games
- Multi-game UI: list, highlight "your turn", navigate
- Turn-based moves: validate, append, broadcast
- Real-time sync: WebSocket; client sends actions; reconnection catch-up
- Simple puzzle (tic-tac-toe, connect-four) for MVP
- No auth: player by session/ID

### Phase 2

- Player accounts; matchmaking; notifications

### Phase 3

- Replay; spectator; leaderboards

### Out of Scope (Initial)

- In-game chat; paid features; mobile native; complex anti-cheat
