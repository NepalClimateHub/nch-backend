import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

function resetDatabase(): void {
	const dbURL: string = process.env.DATABASE_URL ?? "";
	if (!dbURL) {
		throw new Error("DATABASE_URL is not set");
	}
	const urlWithoutDB: string = dbURL.substring(0, dbURL.lastIndexOf("/") + 1);
	const dbName: string = dbURL.substring(dbURL.lastIndexOf("/") + 1);
	const pool = new Pool({
		connectionString: `${urlWithoutDB}postgres`,
		ssl: false,
	});

	pool
		.query(`CREATE DATABASE "${dbName}"`)
		.then(() => {
			console.log(`Created database ${dbName}`);
			pool.end();
		})
		.catch((err) => {
			console.error(`Error creating database ${dbName}:`, err);
			pool.end();
		});
}

resetDatabase();
