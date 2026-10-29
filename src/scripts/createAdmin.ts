import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

const createAdmin = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!mongoUri || !email || !password) {
    throw new Error("Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env");
  }

  if (password.length < 8 || password.length > 12) {
    throw new Error("Admin password must be 8–12 characters");
  }

  await mongoose.connect(mongoUri);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        "This email already belongs to another user. Choose a new email.",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: "System Administrator",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin account created successfully.");
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin().catch((error: unknown) => {
  console.error("Admin creation failed:", error);
  process.exitCode = 1;
});
