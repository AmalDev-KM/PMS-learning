import mongoose from "mongoose";

import Department from "../models/Department.js";
import { HttpError } from "../utils/HttpError.js";

import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "../validators/department.validator.js";

export const createDepartment = async (data: CreateDepartmentInput) => {
  return await Department.create({
    ...data,
    status: data.status ?? "active",
  });
};

export const getAllDepartments = async () => {
  return Department.find().sort({ createdAt: -1 });
};

export const getDepartmentById = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(400, "Invalid department ID");
  }

  const department = await Department.findById(id);

  if (!department) {
    throw new HttpError(404, "Department not found");
  }

  return department;
};

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentInput,
) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(400, "Invalid department ID");
  }

  const department = await Department.findByIdAndUpdate(
    id,
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!department) {
    throw new HttpError(404, "Department not found");
  }

  return department;
};

export const deleteDepartment = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(400, "Invalid department ID");
  }

  const department = await Department.findByIdAndDelete(id);

  if (!department) {
    throw new HttpError(404, "Department not found");
  }

  return department;
};
