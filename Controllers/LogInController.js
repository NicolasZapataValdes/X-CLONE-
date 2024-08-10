import { Users } from "../constants/index.js";

export function LogInWithEmailAndPassWord(request, response) {
  try {
    const { email, passWord } = request.body;

    const user = Users.find(
      (User) => User.email === email && User.passWord == passWord
    );

    if (!user) throw error("User not found.");
    if (user.length == 0) throw error("User not found.");
    user.Activo = true;

    response.json({
      ok: true,
      message: "User logged In succesfully",
    });
  } catch (error) {
    response.json({
      ok: false,
      message: "Error while trying to LogIn With Email and Password",
      errorDescription: error,
    });
  }
}

export function LogInWithUserNameAndPassWord(request, response) {
  try {
    const { UserName, passWord } = request.body;

    const user = Users.find(
      (User) => User.userName === UserName && User.passWord == passWord
    );

    if (!user) throw error("User not found.");
    if (user.length == 0) throw error("User not found.");

    user.Activo = true;

    response.json({
      ok: true,
      message: "User logged In succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to LogIn With UserName and Password",
      errorDescription: error,
    });
  }
}

export function LogOutWithEmailAndPassWord(request, response) {
  try {
    const { email, passWord } = request.body;

    const user = Users.find(
      (User) => User.email === email && User.passWord == passWord
    );

    if (!user) throw error("User not found.");
    if (user.length == 0) throw error("User not found.");
    user.Activo = false;

    response.json({
      ok: true,
      message: "User logged Out succesfully",
    });
  } catch (error) {
    response.json({
      ok: false,
      message: "Error while trying to Log Out With Email and Password",
      errorDescription: error,
    });
  }
}

export function LogOutWithUserNameAndPassWord(request, response) {
  try {
    const { UserName, passWord } = request.body;

    const user = Users.find(
      (User) => User.userName === UserName && User.passWord == passWord
    );

    if (!user) throw error("User not found.");
    if (user.length == 0) throw error("User not found.");
    user.Activo = false;

    response.json({
      ok: true,
      message: "User logged Out succesfully",
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying to Log Out With UserName and Password",
      errorDescription: error,
    });
  }
}
