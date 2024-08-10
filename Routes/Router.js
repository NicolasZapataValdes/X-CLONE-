import express from "express";
export const router = express.Router();

import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  LogOutWithEmailAndPassWord,
  LogOutWithUserNameAndPassWord,
  GetUserByUserName,
  GetUserByEmail,
  CreateUser,
  DeleteUser,
  RestoreUser,
} from "../Controllers/index.js";

import {
  ValidateEmailAndPassWord,
  ValidateUserNameAndPassWord,
  ValidateUserName,
  ValidateEmail,
  ValidateCreateUserRequest,
  ValidateUID,
} from "../Validators/index.js";

router.post(
  "/LogInWithEmailAndPassWord",
  ValidateEmailAndPassWord(),
  LogInWithEmailAndPassWord
);
router.post(
  "/LogInWithUserNameAndPassWord",
  ValidateUserNameAndPassWord(),
  LogInWithUserNameAndPassWord
);
router.post(
  "/LogOutWithEmailAndPassWord",
  ValidateEmailAndPassWord(),
  LogOutWithEmailAndPassWord
);
router.post(
  "/LogOutWithUserNameAndPassWord",
  ValidateUserNameAndPassWord(),
  LogOutWithUserNameAndPassWord
);

router.get("/GetUserByUserName", ValidateUserName(), GetUserByUserName);
router.get("/GetUserByEmail", ValidateEmail(), GetUserByEmail);
router.post("/CreateUser", ValidateCreateUserRequest(), CreateUser);
router.patch("/DeleteUser", ValidateUID(), DeleteUser);
router.patch("/RestoreUser", ValidateUID(), RestoreUser);
