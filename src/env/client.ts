import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Client-side environment variables
 * These are exposed to the browser and must be prefixed with VITE_
 *
 * @see https://env.t3.gg/docs/core
 */
export const clientEnv = createEnv({
	/**
	 * Client-side environment variables
	 * IMPORTANT: These are exposed to the browser - never put secrets here!
	 */
	clientPrefix: "VITE_",
	client: {
		VITE_APP_URL: z
			.url()
			.default("http://localhost:3000")
			.describe("Application base URL"),
		VITE_APP_NAME: z.string().default("envoices").describe("Application name"),
	},

	/**
	 * Runtime environment variables (browser)
	 * These are read from import.meta.env
	 */
	runtimeEnv: import.meta.env,

	/**
	 * Skip validation during build if env vars aren't set
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	/**
	 * Treat empty strings as undefined
	 */
	emptyStringAsUndefined: true,
});
