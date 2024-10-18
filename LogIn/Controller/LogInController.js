import { UserModel } from "../../Users/Models/index.js";
import { validationResult } from "express-validator";
import { GenerateAccessToken } from "../../Utils/Functions/index.js";

export async function LogInWithEmailAndPassWord(request, response) {
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

    const { email, passWord } = request.body;

    const UpdateResult = await UserModel.findOneAndUpdate(
      { email: email, passWord: passWord },
      { $set: { isActive: true } }
    ).exec();

    if (!UpdateResult)
      throw new Error("An error ocurred while trying to get User.");

    response.json({
      ok: true,
      message: "User loggedIn succesfully",
      AccessToken: GenerateAccessToken(UpdateResult._id.toString()),
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With Email and Password",
      errorDescription: error?.message,
    });
  }
}

export async function LogInWithUserNameAndPassWord(request, response) {
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

    const { UserName, passWord } = request.body;

    const UpdateResult = await UserModel.findOneAndUpdate(
      { userName: UserName, passWord: passWord },
      { $set: { isActive: true } }
    ).exec();

    if (!UpdateResult)
      throw new Error("An error ocurred while trying to get User.");

    response.json({
      ok: true,
      message: "User logged In succesfully",
      AccessToken: GenerateAccessToken(UpdateResult._id.toString()),
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With UserName and Password",
      errorDescription: error?.message,
    });
  }
}

export async function LogOutWithEmailAndPassWord(request, response) {
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
    const { email, passWord } = request.body;

    const queryResult = await UserModel.updateOne(
      { email: email, passWord: passWord },
      { isActive: false }
    ).exec();

    if (queryResult.matchedCount === 0) throw new Error("User not found.");

    response.json({
      ok: true,
      message: "User loggedOut succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogOut With Email and Password",
      errorDescription: error?.message,
    });
  }
}

export async function LogOutWithUserNameAndPassWord(request, response) {
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

    const { UserName, passWord } = request.body;

    const queryResult = await UserModel.updateOne(
      { userName: UserName, passWord: passWord },
      { isActive: false }
    ).exec();

    if (queryResult.matchedCount === 0) throw new Error("User not found.");
    response.json({
      ok: true,
      message: "User logged Out succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to Log Out With UserName and Password",
      errorDescription: error?.message,
    });
  }
}
