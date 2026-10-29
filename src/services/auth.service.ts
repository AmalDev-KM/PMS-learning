import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../utils/HttpError.js";
import { LoginInput } from "../types/auth.types.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new HttpError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "patient",
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new HttpError(403, "Your account is inactive");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(
    {
      role: user.role,
    },
    jwtSecret,
    {
      subject: user._id.toString(),
      expiresIn: "15m",
      issuer: "hospital-management-api",
      audience: "hospital-management-client",
    },
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
