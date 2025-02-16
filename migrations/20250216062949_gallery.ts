import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("gallery")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("publicImageSourceId", "varchar") //for future, something like s3 key
    .addColumn("publicImage", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("gallery").execute();
}
