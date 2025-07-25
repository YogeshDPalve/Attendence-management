import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Utility to generate 6-digit OTP
export const generateOTP = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Transporter setup
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
