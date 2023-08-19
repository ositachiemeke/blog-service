"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const sequelize_db_1 = require("./database/sequelize-db");
const Logging_1 = __importDefault(require("./library/Logging"));
const Banner_1 = require("./library/Banner");
const server_1 = __importDefault(require("./utils/server"));
const app = (0, server_1.default)();
const ConnectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_db_1.sequelize.authenticate();
        yield sequelize_db_1.sequelize.sync();
        Logging_1.default.info("Connection to the database has been established successfully.");
    }
    catch (error) {
        Logging_1.default.error("Unable to connect to the database:" + error);
    }
});
const StartServer = () => {
    Logging_1.default.info("Server is starting");
    (0, Banner_1.banner)();
    app.listen(config_1.CONFIG.SERVER.PORT, () => Logging_1.default.info(`Server is running on port ${config_1.CONFIG.SERVER.PORT}`));
};
StartServer();
ConnectToDB();
