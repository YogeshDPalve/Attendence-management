import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth/index.route";
import userRoutes from "./Routes/user/index.route";
import adminRoutes from "./Routes/admin/index.route";

import { connectDb } from "./Database/db";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_, res: Response) => {
  try {
    return res.status(500).send({
      success: true,
      message: `Server listening successfully on port ${port}`,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
