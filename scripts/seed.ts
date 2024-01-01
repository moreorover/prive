import type { registerSchema } from '$lib/schema/loginSchema';
import type { z } from 'zod';
import {
	clearSupabaseData,
	createClient,
	createOrder,
	// createStock,
	createUser,
	startSupabase
	// syncStripeProducts
} from './seed-utils';
import type { UserRole } from '$lib/server/authorization';

export type CreateUser = Omit<z.infer<typeof registerSchema>, 'passwordConfirm'>;
export type SeedUser = CreateUser & { roles: UserRole[] };

const testUsers: SeedUser[] = [
	{
		full_name: 'Test User',
		email: 't@t.com',
		password: 'password',
		roles: ['Admin']
	},
	{
		full_name: 'Test User 1',
		email: 't1@t.com',
		password: 'password',
		roles: ['Moderator']
	},
	{
		full_name: 'Test User 2',
		email: 't2@t.com',
		password: 'password',
		roles: ['Admin', 'Moderator']
	},
	{
		full_name: 'Test User 3',
		email: 't3@t.com',
		password: 'password',
		roles: []
	}
];

async function seed() {
	try {
		await startSupabase();
		await clearSupabaseData();
		// await syncStripeProducts();

		for (const testUser of testUsers) {
			const user = await createUser(testUser);
			// for (let i = 0; i < 4; i++) {
			// 	await createContact(user.id);
			// }

			// for (let i = 0; i < 20; i++) {
			// 	await createStock(user.id);
			// }

			if (testUser.roles.includes('Admin')) {
				for (let i = 0; i < 4; i++) {
					await createClient(user.id);
					await createOrder(user.id);
				}
			}
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit();
}

await seed();
