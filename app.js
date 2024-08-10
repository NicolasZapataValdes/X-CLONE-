import express from "express";
export const app = express();

import { postRouter } from "./Controllers/index.js";

app.use(express.json());

app.use('/api/v1', postRouter)