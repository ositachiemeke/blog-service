"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const user_validator_1 = require("./validators/user.validator");
const router = express_1.default.Router();
router.post("/create", user_validator_1.registrationValidators, UsersController_1.default.createUser);
router.get("/:userId", auth_middleware_1.auth, UsersController_1.default.getUserBasedOnId);
router.get("/", auth_middleware_1.auth, UsersController_1.default.getAllUsers);
module.exports = router;
