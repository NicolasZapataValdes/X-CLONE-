export const createPost = {
  tags: ["Posts"],
  description: "This Endpoint allows you to create a new post",
  operationId: "createUser",
  responses: {
    201: {
      description: "Post created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Post created successfully",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param createdAt is not a valid Date",
                    path: "createdAt",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param creatorUID is empty",
                    path: "creatorUID",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param createdAt is not a valid Date",
                    path: "updatedAt",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param deleted is not a Boolean",
                    path: "deleted",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param content is empty",
                    path: "content",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to create a new post",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};
