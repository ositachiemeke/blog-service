"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationValidators = exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
const loginValidators = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
];
exports.loginValidators = loginValidators;
const registrationValidators = [
    (0, express_validator_1.body)('username')
        .notEmpty()
        .withMessage('Username is required'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
exports.registrationValidators = registrationValidators;
