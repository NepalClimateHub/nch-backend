import { serve } from "@hono/node-server";
import { logger } from "./shared/logger.js";
import env from "./shared/env.js";
import { authRouter } from "./app/module.js";
import { app } from "./infrastructure/hono.js";


authRouter.configure();

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
