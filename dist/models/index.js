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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_db_1 = require("../database/sequelize-db");
const Users_1 = require("./../models/Users");
const querySelect = (query, replacements) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sequelize_db_1.sequelize.query(query, {
        replacements: replacements,
        raw: true,
        type: sequelize_1.QueryTypes.SELECT
    });
});
exports.default = {
    raw: sequelize_db_1.sequelize,
    select: querySelect,
    users: Users_1.Users,
    syncAll: function () {
        return __awaiter(this, void 0, void 0, function* () {
            let opts;
            yield this.users.sync(opts);
        });
    }
};
