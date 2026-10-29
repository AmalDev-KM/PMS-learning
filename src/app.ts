import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import departmentRoutes from "./routes/department.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health-check route
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "PMS API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);

// Keep the error handler after all routes.
app.use(errorHandler);

export default app;
