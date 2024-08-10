import { Users } from "../constants/index.js";
import crypto from "node:crypto";

export const getUser = (req, res) => {
  const { nombre, email } = req.query;

  /** if (!nombre && !email) {
    return res.status(400).send("Debe proporcionar un nombre o un email.");
  }*/

  /**const user = Users.find(
    (u) => (nombre && u.nombre === nombre) || (email && u.email === email)
  );

  if (!user) {
    return res.status(404).send("Usuario no encontrado.");
  }*/

  res.json(Users);
};

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
