import { validationResult } from "express-validator";
import { PostModel } from "../Models/index.js";
import { getParsedCurrentDateTime } from "../../Utils/Functions/Functions.js";

export async function getAllPosts(req, res) {
  try {
    const queryResult = await PostModel.find().limit(10).exec();

    res.status(200).json({
      ok: true,
      posts: queryResult,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get posts",
      errorDescription: error?.message,
    });
  }
}

export async function getPostById(req, res) {
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
    const post = await PostModel.findById(id).exec();

    if (!post || post.length === 0) {
      return res.status(404).json({ ok: false, message: "Post not found" });
    }

    res.status(200).json({
      ok: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to get post by uid",
      errorDescription: error?.message,
    });
  }
}

export async function createPost(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: "Request don't pass validations.",
        errorDescription: result.array(),
      });
    }

    const { createdAt, creatorUID, updatedAt, deleted, content } = req.body;
    const newPost = new PostModel({
      content: content,
      createdAt: getParsedCurrentDateTime(),
      updatedAt: getParsedCurrentDateTime(),
      creatorUID: req.user,
      deleted: false,
    });

    await newPost.save();
    res.status(201).json({
      ok: true,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to create a new post",
      errorDescription: error?.message,
    });
  }
}

export async function updatePostContent(req, res) {
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
    const { content } = req.body;

    const queryResult = await PostModel.updateOne(
      { _id: id },
      {
        content: content,
        updatedAt: getParsedCurrentDateTime(),
      }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, message: "Post not found." });
    }

    res.status(200).json({
      ok: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to update post content",
      errorDescription: error?.message,
    });
  }
}

export async function deletePostById(req, res) {
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

    const queryResult = await PostModel.updateOne(
      { _id: id },
      { deleted: true }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, Message: "Post not found" });
    }

    res.status(200).json({
      ok: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to delete post",
      errorDescription: error?.message,
    });
  }
}

export async function restorePostById(req, res) {
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

    const queryResult = await PostModel.updateOne(
      { _id: id },
      { deleted: false }
    ).exec();

    if (queryResult.matchedCount === 0) {
      return res.status(404).json({ ok: false, Message: "Post not found" });
    }

    res.status(201).json({
      ok: true,
      message: "Post restored successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "An error ocurred while trying to restore post",
      errorDescription: error?.message,
    });
  }
}
