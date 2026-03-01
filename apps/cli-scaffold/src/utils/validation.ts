import { isKebabCase, isPascalCase } from './formatting.js';
import {
  formatProject,
  formatApp,
  formatService,
  formatModule,
  formatPackage,
  formatComponent,
  formatCommand,
  formatCliService,
} from './entity-formatting.js';

type EntityType =
  | 'project'
  | 'app'
  | 'module'
  | 'package'
  | 'service'
  | 'component'
  | 'command'
  | 'cli-service';

function validateKebabName(name: string, entityType: string): string {
  if (!/^[a-z]/.test(name)) {
    throw new Error(`${entityType} name must start with a lowercase letter`);
  }
  if (!/^[a-z0-9-]+$/.test(name)) {
    throw new Error(`${entityType} name can only contain lowercase letters, numbers, and hyphens`);
  }
  if (/--/.test(name) || name.endsWith('-')) {
    throw new Error(`${entityType} name must follow kebab-case format`);
  }
  if (!isKebabCase(name)) {
    throw new Error(`${entityType} name must be in kebab-case format`);
  }
  return name;
}

function validateEntityName(name: string, entityType: EntityType): string {
  if (!name) throw new Error(`${entityType} name cannot be empty`);
  const maxLength = entityType === 'component' ? 50 : 214;
  if (name.length > maxLength) {
    throw new Error(`${entityType} name is too long (max ${maxLength} characters)`);
  }
  if (entityType === 'component') return validateComponentName(name);
  return validateKebabName(name, entityType);
}

export function validateProjectName(name: string): string {
  return formatProject(validateEntityName(name, 'project'));
}

export function validateAppName(name: string): string {
  return formatApp(validateEntityName(name, 'app'));
}

export function validateComponentName(name: string): string {
  if (!name) throw new Error('Component name cannot be empty');
  if (!/^[a-zA-Z]/.test(name)) throw new Error('Component name must start with a letter');
  if (!/^[a-zA-Z0-9-]+$/.test(name)) {
    throw new Error('Component name can only contain letters, numbers, and hyphens');
  }
  if (name.length > 50) throw new Error('Component name is too long (max 50 characters)');
  if (!isPascalCase(name)) throw new Error('Component name should be in PascalCase format');
  return formatComponent(name);
}

export function validateServiceName(name: string): string {
  return formatService(validateEntityName(name, 'service'));
}

export function validateModuleName(name: string): string {
  return formatModule(validateEntityName(name, 'module'));
}

export function validatePackageName(name: string): string {
  return formatPackage(validateEntityName(name, 'package'));
}

export function validateCommandName(name: string): string {
  return formatCommand(validateEntityName(name, 'command'));
}

export function validateCliServiceName(name: string): string {
  return formatCliService(validateEntityName(name, 'cli-service'));
}
