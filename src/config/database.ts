import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();
const dbConnect = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the .env file");
  }

  await mongoose.connect(mongoUri);

  console.log("Database connected successfully");
};

export default dbConnect;
