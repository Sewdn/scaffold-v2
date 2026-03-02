/**
 * @workspace/pkg-domain — Scaffolding for domain package.
 * Shared domain types and entities used across apps and packages.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createPackageConfig } from "@workspace/core-pkg-types";
import { BASE_DEV_DEPS_WITH_BUN } from "@workspace/scaffold-deps";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const domainPackageConfig = createPackageConfig({
  id: "domain",
  description: "Shared domain types and entities",
  stubsDir: join(__dirname, "..", "stubs"),
  getDependencies: () => [],
  getDevDependencies: () => BASE_DEV_DEPS_WITH_BUN,
});
