import { Kysely } from "kysely";
import type { DB } from "../../db/db.js";

type UserCreateDao = Omit<DB["users"], "id" | "created_at" | "updated_at" | "isActive" | "isEmailVerified" | "requiresPasswordChange" | "resetPasswordToken" | "resetPasswordExpiryTime" | "emailVerificationToken" | "emailVerificationExpiryTime" | "scope">;

export interface DAO {
    UserCreateDao: UserCreateDao;
}

export class AuthRepository {
    private db: Kysely<DB>;
    constructor(db: Kysely<DB>) {
        this.db = db;
    }

    public async create(input: UserCreateDao) {
        console.log("input: ", input);
        return this.
            db.
            insertInto("users").
            values({
                ...input,
            }).
            executeTakeFirst();

    }
}