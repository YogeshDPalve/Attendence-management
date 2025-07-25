import { Request, Response } from "express";
import bcrypt, { genSalt } from "bcryptjs";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../Utils/apiResponce";
import { UserModel } from "../../Models/UserSchema";
import { UserProfile, UserType } from "../../types/types";
import { AttendenceModel } from "../../Models/AttendenceSchema";
import { verifyUserLocation } from "../../Utils/veriyLocation";
import { generateToken } from "../../Utils/jwtToken";
import { generateOTP, transporter } from "../../Utils/mailSender";

const maxDistanceMeters = Number(process.env.MAXDISATNCEINMETERS);
const longitude = Number(process.env.LONGITUDE);
const lattitude = Number(process.env.LATTITUDE);
console.log(maxDistanceMeters);

// login
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
    const verifyPass: boolean = await bcrypt.compare(
      password,
      checkUser.password
    );
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

// update profile
// !validation required
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      id,
      email,
      name,
      gender,
      phoneNumber,
      birthDate,
      profileImage,
    }: UserProfile = req.body;

    const checkUser: UserType = await UserModel.findByIdAndUpdate(id, {
      email,
      name,
      gender,
      phoneNumber,
      birthDate,
      profileImage,
    });
    if (!checkUser) {
      return res
        .status(404)
        .send(errorWithoutData("User with this mail not exists"));
    }
    return res
      .status(200)
      .send(successWithoutData("Profile details updated successfully"));
  } catch (error) {
    console.log("Internal server error : ", error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email, isDelete: 0 });
    if (!user) {
      return res.status(404).send(errorWithoutData("User not exists"));
    }
    const otp: string = generateOTP();

    const mailOptions = {
      from: `Login application  <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset Password - OTP Verification",
      html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Reset Your Password</h2>
        <p>Your OTP for password reset is:</p>
        <h3 style="color: #2e6da4;">${otp}</h3>
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    user.emailOtp = otp;
    await user.save();
    return res
      .status(200)
      .send(successWithoutData("Otp sent successfully on registered email id"));
  } catch (error) {
    return res.status(500).send(errorWithData("Internal Server Error ", error));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const {
      email,
      otp,
      password,
    }: { email: string; otp: string; password: string } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send(errorWithoutData("User not exists"));
    }
    if (user.emailOtp !== otp) {
      return res
        .status(400)
        .send(errorWithoutData("Incorrect otp, please try again"));
    }
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.emailOtp = null;
    user.save();
    return res
      .status(200)
      .send(successWithoutData("Your password reset successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal Server Error ", error));
  }
};
