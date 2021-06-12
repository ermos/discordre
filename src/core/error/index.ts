import log from '@core/log';

const error = {
  fatal(message: string): void {
    log.error(message);
    process.exit(0);
  },
  trace(message: string): void {
    log.error(message);
  },
  error(message: string): void {
    log.error(message);
    throw message;
  },
};

const errorPromise = {
  fatal(err: Error): void {
    log.error(err.message);
    process.exit(1);
  },
  trace(err: Error): void {
    log.error(err.message);
  },
  error(err: Error): Error {
    log.error(err.message);
    return err;
  },
};

export { error, errorPromise };
