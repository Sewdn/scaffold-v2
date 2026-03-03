/**
 * Scaffold metrics: command logging and snapshot tracking.
 * Uses Effect for composable monitoring patterns.
 */

import { Context, Effect, Layer } from "effect";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { analyzeDirectory, type AnalysisResult } from "./static-analysis.js";

/** Phase for benchmark tracking: before scaffold, after scaffold, after AI. */
export type SnapshotPhase = "before" | "after-scaffold" | "after-ai";

export interface CommandLogEntry {
  readonly ts: string;
  readonly command: string;
  readonly args: readonly string[];
  readonly cwd: string;
  readonly projectDir?: string;
  readonly durationMs?: number;
  readonly success: boolean;
}

export interface SnapshotLogEntry {
  readonly ts: string;
  readonly phase: SnapshotPhase;
  readonly cwd: string;
  readonly projectDir?: string;
  readonly files: number;
  readonly lines: number;
  readonly byExtension?: Record<string, { files: number; lines: number }>;
}

export interface ScaffoldMetrics {
  readonly logCommand: (
    entry: Omit<CommandLogEntry, "ts" | "success"> & { success?: boolean },
  ) => Effect.Effect<void>;
  readonly appendSnapshot: (
    phase: SnapshotPhase,
    dir: string,
    projectDir?: string,
  ) => Effect.Effect<AnalysisResult>;
  readonly getMetricsDir: (cwd: string, projectDir?: string) => string;
}

export const ScaffoldMetrics = Context.GenericTag<ScaffoldMetrics>("ScaffoldMetrics");

/** Set by project/create so metrics can snapshot the correct directory. */
let _scaffoldProjectDirForMetrics: string | undefined;
export function setScaffoldProjectDirForMetrics(dir: string): void {
  _scaffoldProjectDirForMetrics = dir;
}
export function getScaffoldProjectDirForMetrics(): string | undefined {
  return _scaffoldProjectDirForMetrics;
}

function getMetricsBaseDir(cwd: string, projectDir?: string): string {
  const dir = projectDir ?? cwd;
  const pkgPath = join(dir, "package.json");
  const hasApps = existsSync(join(dir, "apps"));
  const hasPackages = existsSync(join(dir, "packages"));
  const looksLikeProject = existsSync(pkgPath) && (hasApps || hasPackages);

  if (looksLikeProject) {
    return join(dir, ".scaffold", "metrics");
  }
  return join(homedir(), ".scaffold", "metrics");
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function appendJsonl(filePath: string, obj: object): void {
  ensureDir(join(filePath, ".."));
  appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf-8");
}

export const ScaffoldMetricsLive = Layer.succeed(ScaffoldMetrics, {
  getMetricsDir: (cwd: string, projectDir?: string) => {
    return getMetricsBaseDir(cwd, projectDir);
  },

  logCommand: (
    entry: Omit<CommandLogEntry, "ts" | "success"> & { success?: boolean },
  ) =>
    Effect.sync(() => {
      const baseDir = getMetricsBaseDir(entry.cwd, entry.projectDir);
      const filePath = join(baseDir, "scaffold-commands.jsonl");
      const full: CommandLogEntry = {
        ...entry,
        ts: new Date().toISOString(),
        success: entry.success ?? true,
      };
      appendJsonl(filePath, full);
    }),

  appendSnapshot: (phase: SnapshotPhase, dir: string, projectDir?: string) =>
    Effect.gen(function* () {
      const result = analyzeDirectory(dir);
      const baseDir = getMetricsBaseDir(dir, projectDir);
      const filePath = join(baseDir, "snapshots.jsonl");
      const entry: SnapshotLogEntry = {
        ts: new Date().toISOString(),
        phase,
        cwd: dir,
        projectDir,
        files: result.files,
        lines: result.lines,
        byExtension: result.byExtension,
      };
      appendJsonl(filePath, entry);
      return result;
    }),
});
