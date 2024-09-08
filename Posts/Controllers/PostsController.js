import crypto from "node:crypto";
import { Posts } from "../constants/index.js";
import { validationResult } from "express-validator";

export const getAllPosts = (req, res) => {
  try {
    res.json(Posts);
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};

export const getPostById = (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const post = Posts.find((p) => p.uid == id);

    if (!post) {
      return res.status(404).json({ Message: "Post not found" });
    }

    res.json({
      ok: true,
      message: post,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get post by uid",
      errorDescription: error?.message,
    });
  }
};

export const createPost = (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const newPost = {
      uid: crypto.randomUUID(),
      ...req.body,
    };

    Posts.push(newPost);

    res.status(201).json({
      ok: true,
      data: newPost,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a new post",
      errorDescription: error?.message,
    });
  }
};

export const updatePostContent = (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const postIndex = Posts.findIndex((p) => p.uid == id);

    if (postIndex === -1) {
      return res.status(404).json({ Message: "Post not found" });
    }

    const updatedPost = {
      ...Posts[postIndex],
      ...req.body,
    };

    Posts[postIndex] = updatedPost;

    res.status(201).json({
      ok: true,
      message: updatedPost,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update post content",
      errorDescription: error?.message,
    });
  }
};

export const deletePostById = (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const postIndex = Posts.findIndex((p) => p.uid == id);

    if (postIndex === -1) {
      return res.status(404).json({ Message: "Post not found" });
    }

    const updatedPost = {
      ...Posts[postIndex],
      ...req.body,
    };

    Posts[postIndex] = updatedPost;

    res.status(201).json({
      ok: true,
      message: updatedPost,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to delete post",
      errorDescription: error?.message,
    });
  }
};

export const restorePostById = (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { id } = req.params;

    const postIndex = Posts.findIndex((p) => p.uid == id);

    if (postIndex === -1) {
      return res.status(404).json({ Message: "Post not found" });
    }

    const updatedPost = {
      ...Posts[postIndex],
      ...req.body,
    };

    Posts[postIndex] = updatedPost;

    res.status(201).json({
      ok: true,
      message: updatedPost,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "An error ocurred while trying to restore post",
      errorDescription: error?.message,
    });
  }
};
