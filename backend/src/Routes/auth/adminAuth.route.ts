import {} from "mongoose";
import { Router } from "express";
import { addUser, amdinLogin } from "../../Controllers/auth/admin.controller";
import {
  newUserValidator,
  userLoginValidator,
} from "../../validations/authValidator";
import authMiddleware from "../../middlewares/authMiddleware";
import {
  resetPassword,
  sendOtp,
  updateProfile,
} from "../../Controllers/auth/user.controller";

const router = Router();

router.post(
  "/new-intern",
  authMiddleware.authenticateToken,
  authMiddleware.verifyAdmin,
  newUserValidator,
  addUser
);
router.post("/login", userLoginValidator, amdinLogin);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);
router.post(
  "/udpate-profile",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  updateProfile
);
export default router;
