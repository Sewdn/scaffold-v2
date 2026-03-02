import type { PackageConfig } from '@workspace/core-pkg-types';
import { domainPackageConfig } from '@workspace/pkg-domain';
import { svcConfigPackageConfig } from '@workspace/pkg-svc-config';
import { uiPackageConfig } from '@workspace/pkg-ui';
import { uiLibPackageConfig } from '@workspace/pkg-ui-lib';
import { svcPrisma } from './svc-prisma/index.js';

const ALL_PACKAGES: PackageConfig[] = [
  domainPackageConfig,
  svcConfigPackageConfig,
  uiPackageConfig,
  uiLibPackageConfig,
  svcPrisma,
];

const REGISTRY = new Map<string, PackageConfig>(
  ALL_PACKAGES.map((c) => [c.id, c]),
);

/** Package ids shown as optional during project create (order matters for deps) */
export const OPTIONAL_PACKAGE_IDS = ['domain', 'svc-config', 'ui', 'ui-lib'] as const;
export type OptionalPackage = (typeof OPTIONAL_PACKAGE_IDS)[number];

/**
 * Get package config by id.
 */
export function getPackageConfig(packageType: string): PackageConfig | undefined {
  return REGISTRY.get(packageType);
}

/**
 * List all package ids in registry order.
 */
export function getAllPackageIds(): string[] {
  return ALL_PACKAGES.map((c) => c.id);
}
