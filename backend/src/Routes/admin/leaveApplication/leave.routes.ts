import { Router } from "express";
import {
  updateLeaveApplications,
  getLeaveApplications,
  getSingleLeaveApplications,
} from "../../../Controllers/admin/leaveApplication/leaveApp.controller";
import authMiddleware from "../../../middlewares/authMiddleware";

const router: Router = Router();
// ! validation requried
router.get(
  "/list",
  authMiddleware.authenticateToken,
  authMiddleware.verifyAdmin,
  getLeaveApplications
);
router.get(
  "/single",
  authMiddleware.authenticateToken,
  authMiddleware.verifyAdmin,
  getSingleLeaveApplications
);
router.post(
  "/update",
  authMiddleware.authenticateToken,
  authMiddleware.verifyAdmin,
  updateLeaveApplications
);

export default router;
