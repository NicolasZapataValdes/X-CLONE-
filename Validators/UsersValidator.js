import { body } from "express-validator";

export function validateUserName() {
  return [body("UserName").notEmpty().withMessage("Param UserName is empty.")];
}
