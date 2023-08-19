"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Logging_1 = __importDefault(require("../library/Logging"));
const config_1 = require("../config/config");
const sequelize = new sequelize_1.Sequelize(config_1.CONFIG.DATABASE.NAME, config_1.CONFIG.DATABASE.USERNAME, config_1.CONFIG.DATABASE.PASSWORD, {
    host: config_1.CONFIG.DATABASE.HOST,
    dialect: "mysql",
    logging: (...msg) => Logging_1.default.info(msg[0]),
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    },
    define: {
        freezeTableName: true
    }
});
exports.sequelize = sequelize;
