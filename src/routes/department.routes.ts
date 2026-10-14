import { Router } from "express";

import * as departmentController from "../controllers/department.controller.js";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
  departmentIdSchema,
} from "../validators/department.validator.js";

import { validateBody, validateParams } from "../middlewares/validate.js";

const router = Router();

router.post(
  "/",
  validateBody(createDepartmentSchema),
  departmentController.createDepartment,
);

router.get("/", departmentController.getAllDepartments);

router.get(
  "/:id",
  validateParams(departmentIdSchema),
  departmentController.getDepartmentById,
);

router.patch(
  "/:id",
  validateParams(departmentIdSchema),
  validateBody(updateDepartmentSchema),
  departmentController.updateDepartment,
);

router.delete(
  "/:id",
  validateParams(departmentIdSchema),
  departmentController.deleteDepartment,
);

export default router;
