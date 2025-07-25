import {
  body,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorWithData } from "../Utils/apiResponce";

export const userLoginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email id must be string")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("lat")
    .optional()
    // .notEmpty()
    // .withMessage("lattitude is required")
    .isFloat()
    .withMessage("lattitude must be float number")
    .toFloat(),

  body("lon")
    .optional() // .notEmpty()
    // .withMessage("longitude is required")
    .isFloat()
    .withMessage("longitude must be float number")
    .toFloat(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(errorWithData("Validation Error", errors.array()));
    }
    next();
  },
];
export const newUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name id must be string"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email id must be string")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("phone Number is required")
    .isString()
    .withMessage("phone Number  must be string")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone Number must be 10 digits long"),

  body("courseId")
    .notEmpty()
    .withMessage("course Id is required")
    .isString()
    .withMessage("course Id must be string")
    .isMongoId()
    .withMessage("Inavalid course Id"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(errorWithData("Validation Error", errors.array()));
    }
    next();
  },
];
