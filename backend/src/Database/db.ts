import { connect } from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    await connect("mongodb://localhost:27017/attendence_management");
    console.log("***Database connected successfully***");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
