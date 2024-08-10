import crypto from 'node:crypto';
import { Posts } from '../constants/index.js';
import { validationResult } from 'express-validator';

export const getAllPosts = (req, res) => {
  try {
    res.json(Posts);
  } catch (error) {
    res.status(500).json({ Message: 'Internal server error' });
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
      return res.status(404).json({ Message: 'Post not found' });
    }

    res.json({
      ok: true,
      message: post,
    });
  } catch (error) {
    res.status(500).json({ Message: 'Internal server error' });
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
    res.status(500).json({ Message: 'Internal server error' });
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
      return res.status(404).json({ Message: 'Post not found' });
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
    res.status(500).json({ Message: 'Internal server error' });
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
      return res.status(404).json({ Message: 'Post not found' });
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
    res.status(500).json({ Message: 'Internal server error' });
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
      return res.status(404).json({ Message: 'Post not found' });
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
    res.status(500).json({ Message: 'Internal server error' });
  }
};
