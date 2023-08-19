import { createLogger, format, transports } from "winston";
import { CONFIG } from "./../config/config";

const logger = createLogger({
  level: CONFIG.LOG_LEVEL,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: CONFIG.SERVICE_NAME },
  transports: [new transports.File({ filename: `${CONFIG.SERVICE_NAME}-logs.log` })]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize())
    })
  );
}

export default logger;
