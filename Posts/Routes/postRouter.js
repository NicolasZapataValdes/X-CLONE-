import express from "express";
export const postRouter = express.Router();

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePostContent,
  deletePostById,
  restorePostById,
} from "../../Controllers/index.js";

import {
  validatePost,
  validateUpdatePostContent,
  validateDeletePostById,
  validateRestorePostById,
} from "../../Validators/index.js";

postRouter.get("/posts", getAllPosts);
// postRouter.get('/posts/:id', validateGetPostById(), getPostById);
postRouter.get("/posts/:id", getPostById);
postRouter.post("/posts", validatePost(), createPost);
postRouter.patch("/posts/:id", validateUpdatePostContent(), updatePostContent);
postRouter.patch("/posts/delete/:id", validateDeletePostById(), deletePostById);
postRouter.patch(
  "/posts/restore/:id",
  validateRestorePostById(),
  restorePostById
);
