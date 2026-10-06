/**
 * src/utils/logger.ts
 * Winston structured logger — uses JSON in production for log aggregation,
 * pretty-printed in development.
 */
import winston from 'winston';
import { env } from '../config/env';

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: env.NODE_ENV === 'production'
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      )
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp, ...meta }) => {
          const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} ${level}: ${message}${metaStr}`;
        })
      ),
  transports: [new winston.transports.Console()],
});
