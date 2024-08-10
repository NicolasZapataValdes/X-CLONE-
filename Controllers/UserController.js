import { Users } from "../constants/index.js";
import { validationResult } from "express-validator";
import crypto from "node:crypto";

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
        Name: user.nombre,
        userName: user.userName,
        CreatedAt: user.CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
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
        Name: user.nombre,
        userName: user.userName,
        CreatedAt: user.CreatedAt,
        LastLogIn: user.LastLogIn,
        isActive: user.isActive,
        photo: user.photo,
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

export const createUser = (req, res) => {
  const {
    nombre,
    userName,
    email,
    passWord,
    descripción,
    foto,
    Activo,
    FechaCreación,
    ÚltimaFechaInicioSesion,
  } = req.body;

  /***  if (!nombre || !userName || !email || !passWord || !FechaCreación) {
    return res
      .status(400)
      .send(
        "Debe proporcionar nombre, userName, email, passWord, y FechaCreación."
      );
  }*/

  const existingUser = Users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).send("El usuario ya existe.");
  }

  const newUser = {
    uid: crypto.randomUUID(),
    nombre,
    userName,
    email,
    passWord,
    "Fecha de Creación": FechaCreación,
    "Último fecha de inicio de sesión": ÚltimaFechaInicioSesion || null,
    Activo: Activo !== undefined ? Activo : true,
    descripción: descripción || "",
    foto: foto || "",
  };

  Users.push(newUser);

  res.status(201).json(newUser);
};

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
