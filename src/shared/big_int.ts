export const handeBigInt = <T>(result: T): T =>
	JSON.parse(
		JSON.stringify(result, (key, value) =>
			typeof value === "bigint" ? value.toString() : value,
		),
	);
