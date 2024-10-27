import express from "express";
export const userRouter = express.Router();

import {
  ValidateUserName,
  ValidateEmail,
  ValidateCreateUserRequest,
  ValidateUID,
  ValidateUpdateUserRequest,
  ValidateFollowedUID,
  ValidateFollowerUID,
} from "../Validators/index.js";

import {
  GetUserByUserName,
  GetUserByEmail,
  CreateUser,
  DeleteUser,
  RestoreUser,
  UpdateUser,
  GetFollowersByUid,
  GetFollowedUsersByUID,
  FollowUser,
  Unfollow,
  GetUserByUID,
} from "../Controllers/index.js";
import { ValidateToken } from "../../Utils/Functions/Functions.js";

userRouter.get("/User", ValidateToken, GetUserByUID);
userRouter.get(
  "/User/userName/:UserName",
  ValidateUserName(),
  GetUserByUserName
);
userRouter.get("/User/Email", ValidateEmail(), GetUserByEmail);
userRouter.post("/User", ValidateCreateUserRequest(), CreateUser);
userRouter.patch("/User/Delete", ValidateUID(), DeleteUser);
userRouter.patch("/User/Restore", ValidateUID(), RestoreUser);
userRouter.patch("/User", ValidateUpdateUserRequest(), UpdateUser);
userRouter.get("/User/Followers", ValidateToken, GetFollowersByUid);
userRouter.get("/User/Followed", ValidateToken, GetFollowedUsersByUID);
userRouter.post("/User/Follow", ValidateFollowedUID(), FollowUser);
userRouter.post("/User/UnFollow", ValidateFollowedUID(), Unfollow);
