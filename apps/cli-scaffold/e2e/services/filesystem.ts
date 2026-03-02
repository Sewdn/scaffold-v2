/**
 * FileSystem service for temp dir creation and removal.
 */

import { mkdtempSync, mkdirSync, rmSync, existsSync } from "fs";
import { join } from "path";
import { Context, Effect, Layer } from "effect";
import { E2EConfig } from "./config.js";

export interface FileSystem {
  readonly createTempDir: () => string;
  readonly removeTempDir: (dir: string) => Effect.Effect<void>;
}

export const FileSystem = Context.GenericTag<FileSystem>("FileSystem");

export const FileSystemLive = Layer.effect(
  FileSystem,
  Effect.gen(function* () {
    const config = yield* E2EConfig;
    return {
      createTempDir: () => {
        if (!existsSync(config.workspaceBaseDir)) {
          mkdirSync(config.workspaceBaseDir, { recursive: true });
        }
        return mkdtempSync(join(config.workspaceBaseDir, config.tempDirPrefix));
      },
      removeTempDir: (dir: string) =>
        Effect.sync(() => {
          if (!config.keepTempOnExit && existsSync(dir)) {
            rmSync(dir, { recursive: true, force: true });
          }
        }),
    };
  }),
);
