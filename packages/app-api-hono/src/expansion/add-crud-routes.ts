/**
 * scaffold api-hono add-crud-routes — Add CRUD routes + handlers for an entity.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { SCAFFOLD_MARKER_CRUD_ENTRIES, SHARED_STUBS_DIR } from "@workspace/app-api";
import {
  formatEntityName,
  renderTemplate,
  toCamelCase,
  toPascalCase,
} from "@workspace/core-utils";
import { validateCommandName } from "@workspace/core-utils";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPANSION_STUBS = join(__dirname, "..", "..", "stubs", "expansion");
export async function executeAddCrudRoutes(
  projectDir: string,
  appName: string,
  name: string,
  path?: string,
): Promise<boolean> {
  const routeName = formatEntityName(validateCommandName(name), "service");
  const routeCamel = toCamelCase(routeName);
  const appDir = resolve(projectDir, "apps", appName);
  const routesDir = resolve(appDir, "src", "routes");
  const handlersDir = resolve(appDir, "src", "handlers");
  await mkdir(routesDir, { recursive: true });
  await mkdir(handlersDir, { recursive: true });

  const routePath = resolve(routesDir, `${routeName}.ts`);
  const handlersPath = resolve(handlersDir, `${routeName}.ts`);
  const commonPath = resolve(handlersDir, "common.ts");
  if (existsSync(routePath)) return false;

  await ensureCommonHandlers(handlersDir, commonPath);

  const routeTemplate = readFileSync(join(EXPANSION_STUBS, "route-crud.ts.stub"), "utf-8");
  const handlersTemplate = readFileSync(join(SHARED_STUBS_DIR, "handlers-crud.ts.stub"), "utf-8");
  const context = {
    routeName: routeCamel,
    pascalName: toPascalCase(routeName),
    path: path ?? routeName,
  };

  const urlPath = path ?? routeName;
  await writeFile(routePath, renderTemplate(routeTemplate, { ...context, path: urlPath }));
  await writeFile(handlersPath, renderTemplate(handlersTemplate, context));

  patchRegistryForRoute(appDir, routeCamel, routeName, urlPath);
  return true;
}

function patchRegistryForRoute(
  appDir: string,
  routeCamel: string,
  routeName: string,
  urlPath: string,
): void {
  const registryPath = resolve(appDir, "src", "routes", "registry.ts");
  if (!existsSync(registryPath)) {
    console.error(`Error: ${registryPath} not found. Ensure the API app was scaffolded.`);
    process.exit(1);
  }
  let content = readFileSync(registryPath, "utf-8");
  const importPath = `./${routeName}.js`;
  const importName = `${routeCamel}Routes`;

  if (content.includes(importPath)) return;

  const importLine = `import { ${importName} } from "${importPath}";\n`;
  const lastImportMatch = content.match(/import .+ from .+;\n/g);
  const lastImport = lastImportMatch?.[lastImportMatch.length - 1];
  const insertImportAfter = lastImport ? content.indexOf(lastImport) + lastImport.length : 0;
  content = content.slice(0, insertImportAfter) + importLine + content.slice(insertImportAfter);

  const entryLine = `\n  { path: "/${urlPath}", routes: ${importName} },\n  ${SCAFFOLD_MARKER_CRUD_ENTRIES}`;
  content = content.replace(/\s*\/\/ @scaffold-api:crud-entries/, entryLine);

  writeFileSync(registryPath, content);
}

async function ensureCommonHandlers(handlersDir: string, commonPath: string): Promise<void> {
  if (existsSync(commonPath)) return;
  const commonTemplate = readFileSync(join(SHARED_STUBS_DIR, "common.ts.stub"), "utf-8");
  await writeFile(commonPath, commonTemplate);
}
