/**
 * ScaffoldRunner service. Executes scaffold CLI commands.
 */

import { Context, Effect, Layer } from "effect";
import type { ScaffoldStep } from "../types.js";
import { ScaffoldExecutionError } from "../errors.js";
import { E2EConfig } from "./config.js";

/** Commands that get --non-interactive appended when not present. API expansion commands don't support it. */
const NON_INTERACTIVE_COMMANDS: string[] = ["project", "init", "app"];

export interface ScaffoldRunner {
  readonly runStep: (
    step: ScaffoldStep,
    cwd: string,
  ) => Effect.Effect<void, ScaffoldExecutionError>;
}

export const ScaffoldRunner = Context.GenericTag<ScaffoldRunner>("ScaffoldRunner");

const runStepImpl = (
  step: ScaffoldStep,
  cwd: string,
  scaffoldCliPath: string,
): Effect.Effect<void, ScaffoldExecutionError> =>
  Effect.async<void, ScaffoldExecutionError>((resume) => {
    const needsNonInteractive = NON_INTERACTIVE_COMMANDS.includes(step.command);
    const args = [...step.args];
    if (needsNonInteractive && !args.includes("--non-interactive")) {
      args.push("--non-interactive");
    }
    const fullArgs = [step.command, ...args];
    const proc = Bun.spawn(["bun", scaffoldCliPath, ...fullArgs], {
      cwd,
      stdin: "ignore",
      stdout: "pipe",
      stderr: "pipe",
    });

    proc.exited.then((exit) => {
      if (exit === 0) {
        resume(Effect.succeed(undefined));
      } else {
        Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text()]).then(
          ([stdout, stderr]) => {
            resume(
              Effect.fail(
                new ScaffoldExecutionError({
                  command: step.command,
                  args: fullArgs,
                  exitCode: exit,
                  stderr,
                  stdout,
                }),
              ),
            );
          },
        );
      }
    });
  });

export const ScaffoldRunnerLive = Layer.effect(
  ScaffoldRunner,
  Effect.gen(function* () {
    const config = yield* E2EConfig;
    return {
      runStep: (step, cwd) => runStepImpl(step, cwd, config.scaffoldCliPath),
    };
  }),
);
