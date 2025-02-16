import { createRoute } from "@hono/zod-openapi";
import { registerIndividualRequestSchema } from "./dto/register-input.dto.js";

const AUTH_TAG = "auth";

export const registerIndividualRoute = createRoute({
	method: "post",
	path: "/register/individual",
	summary: "Register an individual",
	request: {
		body: {
			content: {
				"application/json": {
					schema: registerIndividualRequestSchema,
				},
			},
			required: true,
		},
	},
	responses: {},
	tags: [AUTH_TAG],
});
