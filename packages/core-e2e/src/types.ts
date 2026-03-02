/**
 * E2E test types for scaffold CLI scenarios.
 * Each scenario defines a sequence of scaffold commands and validation criteria.
 */

/** Scaffold subcommand: project | init | app | service | ui | component | module | package | cli */
export type ScaffoldCommand =
  | 'project'
  | 'init'
  | 'app'
  | 'service'
  | 'ui'
  | 'component'
  | 'module'
  | 'package'
  | 'cli';

/** A single scaffold command step. Args are passed to the subcommand (e.g. ["my-app", "--type", "frontend-vite"]). */
export interface ScaffoldStep {
  readonly command: ScaffoldCommand;
  readonly args: readonly string[];
}

/** Context passed to validators: project root path and metadata. */
export interface ValidationContext {
  readonly projectDir: string;
  readonly projectName: string;
}

/** Result of a validation check. */
export interface ValidationResult {
  readonly passed: boolean;
  readonly message: string;
}

/** A validation that runs synchronously. */
export interface SyncValidator {
  readonly type: 'sync';
  readonly id: string;
  readonly description: string;
  run(ctx: ValidationContext): ValidationResult;
}

/** A validation that runs asynchronously (e.g. build, dev server). */
export interface AsyncValidator {
  readonly type: 'async';
  readonly id: string;
  readonly description: string;
  run(ctx: ValidationContext): Promise<ValidationResult>;
}

export type Validator = SyncValidator | AsyncValidator;

/** A complete E2E scenario: steps to run + validations to apply. */
export interface Scenario {
  readonly id: string;
  readonly description: string;
  readonly steps: readonly ScaffoldStep[];
  readonly validators: readonly Validator[];
  /** Optional timeout in ms (default 90000). Use for slow scenarios (e.g. Next.js build). */
  readonly timeoutMs?: number;
}
