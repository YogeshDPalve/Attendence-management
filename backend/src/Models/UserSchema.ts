import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["intern", "trainer", "admin"],
      default: "intern",
      require: true,
    },
    birthDate: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    trainerId: {
      type: String,
    },
    courseId: {
      type: String,
      require: true,
    },
    isActive: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
