import 'dotenv/config';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT as number | undefined,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [process.env.DATABASE_ENTITIES as string],
	migrations: [process.env.DATABASE_MIGRATIONS as string]
})