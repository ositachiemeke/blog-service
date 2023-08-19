"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const HealthController_1 = __importDefault(require("../controllers/HealthController"));
const router = express_1.default.Router();
router.get("/", HealthController_1.default.healthCheck);
module.exports = router;
