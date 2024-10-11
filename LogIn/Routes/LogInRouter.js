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
  "/Auth/Session/Email",
  ValidateEmailAndPassWord(),
  LogInWithEmailAndPassWord
);
logInRouter.post(
  "/Auth/Session/UserName",
  ValidateUserNameAndPassWord(),
  LogInWithUserNameAndPassWord
);
logInRouter.delete(
  "/Auth/Session/Email",
  ValidateEmailAndPassWord(),
  LogOutWithEmailAndPassWord
);
logInRouter.delete(
  "/Auth/Session/UserName",
  ValidateUserNameAndPassWord(),
  LogOutWithUserNameAndPassWord
);
