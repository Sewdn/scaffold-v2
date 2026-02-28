/**
 * Command template schema for cascadable command orchestration.
 */

export type CommandStepType = 'bun' | 'pnpm' | 'bunx' | 'npx' | 'shell' | 'exec';

export interface CommandStep {
  type: CommandStepType;
  command: string;
  args?: string[];
  /** Use when running in non-interactive mode (e.g. --non-interactive) instead of args */
  argsForNonInteractive?: string[];
  cwd?: string;
  optional?: boolean;
  /** When true, subprocess uses stdio: 'inherit' so it can show prompts and receive input */
  interactive?: boolean;
}

export interface CommandTemplate {
  id: string;
  description: string;
  steps: CommandStep[];
  subTemplates?: string[];
}

/**
 * Context passed when expanding templates (for variable substitution in commands).
 */
export interface TemplateContext {
  projectName?: string;
  projectDir?: string;
  appName?: string;
  appType?: string;
  packageName?: string;
  serviceName?: string;
  componentName?: string;
  [key: string]: string | undefined;
}
