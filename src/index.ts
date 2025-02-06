import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger as httpLogger } from "hono/logger";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { trimTrailingSlash } from "hono/trailing-slash";
import { HonoServer } from "./app/app.module.js";
import { logger } from "./shared/logger.js";
import env from "./shared/env.js";
import { AuthRepository } from "./app/auth/auth.repository.js";
import { db } from "./db/index.js";
import { AuthService } from "./app/auth/auth.service.js";
import { AuthController } from "./app/auth/auth.controller.js";

const app = new Hono();

// generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

const authRepository = new AuthRepository(db);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const server = new HonoServer(app, authController);
server.configure();

const appPort = Number.parseInt(process.env.PORT as string) || 8080;

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
