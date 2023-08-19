"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const DB_HOST = process.env.DB_HOST || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVICE_NAME = process.env.SERVICE_NAME || "Microservice";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const SHARED_SECRETS = process.env.SHARED_SECRETS || "";
exports.CONFIG = {
    DATABASE: {
        HOST: DB_HOST,
        USERNAME: DB_USERNAME,
        PASSWORD: DB_PASSWORD,
        NAME: DB_DATABASE
    },
    SERVER: {
        PORT: SERVER_PORT
    },
    SERVICE_NAME,
    LOG_LEVEL,
    SHARED_SECRETS
};
