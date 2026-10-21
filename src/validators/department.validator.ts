import { body, param } from "express-validator";

export interface CreateDepartmentInput {
  name: string;
  code: string;
  description?: string;
  location?: string;
  status?: "active" | "inactive";
}

export interface UpdateDepartmentInput {
  name?: string;
  code?: string;
  description?: string;
  location?: string;
  status?: "active" | "inactive";
}

export const createDepartmentRules = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  // body("code")
  //   .isString()
  //   .withMessage("Code must be a string")
  //   .bail()
  //   .trim()
  //   .isLength({ min: 2, max: 10 })
  //   .withMessage("Code must be between 2 and 10 characters")
  //   .matches(/^[A-Za-z0-9_-]+$/)
  //   .withMessage("Code can contain letters, numbers, underscores, and hyphens")
  //   .toUpperCase(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .bail()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const updateDepartmentRules = [
  body().custom((value) => {
    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value) ||
      Object.keys(value).length === 0
    ) {
      throw new Error("At least one field must be provided");
    }
    return true;
  }),

  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  // body("code")
  //   .optional()
  //   .isString()
  //   .withMessage("Code must be a string")
  //   .bail()
  //   .trim()
  //   .isLength({ min: 2, max: 10 })
  //   .withMessage("Code must be between 2 and 10 characters")
  //   .matches(/^[A-Za-z0-9_-]+$/)
  //   .withMessage("Invalid department code")
  //   .toUpperCase(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .bail()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const departmentIdRules = [
  param("id").isMongoId().withMessage("Invalid department ID"),
];
