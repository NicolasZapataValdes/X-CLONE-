import express from "express";
export const router = express.Router();

import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  LogOutWithEmailAndPassWord,
  LogOutWithUserNameAndPassWord,
  createUser,
  updateUser,
  getUserByUserName,
} from "../Controllers/index.js";

import {
  ValidateEmailAndPassWord,
  ValidateUserNameAndPassWord,
  validateUserName,
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

router.get("/GetUserByUserName", validateUserName(), getUserByUserName);
router.post("/createUser", createUser);
router.patch("/updateUser/:id", updateUser);
