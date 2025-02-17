import { migrateActivists } from "./migrate_activists.js";
import { migrateOrganizations } from "./migrate_organzations.js";
import { migrateTags } from "./migrate_tags.js";

const arg = process.argv[2];

switch (arg) {
    case "tags":
        migrateTags()
        break;
    case "organizations":
        migrateOrganizations()
        break;
    case "activists":
    case "users":
        migrateActivists()
        break;
    case "all":
        migrateTags()
        migrateOrganizations()
        break;
    default:
        console.error("Invalid argument");
        process.exit(1);
}