import cuid from "@bugsnag/cuid";
import type { OrganizationTags, Users, UserTags } from "../src/db/db.js";
import { db } from "../src/db/index.js";
import activistJSON from "./data/activists.json" assert {
    type: "json",
};
import type { ActivistDetail } from "./types.js";
import type { Insertable } from "kysely";

export async function migrateActivists() {
    const userJSON: ActivistDetail[] = activistJSON;

    const invertedActivistIndex: Record<string, Insertable<Users>> = {}
    await db.transaction().execute(async (tx) => {
        const dbUsers = await tx.selectFrom("users").selectAll().execute()
        for (const dbUser of dbUsers) {
            if (dbUser.email) {
                if (!invertedActivistIndex[dbUser.email]) {
                    invertedActivistIndex[dbUser.email] = {
                        id: dbUser.id,
                        fullName: dbUser.fullName,
                        bio: dbUser.bio,
                        email: dbUser.email,
                        phoneNumber: dbUser.phoneNumber,
                        province: dbUser.province,
                        city: dbUser.city,
                        country: dbUser.country,
                        publicImageSourceId: dbUser.publicImageSourceId,
                        publicImage: dbUser.publicImage,
                        slug: dbUser.slug,
                        isActive: dbUser.isActive,
                        createdAt: dbUser.createdAt,
                        updatedAt: dbUser.updatedAt,
                        gender: "unknown",
                        password: "Default@123",
                    }
                }
            }
        }
        for (const user of userJSON) {
            const { id, name, description, address, contact, socials, website, tags, logoUrl, pictures, slug } = user;
            const splittedAddress = address.split(",")
            const country = splittedAddress[splittedAddress.length - 1].trim()
            const city = splittedAddress.slice(0, splittedAddress.length - 1).join(",").trim()
            if (!invertedActivistIndex[contact.email]) {
                invertedActivistIndex[contact.email] = {
                    id: cuid(),
                    fullName: name,
                    bio: description,
                    email: contact.email,
                    phoneNumber: contact.phone,
                    province: "",
                    city: city,
                    country: country,
                    publicImageSourceId: "",
                    publicImage: logoUrl,
                    slug: slug,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    gender: "unknown",
                    isEmailVerified: true,
                    requiresPasswordChange: true,
                    password: "Default@123",
                    scope: "individual",
                }
            }
        }

        console.log("removing old users")
        await tx.deleteFrom("users").execute()

        console.log("inserting new users")
        const userDaos = Object.values(invertedActivistIndex)
        await tx
            .insertInto("users")
            .values(userDaos)
            .execute()
    })

    await db.transaction().execute(async (tx) => {
        const userTags: UserTags[] = []
        const allDBTags = await tx.selectFrom("tags").selectAll().execute();
        const invertTable: Record<string, (typeof allDBTags)[0]> = {};
        for (const row of allDBTags) {
            invertTable[row.tag] = row;
        }
        for (const user of userJSON) {
            const { tags, contact: { email } } = user;
            for (const tag of tags) {
                if (invertTable[tag] && invertedActivistIndex[email]) {
                    userTags.push({
                        id: cuid(),
                        userId: invertedActivistIndex[email].id,
                        tagId: invertTable[tag].id
                    })
                }
            }
        }

        console.log("removing old user tags")
        await tx.deleteFrom("user_tags").execute()
        console.log("inserting new user tags")
        tx.insertInto("user_tags").values(userTags).execute()
    })

}