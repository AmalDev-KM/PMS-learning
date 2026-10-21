import { Router } from "express";
import * as departmentController from "../controllers/department.controller.js";
import {
  createDepartmentRules,
  updateDepartmentRules,
  departmentIdRules,
} from "../validators/department.validator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post(
  "/",
  createDepartmentRules,
  validate,
  departmentController.createDepartment,
);

router.get("/", departmentController.getAllDepartments);

router.get(
  "/:id",
  departmentIdRules,
  validate,
  departmentController.getDepartmentById,
);

router.patch(
  "/:id",
  departmentIdRules,
  updateDepartmentRules,
  validate,
  departmentController.updateDepartment,
);

router.delete(
  "/:id",
  departmentIdRules,
  validate,
  departmentController.deleteDepartment,
);

export default router;
