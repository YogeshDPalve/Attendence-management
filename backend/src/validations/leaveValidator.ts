import {
  idValidator,
  leaveTypeValidator,
  limitValidator,
  pageValidator,
  reasonValidator,
  serachValidator,
  statusValidator,
  trainerIdValidator,
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
  idValidator,
  reasonValidator,
  leaveTypeValidator,
  trainerIdValidator,
  validateRequest,
];
