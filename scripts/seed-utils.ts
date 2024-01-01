import type { UserRole } from '$lib/server/authorization';
import { ENV } from '$lib/server/env';
// import { upsertProductRecord } from "$lib/server/products";
// import { stripe } from "$lib/server/stripe";
import { supabaseAdmin } from '$lib/server/supabase-admin';
// import { faker } from '@faker-js/faker';
import type { User } from '@supabase/supabase-js';
import { execSync } from 'child_process';
import detect from 'detect-port';
import pg from 'pg';
import type { SeedUser } from './seed';
import { faker } from '@faker-js/faker';

export async function startSupabase() {
	const port = await detect(54322);

	if (port !== 54322) {
		return;
	}
	execSync('npx supabase start');
}

export async function clearSupabaseData() {
	const client = new pg.Client({
		connectionString: ENV.SUPABASE_DB_URL
	});
	await client.connect();
	await client.query('TRUNCATE auth.users CASCADE');
	await client.query('TRUNCATE public.clients CASCADE');
	await client.query('TRUNCATE public.user_roles_mapping CASCADE');
	// 	DO NOT TRUNCATE user_roles TABLE AS IT IS POPULATED BY MIGRATION
}

export async function createUser(user: SeedUser): Promise<User> {
	const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				full_name: user.full_name ?? 'Test User'
			}
		}
	});

	if (authError || !authData.user) {
		console.log({ authError });
		console.log({ authDataUser: authData.user });
		throw new Error('Error creating user');
	}

	if (!user.roles || user.roles.length === 0) {
		console.log(`No roles for user ${user.email}`);
	} else {
		for (const role of user.roles) {
			await supabaseAdmin.auth.signOut();
			await assignRoleToUser(authData.user, role);
			console.log(`Role "${role}" applied to user ${user.email}`);
		}
	}

	return authData.user;
}

export async function assignRoleToUser(user: User, role: UserRole) {
	const { data: roleData, error: roleError } = await supabaseAdmin
		.from('user_roles_mapping')
		.insert({ role_name: role, user_id: user.id })
		.select();

	if (roleError || !roleData) {
		console.log({ roleError });
		console.log({ roleData });
		throw new Error(`Error assigning role ${role} to user ${user.email}`);
	}

	return roleData;
}

export async function createClient(user_id: string) {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const email: string = faker.internet.email({ firstName, lastName });
	const phone = faker.string.numeric({ length: 11 });
	const instagram = faker.internet.userName({ firstName, lastName });

	const client = {
		name: `${firstName} ${lastName}`,
		email,
		phone,
		instagram
	};

	console.log(`Initiating process to create a client for User ID: ${user_id}`);

	const { error, data } = await supabaseAdmin
		.from('clients')
		.insert({ ...client, created_by: user_id });

	if (error) {
		throw error;
	}

	console.log(`Client has been successfully generated for the User ID: ${user_id}`);

	return data;
}

export async function createOrder(user_id: string) {
	const title = faker.word.noun();
	const total = faker.number.float({ min: -110, max: 800 });
	const completed = faker.datatype.boolean();

	const order = {
		title,
		total,
		completed
	};

	console.log(`Initiating process to create an order for User ID: ${user_id}`);

	const { error, data } = await supabaseAdmin
		.from('orders')
		.insert({ ...order, created_by: user_id });

	if (error) {
		throw error;
	}

	console.log(`Order has been successfully generated for the User ID: ${user_id}`);

	return data;
}

// export async function createContact(user_id: string) {
// 	const firstName = faker.name.firstName();
// 	const lastName = faker.name.lastName();
// 	const contact = {
// 		name: `${firstName} ${lastName}`,
// 		email: faker.internet.exampleEmail(firstName, lastName),
// 		company: faker.company.name(),
// 		phone: faker.phone.number(),
// 		user_id
// 	};
//
// 	const { error, data } = await supabaseAdmin.from('contacts').insert(contact);
//
// 	if (error) {
// 		throw error;
// 	}
//
// 	return data;
// }

// function addDays(date: Date, days: number) {
// 	const result = new Date(date);
// 	result.setDate(result.getDate() + days);
// 	return result;
// }

// export async function createStock(user_id: string) {
// 	const purchased_at = faker.date.between({
// 		from: addDays(new Date(), -30),
// 		to: addDays(new Date(), 30)
// 	});
// 	const lengths = [45, 50, 55, 60];
// 	const length_cm = lengths[faker.number.int({ min: 0, max: 3 })];
// 	const colour = faker.color.human();
// 	const weight_expected_grams = faker.number.int({ min: 50, max: 200 });
// 	const weight_received_grams = weight_expected_grams + faker.number.int({ min: -20, max: 15 });
// 	const code = faker.string.numeric(6);
//
// 	const stock = {
// 		purchased_at: purchased_at.toISOString(),
// 		length_cm,
// 		colour,
// 		description: null,
// 		weight_expected_grams,
// 		weight_received_grams,
// 		code,
// 		created_by: user_id,
// 		updated_by: faker.datatype.boolean() ? user_id : null
// 	};
//
// 	const { error, data } = await supabaseAdmin.from("stock").insert(stock);
//
// 	if (error) {
// 		throw error;
// 	}
//
// 	return data;
// }
//
// export async function syncStripeProducts() {
// 	const products = await stripe.products.list();
// 	for (const product of products.data) {
// 		await upsertProductRecord(product);
// 	}
// }
