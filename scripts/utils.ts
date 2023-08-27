import type { registerUserSchema } from "$lib/schemas";
import { ENV } from "$lib/server/env";
import { upsertProductRecord } from "$lib/server/products";
import { stripe } from "$lib/server/stripe";
import { supabaseAdmin } from "$lib/server/supabase-admin";
import { faker } from "@faker-js/faker";
import { execSync } from "child_process";
import detect from "detect-port";
import pg from "pg";
import type { z } from "zod";

export async function startSupabase() {
	const port = await detect(54322);

	if (port !== 54322) {
		return;
	}
	execSync("npx supabase start");
}

export async function clearSupabaseData() {
	const client = new pg.Client({
		connectionString: ENV.SUPABASE_DB_URL
	});
	await client.connect();
	await client.query("TRUNCATE auth.users CASCADE");
	await client.query("TRUNCATE public.billing_customers CASCADE");
	await client.query("TRUNCATE public.billing_products CASCADE");
	await client.query("TRUNCATE public.billing_subscriptions CASCADE");
	await client.query("TRUNCATE public.contacts CASCADE");
	await client.query("TRUNCATE public.stock CASCADE");
}

type CreateUser = Omit<z.infer<typeof registerUserSchema>, "passwordConfirm">;

export async function createUser(user: CreateUser) {
	const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				full_name: user.full_name ?? "Test User"
			}
		}
	});

	if (authError || !authData.user) {
		console.log({ authError });
		console.log({ authDataUser: authData.user });
		throw new Error("Error creating user");
	}
	return authData.user;
}

export async function createContact(user_id: string) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const contact = {
		name: `${firstName} ${lastName}`,
		email: faker.internet.exampleEmail(firstName, lastName),
		company: faker.company.name(),
		phone: faker.phone.number(),
		user_id
	};

	const { error, data } = await supabaseAdmin.from("contacts").insert(contact);

	if (error) {
		throw error;
	}

	return data;
}

function addDays(date: Date, days: number) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export async function createStock(user_id: string) {
	const purchased_at = faker.date.between(addDays(new Date(), -30), addDays(new Date(), 30));
	const lengths = [45, 50, 55, 60];
	const length_cm = lengths[faker.datatype.number({ min: 0, max: 3 })];
	const colour = faker.color.human();
	const weight_expected_grams = faker.datatype.number({ min: 50, max: 200 });
	const weight_received_grams =
		weight_expected_grams + faker.datatype.number({ min: -20, max: 15 });
	const code = faker.random.numeric(6);

	const stock = {
		purchased_at: purchased_at.toISOString(),
		length_cm,
		colour,
		description: null,
		weight_expected_grams,
		weight_received_grams,
		code,
		created_by: user_id,
		updated_by: faker.datatype.boolean() ? user_id : null
	};

	const { error, data } = await supabaseAdmin.from("stock").insert(stock);

	if (error) {
		throw error;
	}

	return data;
}

export async function syncStripeProducts() {
	const products = await stripe.products.list();
	for (const product of products.data) {
		await upsertProductRecord(product);
	}
}
