import { Users } from "../constants/index.js";
import { validationResult } from "express-validator";
import { getParsedCurrentDateTime } from "../Utils/index.js";
import crypto from "node:crypto";
import { log } from "node:console";

export const Unfollow = (request, response) => {
  try {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { followerUid, followedUid } = request.body;

    const followerIndex = Users.findIndex((U) => U.uid === followerUid);
    if (followerIndex === -1) throw new Error("Follower user not found.");

    const followedIndex = Users.findIndex((U) => U.uid === followedUid);
    if (followedIndex === -1) throw new Error("Followed user not found.");

    let newFollowerList = [];
    let newFollowedList = [];

    Users[followerIndex].followed.forEach((f) => {
      if (f !== followedUid) {
        newFollowedList.push(f);
      }
    });

    Users[followedIndex].followers.forEach((f) => {
      if (f !== followerUid) {
        newFollowerList.push(f);
      }
    });

    Users[followerIndex].followed = newFollowedList;
    Users[followedIndex].followers = newFollowerList;

    response.status(200).json({
      ok: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followers",
      errorDescription: error?.message,
    });
  }
};

export function FollowUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { followerUid, followedUid } = request.body;

    const userIndex = Users.findIndex((U) => U.uid === followerUid);
    if (userIndex === -1) throw new Error("User not found.");

    const followedUserIndex = Users.findIndex((U) => U.uid === followedUid);
    if (followedUserIndex === -1) throw new Error("Followed User not found.");

    Users[userIndex].followed.push(followedUid);
    Users[followedUserIndex].followers.push(followerUid);

    response.status(200).json({
      ok: true,
      message: "User followed successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to follow user",
      errorDescription: error?.message,
    });
  }
}

export function GetFollowersByUid(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;
    const userIndex = Users.findIndex((U) => U.uid === uid);
    if (userIndex === -1) throw new Error("User not found.");

    let jsonResponse = [];
    Users[userIndex].followers.forEach((follower) => {
      const followerIndex = Users.findIndex((U) => U.uid === follower);

      if (!(followerIndex === -1)) {
        jsonResponse.push({
          uid: Users[followerIndex].uid,
          name: Users[followerIndex].name,
          userName: Users[followerIndex].userName,
          photo: Users[followerIndex].photo,
        });
      }
    });

    response.status(200).json({
      ok: true,
      data: {
        followers: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followers",
      errorDescription: error?.message,
    });
  }
}

export function GetFollowedUsersByUid(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;
    const userIndex = Users.findIndex((U) => U.uid === uid);
    if (userIndex === -1) throw new Error("User not found.");

    let jsonResponse = [];
    Users[userIndex].followed.forEach((follower) => {
      const followerIndex = Users.findIndex((U) => U.uid === follower);

      if (!(followerIndex === -1)) {
        jsonResponse.push({
          uid: Users[followerIndex].uid,
          name: Users[followerIndex].name,
          userName: Users[followerIndex].userName,
          photo: Users[followerIndex].photo,
        });
      }
    });

    response.status(200).json({
      ok: true,
      data: {
        followers: jsonResponse,
        lenght: jsonResponse.length,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get followed users",
      errorDescription: error?.message,
    });
  }
}

export function GetUserByUserName(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { UserName } = request.body;
    const user = Users.find((user) => user.userName === UserName);
    if (!user) throw new Error("User not found.");

    response.status(200).json({
      ok: true,
      data: {
        uid: user.uid,
        Name: user.name,
        Email: user.email,
        userName: user.userName,
        CreatedAt: user.CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
        deleted: user.deleted,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get user by UserName",
      errorDescription: error?.message,
    });
  }
}

export function GetUserByEmail(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { Email } = request.body;
    const user = Users.find((user) => user.email === Email);
    if (!user) throw new Error("User not found.");

    response.status(200).json({
      ok: true,
      data: {
        uid: user.uid,
        Name: user.name,
        Email: user.email,
        userName: user.userName,
        CreatedAt: user.CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
        deleted: user.deleted,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get user by Email",
      errorDescription: error?.message,
    });
  }
}

export function CreateUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { Name, UserName, Email, PassWord, Description, Photo } =
      request.body;

    const newUser = {
      uid: crypto.randomUUID(),
      name: Name,
      userName: UserName,
      email: Email,
      PassWord: PassWord,
      CreatedAt: getParsedCurrentDateTime(),
      LastLogIn: getParsedCurrentDateTime(),
      isActive: true,
      descripción: Description,
      photo: Photo,
      deleted: false,
    };

    Users.push(newUser);
    response.status(201).json({
      ok: true,
      message: "User created successfully.",
      data: {
        uid: newUser.uid,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a user",
      errorDescription: error?.message,
    });
  }
}

export function UpdateUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid, Name, PassWord, Description, Photo } = request.body;
    const userIndex = Users.findIndex((User) => User.uid === uid);

    if (userIndex === -1) throw new Error("User not found");

    Users[userIndex] = {
      ...Users[userIndex],
      name: Name,
      PassWord: PassWord,
      descripción: Description,
      photo: Photo,
    };

    response.status(201).json({
      ok: true,
      message: "User updated successfully.",
      data: {
        uid,
      },
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update user",
      errorDescription: error?.message,
    });
  }
}

export function DeleteUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;
    const userIndex = Users.findIndex((User) => User.uid === uid);
    if (userIndex === -1) throw new Error(`User with UID: ${uid} not found.`);

    Users[userIndex] = {
      ...Users[userIndex],
      deleted: true,
    };

    response.status(500).json({
      ok: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to delete user",
      errorDescription: error?.message,
    });
  }
}

export function RestoreUser(request, response) {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });

      return;
    }

    const { uid } = request.body;
    const userIndex = Users.findIndex((User) => User.uid === uid);
    if (userIndex === -1) throw new Error(`User with UID: ${uid} not found.`);

    Users[userIndex] = {
      ...Users[userIndex],
      deleted: false,
    };

    response.status(500).json({
      ok: true,
      message: "User retored successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to restore user",
      errorDescription: error?.message,
    });
  }
}

export const updateUser = (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = Users.findIndex((user) => user.uid === id);

    if (userIndex === -1) {
      return res.status(404).json({ Message: "User not found" });
    }

    const updatedUser = {
      ...Users[userIndex],
      ...req.body,
    };

    Users[userIndex] = updatedUser;

    res.status(201).json({
      ok: true,
      message: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};
