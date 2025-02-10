import { z } from "zod";
import "zod-openapi/extend";

export const createUserRequestSchema = z.object({
	full_name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	expertise: z.string().nullable(),
	gender: z.string(),
	profession: z.string().nullable(),
	scope: z.enum(["nch", "organization", "individual"]),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
