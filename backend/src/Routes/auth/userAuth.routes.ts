import {} from "mongoose";
import { Router } from "express";
import {
  resetPassword,
  sendOtp,
  updateProfile,
  uploadProfileImage,
  userLogin,
  userLogout,
} from "../../Controllers/auth/user.controller";
import { userLoginValidator } from "../../validations/authValidator";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login", userLoginValidator, userLogin);
router.post("/logout", userLogout);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);
router.post(
  "/upload-profile",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  uploadProfileImage
);
router.post(
  "/udpate-profile",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  updateProfile
);

export default router;
