import { AuthRepository } from "../../adapter/persistent/auth.js";
import { db } from "../../db/index.js";
import { app } from "../../infrastructure/hono.js";
import { AuthController } from "./controller.js";
import { HonoServer } from "./route.js";
import { AuthService } from "./service.js";

export class AuthModule {
    private server: HonoServer;
    constructor() {
        const authRepository = new AuthRepository(db);
        const authService = new AuthService(authRepository);
        const authController = new AuthController(authService);
        this.server = new HonoServer(app, authController);
    }

    public configure() {
        this.server.configure();
    }
}