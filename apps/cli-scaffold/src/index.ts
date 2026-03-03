#!/usr/bin/env bun
import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";
import { createCommand } from "./commands/create.js";
import { projectCommand } from "./commands/project.js";
import { initCommand } from "./commands/init.js";
import { appCommand } from "./commands/app.js";
import { serviceCommand } from "./commands/service.js";
import { uiCommand } from "./commands/ui.js";
import { componentCommand } from "./commands/component.js";
import { moduleCommand } from "./commands/module.js";
import { packageCommand } from "./commands/package.js";
import { metricsCommand } from "./commands/metrics.js";
import { cliCommand } from "@workspace/app-cli";
import { Effect } from "effect";
import {
  ScaffoldMetrics,
  ScaffoldMetricsLive,
  getScaffoldProjectDirForMetrics,
} from "./services/scaffold-metrics.js";
import { runPreHooks, runPostHooks } from "./hooks/scaffold-hooks.js";
import "./hooks/scaffold-metrics-hooks.js";
import { apiElysiaCommand } from "@workspace/app-api-elysia";
import { apiHonoCommand } from "@workspace/app-api-hono";
import { apiFastifyCommand } from "@workspace/app-api-fastify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pkg = require(join(__dirname, "..", "package.json")) as { version?: string };

const program = new Command();

program
  .name("scaffold")
  .description("Command-orchestration CLI for TypeScript monorepos")
  .version(pkg.version ?? "0.0.0", "-v, --version", "output the version number");

program.addCommand(createCommand);
program.addCommand(projectCommand);
program.addCommand(initCommand);
program.addCommand(appCommand);
program.addCommand(serviceCommand);
program.addCommand(uiCommand);
program.addCommand(componentCommand);
program.addCommand(moduleCommand);
program.addCommand(packageCommand);
program.addCommand(metricsCommand);
program.addCommand(cliCommand);
program.addCommand(apiElysiaCommand);
program.addCommand(apiHonoCommand);
program.addCommand(apiFastifyCommand);

const argv = process.argv.slice(2);
const topLevelCommand = argv[0];
const startTime = Date.now();

const SCAFFOLD_COMMANDS = new Set([
  "project",
  "create",
  "init",
  "app",
  "service",
  "ui",
  "component",
  "module",
  "package",
  "cli",
  "api-elysia",
  "api-hono",
  "api-fastify",
]);

function isScaffoldCommand(cmd: string | undefined): boolean {
  return !!cmd && SCAFFOLD_COMMANDS.has(cmd);
}

function buildHookContext(): { command: string; cwd: string; projectDir?: string; snapshotDir: string } {
  const cwd = process.cwd();
  const projectDir = getScaffoldProjectDirForMetrics();
  const snapshotDir =
    (topLevelCommand === "project" || topLevelCommand === "create") && projectDir
      ? projectDir
      : cwd;
  return { command: topLevelCommand!, cwd, projectDir, snapshotDir };
}

function logScaffoldCommand(success: boolean): void {
  if (
    !topLevelCommand ||
    topLevelCommand === "-v" ||
    topLevelCommand === "--version" ||
    topLevelCommand === "-h" ||
    topLevelCommand === "--help"
  )
    return;
  const logEffect = Effect.gen(function* () {
    const metrics = yield* ScaffoldMetrics;
    yield* metrics.logCommand({
      command: topLevelCommand,
      args: argv.slice(1),
      cwd: process.cwd(),
      projectDir: getScaffoldProjectDirForMetrics(),
      durationMs: Date.now() - startTime,
      success,
    });
  });
  Effect.runSync(logEffect.pipe(Effect.provide(ScaffoldMetricsLive)));
}

async function runWithHooks(): Promise<void> {
  if (isScaffoldCommand(topLevelCommand)) {
    const preCtx = {
      command: topLevelCommand,
      cwd: process.cwd(),
      projectDir: undefined,
      snapshotDir: process.cwd(),
    };
    await runPreHooks(preCtx);
  }

  await program.parseAsync();
  logScaffoldCommand(true);

  if (isScaffoldCommand(topLevelCommand)) {
    const postCtx = buildHookContext();
    await runPostHooks(postCtx);
  }
}

runWithHooks().catch((err) => {
  logScaffoldCommand(false);
  throw err;
});
