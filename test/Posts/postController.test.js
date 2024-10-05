import { createRequest, createResponse } from 'node-mocks-http';
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostContent,
} from '../../Posts/Controllers';
import { PostModel } from '../../Posts/Models';
import { describe, expect, jest, test } from '@jest/globals';
import { validationResult } from 'express-validator';

jest.mock('../../Posts/Models');

describe('PostsController.js', () => {
  describe('getAllPosts', () => {
    test('Should return all post', async () => {
      const mockPost = {
        createdAt: '28/09/2024 14:57:35',
        updatedAt: '29/09/2024 14:57:35',
        deleted: false,
        creatorUID: '123',
        content: 'Some text',
      };

      PostModel.find = jest.fn(() => ({
        limit: jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(mockPost),
        })),
      }));

      const req = createRequest();
      const res = createResponse();

      await getAllPosts(req, res);

      expect(res.statusCode).toBe(200);
    });

    test('Should return an error', async () => {
      PostModel.find = jest.fn(() => ({
        limit: jest.fn(() => ({
          exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
        })),
      }));

      const req = createRequest();
      const res = createResponse();

      await getAllPosts(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe('getPostById', () => {
    test('Should return a post by id', async () => {
      const mockPost = {
        id: '123',
        title: 'Test Post',
        content: 'This is a test post content',
      };

      PostModel.findById = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest({
        params: { id: '123' },
      });

      const res = createResponse();

      await getPostById(req, res);

      expect(res.statusCode).toBe(200);
    });

    test('Should return an error', async () => {
      PostModel.findById = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await getPostById(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe('createPost', () => {
    test('Should create a post', async () => {
      const req = createRequest({
        body: {
          createdAt: '28/09/2024 14:57:35',
          updatedAt: '29/09/2024 14:57:35',
          deleted: false,
          creatorUID: '123',
          content: 'Some text',
        },
      });
      const res = createResponse();

      PostModel.prototype.save = jest.fn().mockResolvedValue({
        createdAt: '28/09/2024 14:57:35',
        updatedAt: '29/09/2024 14:57:35',
        deleted: false,
        creatorUID: '123',
        content: 'Some text',
      });

      await createPost(req, res);

      expect(res.statusCode).toBe(201);
    });

    test('Should return an error', async () => {
      const req = createRequest();
      const res = createResponse();

      PostModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong'));

      await createPost(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe('updatePostContent', () => {
    test('Should update post content', async () => {
      const mockPost = {
        id: '123',
        title: 'Test Post',
        content: 'This is a test post content',
      };

      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest();
      const res = createResponse();

      await updatePostContent(req, res);

      expect(res.statusCode).toBe(200);
    });

    test('Should return an error', async () => {
      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await updatePostContent(req, res);

      expect(res.statusCode).toBe(500);
    });
  });

  describe('deletePostById', () => {
    test('Should delete a post by id', async () => {
      const mockPost = {
        id: '123',
        title: 'Test Post',
        content: 'This is a test post content',
      };

      PostModel.updateOne = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockPost),
      }));

      const req = createRequest();
      const res = createResponse();

      await deletePostById(req, res);

      expect(res.statusCode).toBe(200);
    });
  });
});
