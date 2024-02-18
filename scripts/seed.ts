import type { registerSchema } from '$lib/schema/loginSchema';
import type { UserRole } from '$lib/server/authorization';
import { faker } from '@faker-js/faker';
import type { z } from 'zod';
import {
	clearSupabaseData,
	createClient,
	createOrderProduct,
	createProduct,
	createPurchaseOrder,
	createSaleOrder,
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
					// await createOrder(user.id);

					const product1 = await createProduct(
						user.id,
						faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
						16.83
					);
					const product2 = await createProduct(
						user.id,
						faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
						16.83
					);
					const product3 = await createProduct(
						user.id,
						faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
						16.83
					);
					const product4 = await createProduct(
						user.id,
						faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
						16.83
					);
					const purchaseOrder = await createPurchaseOrder(user.id);
					const saleOrder = await createSaleOrder(user.id);
					await createOrderProduct(purchaseOrder?.id, product1?.id, user.id, 20, 9.99);
					await createOrderProduct(purchaseOrder?.id, product2?.id, user.id, 20, 9.99);
					await createOrderProduct(purchaseOrder?.id, product3?.id, user.id, 20, 9.99);
					await createOrderProduct(purchaseOrder?.id, product4?.id, user.id, 20, 9.99);

					await createOrderProduct(saleOrder?.id, product1?.id, user.id, 5, 16.83);
					await createOrderProduct(saleOrder?.id, product2?.id, user.id, 5, 16.83);
					await createOrderProduct(saleOrder?.id, product3?.id, user.id, 5, 16.83);
					await createOrderProduct(saleOrder?.id, product4?.id, user.id, 5, 16.83);
				}
				// if (testUser.roles.length == 1 && !dd) {
				// 	const davinesSupplier = (await createSupplier(user.id, 'Davines', 'D_'))[0];
				// 	for (const davines_product of davines_products) {
				// 		await createProduct(
				// 			user.id,
				// 			davinesSupplier.id,
				// 			davinesSupplier.abbreviation,
				// 			davines_product
				// 		);
				// 	}
				// 	dd = true;
				// }
			}
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit();
}

await seed();
