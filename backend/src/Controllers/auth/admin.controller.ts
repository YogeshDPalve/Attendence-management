import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../Utils/apiResponce";
import { NewUser } from "../../types/types";
import { UserModel } from "../../Models/UserSchema";



export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, phoneNumber, password, courseId }: NewUser =
      req.body || {};

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      courseId,
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
