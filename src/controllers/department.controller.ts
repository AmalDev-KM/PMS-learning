import type { Request, Response, NextFunction } from "express";

import * as departmentService from "../services/department.service.js";

import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "../validators/department.validator.js";

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body as CreateDepartmentInput;
    const department = await departmentService.createDepartment(data);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const departments = await departmentService.getAllDepartments();

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const department = await departmentService.getDepartmentById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body as UpdateDepartmentInput;

    const department = await departmentService.updateDepartment(
      req.params.id as string,
      data,
    );

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const department = await departmentService.deleteDepartment(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};
