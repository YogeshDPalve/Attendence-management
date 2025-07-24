import { model, Schema, Types } from "mongoose";

const AttendenceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    date: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    present: {
      type: Boolean,
      default: false,
    },
    location: {
      lon: {
        type: Number,
        require: true,
      },
      lat: {
        type: Number,
        require: true,
      },
    },
    loginTime: {
      type: Date,
      default: null,
    },
    logoutTime: {
      type: Date,
      default: null,
    },
    totalHours: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export const AttendenceModel = model("Attendence", AttendenceSchema);
