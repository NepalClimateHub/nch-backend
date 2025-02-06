import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginValidator = zValidator("json", loginSchema);

type LoginRequest = z.infer<typeof loginSchema>;

export { type LoginRequest, loginValidator };
