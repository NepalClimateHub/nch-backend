import type { Context } from "hono";
import type { AuthService } from "./auth.service.js";

export class AuthController {
    constructor(private service: AuthService) {
        this.service = service;
    }

    public async create(c: Context): Promise<Response> {
        const body = await c.req.json();
        console.log("body: ", body);
        // convert body to model
        const result = await this.service.create(body);
        return c.json(result);
    }
}