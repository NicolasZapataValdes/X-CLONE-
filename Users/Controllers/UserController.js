import { validationResult } from "express-validator";
import { getParsedCurrentDateTime } from "../../Utils/Functions/index.js";
import { UserModel } from "../Models/index.js";

export async function Unfollow(request, response) {
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

    const followerQueryResult = await UserModel.updateOne(
      { _id: followerUid },
      {
        $pull: { followed: followedUid },
      }
    );

    if (followerQueryResult.matchedCount === 0)
      throw new Error("Follower not found.");

    const followedQueryResult = await UserModel.updateOne(
      { _id: followedUid },
      {
        $pull: { followers: followerUid },
      }
    );

    if (followedQueryResult.matchedCount === 0)
      throw new Error("Followed not found.");

    response.status(200).json({
      ok: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to unfollow user",
      errorDescription: error?.message,
    });
  }
}

export async function FollowUser(request, response) {
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

    const followerQueryResult = await UserModel.updateOne(
      { _id: followerUid },
      {
        $push: { followed: followedUid },
      }
    );

    if (followerQueryResult.matchedCount === 0)
      throw new Error("Follower not found.");

    const followedQueryResult = await UserModel.updateOne(
      { _id: followedUid },
      {
        $push: { followers: followerUid },
      }
    );

    if (followedQueryResult.matchedCount === 0)
      throw new Error("Followed not found.");

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

export async function GetFollowersByUid(request, response) {
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

    const user = await UserModel.find({ _id: uid }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    const followerUsers = await UserModel.find({
      _id: { $in: user[0].followers },
    });

    const jsonResponse = followerUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
    }));

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

export async function GetFollowedUsersByUid(request, response) {
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

    const user = await UserModel.find({ _id: uid }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    const followedUsers = await UserModel.find({
      _id: { $in: user[0].followed },
    });

    const jsonResponse = followedUsers.map((U) => ({
      uid: U._id,
      name: U.name,
      userName: U.userName,
      photo: U.photo,
    }));

    response.status(200).json({
      ok: true,
      data: {
        followed: jsonResponse,
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

export async function GetUserByUserName(request, response) {
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
    const user = await UserModel.find({ userName: UserName }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    response.status(200).json({
      ok: true,
      data: {
        uid: user[0].id,
        Name: user[0].name,
        Email: user[0].email,
        userName: user[0].userName,
        CreatedAt: user[0].CreatedAt,
        LastLogIn: user[0].LastLogIn,
        isActive: user[0].isActive,
        photo: user[0].photo,
        deleted: user[0].deleted,
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

export async function GetUserByEmail(request, response) {
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
    const user = await UserModel.find({ email: Email }).exec();
    if (!user || user.length === 0) throw new Error("User not found.");

    response.status(200).json({
      ok: true,
      data: {
        uid: user[0].id,
        Name: user[0].name,
        Email: user[0].email,
        userName: user[0].userName,
        CreatedAt: user[0].CreatedAt,
        LastLogIn: user[0].LastLogIn,
        isActive: user[0].isActive,
        photo: user[0].photo,
        deleted: user[0].deleted,
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

export async function CreateUser(request, response) {
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

    const User = new UserModel({
      name: Name,
      userName: UserName,
      email: Email,
      passWord: PassWord,
      CreatedAt: getParsedCurrentDateTime(),
      LastLogIn: getParsedCurrentDateTime(),
      isActive: true,
      descripción: Description,
      photo: Photo,
      deleted: false,
    });

    await User.save();
    response.status(201).json({
      ok: true,
      message: "User created successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a user",
      errorDescription: error?.message,
    });
  }
}

export async function UpdateUser(request, response) {
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
    const queryResult = await UserModel.updateOne(
      { _id: uid },
      {
        name: Name,
        passWord: PassWord,
        descripción: Description,
        photo: Photo,
      }
    );
    if (queryResult.matchedCount === 0) throw new Error("User not found");

    response.status(200).json({
      ok: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update user",
      errorDescription: error?.message,
    });
  }
}

export async function DeleteUser(request, response) {
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
    const queryResult = await UserModel.updateOne(
      { _id: uid },
      { deleted: true }
    );

    if (queryResult.acknowledged === 0)
      throw new Error("Not exists an user with uid given.");

    response.status(200).json({
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

export async function RestoreUser(request, response) {
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

    const queryResult = await UserModel.updateOne(
      { _id: uid },
      { deleted: false }
    );

    if (queryResult.acknowledged === 0)
      throw new Error("Not exists an user with uid given.");

    response.status(200).json({
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
