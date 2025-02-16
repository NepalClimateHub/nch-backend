import { z } from "zod";

export const registerIndividualRequestSchema = z.object({
	fullName: z.string().min(5),
	email: z.string().email(),
	phoneNumber: z.string().min(8).optional(),
	gender: z.enum(["male", "female", "other", "prefer not to say"]),
	password: z.string().min(8),
	// todo: change following three to enum after finalizing options
	province: z.string().min(1),
	profession: z.string().min(1),
	expertise: z.string().min(1),
});
export type RegisterIndividualRequest = z.infer<
	typeof registerIndividualRequestSchema
>;
