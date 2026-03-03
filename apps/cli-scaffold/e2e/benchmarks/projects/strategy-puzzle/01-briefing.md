# Strategy Puzzle — Project Briefing (Problem Space)

## Business Context

A small indie game studio wants to build a web-based, two-player, turn-based strategy puzzle game. The game targets casual players who enjoy short sessions (5–15 minutes per game) and want to play asynchronously—making a move, then returning hours or days later when their opponent responds. Players should be able to have multiple games running in parallel with different opponents.

The studio has experience with web technologies but limited backend expertise. They need a system that is reliable, scales to thousands of concurrent games, and can be extended with new game modes or variants later.

## Current Challenges

1. **Matchmaking**: Players need a way to find opponents. Ad-hoc solutions (Discord, friends lists) don't scale.
2. **Multi-Game Management**: Players in several games lose track of which games need their attention. No clear "your turn" overview.
3. **State Consistency**: Turn-based games require strict ordering of moves. Race conditions or lost updates would corrupt game state.
4. **Real-Time Feel**: When both players are online, moves should appear quickly without polling. When one is offline, the other should be notified when it's their turn.
5. **Auditability**: Disputes ("I didn't make that move") require a verifiable history. Cheating or accidental corruption must be detectable.
6. **Offline Resilience**: Players may have flaky connections. The system must handle reconnection and catch-up without losing data.

## Vision for Solution

Strategy Puzzle will be a web platform that:

- Provides a **game lobby** where players can start new games or find opponents (matchmaking, invite links, or both)
- Supports **multiple concurrent games** per player with clear navigation and "your turn" highlighting
- Uses **event sourcing** to store all game actions as immutable events; game state is derived by replaying events
- Synchronizes game events **bidirectionally** between backend and client in real time (WebSocket or similar)
- **Materializes game state independently** on both backend and client from the same event stream—no shared mutable state
- Ensures consistency: only valid moves are accepted; turn order is enforced; events are ordered and durable

The game should feel responsive when both players are online, and reliable when they play asynchronously over days.

## Business Opportunities

1. **Engagement**: Multiple parallel games increase session frequency and retention.
2. **Monetization**: Optional premium features (themes, undo, game analysis) or ads between games.
3. **Community**: Leaderboards, tournaments, and social features in later phases.
4. **Extensibility**: Event-sourced design supports replay, analysis, and new game variants from the same core.
5. **Mobile**: Web-first enables future PWA or native wrappers.

## Next Steps

Define domain, scope, and technical approach. MVP focuses on lobby, matchmaking, multi-game UI, event-sourced game logic, and real-time event sync with independent state materialization.
