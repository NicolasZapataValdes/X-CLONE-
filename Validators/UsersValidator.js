import { body } from "express-validator";

export function ValidateUserName() {
  return [body("UserName").notEmpty().withMessage("Param UserName is empty.")];
}

export function ValidateEmail() {
  return [
    body("Email").notEmpty().withMessage("Param Email is empty."),
    body("Email").isEmail().withMessage("Param email is not a valid Email."),
  ];
}
