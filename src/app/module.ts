import { AuthRepository } from "../adapter/persistent/auth.js";
import { db } from "../db/index.js";
import { app } from "../infrastructure/hono.js";
import { AuthController } from "./auth/controller.js";
import { HonoServer } from "./auth/route.js";
import { AuthService } from "./auth/service.js";


const authRepository = new AuthRepository(db);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
export const authRouter = new HonoServer(app, authController);