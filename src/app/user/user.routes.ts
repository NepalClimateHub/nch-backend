import { createUserRequestSchema } from "./dto/user-create.dto.js";
import { createUserController } from "./user.controller.js";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserRequestSchema,
        },
      },
      required: true,
    },
  },
  responses: {},
  tags: ["user"],
});
app.openapi(createUserRoute, createUserController);

export default app;
