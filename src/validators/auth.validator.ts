import { body } from "express-validator";

export const registerRules = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters"),

  body("role")
    .not()
    .exists()
    .withMessage("Role cannot be assigned during registration"),
];

export const loginRules = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required"),
];
