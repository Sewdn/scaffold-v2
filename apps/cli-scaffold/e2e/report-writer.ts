/**
 * Writes structured E2E run reports to disk.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { RunResult } from './run-scenario.js';
import type { Scenario } from './types.js';
import type { E2EReport } from './report-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const REPORTS_DIR = join(__dirname, '..', '.e2e-reports');

function ensureReportsDir(): string {
  mkdirSync(REPORTS_DIR, { recursive: true });
  return REPORTS_DIR;
}

function scenarioOrder(scenarios: readonly Scenario[]): Map<string, number> {
  const order = new Map<string, number>();
  scenarios.forEach((s, i) => order.set(s.id, i));
  return order;
}

/**
 * Build a structured report from scenario run results.
 */
export function buildReport(
  results: readonly RunResult[],
  scenarios: readonly Scenario[],
): E2EReport {
  const order = scenarioOrder(scenarios);
  const sorted = [...results].sort(
    (a, b) => (order.get(a.scenarioId) ?? 999) - (order.get(b.scenarioId) ?? 999),
  );
  const scenarioMap = new Map(scenarios.map((s) => [s.id, s]));

  const scenariosOut = sorted.map((r) => {
    const scenario = scenarioMap.get(r.scenarioId);
    return {
      scenarioId: r.scenarioId,
      description: scenario?.description ?? r.scenarioId,
      status: (r.allPassed ? 'pass' : 'fail') as const,
      durationMs: r.durationMs,
      validationResults: r.validationResults,
    };
  });

  const passed = scenariosOut.filter((s) => s.status === 'pass').length;
  const totalDurationMs = scenariosOut.reduce((sum, s) => sum + s.durationMs, 0);

  return {
    runId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    totalScenarios: scenariosOut.length,
    passed,
    failed: scenariosOut.length - passed,
    totalDurationMs,
    scenarios: scenariosOut,
  };
}

/**
 * Write report to .e2e-reports/run-{timestamp}.json and run-latest.json.
 */
export function writeReport(report: E2EReport): { timestampedPath: string; latestPath: string } {
  ensureReportsDir();
  const ts = report.timestamp.replace(/[:.]/g, '-').slice(0, 19);
  const timestampedPath = join(REPORTS_DIR, `run-${ts}.json`);
  const latestPath = join(REPORTS_DIR, 'run-latest.json');

  const json = JSON.stringify(report, null, 2);
  writeFileSync(timestampedPath, json, 'utf-8');
  writeFileSync(latestPath, json, 'utf-8');

  return { timestampedPath, latestPath };
}
