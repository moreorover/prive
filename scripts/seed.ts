import type { RolesSchema, registerUserSchema } from "$lib/schemas";
import type { z } from "zod";
import {
	clearSupabaseData,
	createStock,
	createUser,
	startSupabase,
	syncStripeProducts
} from "./utils";

export type CreateUser = Omit<z.infer<typeof registerUserSchema>, "passwordConfirm">;
export type SeedUser = CreateUser & RolesSchema;

const testUsers: SeedUser[] = [
	{
		full_name: "Test User",
		email: "t@t.com",
		password: "password",
		roles: ["admin"]
	},
	{
		full_name: "Test User 1",
		email: "t1@t.com",
		password: "password",
		roles: ["moderator"]
	},
	{
		full_name: "Test User 2",
		email: "t2@t.com",
		password: "password",
		roles: ["moderator", "user"]
	},
	{
		full_name: "Test User 3",
		email: "t3@t.com",
		password: "password",
		roles: []
	}
];

async function seed() {
	try {
		await startSupabase();
		await clearSupabaseData();
		await syncStripeProducts();

		for (const testUser of testUsers) {
			const user = await createUser(testUser);
			// for (let i = 0; i < 4; i++) {
			// 	await createContact(user.id);
			// }

			for (let i = 0; i < 20; i++) {
				await createStock(user.id);
			}
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit();
}
seed();
