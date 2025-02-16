import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("events")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("province", "varchar", (col) => col.notNull())
    .addColumn("city", "varchar", (col) => col.notNull())
    .addColumn("country", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("event_tags")
    .ifNotExists()
    .addColumn("id", "varchar", (col) => col.primaryKey().unique())
    .addColumn("tagId", "varchar", (col) =>
      col.references("tags.id").onDelete("cascade")
    )
    .addColumn("eventId", "varchar", (col) =>
      col.references("events.id").onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("event_tags").execute();
  await db.schema.dropTable("events").execute();
}
