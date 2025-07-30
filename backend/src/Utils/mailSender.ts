import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Response } from "express";
import {
  errorWithData,
  successWithData,
  successWithoutData,
} from "./apiResponce";
import { getFormattedTodayDate } from "./others";
dotenv.config();

const date = getFormattedTodayDate();
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
  type: "intern" | "admin" = "intern",
  email: string,
  name: string,
  status: 1 | 0 | 2 = 2,
  remark: string,
  res: Response
) => {
  try {
    const mailOptions = {
      from: `Leave Application <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Leave Request Status Has Been Updated",
      html:
        type === "intern"
          ? `
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
  `
          : `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; color: #333;">
  <h2 style="color: #2c3e50; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Leave Request</h2>
  
  <p style="font-size: 16px; margin: 20px 0 10px;">Hello Admin,</p>
  
  <p style="font-size: 15px; margin-bottom: 20px;">
    A new leave request has been submitted by the intern <strong>${name}</strong>. Below are the details:
  </p>
  
  <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 5px solid #3498db;">
    <p style="margin: 0; font-size: 15px;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 5px 0; font-size: 15px;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 5px 0; font-size: 15px;"><strong>Date of Request:</strong> ${new Date().toLocaleDateString()}</p> 
  </div>

  <p style="font-size: 14px; margin-top: 30px;">
    Please review and take the necessary action in the admin dashboard.
  </p>
  
  <p style="font-size: 14px; color: #888; margin-top: 40px;">Best regards,<br>SCOPE System</p>
</div>
`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).send(successWithoutData("Email Sent Successfully"));
  } catch (error) {
    console.log("Email not sent", error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};

export const sendAbsentEmail = async (
  type: 1 | 2,
  email: string,
  name: string,
  subject: string
) => {
  console.log("From send email");
  try {
    const mailOptions = {
      from: `HR Department SCOPE <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html:
        type === 1
          ? `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9f9fb; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #dcdfe3; color: #333;">
  <h2 style="color: #e67e22; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
    ⚠️ Uninformed Absence Alert
  </h2>

  <p style="font-size: 16px; margin-top: 20px;">Dear <strong>${name}</strong>,</p>

  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
    We noticed that you were absent from your internship today, <strong>${date}</strong>, without prior intimation to the HR department or your mentor.
  </p>

  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
    Kindly note that timely communication is mandatory and expected from all interns. Uninformed leaves may impact your performance evaluation and continued participation in the internship program.
  </p>

  <div style="background-color: #fff3cd; padding: 15px 20px; border-left: 6px solid #f0ad4e; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-size: 15px;">
      <strong>Action Required:</strong> Please reply to this email with a valid reason for your absence today.
    </p>
  </div>

  <div style="background-color: #e8f8f5; padding: 15px 20px; border-left: 6px solid #17a2b8; border-radius: 8px;">
    <p style="margin: 0; font-size: 14px; color: #2c3e50;">
      <strong>Note:</strong> If you have already informed your mentor or HR in advance, you may kindly disregard this message.
    </p>
  </div>

  <p style="font-size: 14px; color: #888; margin-top: 35px;">Best regards,<br><strong>SCOPE HR Department</strong></p>
</div>

  `
          : `<div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9f9fb; padding: 40px 30px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #dcdfe3; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); color: #333;">
  <h2 style="color: #e74c3c; margin-bottom: 20px; border-bottom: 2px solid #f1f1f1; padding-bottom: 10px;">
    🚨 Internship Attendance Warning
  </h2>

  <p style="font-size: 16px; margin-bottom: 15px;">Dear <strong>${name}</strong>,</p>

  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
    We noticed that you have been absent from your internship for more than <strong>15 consecutive days</strong> without prior notice or explanation.
  </p>

  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
    Consistent attendance is a key part of your internship responsibilities at <strong>SCOPE</strong>. Prolonged absence without communication affects team progress and may lead to further action.
  </p>

  <div style="background-color: #fff3cd; padding: 15px 20px; border-left: 6px solid #f0ad4e; border-radius: 8px; margin-bottom: 25px;">
    <p style="margin: 0; font-size: 15px;">
      <strong>🔔 Action Required:</strong><br>
      Please respond within <strong>48 hours</strong> with a valid reason for your absence.<br>
      If you intend to continue your leave, submit a formal request immediately.
    </p>
  </div>

  <p style="font-size: 15px; margin-bottom: 20px;">
    Failing to respond may result in <strong>termination of your internship</strong> and cancellation of any related certifications or recommendations.
  </p>

  <div style="background-color: #e8f8f5; padding: 15px 20px; border-left: 6px solid #17a2b8; border-radius: 8px;">
    <p style="margin: 0; font-size: 14px; color: #2c3e50;">
      <strong>✅ Note:</strong> If you have already taken permission or informed HR about your absence, please ignore this email.
    </p>
  </div>

  <p style="font-size: 14px; color: #666; margin-top: 35px;">
    If you have any questions, feel free to reach out to the HR team.
  </p>

  <p style="font-size: 14px; color: #888; margin-top: 40px;">Best regards,<br><strong>SCOPE HR Department</strong></p>
</div>

`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅Email sent successfully");
  } catch (error) {
    console.log("Email not sent", error);
  }
};
