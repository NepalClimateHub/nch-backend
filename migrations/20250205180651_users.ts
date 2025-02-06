import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // scope enum
  await db.schema
    .createType("scope")
    .asEnum(["nch", "organization", "individual"])
    .execute();

  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn("full_name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("gender", "varchar", (col) => col.notNull())
    .addColumn("profession", "varchar")
    .addColumn("expertise", "varchar")
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
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
  await db.schema.dropType("scope").execute();
}
