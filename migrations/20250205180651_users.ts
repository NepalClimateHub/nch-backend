import { sql, type Kysely } from "kysely";
import type { DB } from "../src/db/db.js";

export async function up(db: Kysely<DB>): Promise<void> {
  // scope enum
  await db.schema
    .createType("scope")
    .asEnum(["nch", "organization", "individual"])
    .execute();

  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn("fullName", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("phoneNumber", "varchar")
    .addColumn("gender", "varchar", (col) => col.notNull())
    .addColumn("province", "varchar", (col) => col.notNull())
    .addColumn("profession", "varchar")
    .addColumn("expertise", "varchar")
    .addColumn("affiliatedOrganization", "varchar") //different from registered organization
    .addColumn("scope", sql`scope`, (col) => col.defaultTo("individual"))
    .addColumn("isEmailVerified", "boolean", (col) => col.defaultTo(false))
    .addColumn("isActive", "boolean", (col) => col.defaultTo(false))
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("requiresPasswordChange", "boolean", (col) =>
      col.defaultTo(false)
    )
    .addColumn("resetPasswordToken", "varchar")
    .addColumn("resetPasswordExpiryTime", "timestamptz")
    .addColumn("emailVerificationToken", "varchar")
    .addColumn("emailVerificationExpiryTime", "timestamptz")
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("users").execute();
  await db.schema.dropType("scope").execute();
}
