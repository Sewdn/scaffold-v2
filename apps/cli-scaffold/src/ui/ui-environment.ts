import { intro, log, outro, spinner } from '@clack/prompts';
import chalk from 'chalk';

export interface UIEnvironment {
  intro: (message: string) => void;
  outro: (message: string) => void;
  log: {
    info: (message: string) => void;
    success: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
  };
  spinner: (message: string) => {
    start: () => void;
    stop: (message: string) => void;
  };
}

export function createUIEnvironment(silent = false): UIEnvironment {
  if (silent) {
    return {
      intro: () => {},
      outro: () => {},
      log: {
        info: () => {},
        success: () => {},
        warn: () => {},
        error: (m) => console.error(m),
      },
      spinner: (msg) => {
        let s: ReturnType<typeof spinner>;
        return {
          start: () => {
            s = spinner();
            s.start(msg);
          },
          stop: (stopMsg) => {
            s?.stop(stopMsg);
          },
        };
      },
    };
  }

  return {
    intro: (message: string) => intro(message),
    outro: (message: string) => outro(message),
    log: {
      info: (message: string) => log.info(chalk.blue(message)),
      success: (message: string) => log.success(chalk.green(message)),
      warn: (message: string) => log.warn(chalk.yellow(message)),
      error: (message: string) => log.error(chalk.red(message)),
    },
    spinner: (message: string) => {
      const s = spinner();
      return {
        start: () => s.start(message),
        stop: (stopMessage: string) => s.stop(chalk.green(stopMessage)),
      };
    },
  };
}
