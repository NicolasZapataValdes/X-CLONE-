import { verify, sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function GenerateAccessToken(UserName) {
  return sign(UserName, process.env.JWSSecretKey, { expiresIn: "1800s" });
}

export function ValidateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.sendStatus(401).json({
        ok: false,
        message: "Access Token in headers is empty.",
      });

    verify(token, process.env.JWSSecretKey, (error, decodedUserName) => {
      if (error)
        return res.sendStatus(403).json({
          ok: false,
          message: "Access Token cannot be decoded.",
        });

      req.user = decodedUserName;
      next();
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "Error while trying verify AccessToken",
      errorDescription: error?.message,
    });
  }
}

export function getParsedCurrentDateTime() {
  const currentTime = new Date();

  const day = currentTime.getDate().toString().padStart(2, "0");
  const moth = (currentTime.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses empiezan en 0
  const year = currentTime.getFullYear();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  const parsedDateTime = `${day}/${moth}/${year} ${hours}:${minutes}:${seconds}`;

  return parsedDateTime;
}
