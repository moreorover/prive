import type { registerSchema } from '$lib/schema/loginSchema';
import type { UserRole } from '$lib/server/authorization';
import type { z } from 'zod';
import { davines_products } from './seed-data';
import {
	clearSupabaseData,
	createClient,
	createOrder,
	createProduct,
	createSupplier,
	// createStock,
	createUser,
	startSupabase
	// syncStripeProducts
} from './seed-utils';

export type CreateUser = Omit<z.infer<typeof registerSchema>, 'passwordConfirm'>;
export type SeedUser = CreateUser & { roles: UserRole[] };
export type Product = {
	category: string;
	code: number;
	description: string;
	price: number;
	rrp: number;
};

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

let dd: boolean = false;

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
				if (testUser.roles.length == 1 && !dd) {
					const davinesSupplier = (await createSupplier(user.id, 'Davines', 'D_'))[0];
					console.log(davinesSupplier);
					for (const davines_product of davines_products) {
						await createProduct(
							user.id,
							davinesSupplier.id,
							davinesSupplier.abbreviation,
							davines_product
						);
					}
					dd = true;
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
