import type { Hono } from "hono";
import { userRoutes } from "./user/index.js";
import type { OpenAPIHono } from "@hono/zod-openapi";

type AppRoutes = "auth" | "user";
type AppModules = {
  path: AppRoutes;
  route: OpenAPIHono;
};

export const appModules: AppModules[] = [
  {
    path: "user",
    route: userRoutes.default,
  },
];
