/**
 * scaffold api-fastify add-handler — Add a handler to a scaffolded Fastify app.
 */

import { existsSync, readFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { SHARED_STUBS_DIR } from "@workspace/app-api";
import { formatEntityName, renderTemplate, toCamelCase } from "@workspace/core-utils";
import { validateCommandName } from "@workspace/core-utils";

export async function executeAddHandler(
  projectDir: string,
  appName: string,
  name: string,
): Promise<boolean> {
  const handlerName = formatEntityName(validateCommandName(name), "service");
  const handlerCamel = toCamelCase(handlerName);
  const appDir = resolve(projectDir, "apps", appName);
  const handlersDir = resolve(appDir, "src", "handlers");
  await mkdir(handlersDir, { recursive: true });

  const handlerPath = resolve(handlersDir, `${handlerName}.ts`);
  if (existsSync(handlerPath)) return false;

  const template = readFileSync(join(SHARED_STUBS_DIR, "handler.ts.stub"), "utf-8");
  const rendered = renderTemplate(template, {
    handlerName: handlerCamel,
  });
  await writeFile(handlerPath, rendered);

  return true;
}
