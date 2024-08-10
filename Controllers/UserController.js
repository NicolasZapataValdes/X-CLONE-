import { Users } from "../constants/index.js";

export const getUser = (req, res) => {
  const { nombre, email } = req.query;

  if (!nombre && !email) {
    return res.status(400).send("Debe proporcionar un nombre o un email.");
  }

  const user = Users.find(
    (u) => (nombre && u.nombre === nombre) || (email && u.email === email)
  );

  if (!user) {
    return res.status(404).send("Usuario no encontrado.");
  }

  res.json(user);
};
