import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createPackageConfig } from "@workspace/core-pkg-types";
import {
  BASE_DEV_DEPS,
  DEP_EFFECT,
  DEP_PRISMA_CLIENT,
  DEP_PRISMA,
  DEP_DOTENV_CLI,
  wsRef,
} from "@workspace/scaffold-deps";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const svcPrisma = createPackageConfig({
  id: "svc-prisma",
  description: "Data service with Prisma ORM",
  stubsDir: join(__dirname, "stubs"),
  getDependencies: (ctx) => {
    const deps: string[] = [DEP_PRISMA_CLIENT, DEP_EFFECT];
    if (ctx.hasDomain) {
      deps.unshift(wsRef(ctx.projectName, "domain"));
    }
    return deps;
  },
  getDevDependencies: () => [...BASE_DEV_DEPS, DEP_PRISMA, DEP_DOTENV_CLI],
  getMkdirPaths: () => ["src", "prisma"],
  getScripts: () => ({
    "db:generate": "dotenv -e .env.local -- prisma generate",
    "db:push": "dotenv -e .env.local -- prisma db push",
    "db:migrate": "dotenv -e .env.local -- prisma migrate dev",
    "db:studio": "dotenv -e .env.local -- prisma studio",
  }),
});
