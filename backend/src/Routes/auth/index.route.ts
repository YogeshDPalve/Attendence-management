import { Router } from "express";
import user from "./userAuth.routes";
import admin from "./adminAuth.route";

const router = Router();

router.use("/user", user);
router.use("/admin", admin);

export default router;
