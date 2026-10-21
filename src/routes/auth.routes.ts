import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerRules } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post("/register", registerRules, validate, register);

export default router;
