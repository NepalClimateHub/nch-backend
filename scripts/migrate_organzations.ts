import cuid from "@bugsnag/cuid";
import type { Organizations } from "../src/db/db.js";
import { db } from "../src/db/index.js";
import OrganizationJSON from "./data/organizations.json" assert {
    type: "json",
};
import type { OrganizationDetail } from "./types.js";

export async function migrateOrganizations() {
    const organizationJSON: OrganizationDetail[] = OrganizationJSON;
    const invertedIndex: Record<string, Organizations> = {}
    db.transaction().execute(async (tx) => {
        const dbOrganizations = await tx.selectFrom("organizations").selectAll().execute()
        for (const dbOrganization of dbOrganizations) {
            if (dbOrganization.email) {
                if (!invertedIndex[dbOrganization.email]) {
                    invertedIndex[dbOrganization.email] = dbOrganization
                }
            }
        }
        for (const organization of organizationJSON) {
            const { id, name, description, address, contact, socials, website, tags, logoUrl, pictures, slug } = organization;
            const splittedAddress = address.split(",")
            const country = splittedAddress[splittedAddress.length - 1].trim()
            const city = splittedAddress.slice(0, splittedAddress.length - 1).join(",").trim()
            invertedIndex[contact.email] = {
                id: cuid(),
                name: name,
                description: description,
                email: contact.email,
                phoneNumber: contact.phone,
                province: "",
                city: city,
                country: country,
                publicImageSourceId: "",
                publicImage: logoUrl,
                slug: slug
            }
        }

        console.log("removing old organizations")
        await tx.deleteFrom("organizations").execute()

        console.log("inserting new organizations")
        const organizationDaos = Object.values(invertedIndex)
        await tx
            .insertInto("organizations")
            .values(organizationDaos)
            .execute()
    })

}