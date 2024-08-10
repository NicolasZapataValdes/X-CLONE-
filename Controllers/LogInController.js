import { Users } from "../constants/index.js";
import { validationResult } from "express-validator";

export function LogInWithEmailAndPassWord(request, response) {
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

    const userIndex = Users.findIndex(
      (User) => User.email === email && User.passWord == passWord
    );

    if (userIndex === -1) throw Error("User not found.");

    Users[userIndex] = {
      ...Users[userIndex],
      Activo: true,
    };

    response.json({
      ok: true,
      message: "User logged In succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With Email and Password",
      errorDescription: error?.message,
    });
  }
}

export function LogInWithUserNameAndPassWord(request, response) {
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

    const userIndex = Users.findIndex(
      (User) => User.userName === UserName && User.passWord == passWord
    );

    if (userIndex === -1) throw new Error("User not found.");

    Users[userIndex] = {
      ...Users[userIndex],
      Activo: true,
    };

    response.json({
      ok: true,
      message: "User logged In succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With UserName and Password",
      errorDescription: error?.message,
    });
  }
}

export function LogOutWithEmailAndPassWord(request, response) {
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

    const userIndex = Users.findIndex(
      (User) => User.email === email && User.passWord == passWord
    );

    if (userIndex === -1) throw Error("User not found.");

    Users[userIndex] = {
      ...Users[userIndex],
      Activo: false,
    };

    response.json({
      ok: true,
      message: "User logged Out succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to Log Out With Email and Password",
      errorDescription: error?.message,
    });
  }
}

export function LogOutWithUserNameAndPassWord(request, response) {
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

    const userIndex = Users.findIndex(
      (User) => User.userName === UserName && User.passWord == passWord
    );

    if (userIndex === -1) throw Error("User not found.");

    Users[userIndex] = {
      ...Users[userIndex],
      Activo: false,
    };

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
