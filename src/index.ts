import { serve } from "@hono/node-server";
import { logger } from "./shared/logger.js";
import env from "./shared/env.js";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { logger as httpLogger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import {
	serveBadRequest,
	serveInternalServerError,
	serveNotFound,
} from "./shared/error.js";
import { ZodError } from "zod";
import type { ZodErrorResponseFormat } from "./shared/types.js";
import { appModules } from "./app/app.module.js";
import { apiReference } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

const appPort = Number.parseInt(process.env.PORT as string) || 8080;
const appHost = String(process.env.HOST_URL) || "http://localhost";

const app = new OpenAPIHono();

app.use(cors());
app.use(compress());
app.use(httpLogger());
	app.use(trimTrailingSlash());

// setup base path
app.basePath("/api");

// register routes
appModules.map((module) => {

	app.route(module.path, module.route);
});

app.doc("/openapi.json", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "NCH",
	},
	servers: [{ url: `${appHost}:${appPort}`, description: "NCH" }],
});

app.get(
	"/docs",
	apiReference({
			spec: {
					url: "/openapi.json",
		},
		layout: "modern",
	}),
);

app.notFound((c) => {
	return serveNotFound(c);
});

app.onError((err, c) => {
	if (err instanceof ZodError) {
		console.log("here");
		const zodErrorResponse: ZodErrorResponseFormat[] = [];
		for (const e of err.errors) {
			zodErrorResponse.push({
				field_name: e.path?.[0].toString() ?? "",
				message: e.message,
			});
		}
		return serveBadRequest(c, zodErrorResponse);
	}
	return serveInternalServerError(c, err);
});

// start server
const appServer = serve({
	fetch: app.fetch,
	port: appPort,
});

logger.info(`Server is running on port: ${appPort}, env: ${env.NODE_ENV}`);

process.on("SIGTERM", () => {
	logger.info("SIGTERM signal received");

	logger.info("Closing http server");
	appServer.close(async () => {
		logger.info("Goodbye...");
		process.exit(0);
	});
});
