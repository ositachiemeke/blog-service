"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logging_1 = __importDefault(require("./../library/Logging"));
const Users_1 = __importDefault(require("./../routes/Users"));
const Health_1 = __importDefault(require("./../routes/Health"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        Logging_1.default.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    app.use("/v1/users", Users_1.default);
    app.use("/health", Health_1.default);
    app.use((req, res, next) => {
        const error = new Error("Not found");
        Logging_1.default.error(error);
        res.status(404).json({
            message: error.message
        });
    });
    return app;
};
exports.default = createServer;
