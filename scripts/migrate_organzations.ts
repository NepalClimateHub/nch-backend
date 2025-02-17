import cuid from "@bugsnag/cuid";
import type { Organizations, OrganizationTags } from "../src/db/db.js";
import { db } from "../src/db/index.js";
import OrganizationJSON from "./data/organizations.json" assert {
    type: "json",
};
import type { OrganizationDetail } from "./types.js";

export async function migrateOrganizations() {
    const organizationJSON: OrganizationDetail[] = OrganizationJSON;
    const invertedOrganizationIndex: Record<string, Organizations> = {}

    await db.transaction().execute(async (tx) => {
        const dbOrganizations = await tx.selectFrom("organizations").selectAll().execute()
        for (const dbOrganization of dbOrganizations) {
            if (dbOrganization.email) {
                if (!invertedOrganizationIndex[dbOrganization.email]) {
                    invertedOrganizationIndex[dbOrganization.email] = dbOrganization
                }
            }
        }
        for (const organization of organizationJSON) {
            const { id, name, description, address, contact, socials, website, tags, logoUrl, pictures, slug } = organization;
            const splittedAddress = address.split(",")
            const country = splittedAddress[splittedAddress.length - 1].trim()
            const city = splittedAddress.slice(0, splittedAddress.length - 1).join(",").trim()
            if (!invertedOrganizationIndex[contact.email]) {
                invertedOrganizationIndex[contact.email] = {
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
        }

        console.log("removing old organizations")
        await tx.deleteFrom("organizations").execute()

        console.log("inserting new organizations")
        const organizationDaos = Object.values(invertedOrganizationIndex)
        await tx
            .insertInto("organizations")
            .values(organizationDaos)
            .execute()
    })

    await db.transaction().execute(async (tx) => {
        const organizationTags: OrganizationTags[] = []
        const allDBTags = await tx.selectFrom("tags").selectAll().execute();
        const invertTable: Record<string, (typeof allDBTags)[0]> = {};
        for (const row of allDBTags) {
            invertTable[row.tag] = row;
        }
        for (const organization of organizationJSON) {
            const { tags, contact: { email } } = organization;
            for (const tag of tags) {
                if (invertTable[tag] && invertedOrganizationIndex[email]) {
                    organizationTags.push({
                        id: cuid(),
                        organizationId: invertedOrganizationIndex[email].id,
                        tagId: invertTable[tag].id
                    })
                }
            }
        }

        console.log("removing old organization tags")
        await tx.deleteFrom("organization_tags").execute()
        console.log("inserting new organization tags")
        tx.insertInto("organization_tags").values(organizationTags).execute()
    })

}