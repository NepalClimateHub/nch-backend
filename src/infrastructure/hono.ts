import { Hono } from "hono";
import { logger as httpLogger } from "hono/logger";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { trimTrailingSlash } from "hono/trailing-slash";
import { serveBadRequest, serveInternalServerError, serveNotFound } from "../shared/error.js";
import { ZodError } from "zod";

export const app = new Hono();
// generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

app.notFound((c) => {
    return serveNotFound(c);
});

type ZodErrorResponseFormat = {
    field_name: string;
    message: string;
};

app.onError((err, c) => {
    if (err instanceof ZodError) {
        const zodErrorResponse: ZodErrorResponseFormat[] = []
        for (const e of err.errors) {
            zodErrorResponse.push({
                field_name: e.path?.[0].toString() ?? "",
                message: e.message,
            })
        }
        return serveBadRequest(c, zodErrorResponse);
    }
    return serveInternalServerError(c, err);
});