import {
  cancel,
  confirm,
  isCancel,
  multiselect,
  note,
  select,
  text,
} from '@clack/prompts';
import {
  OPTIONAL_PACKAGES,
  type OptionalPackage,
} from '../init/optional-packages.js';
import { formatEntityName } from '../utils/entity-formatting.js';
import {
  validateProjectName,
  validateAppName,
} from '../utils/validation.js';
import type { AppType } from '../registry.js';
import { APP_TYPES, APP_TYPE_PREFIX } from '../registry.js';
import { getAppTypeConfig } from '../app-types/registry.js';
import { getPackageConfig } from '../packages/registry.js';

let hasShownMultiselectHelp = false;

function validateProjectForPrompt(value: string): string | undefined {
  try {
    validateProjectName(value);
    return undefined;
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

function validateAppForPrompt(value: string): string | undefined {
  try {
    validateAppName(value);
    return undefined;
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

export async function promptProjectName(defaultValue = 'my-monorepo'): Promise<string> {
  const value = await text({
    message: 'What would you like to name your project?',
    defaultValue,
    validate: (v) => {
      if (!v?.trim()) return 'Please enter a name';
      return validateProjectForPrompt(v.trim());
    },
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return formatEntityName(value.trim(), 'project');
}

export async function promptOptionalPackages(): Promise<OptionalPackage[]> {
  if (!hasShownMultiselectHelp) {
    note(
      'Use ↑/↓ to navigate • Space to select/deselect • Enter to confirm',
      'Keyboard Shortcuts',
    );
    hasShownMultiselectHelp = true;
  }

  const value = await multiselect({
    message: 'Which optional packages would you like to include?',
    options: OPTIONAL_PACKAGES.map((pkg) => {
      const config = getPackageConfig(pkg);
      return {
        value: pkg,
        label: pkg,
        hint: config?.description ?? pkg,
      };
    }),
    required: false,
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return value as OptionalPackage[];
}

export async function promptApps(): Promise<Array<{ type: AppType; name: string }>> {
  if (!hasShownMultiselectHelp) {
    note(
      'Use ↑/↓ to navigate • Space to select/deselect • Enter to confirm',
      'Keyboard Shortcuts',
    );
    hasShownMultiselectHelp = true;
  }

  const selected = await multiselect({
    message: 'Which applications would you like to add?',
    options: APP_TYPES.map((t) => {
      const config = getAppTypeConfig(t);
      return {
        value: t,
        label: config?.description ?? t,
        hint: `${APP_TYPE_PREFIX[t]}-*`,
      };
    }),
    required: false,
  });

  if (isCancel(selected)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const types = selected as AppType[];
  if (types.length === 0) return [];

  const defaultAppNames: Record<AppType, string> = {
    'frontend-nextjs': 'web',
    'frontend-vite': 'web',
    'frontend-tanstack': 'web',
    cli: 'cli',
    backend: 'api',
    'mcp-server': 'mcp',
    'slide-deck': 'slides',
    documentation: 'docs',
  };

  const result: Array<{ type: AppType; name: string }> = [];
  for (const appType of types) {
    const defaultName = defaultAppNames[appType];
    const name = await text({
      message: `Name for ${appType} app?`,
      defaultValue: defaultName,
      validate: (v) => {
        if (!v?.trim()) return 'Please enter a name';
        return validateAppForPrompt(v.trim());
      },
    });

    if (isCancel(name)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    result.push({
      type: appType,
      name: formatEntityName(name.trim(), 'app'),
    });
  }

  return result;
}

export async function promptWithUI(): Promise<boolean> {
  const value = await confirm({
    message: 'Include UI and UI-lib packages for React frontends?',
    initialValue: false,
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return value;
}

export async function promptInitGit(): Promise<boolean> {
  const value = await confirm({
    message: 'Would you like to initialize a new git repository?',
    initialValue: true,
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return value;
}

export async function promptAppType(): Promise<AppType> {
  const value = await select({
    message: 'Select application type',
    options: APP_TYPES.map((t) => {
      const config = getAppTypeConfig(t);
      return {
        value: t,
        label: config?.description ?? t,
      };
    }),
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return value as AppType;
}
