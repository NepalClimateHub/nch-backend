import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginValidator = zValidator("json", loginSchema);

type LoginRequest = z.infer<typeof loginSchema>;

export { type LoginRequest, loginValidator };

const createUserSchema = z.object({
    full_name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    expertise: z.string().nullable(),
    gender: z.string(),
    profession: z.string().nullable(),
    scope: z.enum(["nch", "organization", "individual"]),
});

const createUserValidator = zValidator("json", createUserSchema);
type CreateUserRequest = z.infer<typeof createUserSchema>;
export { type CreateUserRequest, createUserValidator, createUserSchema };
