import express from "express";
import controller from "../controllers/HealthController";

const router = express.Router();

router.get("/", controller.healthCheck);

export = router;
