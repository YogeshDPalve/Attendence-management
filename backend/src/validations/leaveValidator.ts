import {
  idValidator,
  limitValidator,
  pageValidator,
  serachValidator,
  statusValidator,
  stringValidator,
} from "./common";
import { validateRequest } from "./validator";

export const getLeavesVaildator = [
  idValidator,
  serachValidator,
  statusValidator,
  pageValidator,
  limitValidator,
  validateRequest,
];

export const createLeavesVaildator = [
  idValidator("id"),
  stringValidator("reason"),
  stringValidator("leave_type"),
  idValidator("trainerId"),
  validateRequest,
];
