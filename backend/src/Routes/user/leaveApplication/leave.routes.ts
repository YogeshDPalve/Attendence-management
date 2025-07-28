import { Router } from "express";
import {
  createLeaveApplications,
  getLeaveApplications,
  removeLeaveApplications,
} from "../../../Controllers/user/leaveApplication/leaveApp.controller";
import authMiddleware from "../../../middlewares/authMiddleware";
import {
  createLeavesVaildator,
  // createLeavesVaildator,
  getLeavesVaildator,
} from "../../../validations/leaveValidator";

const router: Router = Router();

router.get(
  "/list",
  getLeavesVaildator,
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  getLeaveApplications
);
router.post(
  "/create",
  createLeavesVaildator,
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  createLeaveApplications
);
router.delete(
  "/delete",
  authMiddleware.authenticateToken,
  authMiddleware.verifyIntern,
  removeLeaveApplications
);

export default router;
