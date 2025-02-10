import type { Context, Handler } from "hono";
import type { CreateUserRequest } from "./dto/user-create.dto.js";

export const createUserController: Handler = async (c: Context): Promise<Response> => {
  const body = await c.req.json<CreateUserRequest>();
  return c.json({ message: "ok" });
};
