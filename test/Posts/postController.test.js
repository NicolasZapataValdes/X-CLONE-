import { createRequest, createResponse } from 'node-mocks-http';
import { getAllPosts } from '../../Posts/Controllers';
import { PostModel } from '../../Posts/Models';
import { expect, jest, test } from '@jest/globals';

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
  });
});
