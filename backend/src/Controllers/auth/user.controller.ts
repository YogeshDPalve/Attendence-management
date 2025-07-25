import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../Utils/apiResponce";
import { UserModel } from "../../Models/UserSchema";
import { UserType } from "../../types/types";
import { AttendenceModel } from "../../Models/AttendenceSchema";
import { verifyUserLocation } from "../../Utils/veriyLocation";
import { generateToken } from "../../Utils/jwtToken";

const maxDistanceMeters = Number(process.env.MAXDISATNCEINMETERS);
const longitude = Number(process.env.LONGITUDE);
const lattitude = Number(process.env.LATTITUDE);
console.log(maxDistanceMeters);

export const userLogin = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      lat,
      lon,
    }: { email: string; password: string; lat: number; lon: number } = req.body;

    const checkUser: UserType = await UserModel.findOne({
      email,
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
    const verifyLocation: boolean = verifyUserLocation(
      lat,
      lon,
      lattitude,
      longitude,
      maxDistanceMeters
    );
    if (!verifyLocation) {
      return res
        .status(400)
        .send(errorWithoutData("You are not matechs office location"));
    }
    await AttendenceModel.create({
      date: Date.now(),
      userId: checkUser._id,
      loginTime: Date.now(),
      present: true,
    });

    generateToken(res, checkUser, `Welcome back ${checkUser.name}`);
    // return res.status(200).send(successWithData("login successfull", checkUser));
  } catch (error) {
    console.log("Internal server error : ", error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
