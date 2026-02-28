/**
 * ValidatorExecutor service. Runs sync and async validators.
 */

import { Context, Effect, Layer } from 'effect';
import type { ValidationContext, ValidationResult, Validator } from '../types.js';

export interface ValidatorExecutor {
  readonly run: (
    validators: readonly Validator[],
    ctx: ValidationContext,
  ) => Effect.Effect<readonly ValidationResult[]>;
}

export const ValidatorExecutor = Context.GenericTag<ValidatorExecutor>('ValidatorExecutor');

const runValidator = (
  v: Validator,
  ctx: ValidationContext,
): Effect.Effect<ValidationResult> =>
  v.type === 'sync'
    ? Effect.sync(() => v.run(ctx))
    : Effect.promise(() => v.run(ctx));

export const ValidatorExecutorLive = Layer.succeed(ValidatorExecutor, {
  run: (validators, ctx) =>
    Effect.forEach(validators, (v) => runValidator(v, ctx), { concurrency: 1 }),
});
