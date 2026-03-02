#!/usr/bin/env bun
/**
 * Visualize E2E scenario reports from .e2e-reports/
 *
 * Usage:
 *   bun run e2e:report                    — summary of latest report
 *   bun run e2e:report:scenario <id>      — detailed view for one scenario
 *   bun run e2e/report-viewer.ts [path]  — summary for given report
 *   bun run e2e/report-viewer.ts [path] --scenario <id>  — detail for scenario
 *
 * Options:
 *   --scenario, -s <id>  Show detailed view for a single scenario
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Table from "cli-table3";
import type { E2EReport, ScenarioReportEntry } from "./report-types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPORT_PATH = join(__dirname, "..", ".e2e-reports", "run-latest.json");

function parseArgs(): { reportPath: string; scenarioId: string | null } {
  const args = process.argv.slice(2);
  let reportPath = DEFAULT_REPORT_PATH;
  let scenarioId: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--scenario" || args[i] === "-s") {
      scenarioId = args[i + 1] ?? null;
      i++;
    } else if (!args[i].startsWith("-") && args[i].endsWith(".json")) {
      reportPath = resolve(process.cwd(), args[i]);
    } else if (!args[i].startsWith("-") && !scenarioId && !args[i].endsWith(".json")) {
      scenarioId = args[i];
    }
  }
  return { reportPath, scenarioId };
}

function loadReport(path: string): E2EReport {
  if (!existsSync(path)) {
    console.error(chalk.red(`Report not found: ${path}`));
    console.error(chalk.gray("Run `bun run test:e2e` first to generate reports."));
    process.exit(1);
  }
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw) as E2EReport;
}

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
}

function renderScenarioDetail(
  s: ScenarioReportEntry,
  reportContext: { runId: string; timestamp: string },
): void {
  const statusColor = s.status === "pass" ? chalk.green : chalk.red;
  const statusStr = s.status === "pass" ? "PASS" : "FAIL";

  console.log(chalk.bold("\n┌─ Scenario Detail ──────────────────────────────┐"));
  console.log(`│ ${chalk.cyan("Scenario")}  ${s.scenarioId}`);
  console.log(
    `│ ${chalk.cyan("Run")}       ${reportContext.runId.slice(0, 8)}... (${reportContext.timestamp})`,
  );
  console.log(`│ ${chalk.cyan("Status")}    ${statusColor(statusStr)}`);
  console.log(`│ ${chalk.cyan("Duration")}  ${formatDuration(s.durationMs)}`);
  console.log(`│ ${chalk.cyan("Description")} ${s.description}`);
  console.log(chalk.bold("└─────────────────────────────────────────────────┘\n"));

  const table = new Table({
    head: [chalk.bold("#"), chalk.bold("Status"), chalk.bold("Validation")],
    colWidths: [4, 8, 70],
    style: { head: [], border: ["gray"] },
  });

  s.validationResults.forEach((v, i) => {
    const status = v.passed ? chalk.green("✓") : chalk.red("✗");
    table.push([i + 1, status, v.message]);
  });

  console.log(table.toString());
  console.log("");
}

function renderReport(report: E2EReport, scenarioId: string | null): void {
  if (scenarioId) {
    const s = report.scenarios.find((sc) => sc.scenarioId === scenarioId);
    if (!s) {
      console.error(chalk.red(`Scenario not found: ${scenarioId}`));
      console.error(
        chalk.gray("Available:", report.scenarios.map((sc) => sc.scenarioId).join(", ")),
      );
      process.exit(1);
    }
    renderScenarioDetail(s, { runId: report.runId, timestamp: report.timestamp });
    return;
  }

  const statusColor = report.failed === 0 ? chalk.green : chalk.red;
  const statusStr = report.failed === 0 ? "PASS" : "FAIL";

  console.log(chalk.bold("\n┌─ E2E Scenario Report ───────────────────────┐"));
  console.log(`│ ${chalk.cyan("Run")}    ${report.timestamp}`);
  console.log(`│ ${chalk.cyan("Id")}     ${report.runId.slice(0, 8)}...`);
  console.log(
    `│ ${chalk.cyan("Status")} ${statusColor(statusStr)} (${report.passed}/${report.totalScenarios} passed)`,
  );
  console.log(`│ ${chalk.cyan("Total")}  ${formatDuration(report.totalDurationMs)}`);
  console.log(chalk.bold("└──────────────────────────────────────────────┘\n"));

  const table = new Table({
    head: [
      chalk.bold("Scenario"),
      chalk.bold("Status"),
      chalk.bold("Duration"),
      chalk.bold("Validations"),
    ],
    colWidths: [30, 8, 10, 14],
    style: { head: [], border: ["gray"] },
  });

  for (const s of report.scenarios) {
    const status = s.status === "pass" ? chalk.green("PASS") : chalk.red("FAIL");
    const passedCount = s.validationResults.filter((r) => r.passed).length;
    const totalCount = s.validationResults.length;
    const validations = `${passedCount}/${totalCount}`;
    table.push([s.scenarioId, status, formatDuration(s.durationMs), validations]);
  }

  console.log(table.toString());

  const failed = report.scenarios.filter((s) => s.status === "fail");
  if (failed.length > 0) {
    console.log(chalk.red.bold("\nFailed validations:"));
    for (const s of failed) {
      const failedValidations = s.validationResults.filter((r) => !r.passed);
      console.log(chalk.red(`  ${s.scenarioId}:`));
      for (const v of failedValidations) {
        console.log(chalk.gray(`    - ${v.message}`));
      }
    }
  }

  console.log(chalk.gray("\nTip: bun run e2e:report:scenario <id> for detailed view\n"));
}

const { reportPath, scenarioId } = parseArgs();
const report = loadReport(reportPath);
renderReport(report, scenarioId);
