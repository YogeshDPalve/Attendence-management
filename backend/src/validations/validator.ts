import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorWithData } from "../Utils/apiResponce";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errorWithData("Validation Error", errors.array()));
  }
  console.log("From validation");
  next();
};
