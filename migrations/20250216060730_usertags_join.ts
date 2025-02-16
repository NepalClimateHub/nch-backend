import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_tags")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("tagId", "varchar", (col) => col.references("tags.id").onDelete("cascade"))
    .addColumn("userId", "varchar", (col) => col.references("users.id").onDelete("cascade"))
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_tags").execute();
}