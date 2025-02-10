import type { DB } from "./db.js";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const { Pool } = pg;

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: false,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});
