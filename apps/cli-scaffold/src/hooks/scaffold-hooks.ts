/**
 * Pre- and post-hooks for scaffold commands.
 * Enables generic registration of actions before/after each scaffold runs.
 *
 * Register custom logic via registerPreHook / registerPostHook.
 * See scaffold-metrics-hooks.ts for an example (snapshot metrics).
 */

import { Effect } from "effect";
import { ScaffoldMetrics, ScaffoldMetricsLive } from "../services/scaffold-metrics.js";

export interface ScaffoldHookContext {
  readonly command: string;
  readonly cwd: string;
  readonly projectDir?: string;
  /** Directory to analyze for snapshots: projectDir for project/create, else cwd */
  readonly snapshotDir: string;
}

/** Hooks may require ScaffoldMetrics; the runner provides ScaffoldMetricsLive. */
export type ScaffoldHook = (
  ctx: ScaffoldHookContext
) => Effect.Effect<void, never, ScaffoldMetrics>;

const preHooks: ScaffoldHook[] = [];
const postHooks: ScaffoldHook[] = [];

export function registerPreHook(fn: ScaffoldHook): void {
  preHooks.push(fn);
}

export function registerPostHook(fn: ScaffoldHook): void {
  postHooks.push(fn);
}

export function runPreHooks(ctx: ScaffoldHookContext): Promise<void> {
  const program = Effect.gen(function* () {
    for (const hook of preHooks) {
      yield* hook(ctx);
    }
  });
  return Effect.runPromise(program.pipe(Effect.provide(ScaffoldMetricsLive)));
}

export function runPostHooks(ctx: ScaffoldHookContext): Promise<void> {
  const program = Effect.gen(function* () {
    for (const hook of postHooks) {
      yield* hook(ctx);
    }
  });
  return Effect.runPromise(program.pipe(Effect.provide(ScaffoldMetricsLive)));
}
