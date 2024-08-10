import express from 'express';
export const userRouter = express.Router();

import {
  ValidateUserName,
  ValidateEmail,
  ValidateCreateUserRequest,
  ValidateUID,
  ValidateUpdateUserRequest,
  ValidateFollowerUIDAndFollowedUID,
} from '../Validators/index.js';

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
} from '../Controllers/index.js';

userRouter.get('/GetUserByUserName', ValidateUserName(), GetUserByUserName);
userRouter.get('/GetUserByEmail', ValidateEmail(), GetUserByEmail);
userRouter.post('/CreateUser', ValidateCreateUserRequest(), CreateUser);
userRouter.patch('/DeleteUser', ValidateUID(), DeleteUser);
userRouter.patch('/RestoreUser', ValidateUID(), RestoreUser);
userRouter.patch('/UpdateUser', ValidateUpdateUserRequest(), UpdateUser);
userRouter.get('/GetFollowers', ValidateUID(), GetFollowersByUid);
userRouter.get('/GetFollowedUsers', ValidateUID(), GetFollowedUsersByUid);
userRouter.post('/FollowUser', ValidateFollowerUIDAndFollowedUID(), FollowUser);
userRouter.delete(
  '/UnfollowUser',
  ValidateFollowerUIDAndFollowedUID(),
  Unfollow
);
