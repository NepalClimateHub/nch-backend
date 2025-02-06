import { Hono, type InferRequestType } from "hono";
import { loginValidator } from "./validators/login.validator.js";

const auth = new Hono();

auth.post("/login", loginValidator, async (c) => {
  const body = c.req.valid("json");
  return c.json({ message: "get auth index" });
});

export default auth;
