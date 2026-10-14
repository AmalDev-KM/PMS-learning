import type { Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
import { HttpError } from "../utils/HttpError.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: Object.values(error.errors).map((item) => item.message),
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid data format",
    });
    return;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "Department name or code already exists",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
