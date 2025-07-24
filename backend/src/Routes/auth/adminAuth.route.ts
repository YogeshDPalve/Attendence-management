import {} from "mongoose";
import { Router } from "express";
import { addUser } from "../../Controllers/auth/admin.controller";
import { newUserValidator } from "../../validations/authValidator";

const router = Router();

router.post("/new-intern", newUserValidator, addUser);

export default router;
