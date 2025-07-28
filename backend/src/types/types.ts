import { Types } from "mongoose";
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

export type LeaveType = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  reason?: string;
  status?: 0 | 1 | 2; // 2 = default
  remark?: string;
  leave_type?: string;
  trainerId: Types.ObjectId;
  isActive?: number; // 1 = default
  isDelete?: number; // 0 = default
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

export type GetQuery = {
  id: ObjectId;
  search: string;
  status?: 0 | 1 | 2;
  page: number;
  limit: number;
};

export type CreateLeaveType = {
  id: ObjectId;
  reason: string;
  leave_type: string;
  trainerId: ObjectId;
};
