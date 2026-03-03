/**
 * Metrics snapshot hooks for scaffold commands.
 * Registers pre/post snapshots (after-ai, after-scaffold) with the scaffold hook registry.
 *
 * Import this file to enable metrics snapshots. The registration runs as a side effect.
 */

import { Effect } from "effect";
import { ScaffoldMetrics } from "../services/scaffold-metrics.js";
import { registerPreHook, registerPostHook, type ScaffoldHookContext } from "./scaffold-hooks.js";

function snapshotPreHook(ctx: ScaffoldHookContext) {
  return Effect.gen(function* () {
    const metrics = yield* ScaffoldMetrics;
    yield* metrics.appendSnapshot("after-ai", ctx.snapshotDir, ctx.projectDir);
  }).pipe(Effect.asVoid);
}

function snapshotPostHook(ctx: ScaffoldHookContext) {
  return Effect.gen(function* () {
    const metrics = yield* ScaffoldMetrics;
    yield* metrics.appendSnapshot("after-scaffold", ctx.snapshotDir, ctx.projectDir);
  }).pipe(Effect.asVoid);
}

registerPreHook(snapshotPreHook);
registerPostHook(snapshotPostHook);
