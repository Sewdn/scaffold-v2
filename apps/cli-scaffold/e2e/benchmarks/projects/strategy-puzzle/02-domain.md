# Strategy Puzzle — Project Domain

## Core Entities

### Game

- **Definition**: A single match between two players.
- **Attributes**: Id, status (waiting, active, finished), current_turn_player, created_at, updated_at.
- **Relationships**: Has many GameEvents; has two Players (via participation).

### GameEvent

- **Definition**: Immutable record of something that happened (event sourcing).
- **Attributes**: Id, game_id, sequence_number, type (GameStarted, MovePlayed, GameEnded), payload (JSON), timestamp, player_id.
- **Relationships**: Belongs to one Game; ordered by sequence_number.

### GameState (Materialized)

- **Definition**: Derived by replaying GameEvents. Not stored; computed on demand.
- **Attributes**: Board state, current turn, winner (if finished).
- **Relationships**: Derived from Game via GameEvents.

### Player

- **Definition**: A user who participates in games.
- **Attributes**: Id, display_name, created_at.
- **Relationships**: Participates in many Games; creates many GameEvents.

### Lobby

- **Definition**: View over games—open (waiting), active, finished. No persistent entity for MVP.
- **Relationships**: Aggregates Games.

## User Roles

### Player

- **Definition**: Person who plays the game.
- **Responsibilities**: Create/join games, make moves, view game list, navigate between games, see "your turn" indicators.
- **Relationships**: Uses web app; participates in Games.

## Relationships Diagram

```
Player ──< Game >──< GameEvent (ordered by sequence)
   │         │
   │         └── GameState (materialized from events)
   └── (many Games in parallel)
```

## Workflow Entities

### Game Lifecycle

- **Waiting** → One player created; waiting for opponent.
- **Active** → Both joined; turns alternate.
- **Finished** → Winner or draw; no more events.

### Event Sourcing Flow

1. Client sends action (e.g. "play move at X").
2. Backend validates, appends GameEvent.
3. Event broadcast to both clients.
4. Backend and each client materialize state by replaying events.
5. UI renders from materialized state.
