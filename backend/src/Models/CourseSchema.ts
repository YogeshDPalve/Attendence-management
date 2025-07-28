import { model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    duration: {
      //* In months
      type: Number,
      require: true,
    },
    isActive: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CourseModel = model("Course", CourseSchema);
