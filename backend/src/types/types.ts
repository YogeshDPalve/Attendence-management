export type NewUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  courseId: string;
  role: string;
};
export type UserType = {
  _id?: string;
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
  location: {
    lon: number;
    lat: number;
  };
  isActive?: number;
  isDelete?: number;
  createdAt?: Date;
  updatedAt?: Date;
} | null;
