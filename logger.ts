import winston, { transports } from "winston";
import util from 'util'
const { combine, timestamp, colorize, errors } = winston.format;
const customFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    if (typeof message === "object" && message !== null) {
      message = util.inspect(message, { depth: 3 });
      return `${timestamp} [${level}]: ${JSON.stringify(message)}`;
    }
    if (!!stack) {
      return `${timestamp} [${level}]: ${stack} ${message}`;
    }


    return `${stack} ${timestamp} [${level}]: ${JSON.stringify(message)}`;
  }
);
const logger = winston.createLogger({
  level: "debug",
  format: combine(
    colorize(),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    errors({
      stack: true,
    }),
    customFormat
  ),
  transports: [new transports.Console(), new winston.transports.File({ filename: 'combined.log' }),],
});

export { logger };
