import { model, Schema } from "mongoose";

const LeaveSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reason: {
      type: String,
    },
    status: {
      type: Number,
      enum: [1, 0, 2],
      default: 2,
    },
    remark: {
      type: String,
    },
    leave_type: {
      type: String,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const LeaveModel = model("Leave_Application", LeaveSchema);
