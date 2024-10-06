import express from 'express';
export const postRouter = express.Router();

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePostContent,
  deletePostById,
  restorePostById,
} from '../Controllers/index.js';

import {
  validatePost,
  validateUpdatePostContent,
  validateDeletePostById,
  validateRestorePostById,
  validateGetPostById,
} from '../Validators/index.js';

postRouter.get('/posts/all', getAllPosts);
postRouter.get('/posts/:id', validateGetPostById(), getPostById);
postRouter.post('/posts', validatePost(), createPost);
postRouter.patch('/posts/:id', validateUpdatePostContent(), updatePostContent);
postRouter.patch('/posts/delete/:id', validateDeletePostById(), deletePostById);
postRouter.patch(
  '/posts/restore/:id',
  validateRestorePostById(),
  restorePostById
);
