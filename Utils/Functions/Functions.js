import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "node:crypto";
dotenv.config();

export function GenerateAccessToken(PayLoad) {
  return EncryptJWTToken(jsonwebtoken.sign(PayLoad, process.env.JWTSecretKey));
}

export function ValidateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({
        ok: false,
        message: "Access Token in headers is empty.",
      });

    jsonwebtoken.verify(
      DecryptJWTToken(token),
      process.env.JWTSecretKey,
      (error, decodedUserName) => {
        if (error)
          return res.status(403).json({
            ok: false,
            message: "Access Token cannot be decoded.",
          });

        req.user = decodedUserName;
        next();
      }
    );
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error while trying verify AccessToken",
      errorDescription: error?.message,
    });
  }
}

function EncryptJWTToken(Token) {
  const InitialVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CryptoSecretKey),
    InitialVector
  );

  let encrypted = cipher.update(Token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return InitialVector.toString("hex") + ":" + encrypted;
}

function DecryptJWTToken(EncryptedToken) {
  const parts = EncryptedToken.split(":");
  const InitialVector = Buffer.from(parts.shift(), "hex");
  const EncryptedJWT = Buffer.from(parts.join(":"), "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CryptoSecretKey),
    InitialVector
  );
  let decrypted = decipher.update(EncryptedJWT, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
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
