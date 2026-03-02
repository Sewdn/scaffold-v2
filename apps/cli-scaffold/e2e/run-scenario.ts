/**
 * Main Effect program: run a single scenario with logging and metrics.
 */

import { Effect, Metric, Duration, pipe } from 'effect';
import { join } from 'path';
import type { Scenario, ScaffoldStep } from './types.js';
import { ScaffoldExecutionError } from './errors.js';
import { FileSystem } from './services/filesystem.js';
import { ScaffoldRunner } from './services/scaffold-runner.js';
import { ValidatorExecutor } from './services/validator-executor.js';

export interface RunResult {
  readonly scenarioId: string;
  readonly projectDir: string;
  readonly projectName: string;
  readonly validationResults: readonly { readonly passed: boolean; readonly message: string }[];
  readonly allPassed: boolean;
  readonly durationMs: number;
}

function getProjectName(steps: readonly ScaffoldStep[]): string {
  const first = steps[0];
  if (!first || (first.command !== 'project' && first.command !== 'init')) {
    throw new Error('First step must be "project" or "init" with project name');
  }
  const nameArg = first.args[0];
  if (!nameArg) throw new Error('Project/init step must have project name as first arg');
  return nameArg;
}

/** Metrics for E2E scenarios */
export const scenarioDurationMetric = Metric.timer(
  'e2e/scenario/duration',
  Duration.millis(1),
);
export const scenarioTotalMetric = Metric.counter('e2e/scenario/total');
export const scenarioSuccessMetric = Metric.counter('e2e/scenario/success');
export const scenarioFailureMetric = Metric.counter('e2e/scenario/failure');

export function runScenario(
  scenario: Scenario,
): Effect.Effect<
  RunResult,
  ScaffoldExecutionError,
  FileSystem | ScaffoldRunner | ValidatorExecutor
> {
  const program = Effect.gen(function* () {
    const fs = yield* FileSystem;
    const runner = yield* ScaffoldRunner;
    const validator = yield* ValidatorExecutor;

    yield* Effect.log(`Starting scenario: ${scenario.id}`);
    yield* Metric.increment(scenarioTotalMetric);

    const tempDir = fs.createTempDir();
    const projectName = getProjectName(scenario.steps);
    let projectDir = tempDir;

    const result = yield* Effect.ensuring(
      Effect.gen(function* () {
        for (const step of scenario.steps) {
          yield* pipe(
            runner.runStep(
              step,
              step.command === 'project' || step.command === 'init' ? tempDir : projectDir,
            ),
            Effect.tap(() => Effect.log(`  ✓ ${step.command} ${step.args.join(' ')}`)),
          );

          if (step.command === 'project' || step.command === 'init') {
            projectDir = join(tempDir, projectName);
          }
        }

        const ctx = { projectDir, projectName };
        const validationResults = yield* validator.run(scenario.validators, ctx);
        const allPassed = validationResults.every((r) => r.passed);

        if (allPassed) {
          yield* Metric.increment(scenarioSuccessMetric);
        } else {
          yield* Metric.increment(scenarioFailureMetric);
          const failed = validationResults.filter((r) => !r.passed);
          yield* Effect.log(`  ✗ Validations failed: ${failed.map((f) => f.message).join('; ')}`);
        }

        return {
          scenarioId: scenario.id,
          projectDir,
          projectName,
          validationResults,
          allPassed,
          durationMs: 0,
        } as RunResult;
      }),
      fs.removeTempDir(tempDir),
    );

    return result;
  });

  return pipe(
    Effect.timed(program),
    Effect.map(([duration, result]) => ({
      ...result,
      durationMs: Math.round(Duration.toMillis(duration)),
    })),
    Effect.tap(({ durationMs, allPassed }) =>
      Effect.log(
        `Scenario ${scenario.id} completed in ${durationMs}ms (${allPassed ? 'PASS' : 'FAIL'})`,
      ),
    ),
  );
}
