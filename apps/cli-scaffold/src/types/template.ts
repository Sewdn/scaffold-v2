import type { CommandStep, CommandStepType } from "@workspace/core-app-types";
export type { CommandStep, CommandStepType };

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
