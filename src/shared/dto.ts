import type { ZodObject } from "zod";
import type {
	ResponseConfig,
	ZodRequestBody,
} from "@asteasolutions/zod-to-openapi";

export type OtherRequestType = Omit<ZodRequestBody, "content">;
export const GetRequestDTO = (
	schema: ZodObject<any>,
	other?: OtherRequestType,
): ZodRequestBody => {
	return {
		content: {
			"application/json": {
				schema: schema,
			},
		},
		description: other?.description ?? "",
		required: other?.required ?? true,
	};
};

export type ResponseDTOType = {
	[statusCode: string]: ResponseConfig;
};
export type OtherResponseType = Omit<ResponseConfig, "content">;
export const GetResponseDTO = (
	responseSchema: ZodObject<any>,
	other?: OtherResponseType,
): ResponseDTOType => {
	return {
		200: {
			content: {
				"application/json": {
					schema: responseSchema,
				},
			},
			description: other?.description ?? "",
			headers: other?.headers,
			links: other?.links,
		},
	};
};
