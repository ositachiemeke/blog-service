"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const sequelize_db_1 = require("../database/sequelize-db");
const Users = sequelize_db_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});
exports.Users = Users;
