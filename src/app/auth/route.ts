import { Hono } from "hono";
import { serveInternalServerError, serveNotFound } from "../../shared/error.js";
import type { AuthController } from "./controller.js";

export class HonoServer {
  private app: Hono;
  private controller: AuthController;

  constructor(app: Hono, controller: AuthController) {
    this.app = app;
    this.controller = controller;
  }

  public configure() {
    this.app.get("/", (c) => {
      return c.text("Hi!");
    });

    this.app.post("/users", this.controller.create);

    this.app.post("/", async (c) => {
      return c.json(await c.req.json());
    })
  }
}
