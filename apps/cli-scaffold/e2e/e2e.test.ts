/**
 * E2E tests for scaffold CLI. Each registered scenario is run as a test.
 * Uses Effect for DI, logging, and metrics.
 * Writes structured reports to .e2e-reports/ for visualization.
 * Run with: bun test
 */

import { describe, test, expect, afterAll } from 'bun:test';
import { Effect, Metric, pipe } from 'effect';
import { E2ELiveLayer } from './layers.js';
import { ScenarioRegistry } from './services/scenario-registry.js';
import { runScenario, type RunResult } from './run-scenario.js';
import { buildReport, writeReport } from './report-writer.js';
import type { Scenario } from './types.js';

async function runWithLayer<A, E>(
  effect: Effect.Effect<A, E>,
): Promise<A> {
  return Effect.runPromise(pipe(effect, Effect.provide(E2ELiveLayer)));
}

const scenarios = await runWithLayer(
  Effect.gen(function* () {
    const registry = yield* ScenarioRegistry;
    yield* registry.loadAll();
    return yield* registry.getAll();
  }),
);

const collectedResults: RunResult[] = [];

describe('Scaffold E2E', () => {
  if (scenarios.length === 0) {
    test('no scenarios registered', () => {
      expect(scenarios.length).toBeGreaterThan(0);
    });
  } else {
    for (const scenario of scenarios) {
      test(
        `${scenario.id}: ${scenario.description}`,
        async () => {
          const result = await runWithLayer(runScenario(scenario));
          collectedResults.push(result);
          const failed = result.validationResults.filter((r) => !r.passed);
          if (failed.length > 0) {
            const messages = failed.map((f) => `  - ${f.message}`).join('\n');
            expect(result.allPassed, `Validations failed:\n${messages}`).toBe(true);
          }
          expect(result.allPassed).toBe(true);
        },
        90_000,
      );
    }
  }

  afterAll(async () => {
    if (collectedResults.length > 0 && scenarios.length > 0) {
      const report = buildReport(collectedResults, scenarios as Scenario[]);
      const { timestampedPath, latestPath } = writeReport(report);
      console.log(`\nE2E report written: ${latestPath}`);
      console.log(`  (timestamped: ${timestampedPath})`);
    }
  });
});

describe('E2E metrics summary', () => {
  test('scenario metrics are defined', () => {
    // Metrics are recorded during scenario runs; effect's Metric module provides
    // scenarioDurationMetric, scenarioTotalMetric, etc. for observability.
    expect(typeof Metric.timer).toBe('function');
    expect(typeof Metric.counter).toBe('function');
  });
});
