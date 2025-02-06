import type { DB } from "./db.js";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});