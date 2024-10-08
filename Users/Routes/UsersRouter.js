import express from "express";
export const userRouter = express.Router();

import {
  ValidateUserName,
  ValidateEmail,
  ValidateCreateUserRequest,
  ValidateUID,
  ValidateUpdateUserRequest,
  ValidateFollowerUIDAndFollowedUID,
} from "../Validators/index.js";

import {
  GetUserByUserName,
  GetUserByEmail,
  CreateUser,
  DeleteUser,
  RestoreUser,
  UpdateUser,
  GetFollowersByUid,
  GetFollowedUsersByUid,
  FollowUser,
  Unfollow,
} from "../Controllers/index.js";

userRouter.get("/User/Name", ValidateUserName(), GetUserByUserName);
userRouter.get("/User/Email", ValidateEmail(), GetUserByEmail);
userRouter.post("/User", ValidateCreateUserRequest(), CreateUser);
userRouter.patch("/User/Delete", ValidateUID(), DeleteUser);
userRouter.patch("/User/Restore", ValidateUID(), RestoreUser);
userRouter.patch("/User", ValidateUpdateUserRequest(), UpdateUser);
userRouter.get("/User/Followers", ValidateUID(), GetFollowersByUid);
userRouter.get("/User/Followed", ValidateUID(), GetFollowedUsersByUid);
userRouter.post(
  "/User/Follow",
  ValidateFollowerUIDAndFollowedUID(),
  FollowUser
);
userRouter.post(
  "/User/UnFollow",
  ValidateFollowerUIDAndFollowedUID(),
  Unfollow
);
