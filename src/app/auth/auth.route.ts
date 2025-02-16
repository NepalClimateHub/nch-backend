import { OpenAPIHono } from "@hono/zod-openapi";
import { registerIndividualController } from "./auth.controller.js";
import { registerIndividualRoute } from "./auth.routes.definition.js";

const app = new OpenAPIHono();

app.openapi(registerIndividualRoute, registerIndividualController);

export default app;
