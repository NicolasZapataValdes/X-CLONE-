import supertest from "supertest";
import { createRequest, createResponse } from "node-mocks-http";
import { describe, expect, jest, test } from "@jest/globals";
import { app } from "../../app.js";
import { UserModel } from "../Models/index.js";

jest.mock("../../Users/Models/UserModel.js");

describe("UserController.js", () => {
  describe("Unfollow User", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When followerUID is invalid", () => {
      test("should return ok false and error description.", () => {});
    });
    describe("When followedUID is invalid", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When something went wrong.", () => {
      test("should return ok false and error description", () => {});
    });
  });
  describe("Follow User", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When followerUID is invalid", () => {
      test("should return ok false and error description.", () => {});
    });
    describe("When followedUID is invalid", () => {
      test("should return ok false and error description", () => {});
    });
    describe("When something went wrong.", () => {
      test("should return ok false and error description", () => {});
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
