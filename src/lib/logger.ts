import * as Sentry from "@sentry/nextjs";
import { isProduction } from "./utils";

// Enhanced structured logger with Sentry integration
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private level: LogLevel;
  private sentryLogger: typeof Sentry.logger | null = null;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
    
    // Initialize Sentry logger if available
    try {
      this.sentryLogger = Sentry.logger;
    } catch {
      // Sentry not initialized, will fall back to console only
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.level;
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    const levelName = LogLevel[level];

    let logMessage = `[${timestamp}] ${levelName}: ${message}`;

    if (context && Object.keys(context).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(context)}`;
    }

    if (error) {
      logMessage += ` | Error: ${error.message}`;
      if (error.stack) {
        logMessage += ` | Stack: ${error.stack}`;
      }
    }

    return logMessage;
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    const formattedLog = this.formatLog(entry);

    // Use appropriate console method based on level
    switch (level) {
      case LogLevel.ERROR:
        // eslint-disable-next-line no-console
        console.error(formattedLog);
        // Send errors to Sentry
        if (this.sentryLogger) {
          this.sentryLogger.error(message, context);
        }
        if (error) {
          Sentry.captureException(error, { extra: context });
        }
        break;
      case LogLevel.WARN:
        // eslint-disable-next-line no-console
        console.warn(formattedLog);
        if (this.sentryLogger) {
          this.sentryLogger.warn(message, context);
        }
        break;
      case LogLevel.INFO:
        // eslint-disable-next-line no-console
        console.info(formattedLog);
        if (this.sentryLogger) {
          this.sentryLogger.info(message, context);
        }
        break;
      case LogLevel.DEBUG:
        // eslint-disable-next-line no-console
        console.debug(formattedLog);
        if (this.sentryLogger) {
          this.sentryLogger.debug(message, context);
        }
        break;
      case LogLevel.TRACE:
        // eslint-disable-next-line no-console
        console.debug(formattedLog);
        if (this.sentryLogger) {
          this.sentryLogger.trace(message, context);
        }
        break;
    }
  }

  trace(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.TRACE, message, context);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  fatal(message: string, context?: Record<string, unknown>): void {
    // Fatal is treated as error with highest priority
    this.log(LogLevel.ERROR, `FATAL: ${message}`, context);
    if (this.sentryLogger) {
      this.sentryLogger.fatal(message, context);
    }
  }
}

// Create logger instance
const logLevel = !isProduction() ? LogLevel.DEBUG : LogLevel.INFO;
export const logger = new Logger(logLevel);
  