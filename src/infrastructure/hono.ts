import { Hono } from "hono";
import { logger as httpLogger } from "hono/logger";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { trimTrailingSlash } from "hono/trailing-slash";

export const app = new Hono();
// generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());