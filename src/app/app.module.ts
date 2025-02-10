import { userRoutes } from "./user/index.js";
import type { OpenAPIHono } from "@hono/zod-openapi";

type AppRoutes = "auth" | "users";
type AppModules = {
	path: AppRoutes;
	route: OpenAPIHono;
};

export const appModules: AppModules[] = [
	{
		path: "users",
		route: userRoutes.default,
	},
];
