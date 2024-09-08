import express from "express";
export const logInRouter = express.Router();

import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  LogOutWithEmailAndPassWord,
  LogOutWithUserNameAndPassWord,
} from "../Controller/index.js";

import {
  ValidateEmailAndPassWord,
  ValidateUserNameAndPassWord,
} from "../Validator/index.js";

logInRouter.post(
  "/LogInWithEmailAndPassWord",
  ValidateEmailAndPassWord(),
  LogInWithEmailAndPassWord
);
logInRouter.post(
  "/LogInWithUserNameAndPassWord",
  ValidateUserNameAndPassWord(),
  LogInWithUserNameAndPassWord
);
logInRouter.post(
  "/LogOutWithEmailAndPassWord",
  ValidateEmailAndPassWord(),
  LogOutWithEmailAndPassWord
);
logInRouter.post(
  "/LogOutWithUserNameAndPassWord",
  ValidateUserNameAndPassWord(),
  LogOutWithUserNameAndPassWord
);
