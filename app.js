import express from "express";
import { logInRouter } from "./LogIn/Routes/index.js";
import { postRouter } from "./Posts/Routes/index.js";
import { userRouter } from "./Users/Routes/index.js";
import { ConnectToDataBase } from "./Database/Controller/index.js";

export const app = express();

app.use(express.json());
ConnectToDataBase();

app.use("/api/v1", userRouter);
app.use("/api/v1", logInRouter);
app.use("/api/v1", postRouter);
