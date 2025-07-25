import {} from "mongoose";
import { Router } from "express";
import {
  resetPassword,
  sendOtp,
  updateProfile,
  userLogin,
} from "../../Controllers/auth/user.controller";
import { userLoginValidator } from "../../validations/authValidator";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login", userLoginValidator, userLogin);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);
router.post(
  "/udpate-profile",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  updateProfile
);

export default router;
