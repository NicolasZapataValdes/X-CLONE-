import express from "express";
import { logInRouter } from "./LogIn/Routes/index.js";
import { postRouter } from "./Posts/Routes/index.js";
import { userRouter } from "./Users/Routes/index.js";
import { createPost } from "./Posts/Docs/PostRouterDocs.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

export const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "X-CLONE API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:1234",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Posts",
      },
      {
        name: "Users",
      },
      {
        name: "LogIn",
      },
    ],
    paths: {
      "/api/v1/posts/": {
        post: createPost,
      },
    },
  },
  apis: [
    "./LogIn/Routes/LogInRouter.js",
    "./Posts/Routes/postRouter.js",
    "./Users/Routes/UsersRouter.js",
  ],
};

app.use(express.json());
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", userRouter);
app.use("/api/v1", logInRouter);
app.use("/api/v1", postRouter);
