import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("socials")
    .addColumn("eventId", "varchar", (col) =>
      col.references("events.id").onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.alterTable("socials").dropColumn("eventId").execute();
}
