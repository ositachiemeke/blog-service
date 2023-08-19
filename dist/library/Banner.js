"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const Logging_1 = __importDefault(require("./Logging"));
const banner = () => {
    Logging_1.default.info("\n" +
        "+==================================================+" +
        "\n" +
        "| Application Name:   SAMPLE-MS                    |" +
        "\n" +
        "+==================================================+" +
        "\n");
};
exports.banner = banner;
