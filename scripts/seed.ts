import { clearSupabaseData, createContact, createStock, createUser, startSupabase } from "./utils";

async function seed() {
	try {
		await startSupabase();
		await clearSupabaseData();
		const user = await createUser({
			email: "t@t.com",
			full_name: "Test user",
			password: "password"
		});

		for (let i = 0; i < 5; i++) {
			await createContact(user.id);
		}

		for (let i = 0; i < 20; i++) {
			await createStock(user.id);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit();
}
seed();
