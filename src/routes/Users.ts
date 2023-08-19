import express from "express";
import controller from "../controllers/UsersController";
import { isAuthorized } from "./../utils/auth";
import { auth } from "./middleware/auth.middleware";
import { loginValidators, registrationValidators, updateValidators } from "./validators/user.validator";
import { validate } from "./middleware/validator.middleware";

const router = express.Router();

router.post("/create", registrationValidators, validate, controller.createUser);
router.post("/login", loginValidators, validate, controller.loginUser);
router.put("/update", auth(), updateValidators, validate, controller.updateUser);
router.delete("/delete", auth(), controller.deleteUser);

router.get("/:userId", auth(), controller.getUserBasedOnId);

router.get("/", auth, controller.getAllUsers);

export = router;
