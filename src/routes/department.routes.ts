import { Router } from "express";
import * as departmentController from "../controllers/department.controller.js";
import {
  createDepartmentRules,
  updateDepartmentRules,
  departmentIdRules,
} from "../validators/department.validator.js";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  createDepartmentRules,
  validate,
  departmentController.createDepartment,
);

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "patient"),
  departmentController.getAllDepartments,
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "doctor", "patient"),
  departmentIdRules,
  validate,
  departmentController.getDepartmentById,
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  departmentIdRules,
  updateDepartmentRules,
  validate,
  departmentController.updateDepartment,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  departmentIdRules,
  validate,
  departmentController.deleteDepartment,
);

export default router;
