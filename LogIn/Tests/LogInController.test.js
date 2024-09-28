describe("LogInController", () => {
  describe("LogIn With Email And Password", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When boby is empty", () => {
      test("should return ok false", () => {});
    });
    describe("When email is missing in body request", () => {
      test("should return ok false and description", () => {});
    });
    describe("When password is missing in body request.", () => {
      test("should return ok false and description", () => {});
    });
    describe("When no user match found", () => {
      test("should return ok false and error description", () => {});
    });
  });
  describe("LogIn With UserName And Password", () => {
    describe("When everything is ok", () => {
      test("should return ok true", () => {});
    });
    describe("When boby is empty", () => {
      test("should return ok false", () => {});
    });
    describe("When UserName is missing in body request", () => {
      test("should return ok false and description", () => {});
    });
    describe("When password is missing in body request.", () => {
      test("should return ok false and description", () => {});
    });
    describe("When no user match found", () => {
      test("should return ok false and error description", () => {});
    });
  });
});
