import { model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    internId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    description: {
      type: Number,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isActive: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CourseModel = model("Course", CourseSchema);
