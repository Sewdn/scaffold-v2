import { Command } from "commander";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { Effect } from "effect";
import chalk from "chalk";
import { ScaffoldMetrics } from "../services/scaffold-metrics.js";
import { ScaffoldMetricsLive } from "../services/scaffold-metrics.js";
import type { CommandLogEntry, SnapshotLogEntry } from "../services/scaffold-metrics.js";

const metricsCommand = new Command("metrics")
  .description("Benchmark metrics: report on scaffold commands and snapshots (scaffolded vs AI-generated)");

const reportCommand = new Command("report")
  .description("Report on scaffold commands and snapshots (deltas, scaffolded vs AI-generated)")
  .option("-d, --dir <path>", "Project directory (default: cwd)")
  .option("--commands", "Show command log summary only")
  .option("--snapshots", "Show snapshot summary and deltas only")
  .option("--all", "Show both (default)")
  .action(
    async (options: { dir?: string; commands?: boolean; snapshots?: boolean; all?: boolean }) => {
      const dir = resolve(process.cwd(), options.dir ?? ".");
      const showCommands =
        options.commands === true || options.all === true || (!options.snapshots && !options.commands);
      const showSnapshots =
        options.snapshots === true || options.all === true || (!options.commands && !options.snapshots);

      const program = Effect.gen(function* () {
        const metrics = yield* ScaffoldMetrics;
        const baseDir = metrics.getMetricsDir(dir, dir);
        return { baseDir };
      });

      const { baseDir } = await Effect.runPromise(
        program.pipe(Effect.provide(ScaffoldMetricsLive)),
      );

      if (showCommands) {
        const commandsPath = `${baseDir}/scaffold-commands.jsonl`;
        if (existsSync(commandsPath)) {
          const lines = readFileSync(commandsPath, "utf-8")
            .trim()
            .split("\n")
            .filter(Boolean);
          const entries = lines.map((l) => JSON.parse(l) as CommandLogEntry);
          const byCommand: Record<string, number> = {};
          for (const e of entries) {
            byCommand[e.command] = (byCommand[e.command] ?? 0) + 1;
          }
          console.log(chalk.bold("\nScaffold commands"));
          console.log(chalk.gray("  Total:"), entries.length);
          console.log(chalk.gray("  By command:"));
          for (const [cmd, count] of Object.entries(byCommand).sort((a, b) => b[1] - a[1])) {
            console.log(chalk.gray(`    ${cmd}:`), count);
          }
        } else {
          console.log(chalk.gray("\nNo command log found at"), baseDir);
        }
      }

      if (showSnapshots) {
        const snapshotsPath = `${baseDir}/snapshots.jsonl`;
        if (existsSync(snapshotsPath)) {
          const lines = readFileSync(snapshotsPath, "utf-8")
            .trim()
            .split("\n")
            .filter(Boolean);
          const entries = lines.map((l) => JSON.parse(l) as SnapshotLogEntry);
          console.log(chalk.bold("\nSnapshots"));
          for (const e of entries) {
            console.log(
              chalk.gray(`  [${e.phase}]`),
              e.ts,
              chalk.cyan("files:"),
              e.files,
              chalk.cyan("lines:"),
              e.lines,
            );
          }
          let totalScaffoldedFiles = 0;
          let totalScaffoldedLines = 0;
          let totalAiFiles = 0;
          let totalAiLines = 0;
          let lastPost: SnapshotLogEntry | undefined;
          for (let i = 0; i < entries.length - 1; i++) {
            const curr = entries[i];
            const next = entries[i + 1];
            if (curr.phase === "after-ai" && next.phase === "after-scaffold") {
              totalScaffoldedFiles += next.files - curr.files;
              totalScaffoldedLines += next.lines - curr.lines;
              if (lastPost) {
                totalAiFiles += curr.files - lastPost.files;
                totalAiLines += curr.lines - lastPost.lines;
              }
              lastPost = next;
            }
          }
          const hasPairs = lastPost !== undefined;
          if (hasPairs) {
            console.log(chalk.bold("\n  Scaffolded (post − pre per command):"));
            console.log(chalk.gray("    files:"), `+${totalScaffoldedFiles}`);
            console.log(chalk.gray("    lines:"), `+${totalScaffoldedLines}`);
            console.log(chalk.bold("\n  AI-generated (pre − prev post between commands):"));
            console.log(chalk.gray("    files:"), `+${totalAiFiles}`);
            console.log(chalk.gray("    lines:"), `+${totalAiLines}`);
          }
          if (entries.length >= 2 && !hasPairs) {
            const last = entries[entries.length - 1];
            const prev = entries[entries.length - 2];
            const deltaFiles = last.files - prev.files;
            const deltaLines = last.lines - prev.lines;
            console.log(chalk.gray("\n  Delta (last − previous):"), `files +${deltaFiles}`, `lines +${deltaLines}`);
          }
        } else {
          console.log(chalk.gray("\nNo snapshots found at"), baseDir);
        }
      }
      console.log("");
    },
  );

metricsCommand.addCommand(reportCommand);

export { metricsCommand };
