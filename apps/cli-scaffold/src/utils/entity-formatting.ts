import { toPascalCase, toKebabCase, isKebabCase, isPascalCase } from './formatting.js';

export type EntityType =
  | 'project'
  | 'app'
  | 'module'
  | 'package'
  | 'service'
  | 'component'
  | 'command'
  | 'cli-service';

export const formatEntityName = (name: string, entityType: EntityType): string => {
  if (!name) return name;
  if (entityType === 'component') return formatComponentName(name);
  return formatKebabName(name);
};

export const formatComponentName = (name: string): string =>
  isPascalCase(name) ? name : toPascalCase(name);

export const formatComponent = (name: string): string => formatEntityName(name, 'component');

export const formatKebabName = (name: string): string =>
  isKebabCase(name) ? name : toKebabCase(name);

export const formatProject = (name: string): string => formatEntityName(name, 'project');
export const formatApp = (name: string): string => formatEntityName(name, 'app');
export const formatModule = (name: string): string => formatEntityName(name, 'module');
export const formatPackage = (name: string): string => formatEntityName(name, 'package');
export const formatService = (name: string): string => formatEntityName(name, 'service');
export const formatCommand = (name: string): string => formatEntityName(name, 'command');
export const formatCliService = (name: string): string => formatEntityName(name, 'cli-service');
