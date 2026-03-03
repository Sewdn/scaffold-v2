# Benchmark Metrics

The scaffold CLI includes built-in metrics for benchmarking AI agents and scaffolding workflows.

## Metrics Collected

| Metric | Source | Description |
|--------|--------|-------------|
| **Scaffold commands** | Auto-logged | Each scaffold command (project, app, service, etc.) is logged with command, args, cwd, duration, success |
| **Files / Lines** | Pre/post hooks | Static analysis: file count and line count. Snapshots taken via pre- and post-hooks around each scaffold command |
| **Scaffolded vs AI-generated** | Snapshot pairs | Compare pre (after-ai) → post (after-scaffold) pairs to compute deltas |

Token usage is managed outside this project.

## Log Locations

- **Inside scaffolded project**: `{project}/.scaffold/metrics/`
- **Outside project**: `~/.scaffold/metrics/`

Files:
- `scaffold-commands.jsonl` — one JSON object per line (command, args, cwd, ts, durationMs, success)
- `snapshots.jsonl` — one JSON object per line (phase, files, lines, ts, byExtension)

## Pre- and Post-Hooks

Every scaffold command runs with pre- and post-hooks:

- **Pre-hook**: Snapshot with phase `after-ai` — state before this scaffold (captures AI-generated changes since last scaffold)
- **Post-hook**: Snapshot with phase `after-scaffold` — state after this scaffold

If nothing changed between two scaffold commands, pre of command N equals post of command N−1, so no AI delta is measured.

Hooks are registered in `src/hooks/scaffold-hooks.ts`. Use `registerPreHook` and `registerPostHook` to add more actions.

## Commands

```bash
# Report on scaffold commands and snapshots (deltas, scaffolded vs AI-generated)
scaffold metrics report [--dir <path>] [--commands] [--snapshots] [--all]
```

## Benchmark Workflow

1. **Run scaffold**: Execute `scaffold project`, `scaffold create`, `scaffold app`, etc. Pre-hook runs first (snapshot), command runs, post-hook runs (snapshot).
2. **Run AI agent**: Let the AI implement features.
3. **Run another scaffold**: Pre-hook snapshots current state (= after-ai). If AI changed nothing, pre equals previous post → AI delta = 0.
4. **Report**: Run `scaffold metrics report --dir /path/to/project`

Deltas:
- **Scaffolded** = post − pre (per command, summed)
- **AI-generated** = pre − previous post (between consecutive commands, summed)

## Effect Integration

Metrics use Effect services (`ScaffoldMetrics`) for composable monitoring. The `ScaffoldMetricsLive` layer provides the default implementation. Use `Effect.provide(ScaffoldMetricsLive)` when running metrics in an Effect context.

Static analysis (`analyzeDirectory`) is a pure function in `src/services/static-analysis.ts` and can be used without Effect.
