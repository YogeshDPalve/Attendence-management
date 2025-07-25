import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../Utils/apiResponce";
import { NewUser, UserType } from "../../types/types";
import { UserModel } from "../../Models/UserSchema";
import { generateToken } from "../../Utils/jwtToken";

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      courseId,
      role = "intern",
    }: NewUser = req.body || {};

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      courseId,
      role,
    });
    if (!newUser) {
      return res.status(400).send(errorWithoutData("User cannot created"));
    }
    return res
      .status(201)
      .send(successWithData("User created successfully", newUser));
  } catch (error) {
    console.log("Internal server error : ", error);
    return res.status(500).send(errorWithData("Internal Server Error", error));
  }
};

export const amdinLogin = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
    }: { email: string; password: string; lat: number; lon: number } = req.body;

    const checkUser: UserType = await UserModel.findOne({
      email,
      role: {
        $in: ["trainer", "admin"],
      },
      isDelete: 0,
      isActive: 1,
    });
    if (!checkUser) {
      return res
        .status(404)
        .send(errorWithoutData("User with this mail not exists"));
    }
    const verifyPass = await bcrypt.compare(password, checkUser.password);
    if (!verifyPass) {
      return res
        .status(400)
        .send(errorWithoutData("Invalid email or password"));
    }

    generateToken(res, checkUser, `Welcome back ${checkUser.name}`);
  } catch (error) {
    console.log("Internal server error : ", error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
