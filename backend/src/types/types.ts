import { ObjectId } from "mongoose";

export type NewUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  courseId: string;
  role: string;
};
export type UserType = {
  _id?: ObjectId;
  name: string;
  email: string;
  gender?: string;
  phoneNumber: string;
  password: string;
  role: "intern" | "trainer" | "admin";
  birthDate?: string;
  profileImage?: string;
  trainerId?: string;
  courseId: string;
  isActive?: number;
  isDelete?: number;
  emailOtp?: string;
  createdAt?: Date;
  updatedAt?: Date;
} | null;

export type UserProfile = {
  id: ObjectId;
  name?: string;
  email?: string;
  gender?: string;
  phoneNumber?: string;
  birthDate?: string;
  profileImage?: string;
};
