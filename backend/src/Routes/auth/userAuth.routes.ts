import {} from "mongoose";
import { Router } from "express";
import { userLogin } from "../../Controllers/auth/user.controller";
import { userLoginValidator } from "../../validations/authValidator";

const router = Router();

router.post("/login", userLoginValidator, userLogin);

export default router;
