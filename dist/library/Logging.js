"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const config_1 = require("./../config/config");
const logger = (0, winston_1.createLogger)({
    level: config_1.CONFIG.LOG_LEVEL,
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: config_1.CONFIG.SERVICE_NAME },
    transports: [new winston_1.transports.File({ filename: `${config_1.CONFIG.SERVICE_NAME}-logs.log` })]
});
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize())
    }));
}
exports.default = logger;
