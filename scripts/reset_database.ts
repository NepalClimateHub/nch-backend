import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const dbURL: string = process.env.DATABASE_URL ?? "";
if (!dbURL) {
	throw new Error("DATABASE_URL is not set");
}
const urlWithoutDB: string = dbURL.substring(0, dbURL.lastIndexOf("/") + 1);
const dbName: string = dbURL.substring(dbURL.lastIndexOf("/") + 1);

function dropDatabase(): void {
	const dropPool = new Pool({
		connectionString: `${urlWithoutDB}postgres`,
		ssl: false,
	});

	dropPool
		.query(`DROP DATABASE "${dbName}" (FORCE)`)
		.then(() => {
			console.log(`Dropped database ${dbName}`);
			dropPool.end().then(() => createDatabase(dbName)).catch(err => console.error(err));
		})
		.catch((err) => {
			console.error(`Error dropping database ${dbName}:`);
			dropPool.end();
		});

	createDatabase(dbName);
}

function createDatabase(dbName: string): void {
	const createPool = new Pool({
		connectionString: `${urlWithoutDB}postgres`,
		ssl: false,
	});

	createPool
		.query(`CREATE DATABASE "${dbName}"`)
		.then(() => {
			console.log(`Created database ${dbName}`);
			createPool.end();
		})
		.catch((err) => {
			console.error(`Error creating database ${dbName}`);
			createPool.end();
		});
}

dropDatabase();
