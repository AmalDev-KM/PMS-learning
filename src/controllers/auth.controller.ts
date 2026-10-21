import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
