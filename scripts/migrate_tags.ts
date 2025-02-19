import { db } from "../src/db/index.js";
import ActivistJSON from "./data/activists.json" assert { type: "json" };
import EventJSON from "./data/events.json" assert { type: "json" };
import OrganizationJSON from "./data/organizations.json" assert {
	type: "json",
};

import cuid from "@bugsnag/cuid";
import type { ActivistDetail, EventDetail, OrganizationDetail } from "./types.js";

export async function migrateTags() {
	const activistJSON: ActivistDetail[] = ActivistJSON;
	const eventJSON: EventDetail[] = EventJSON;
	const organizationJSON: OrganizationDetail[] = OrganizationJSON;

	db.transaction().execute(async (tx) => {
		const allDBTags = await tx.selectFrom("tags").selectAll().execute();
		const invertTable: Record<string, (typeof allDBTags)[0]> = {};
		for (const row of allDBTags) {
			invertTable[row.tag] = row;
		}

		for (const activist of activistJSON) {
			const { id, tags } = activist;
			if (!tags?.length) {
				continue;
			}
			for (const t of tags) {
				if (!invertTable[t]) {
					invertTable[t] = {
						id: cuid(),
						tag: t,
						isEventTag: false,
						isOrganizationTag: false,
						isUserTag: true,
					};
				}
				invertTable[t].isUserTag = true;
			}
		}

		for (const event of eventJSON) {
			const { id, tags } = event;
			if (!tags?.length) {
				continue;
			}
			for (const t of tags) {
				if (!invertTable[t]) {
					invertTable[t] = {
						id: cuid(),
						tag: t,
						isEventTag: true,
						isOrganizationTag: false,
						isUserTag: false,
					};
				}
				invertTable[t].isEventTag = true;
			}
		}

		for (const organization of organizationJSON) {
			const { id, tags } = organization;
			if (!tags?.length) {
				continue;
			}
			for (const t of tags) {
				if (!invertTable[t]) {
					invertTable[t] = {
						id: cuid(),
						tag: t,
						isEventTag: false,
						isOrganizationTag: true,
						isUserTag: false,
					};
				}
				invertTable[t].isOrganizationTag = true;
			}
		}

		const values = Object.values(invertTable).map((tag) => ({
			id: cuid(),
			tag: tag.tag,
			isEventTag: tag.isEventTag,
			isOrganizationTag: tag.isOrganizationTag,
			isUserTag: tag.isUserTag,
		}));
		console.log("Values", values.length);
		await tx.deleteFrom("tags").execute();
		const res = await tx.insertInto("tags").values(values).execute();
		console.log("Inserted", res.length, "tags");
	});
};
