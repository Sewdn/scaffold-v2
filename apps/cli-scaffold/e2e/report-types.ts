/**
 * Types for E2E scenario run reports.
 */

export interface ScenarioReportEntry {
  readonly scenarioId: string;
  readonly description: string;
  readonly status: 'pass' | 'fail';
  readonly durationMs: number;
  readonly validationResults: readonly {
    readonly passed: boolean;
    readonly message: string;
  }[];
}

export interface E2EReport {
  readonly runId: string;
  readonly timestamp: string;
  readonly totalScenarios: number;
  readonly passed: number;
  readonly failed: number;
  readonly totalDurationMs: number;
  readonly scenarios: readonly ScenarioReportEntry[];
}
