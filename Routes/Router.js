import express from "express";
export const router = express.Router();
import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  LogOutWithEmailAndPassWord,
  LogOutWithUserNameAndPassWord,
} from "../Controllers/index.js";

router.post("/LogInWithEmailAndPassWord", LogInWithEmailAndPassWord);
router.post("/LogInWithUserNameAndPassWord", LogInWithUserNameAndPassWord);
router.post("/LogOutWithEmailAndPassWord", LogOutWithEmailAndPassWord);
router.post("/LogOutWithUserNameAndPassWord", LogOutWithUserNameAndPassWord);
