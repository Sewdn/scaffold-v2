/**
 * API-specific E2E validators.
 * Validates that scaffolded API apps return expected mock data from CRUD endpoints.
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { AsyncValidator, ValidationContext, ValidationResult } from "@workspace/core-e2e";

const pass = (message: string): ValidationResult => ({ passed: true, message });
const fail = (message: string): ValidationResult => ({ passed: false, message });

/** Expected shape for CRUD list response (paged). */
interface PagedListResponse {
  items?: unknown[];
  total?: number;
  page?: number;
  limit?: number;
}

/** Options for API endpoint validation. */
export interface ApiEndpointsValidatorOptions {
  /** App subdir (e.g. "apps/api-elysia-api") */
  appSubdir: string;
  /** Port for the API (default 34567 to avoid conflicts with other dev servers) */
  port?: number;
  /** Entity paths to validate (e.g. ["users", "posts"]) */
  entityPaths: readonly string[];
  /** How long to wait for server to start (ms) */
  startupMs?: number;
}

/** Start the API app, fetch CRUD endpoints, assert mock data shape, then kill. */
export function apiEndpointsReturnMockData(opts: ApiEndpointsValidatorOptions): AsyncValidator {
  const {
    appSubdir,
    port = 34567,
    entityPaths,
    startupMs = 3000,
  } = opts;

  const id = `api-endpoints:${appSubdir}:${entityPaths.join(",")}`;
  const desc = `API ${appSubdir} endpoints return expected mock data`;

  return {
    type: "async",
    id,
    description: desc,
    async run(ctx: ValidationContext) {
      const cwd = join(ctx.projectDir, appSubdir);
      const baseUrl = `http://127.0.0.1:${port}`;

      const proc = Bun.spawn(
        ["bun", "run", "start"],
        {
          cwd,
          stdin: "ignore",
          stdout: "pipe",
          stderr: "pipe",
          env: { ...process.env, PORT: String(port) },
        },
      );

      const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
      const exitedFirst = await Promise.race([
        proc.exited.then((exit) => ({ type: "exited" as const, exit })),
        sleep(startupMs).then(() => ({ type: "timeout" as const })),
      ]);

      if (exitedFirst.type === "exited") {
        const stderr = await new Response(proc.stderr).text();
        proc.kill();
        return fail(
          `API server exited before validation (exit ${exitedFirst.exit}): ${stderr.slice(0, 200)}`,
        );
      }

      /** Retry fetch up to 3 times with 500ms delay (server may need extra time to bind). */
      const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
        let lastRes: Response | null = null;
        for (let i = 0; i < retries; i++) {
          lastRes = await fetch(url);
          if (lastRes.ok) return lastRes;
          if (i < retries - 1) await sleep(500);
        }
        return lastRes!;
      };

      try {
        for (const path of entityPaths) {
          const listUrl = `${baseUrl}/${path}?page=1&limit=10`;
          const res = await fetchWithRetry(listUrl);
          if (!res.ok) {
            proc.kill();
            return fail(`GET /${path} returned ${res.status}: ${await res.text()}`);
          }
          const listJson = (await res.json()) as PagedListResponse;
          if (!Array.isArray(listJson.items) || listJson.items.length < 1) {
            proc.kill();
            return fail(`GET /${path} returned invalid list: ${JSON.stringify(listJson).slice(0, 150)}`);
          }
          const first = listJson.items[0] as { id?: string; name?: string };
          if (typeof first.id !== "string" || typeof first.name !== "string") {
            proc.kill();
            return fail(`GET /${path} items missing id/name: ${JSON.stringify(first)}`);
          }

          const getUrl = `${baseUrl}/${path}/${first.id}`;
          const getRes = await fetch(getUrl);
          if (!getRes.ok) {
            proc.kill();
            return fail(`GET /${path}/${first.id} returned ${getRes.status}`);
          }
          const item = (await getRes.json()) as { id?: string; name?: string };
          if (item.id !== first.id || typeof item.name !== "string") {
            proc.kill();
            return fail(`GET /${path}/${first.id} returned invalid item: ${JSON.stringify(item)}`);
          }
        }
      } finally {
        proc.kill();
      }

      return pass(desc);
    },
  };
}
