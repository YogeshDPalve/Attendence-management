import {} from "mongoose";
import { Router } from "express";
import { addUser, amdinLogin } from "../../Controllers/auth/admin.controller";
import {
  newUserValidator,
  userLoginValidator,
} from "../../validations/authValidator";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/new-intern",
  authMiddleware.authenticateToken,
  authMiddleware.verifyAdmin,
  newUserValidator,
  addUser
);
router.post("/login", userLoginValidator, amdinLogin);

export default router;
