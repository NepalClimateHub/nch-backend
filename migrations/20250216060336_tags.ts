import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("tags")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("tag", "varchar", (col) => col.notNull())
    .addColumn("isUserTag", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("isOrganizationTag", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("isEventTag", "boolean", (col) => col.defaultTo(false).notNull())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_tags").execute();
}
