import express from "express";
import { userRouter, logInRouter, postRouter } from "./Routes/index.js";

export const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", logInRouter);
app.use("/api/v1", postRouter);
