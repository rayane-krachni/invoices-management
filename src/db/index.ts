import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/products";
import { serverEnv } from "../env/server";

export const client = postgres(serverEnv.DATABASE_URL);
export const db = drizzle({
	client,
	schema,
	casing: "snake_case",
});

export { eq };
