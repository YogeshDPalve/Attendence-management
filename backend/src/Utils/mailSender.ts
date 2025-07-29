import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Response } from "express";
import {
  errorWithData,
  successWithData,
  successWithoutData,
} from "./apiResponce";
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

export const sendEmail = async (
  email: string,
  name: string,
  status: 1 | 0,
  remark: string,
  res: Response
) => {
  try {
    const mailOptions = {
      from: `Leave Application <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Leave Request Status Has Been Updated",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; color: #333;">
      <h2 style="color: #2c3e50; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Leave Request Status</h2>
      
      <p style="font-size: 16px; margin: 20px 0 10px;">Hi <strong>${name}</strong>,</p>
      
      <p style="font-size: 15px; margin-bottom: 20px;">
        The status of your leave request has been updated:
      </p>
      
      <div style="background-color: ${
        status == 1 ? "#e9f7ef" : "#fdecea"
      }; padding: 15px; border-radius: 6px; border-left: 5px solid ${
        status == 1 ? "#2ecc71" : "#e74c3c"
      };">
        <h3 style="margin: 0; color: ${
          status == 1 ? "#2ecc71" : "#e74c3c"
        }; font-size: 20px;">
          ${status == 1 ? "APPROVED ✅" : "REJECTED ❌"}
        </h3>
      </div>

      <div style="margin-top: 25px;">
        <p style="font-size: 15px; margin-bottom: 8px;"><strong>HR Remark:</strong></p>
        <p style="font-size: 14px; background-color: #fff; padding: 12px 15px; border-radius: 5px; border: 1px solid #ddd; color: #555;">
          ${remark || "No remark provided."}
        </p>
      </div>

      <p style="font-size: 14px; margin-top: 30px;">If you have any questions, feel free to reach out to the HR department.</p>
      
      <p style="font-size: 14px; color: #888; margin-top: 40px;">Best regards,<br>SCOPE Team</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send(successWithoutData("Request for leave udpated successfully"));
  } catch (error) {
    console.log("Email not sent", error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
