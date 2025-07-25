import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserSchema";
import { errorWithoutData, successWithData } from "../Utils/apiResponce";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/types";

const verifyToken = (roles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(errorWithoutData("Access denied. No token provided."));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      // Find user by decoded id
      const user: UserType = await UserModel.findById(decoded.userId);

      if (!user) {
        return res.status(401).json(errorWithoutData("Invalid Token."));
      }

      if (user.isActive === 0) {
        return res
          .status(401)
          .json(errorWithoutData("You are Inactive please contact admin."));
      }

      // if (!decoded.token) {
      //   return res
      //     .status(401)
      //     .json(
      //       errorWithoutData(
      //         " logged out. Please login again."
      //       )
      //     );
      // }

      // Check user role if roles specified
      if (roles.length && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json(errorWithoutData("Unauthorized role access."));
      }

      next();
    } catch (err) {
      return res
        .status(401)
        .json(errorWithoutData("Session expired or Invalid token."));
    }
  };
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(errorWithoutData("Access Denied: No Token Provided"));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json(errorWithoutData("Invalid Token"));
  }
};
const authMiddleware = {
  verifyAdmin: verifyToken(["admin"]),
  verifyTrainer: verifyToken(["trainer"]),
  verifyIntern: verifyToken(["intern"]),
  verifyAny: verifyToken([]),
  authenticateToken,
};

export default authMiddleware;
