import { Hono } from "hono";
import { serveInternalServerError, serveNotFound } from "../shared/error.js";
import auth from "./auth/auth.module.js";

export class HonoServer {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
  }

  public configure() {
    this.app.get("/", (c) => {
      return c.text("Hi!");
    });

    // universal catchall
    this.app.notFound((c) => {
      return serveNotFound(c);
    });

    // universal errror handler
    this.app.onError((err, c) => {
      return serveInternalServerError(c, err);
    });

    const api = this.app.basePath("/api");

    // register routes
    api.route('auth', auth)
  }
}
