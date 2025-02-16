import { authRoute } from "./auth/index.js";
import type { OpenAPIHono } from "@hono/zod-openapi";

type AppRoutes = "auth" | "users";
type AppModules = {
  path: AppRoutes;
  route: OpenAPIHono;
};

export const appModules: AppModules[] = [
  {
    path: "auth",
    route: authRoute.default,
  },
];
