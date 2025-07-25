import jwt from "jsonwebtoken";
import { Response } from "express";
import { UserType } from "../types/types";
import { successWithData } from "./apiResponce";
export const generateToken = (
  res: Response,
  user: UserType,
  message: string
) => {
  const token = jwt.sign(
    { userId: user?._id, role: user?.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 100, //! for 1 day
    })
    .send(successWithData(message, { user, token }));
};
