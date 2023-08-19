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
const uuid_1 = require("uuid");
const Logging_1 = __importDefault(require("./../library/Logging"));
const models_1 = __importDefault(require("./../models"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const id = (0, uuid_1.v4)();
    let validInput = true;
    try {
        const newUser = yield models_1.default.users.create({
            id,
            name,
            email
        });
        return res.status(201).json({ user: newUser });
    }
    catch (err) {
        if (err instanceof Error)
            Logging_1.default.error(err.name);
        return res.status(500).json({ message: "Problem inserting user, was everything unique that needed to be?" });
    }
});
const getUserBasedOnId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const result = yield models_1.default.users.findByPk(userId);
        if (result) {
            return res.status(200).json({ user: result });
        }
        else {
            return res.status(404).json({ message: "user not found" });
        }
    }
    catch (err) {
        return res.status(500).json({});
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let queryObj = {};
    if (req.query.limit) {
        let limit = parseInt(req.query.limit.toString());
        Object.assign(queryObj, { limit: limit });
    }
    if (req.query.offset) {
        let offset = parseInt(req.query.offset.toString());
        Object.assign(queryObj, { offset: offset });
    }
    try {
        const result = yield models_1.default.users.findAndCountAll(queryObj);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: "DB error performing query to get users" });
    }
});
exports.default = { createUser, getUserBasedOnId, getAllUsers };
