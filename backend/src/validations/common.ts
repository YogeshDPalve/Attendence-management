import { body } from "express-validator";
export const idValidator = body("id")
  .notEmpty()
  .withMessage(`id is required `)
  .isString()
  .withMessage(`id must be a string`)
  .isMongoId()
  .withMessage("Invalid Mongo id");

export const trainerIdValidator = body("trainerId")
  .notEmpty()
  .withMessage(`trainerId is required `)
  .isString()
  .withMessage(`trainerId must be a string`)
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

export const serachValidator = body("search")
  .optional()
  .isString()
  .withMessage("search value must be string");

export const pageValidator = body("page")
  .optional()
  .isInt({ min: 0 })
  .withMessage("page value must be positive number");

export const statusValidator = body("status")
  .optional()
  .isIn([1, 0, 2])
  .withMessage("status value must be positive number 0,1,2")
  .toInt();

export const limitValidator = body("limit")
  .optional()
  .isInt({ min: 1 })
  .withMessage("limit value must be positive number")
  .toInt();

export const reasonValidator = body("reason")
  .notEmpty()
  .withMessage("reason is required")
  .isString()
  .withMessage("reason must be a string");

export const leaveTypeValidator = body("leave_type")
  .notEmpty()
  .withMessage("leave_type is required")
  .isString()
  .withMessage("leave_type must be a string");
