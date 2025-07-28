import { body } from "express-validator";
export const idValidator = body("id")
  .notEmpty()
  .withMessage("Id is required")
  .isString()
  .withMessage("id must be a string")
  .isMongoId()
  .withMessage("Invalid Mongo id");

export const profileImageValidator = body("profileImage")
  .notEmpty()
  .withMessage("profile Image is required")
  .isString()
  .withMessage("profileImage must be a string");

export const genderValidator = body("id")
  .notEmpty()
  .withMessage("gender is required")
  .isString()
  .withMessage("gender must be a string")
  .isIn(["male", "female", "other"])
  .withMessage("Invalid Mongo id");

export const emailValidator = body("email")
  .notEmpty()
  .withMessage("email is required")
  .isString()
  .withMessage("email must be a string")
  .isEmail()
  .withMessage("Invalid email format");

export const passwordValidator = body("password")
  .notEmpty()
  .withMessage("password is required")
  .isString()
  .withMessage("password must be a string")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long");

export const nameValidator = body("name")
  .notEmpty()
  .withMessage("name is required")
  .isString()
  .withMessage("name must be a string");

export const phoneValidator = body("phoneNumber")
  .notEmpty()
  .withMessage("phone Number is required")
  .isString()
  .withMessage("phone Number must be a string")
  .isLength({ min: 10, max: 10 })
  .withMessage("phone Number must be 10 digits long");

export const courseIdValidator = body("courseId")
  .notEmpty()
  .withMessage("course Id is required")
  .isString()
  .withMessage("course Id must be a string")
  .isMongoId()
  .withMessage("Invalid course Id");

export const latValidator = body("lat")
  .optional()
  .isFloat()
  .withMessage("Latitude must be a float number")
  .toFloat();

export const lonValidator = body("lon")
  .optional()
  .isFloat()
  .withMessage("Longitude must be a float number")
  .toFloat();
