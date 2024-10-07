import supertest from 'supertest';
import { createRequest, createResponse } from 'node-mocks-http';
import { describe, expect, jest, test } from '@jest/globals';
import { app } from '../../app.js';
import { UserModel } from '../Models/index.js';
import {
  CreateUser,
  GetFollowersByUid,
  GetUserByEmail,
  GetUserByUserName,
  FollowUser,
  Unfollow,
  GetFollowedUsersByUid,
  UpdateUser,
  DeleteUser,
  RestoreUser,
} from '../Controllers/UserController.js';

jest.mock('../../Users/Models/UserModel.js');

describe('UserController.js', () => {
  describe('Unfollow User', () => {
    describe('When everything is ok', () => {
      test('should return ok true', async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe('When Follower not found', () => {
      test('should return ok false', async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
    describe('When followerUID is invalid', () => {
      test('should return ok false and error description.', async () => {
        const response = await supertest(app)
          .post('/api/v1/UnfollowUser')
          .send({
            followedUid: '1234',
          });

        expect(response.ok).toBe(false);
      });
    });
    describe('When followedUID is invalid', () => {
      test('should return ok false and error description', async () => {
        const response = await supertest(app)
          .post('/api/v1/UnfollowUser')
          .send({
            followerUid: '1234',
          });

        expect(response.ok).toBe(false);
      });
    });
    describe('When something went wrong.', () => {
      test('should return ok false and error description', async () => {
        UserModel.updateOne = jest
          .fn()
          .mockRejectedValue(new Error('Something went wrong.'));

        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
  describe('Follow User', () => {
    describe('When everything is ok', () => {
      test('should return ok true', async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

        const request = createRequest();
        const response = createResponse();

        await FollowUser(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe('When followerUID is invalid', () => {
      test('should return ok false and error description.', async () => {
        const response = await supertest(app).post('/api/v1/FollowUser').send({
          followedUid: '1234',
        });

        expect(response.ok).toBe(false);
      });
    });
    describe('When followedUID is invalid', () => {
      test('should return ok false and error description', async () => {
        const response = await supertest(app).post('/api/v1/FollowUser').send({
          followerUid: '1234',
        });

        expect(response.ok).toBe(false);
      });
    });
    describe('When something went wrong.', () => {
      test('should return ok false and error description', async () => {
        UserModel.updateOne = jest
          .fn()
          .mockRejectedValue(new Error('Something went wrong.'));

        const request = createRequest();
        const response = createResponse();

        await FollowUser(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
    describe('When Follower not found', () => {
      test('should return ok false', async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
        const request = createRequest();
        const response = createResponse();

        await FollowUser(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
  describe('GetUserByUserName', () => {
    test('Should return a user by name', async () => {
      const mockUser = [
        {
          id: '123',
          name: 'Pedro',
          email: 'pedro@gmail.com',
          UserName: 'Pedrito',
          createdAt: '28/09/2024 14:57:35',
          lastLogIn: '28/09/2024 14:57:35',
          isActive: true,
          photo: 'https',
          deleted: false,
        },
      ];

      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockUser),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetUserByUserName(req, res);

      expect(res.statusCode).toBe(200);
    });

    test('Should return 400 when body is empty', async () => {
      const response = await supertest(app).get('/api/v1/GetUserByUserName');

      expect(response.ok).toBe(false);
    });

    test('Should return an error', async () => {
      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetUserByUserName(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
  describe('GetUserByEmail', () => {
    test('Should return a user by email', async () => {
      const mockUser = [
        {
          id: '123',
          name: 'Pedro',
          email: 'pedro@gmail.com',
          UserName: 'Pedrito',
          createdAt: '28/09/2024 14:57:35',
          lastLogIn: '28/09/2024 14:57:35',
          isActive: true,
          photo: 'https',
          deleted: false,
        },
      ];

      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockResolvedValue(mockUser),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetUserByEmail(req, res);

      expect(res.statusCode).toBe(200);
    });

    test('Should return 400 when body is empty', async () => {
      const response = await supertest(app).get('/api/v1/GetUserByEmail');

      expect(response.ok).toBe(false);
    });

    test('Should return an error', async () => {
      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetUserByEmail(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
  describe('CreateUser', () => {
    test('Should create an user', async () => {
      const req = createRequest({
        id: '123',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        UserName: 'Pedrito',
        createdAt: '28/09/2024 14:57:35',
        lastLogIn: '28/09/2024 14:57:35',
        isActive: true,
        photo: 'https',
        deleted: false,
      });
      const res = createResponse();

      UserModel.prototype.save = jest.fn().mockResolvedValue({
        id: '123',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        UserName: 'Pedrito',
        createdAt: '28/09/2024 14:57:35',
        lastLogIn: '28/09/2024 14:57:35',
        isActive: true,
        photo: 'https',
        deleted: false,
      });

      await CreateUser(req, res);

      expect(res.statusCode).toBe(201);
    });

    test('Should return 400 when body is empty', async () => {
      const response = await supertest(app).post('/api/v1/CreateUser');

      expect(response.ok).toBe(false);
    });

    test('Should return an error', async () => {
      const req = createRequest();
      const res = createResponse();

      UserModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong'));

      await CreateUser(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
  describe('GetFollowersByUid', () => {
    // test('Should return a list of followers by uid', async () => {
    //   const mockUser = [
    //     {
    //       uid: '123',
    //       name: 'Pedro',
    //       UserName: 'Pedrito',
    //       photo: 'https',
    //       followers: [
    //         {
    //           id: '123',
    //           name: 'Pedro',
    //           UserName: 'Pedrito',
    //           photo: 'https',
    //         },
    //         {
    //           id: '123',
    //           name: 'Pedro',
    //           UserName: 'Pedrito',
    //           photo: 'https',
    //         },
    //       ],
    //     },
    //   ];
    //   UserModel.find = jest.fn(() => ({
    //     exec: jest.fn().mockResolvedValue(mockUser),
    //   }));
    //   const req = createRequest();
    //   const res = createResponse();
    //   await GetFollowersByUid(req, res);
    //   expect(res.statusCode).toBe(200);
    // });

    test('Should return 400 when body is empty', async () => {
      const response = await supertest(app).get('/api/v1/GetFollowers');

      expect(response.ok).toBe(false);
    });

    test('Should return an error', async () => {
      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetFollowersByUid(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
  describe('GetFollowedUsersByUid', () => {
    test('Should return 400 when body is empty', async () => {
      const response = await supertest(app).get('/api/v1/GetFollowedUsers');

      expect(response.ok).toBe(false);
    });

    test('Should return an error', async () => {
      UserModel.find = jest.fn(() => ({
        exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
      }));

      const req = createRequest();
      const res = createResponse();

      await GetFollowedUsersByUid(req, res);

      expect(res.statusCode).toBe(500);
    });
  });
  describe('UpdateUser', () => {
    test('Should update an user', async () => {
      UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

      const request = createRequest();
      const response = createResponse();

      await UpdateUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(200);
      expect(jsonRequest.ok).toBe(true);
    });

    test('should return ok false and error description', async () => {
      const response = await supertest(app)
        .patch('/api/v1/UpdateUser')
        .send({});

      expect(response.ok).toBe(false);
    });

    test('should return ok false and error description', async () => {
      UserModel.updateOne = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong.'));

      const request = createRequest();
      const response = createResponse();

      await UpdateUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(jsonRequest.ok).toBe(false);
    });
  });
  describe('DeleteUser', () => {
    test('Should delete an user', async () => {
      UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

      const request = createRequest();
      const response = createResponse();

      await DeleteUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(200);
      expect(jsonRequest.ok).toBe(true);
    });

    test('should return ok false and error description', async () => {
      UserModel.updateOne = jest.fn().mockResolvedValue({ acknowledged: 0 });

      const request = createRequest();
      const response = createResponse();

      await DeleteUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(jsonRequest.ok).toBe(false);
    });

    test('should return ok false and error description', async () => {
      const response = await supertest(app)
        .patch('/api/v1/DeleteUser')
        .send({});

      expect(response.ok).toBe(false);
    });

    test('should return ok false and error description', async () => {
      UserModel.updateOne = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong.'));

      const request = createRequest();
      const response = createResponse();

      await DeleteUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(jsonRequest.ok).toBe(false);
    });
  });
  describe('RestoreUser', () => {
    test('Should restore an user', async () => {
      UserModel.updateOne = jest.fn().mockResolvedValue({ acknowledged: 1 });

      const request = createRequest();
      const response = createResponse();

      await RestoreUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(200);
      expect(jsonRequest.ok).toBe(true);
    });

    test('should return ok false and error description', async () => {
      UserModel.updateOne = jest.fn().mockResolvedValue({ acknowledged: 0 });

      const request = createRequest();
      const response = createResponse();

      await RestoreUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(jsonRequest.ok).toBe(false);
    });

    test('should return ok false and error description', async () => {
      const response = await supertest(app)
        .patch('/api/v1/RestoreUser')
        .send({});

      expect(response.ok).toBe(false);
    });

    test('should return ok false and error description', async () => {
      UserModel.updateOne = jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong.'));

      const request = createRequest();
      const response = createResponse();

      await RestoreUser(request, response);
      const jsonRequest = response._getJSONData();
      expect(response.statusCode).toBe(500);
      expect(jsonRequest.ok).toBe(false);
    });
  });
});
