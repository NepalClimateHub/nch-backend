import type { Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("socials")
    .addColumn("organizationId", "varchar", (col) =>
      col.references("organizations.id").onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.alterTable("socials").dropColumn("organizationId").execute();
}
