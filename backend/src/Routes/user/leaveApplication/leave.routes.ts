import { Router } from "express";
import {
  createLeaveApplications,
  getLeaveApplications,
  removeLeaveApplications,
} from "../../../Controllers/user/leaveApplication/leaveApp.controller";
import authMiddleware from "../../../middlewares/authMiddleware";

const router: Router = Router();

router.get(
  "/list",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  getLeaveApplications
);
router.post(
  "/create",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  createLeaveApplications
);
router.post(
  "/delete",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  removeLeaveApplications
);

export default router;
