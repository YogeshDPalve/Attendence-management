import {} from "mongoose";
import { Router } from "express";
import { addUser, amdinLogin } from "../../Controllers/auth/admin.controller";
import {
  newUserValidator,
  userLoginValidator,
} from "../../validations/authValidator";

const router = Router();

router.post("/new-intern", newUserValidator, addUser);
router.post("/login", userLoginValidator, amdinLogin);

export default router;
