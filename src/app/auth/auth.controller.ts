import type { Context, Handler } from "hono";
import type { RegisterIndividualRequest } from "./dto/register-input.dto.js";

export const registerIndividualController: Handler = async (
	c: Context,
): Promise<Response> => {
	const registerPayload = await c.req.json<RegisterIndividualRequest>();
	return c.json({ message: "ok", response: registerPayload });
};
