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
  },
  { timestamps: true }
);

export const CourseModel = model("Course", CourseSchema);
