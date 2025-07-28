import {
  courseIdValidator,
  emailValidator,
  genderValidator,
  idValidator,
  latValidator,
  lonValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
  profileImageValidator,
} from "./common";
import { validateRequest } from "./validator";

export const userLoginValidator = [
  emailValidator,
  passwordValidator,
  latValidator,
  lonValidator,
  validateRequest,
];
export const newUserValidator = [
  nameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  courseIdValidator,
  validateRequest,
];

export const updateProfileValidator = [
  idValidator,
  emailValidator,
  nameValidator,
  genderValidator,
  phoneValidator,
  profileImageValidator,
];
