import { Router } from "express";
import leaveRoutes from "./leaveApplication/leave.routes";
const router: Router = Router();

router.use("/leave", leaveRoutes);

export default router;
