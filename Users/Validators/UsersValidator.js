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

export function ValidateUID() {
  return [body("uid").notEmpty().withMessage("Param uid is empty.")];
}

export function ValidateFollowerUIDAndFollowedUID() {
  return [
    body("followerUid").notEmpty().withMessage("Param followerUid is empty."),
    body("followedUid").notEmpty().withMessage("Param followedUid is empty."),
  ];
}

export function ValidateCreateUserRequest() {
  return [
    body("Name").notEmpty().withMessage("Param Name is empty."),
    body("UserName").notEmpty().withMessage("Param UserName is empty."),
    body("UserName")
      .custom((request) => {
        const result = Users.filter((user) => user.userName === request);
        return result.length === 0;
      })
      .withMessage("UserName is being using by other user."),
    body("Email").notEmpty().withMessage("Param Email is empty."),
    body("Email").isEmail().withMessage("Param Email is not a valid Email."),
    body("Email")
      .custom((request) => {
        const result = Users.filter((user) => user.email === request);
        return result.length === 0;
      })
      .withMessage("Email is being using by other user."),
    body("PassWord").notEmpty().withMessage("Param PassWord is empty."),
    body("Description").notEmpty().withMessage("Param Description is empty."),
    body("Photo").notEmpty().withMessage("Param Photo is empty."),
  ];
}

export function ValidateUpdateUserRequest() {
  return [
    body("uid").notEmpty().withMessage("Param uid is empty."),
    body("Name").notEmpty().withMessage("Param Name is empty."),
    body("PassWord").notEmpty().withMessage("Param PassWord is empty."),
    body("Description").notEmpty().withMessage("Param Description is empty."),
    body("Photo").notEmpty().withMessage("Param Photo is empty."),
  ];
}
