import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("resource")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("decription", "text")
    .addColumn("publicImageSourceId", "varchar") //for future, something like s3 key
    .addColumn("publicImage", "text")
    .addColumn("sourceUrl", "text", (col) => col.notNull())
    .addColumn("linkText", "text")
    .addColumn("type", "varchar", (col) => col.defaultTo("news")) // check from dto
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("resource").execute();
}
