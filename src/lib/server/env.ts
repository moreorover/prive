import * as dotenv from "dotenv";
dotenv.config();

function getEnvironmentVariable(envirnomentVariable: string): string {
	const validEnvironmentVariable = process.env[envirnomentVariable];
	if (!validEnvironmentVariable) {
		throw new Error(`Could not find environment variable: ${envirnomentVariable}`);
	}
	return validEnvironmentVariable;
}

export const ENV = {
	PUBLIC_SUPABASE_ANON_KEY: getEnvironmentVariable("PUBLIC_SUPABASE_ANON_KEY"),
	PUBLIC_SUPABASE_API_URL: getEnvironmentVariable("PUBLIC_SUPABASE_API_URL"),
	SUPABASE_SERVICE_ROLE_KEY: getEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY"),
	SUPABASE_DB_URL: getEnvironmentVariable("SUPABASE_DB_URL"),
	STRIPE_SECRET_KEY: getEnvironmentVariable("STRIPE_SECRET_KEY"),
	STRIPE_SIGNING_SECRET: getEnvironmentVariable("STRIPE_SIGNING_SECRET")
};
