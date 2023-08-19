"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const Logging_1 = __importDefault(require("./../library/Logging"));
const config_1 = require("./../config/config");
const isAuthorized = (req, res, next) => {
    const requestHeader = req.headers["x-reliance-authorization"];
    const SECRETS = JSON.parse(config_1.CONFIG.SHARED_SECRETS);
    if (SECRETS.indexOf(requestHeader) >= 0) {
        Logging_1.default.debug("REQUEST WAS AUTHORIZED");
        next();
    }
    else {
        Logging_1.default.warn("Unauthorized request received");
        res.status(403).json({ error: "Missing or incorrect x-reliance-authorization header" });
    }
};
exports.isAuthorized = isAuthorized;
