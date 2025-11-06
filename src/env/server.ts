import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

/**
 * Server-side environment variables
 * These are only available on the server and should never be exposed to the client.
 */
export const serverEnv = createEnv({
	server: {
		// Node environment
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development")
			.describe("Node environment"),

		// Database
		DATABASE_URL: z.url().describe("PostgreSQL database connection URL"),
		PGUSER: z.string().default("postgres").describe("PostgreSQL username"),
		PGPASSWORD: z.string().default("POSTGRES").describe("PostgreSQL password"),
		PGDATABASE: z.string().default("invoices_db").describe("Database name"),
		PGPORT: z.coerce.number().default(5432).describe("PostgreSQL port"),
		PGHOST: z.string().default("localhost").describe("PostgreSQL host"),
	},

	// Runtime environment variables
	runtimeEnv: process.env,

	// Skip validation during build if env vars aren't set
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	// Treat empty strings as undefined
	emptyStringAsUndefined: true,
});
