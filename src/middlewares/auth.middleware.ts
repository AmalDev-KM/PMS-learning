import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { UserRole } from "../models/User.js";

export interface AuthenticatedUser {
  userId: string;
  role: UserRole;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({
      success: false,
      message: `Unauthorized, Access denied ${token}`,
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    next(new Error("JWT_SECRET is not configured"));
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: "hospital-management-api",
      audience: "hospital-management-client",
    });

    if (typeof decoded === "string") {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    const payload = decoded as JwtPayload;
    const allowedRoles: UserRole[] = ["admin", "doctor", "patient"];

    if (
      typeof payload.sub !== "string" ||
      !allowedRoles.includes(payload.role as UserRole)
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    req.auth = {
      userId: payload.sub,
      role: payload.role as UserRole,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
