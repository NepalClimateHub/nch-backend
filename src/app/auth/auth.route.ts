import { Hono, type InferRequestType } from "hono";
import { loginValidator } from "./login.validator.js";

const auth = new Hono();

auth.post("/login", loginValidator, async (c) => {
  const body = c.req.valid("json");
  return c.json({ message: "get auth index" });
});

export default auth;
