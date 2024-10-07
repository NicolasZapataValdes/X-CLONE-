import supertest from "supertest";
import { createRequest, createResponse } from "node-mocks-http";
import { describe, expect, jest, test } from "@jest/globals";
import { app } from "../../app.js";
import { UserModel } from "../Models/index.js";
import { FollowUser, Unfollow } from "../Controllers/UserController.js";
import { response } from "express";

jest.mock("../../Users/Models/UserModel.js");

describe("UserController.js", () => {
  describe("Unfollow User", () => {
    describe("When everything is ok", () => {
      test("should return ok true", async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe("When Follower not found", () => {
      test("should return ok false", async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
    describe("When followerUID is invalid", () => {
      test("should return ok false and error description.", async () => {
        const response = await supertest(app)
          .post("/api/v1/UnfollowUser")
          .send({
            followedUid: "1234",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When followedUID is invalid", () => {
      test("should return ok false and error description", async () => {
        const response = await supertest(app)
          .post("/api/v1/UnfollowUser")
          .send({
            followerUid: "1234",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When something went wrong.", () => {
      test("should return ok false and error description", async () => {
        UserModel.updateOne = jest
          .fn()
          .mockRejectedValue(new Error("Something went wrong."));

        const request = createRequest();
        const response = createResponse();

        await Unfollow(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
  describe("Follow User", () => {
    describe("When everything is ok", () => {
      test("should return ok true", async () => {
        UserModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });

        const request = createRequest();
        const response = createResponse();

        await FollowUser(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe("When followerUID is invalid", () => {
      test("should return ok false and error description.", async () => {
        const response = await supertest(app).post("/api/v1/FollowUser").send({
          followedUid: "1234",
        });

        expect(response.ok).toBe(false);
      });
    });
    describe("When followedUID is invalid", () => {
      test("should return ok false and error description", async () => {
        const response = await supertest(app).post("/api/v1/FollowUser").send({
          followerUid: "1234",
        });

        expect(response.ok).toBe(false);
      });
    });
    describe("When something went wrong.", () => {
      test("should return ok false and error description", async () => {
        UserModel.updateOne = jest
          .fn()
          .mockRejectedValue(new Error("Something went wrong."));

        const request = createRequest();
        const response = createResponse();

        await FollowUser(request, response);
        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
    describe("When Follower not found", () => {
      test("should return ok false", async () => {
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
  describe("Get Followers by UID", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When something went wrong", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When UID is invalid", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When user not found", () => {
      test("should return ok false and error description", () => {});
    });
  });
  describe("Get Followed by UID", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When something went wrong", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When UID is invalid", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When user not found", () => {
      test("should return ok false and error description", () => {});
    });
  });
});
