import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";
import { db as kyselyConfig } from "../src/db/index";

export default defineConfig({
  kysely: kyselyConfig,
  migrations: {
    migrationFolder: "migrations",
    getMigrationPrefix: getKnexTimestampPrefix,
  },
});
