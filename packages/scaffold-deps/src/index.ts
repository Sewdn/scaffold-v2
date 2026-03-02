/**
 * Central dependency version management.
 *
 * - **DEP_***: Version constants (single source of truth). Use in configs.
 * - **BASE_DEV_DEPS**, **UI_DEPS**: Shared arrays (reused across packages).
 * - **Profiles**: Only for composing shared arrays. Define deps inline in configs
 *   unless reuse is needed.
 */

/** Workspace ref for a project package */
export const wsRef = (projectName: string, pkg: string) => `@${projectName}/${pkg}@workspace:*`;

// ─── Version constants (single source of truth) ─────────────────────────────
const V = {
  typescript: 'typescript@^5.9.3',
  eslint: 'eslint@^9',
  bunTypes: 'bun-types@latest',
  effect: 'effect@^3.19.19',
  dotenv: 'dotenv@^16.4.5',
  dotenvCli: 'dotenv-cli@^10.0.0',
  postcss: 'postcss@^8.5.3',
  tailwindcss: 'tailwindcss@^3.4.14',
  cva: 'class-variance-authority@^0.7.1',
  clsx: 'clsx@^2.1.1',
  lucide: 'lucide-react@^0.486.0',
  nextThemes: 'next-themes@^0.4.6',
  react: 'react@^19.1.0',
  reactDom: 'react-dom@^19.1.0',
  typesReact: '@types/react@^19',
  typesReactDom: '@types/react-dom@^19',
  tailwindMerge: 'tailwind-merge@^3.1.0',
  tailwindAnimate: 'tailwindcss-animate@^1.0.7',
  elysia: 'elysia@^1.2.9',
  elysiaSwagger: '@elysiajs/swagger@^1.2.0',
  elysiaCors: '@elysiajs/cors@^1.2.0',
  commander: 'commander@^14.0.3',
  mcpSdk: '@modelcontextprotocol/sdk@^1.9.0',
  prismaClient: '@prisma/client@^7.2.0',
  prisma: 'prisma@^7.2.0',
} as const;

/** Single dep constants for direct use (e.g. in app-types) */
export const DEP_TYPESCRIPT = V.typescript;
export const DEP_BUN_TYPES = V.bunTypes;
export const DEP_EFFECT = V.effect;
export const DEP_DOTENV = V.dotenv;
export const DEP_DOTENV_CLI = V.dotenvCli;
export const DEP_ELYSIA = V.elysia;
export const DEP_ELYSIA_SWAGGER = V.elysiaSwagger;
export const DEP_ELYSIA_CORS = V.elysiaCors;
export const DEP_COMMANDER = V.commander;
export const DEP_MCP_SDK = V.mcpSdk;
export const DEP_PRISMA_CLIENT = V.prismaClient;
export const DEP_PRISMA = V.prisma;
export const DEP_POSTCSS = V.postcss;
export const DEP_TAILWINDCSS = V.tailwindcss;
export const typesReact = V.typesReact;
export const typesReactDom = V.typesReactDom;

// ─── Dependency profiles (composable building blocks) ────────────────────────

export interface DepProfile {
  readonly dependencies?: readonly string[];
  readonly devDependencies?: readonly string[];
}

/** Base tooling: eslint-config, typescript-config, typescript, eslint */
export const profileBase: DepProfile = {
  devDependencies: [
    '@workspace/eslint-config@workspace:*',
    '@workspace/typescript-config@workspace:*',
    V.typescript,
    V.eslint,
  ],
};

/** Bun type definitions (for TS-only packages without build) */
export const profileBunTypes: DepProfile = {
  devDependencies: [V.bunTypes],
};

/** React runtime */
export const profileReact: DepProfile = {
  dependencies: [V.react, V.reactDom],
};

/** Shadcn primitives: cva, clsx, lucide, next-themes, tailwind-merge, tailwindcss-animate */
export const profileShadcn: DepProfile = {
  dependencies: [V.cva, V.clsx, V.lucide, V.nextThemes, V.tailwindMerge, V.tailwindAnimate],
};

// ─── Compose: merge profiles into a single DepProfile ─────────────────────

function mergeArrays<T>(...arrs: (readonly T[] | undefined)[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const arr of arrs) {
    if (!arr) continue;
    for (const item of arr) {
      const key = String(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Compose multiple profiles into one. Later profiles override earlier for same deps.
 * Order matters: base profiles first, then specific stacks.
 */
export function composeProfiles(...profiles: DepProfile[]): DepProfile {
  return {
    dependencies: mergeArrays(...profiles.map(p => p.dependencies)),
    devDependencies: mergeArrays(...profiles.map(p => p.devDependencies)),
  };
}

/**
 * Extract dependencies array from a composed profile.
 */
export function getDependencies(profile: DepProfile): string[] {
  return [...(profile.dependencies ?? [])];
}

/**
 * Extract devDependencies array from a composed profile.
 */
export function getDevDependencies(profile: DepProfile): string[] {
  return [...(profile.devDependencies ?? [])];
}

// ─── Pre-composed profiles (package/app type configs) ────────────────────────

/** Base + bun-types (domain, simple TS packages) */
const composedBaseWithBun = composeProfiles(profileBase, profileBunTypes);
export const BASE_DEV_DEPS_WITH_BUN = getDevDependencies(composedBaseWithBun);

/** Base only (svc-config, ui-lib, svc-prisma, dynamic packages) */
export const BASE_DEV_DEPS = getDevDependencies(profileBase);

/** React + Shadcn (shared by ui, ui-lib) */
const composedUi = composeProfiles(profileReact, profileShadcn);
export const UI_DEPS = getDependencies(composedUi);
