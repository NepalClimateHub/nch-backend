import type { Context } from "hono";
import type { AuthService } from "./service.js";
import { createUserSchema } from "./validator.js";
import { handeBigInt } from "../../shared/big_int.js";

export class AuthController {
    private service: AuthService;
    constructor(service: AuthService) {
        this.service = service;
        this.create = this.create.bind(this);
    }

    public async create(c: Context): Promise<Response> {
        const body = await c.req.json();
        const parsedBody = createUserSchema.parse(body);
        const result = await this.service.create(parsedBody);
        const resultStringified = handeBigInt(result);
        return c.json(resultStringified);
    }
}