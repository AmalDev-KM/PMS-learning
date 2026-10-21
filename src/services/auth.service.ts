import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { HttpError } from "../utils/HttpError.js";

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
