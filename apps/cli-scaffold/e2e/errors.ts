/**
 * Effect TaggedErrors for E2E test failures.
 */

import { Data } from 'effect';

export class ScaffoldExecutionError extends Data.TaggedError('ScaffoldExecutionError')<{
  readonly command: string;
  readonly args: readonly string[];
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
}> {}

export class ValidationError extends Data.TaggedError('ValidationError')<{
  readonly scenarioId: string;
  readonly validatorId: string;
  readonly message: string;
}> {}

export class ScenarioSetupError extends Data.TaggedError('ScenarioSetupError')<{
  readonly scenarioId: string;
  readonly message: string;
}> {}
