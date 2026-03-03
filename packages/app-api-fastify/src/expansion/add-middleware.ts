/**
 * scaffold api-fastify add-middleware — Add middleware to a scaffolded Fastify app.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { SCAFFOLD_MARKER_MIDDLEWARE } from "@workspace/app-api";
import { formatEntityName, renderTemplate, toCamelCase } from "@workspace/core-utils";
import { validateCommandName } from "@workspace/core-utils";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPANSION_STUBS = join(__dirname, "..", "..", "stubs", "expansion");

export async function executeAddMiddleware(
  projectDir: string,
  appName: string,
  name: string,
): Promise<boolean> {
  const middlewareName = formatEntityName(validateCommandName(name), "service");
  const middlewareCamel = toCamelCase(middlewareName);
  const appDir = resolve(projectDir, "apps", appName);
  const middlewareDir = resolve(appDir, "src", "middleware");
  await mkdir(middlewareDir, { recursive: true });

  const middlewarePath = resolve(middlewareDir, `${middlewareName}.ts`);
  if (existsSync(middlewarePath)) return false;

  const template = readFileSync(join(EXPANSION_STUBS, "middleware.ts.stub"), "utf-8");
  const rendered = renderTemplate(template, {
    middlewareName: middlewareCamel,
    camelName: middlewareCamel,
  });
  await writeFile(middlewarePath, rendered);

  patchIndexForMiddleware(appDir, middlewareCamel, middlewareName);
  return true;
}

function patchIndexForMiddleware(
  appDir: string,
  middlewareCamel: string,
  middlewareName: string,
): void {
  const indexPath = resolve(appDir, "src", "index.ts");
  if (!existsSync(indexPath)) {
    console.error(`Error: ${indexPath} not found. Ensure the API app was scaffolded.`);
    process.exit(1);
  }
  let content = readFileSync(indexPath, "utf-8");
  const importPath = `./middleware/${middlewareName}.js`;
  const importName = `${middlewareCamel}Middleware`;

  if (content.includes(importPath)) return;

  const importLine = `import { ${importName} } from "${importPath}";\n`;
  const lastImportMatch = content.match(/import .+ from .+;\n/g);
  const lastImport = lastImportMatch?.[lastImportMatch.length - 1];
  const insertImportAfter = lastImport ? content.indexOf(lastImport) + lastImport.length : 0;
  content = content.slice(0, insertImportAfter) + importLine + content.slice(insertImportAfter);

  const hookLine = `fastify.addHook("preHandler", ${importName});\n`;
  const markerIdx = content.indexOf(SCAFFOLD_MARKER_MIDDLEWARE);
  if (markerIdx !== -1) {
    const lineEnd = content.indexOf("\n", markerIdx);
    const insertAt = lineEnd !== -1 ? lineEnd + 1 : markerIdx + SCAFFOLD_MARKER_MIDDLEWARE.length;
    content = content.slice(0, insertAt) + hookLine + content.slice(insertAt);
  } else {
    const fastifyIdx = content.indexOf("const fastify = Fastify");
    if (fastifyIdx !== -1) {
      const lineEnd = content.indexOf("\n", fastifyIdx);
      const insertAt = lineEnd !== -1 ? lineEnd + 1 : fastifyIdx + "const fastify = Fastify".length;
      content =
        content.slice(0, insertAt) +
        `${SCAFFOLD_MARKER_MIDDLEWARE}\n` +
        hookLine +
        content.slice(insertAt);
    }
  }

  writeFileSync(indexPath, content);
}
