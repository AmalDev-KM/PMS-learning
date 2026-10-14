import { Schema, model, type Model } from "mongoose";

export interface IDepartment {
  name: string;
  code: string;
  description?: string;
  location?: string;
  status: "active" | "inactive";
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
      maxlength: 10,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Department: Model<IDepartment> = model<IDepartment>(
  "Department",
  departmentSchema,
);

export default Department;
