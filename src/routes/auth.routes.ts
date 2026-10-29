import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { loginRules, registerRules } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post("/register", registerRules, validate, register);

router.post("/login", loginRules, validate, login);

export default router;
