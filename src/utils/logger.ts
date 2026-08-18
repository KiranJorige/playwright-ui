// We are adding simple logger utility

export class Logger {
  static info(message: string, ...args: unknown[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  static error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  static debug(message: string, ...args: unknown[]): void {
    console.debug(`[DEBUG] ${message}`, ...args);
  }
}

// Usage example:
// Logger.info('Request Sent'', reqDetails);
// Logger.warn('Using default test data');
// Logger.error('Login failed');
// Logger.debug('Navigated to login page');
