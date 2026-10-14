import { z } from "zod";

export const createDepartmentSchema = z
  .object({
    name: z.string().trim().min(2).max(100),

    code: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .regex(/^[A-Za-z0-9_-]+$/)
      .transform((value) => value.toUpperCase()),

    description: z.string().trim().max(500).optional(),
    location: z.string().trim().max(100).optional(),
    status: z.enum(["active", "inactive"]).optional(),
  })
  .strict();

export const updateDepartmentSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),

    code: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .regex(/^[A-Za-z0-9_-]+$/)
      .transform((value) => value.toUpperCase())
      .optional(),

    description: z.string().trim().max(500).optional(),
    location: z.string().trim().max(100).optional(),
    status: z.enum(["active", "inactive"]).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const departmentIdSchema = z
  .object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid department ID"),
  })
  .strict();

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;

export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
