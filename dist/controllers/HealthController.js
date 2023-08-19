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
const models_1 = __importDefault(require("../models"));
const Logging_1 = __importDefault(require("../library/Logging"));
const healthCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results, metadata] = yield models_1.default.raw.query("SELECT 1+1 AS RESULT;");
        return res.status(200).json({
            status: "UP",
            uptime: process.uptime(),
            checks: {
                db: "UP"
            }
        });
    }
    catch (err) {
        Logging_1.default.error(err);
        return res.status(200).json({
            status: "UP",
            uptime: process.uptime().toFixed(0),
            checks: {
                db: "DOWN"
            }
        });
    }
});
exports.default = { healthCheck };
