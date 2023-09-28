import {
	clearSupabaseData,
	createStock,
	createUser,
	startSupabase,
	syncStripeProducts,
	type CreateUser
} from "./utils";

const testUsers: CreateUser[] = [
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
