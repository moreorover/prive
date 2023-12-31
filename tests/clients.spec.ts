import { expect, test } from '@playwright/test';
import { loginUser, logoutUser } from './utils.js';
import { faker } from '@faker-js/faker';

export const testUsers = [
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

test('admin user can view clients', async ({ page }) => {
	for (const testUser of testUsers) {
		if (testUser.roles.includes('Admin')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await page.getByRole('link', { name: 'Admin' }).click();
			await page.getByRole('link', { name: 'Clients' }).click();
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader.getByTestId('clients-title')).toBeVisible();
			await expect(clientsHeader.getByTestId('clients-title')).toHaveText('Clients');
			const clients = page.getByTestId('client-rows');
			await expect(clients).toBeVisible();
			const clientRows = clients.getByTestId(/^client-row-/);

			for (const clientRow of await clientRows.all()) {
				await expect(clientRow.getByTestId(/^client-name-/)).not.toBeEmpty();
				await expect(clientRow.getByTestId(/^client-email-/)).not.toBeEmpty();
				await expect(clientRow.getByTestId(/^client-instagram-/)).not.toBeEmpty();
				await expect(clientRow.getByTestId(/^client-phone-/)).not.toBeEmpty();
			}
			await logoutUser(page);
		}
	}
});

test('moderator user can not view clients', async ({ page }) => {
	for (const testUser of testUsers) {
		if (!testUser.roles.includes('Admin') && testUser.roles.includes('Moderator')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
			await page.goto('/admin/clients');
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader.getByTestId('clients-title')).not.toBeVisible();
			await logoutUser(page);
		}
	}
});

test('guest user can not view clients', async ({ page }) => {
	for (const testUser of testUsers) {
		if (!testUser.roles.includes('Admin') && !testUser.roles.includes('Moderator')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
			await page.goto('/admin/clients');
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader.getByTestId('clients-title')).not.toBeVisible();
			await logoutUser(page);
		}
	}
});

test('admin user can create clients', async ({ page }) => {
	for (const testUser of testUsers) {
		console.log(testUser);
		if (testUser.roles.includes('Admin')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await page.getByRole('link', { name: 'Admin' }).click();
			await page.getByRole('link', { name: 'Clients' }).click();
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader).toBeVisible();
			await expect(clientsHeader.getByTestId('create-client')).toBeVisible();
			await logoutUser(page);
		}
	}
});

test('admin creates client', async ({ page }) => {
	for (const testUser of testUsers) {
		console.log(testUser);
		if (testUser.roles.includes('Admin')) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const name = `${firstName} ${lastName}`;
			const email: string = faker.internet.email({ firstName, lastName });
			const phone = faker.string.numeric({ length: 11 });
			const instagram = faker.internet.userName({ firstName, lastName });

			await loginUser(page, testUser);
			await page.goto('/');
			await page.getByRole('link', { name: 'Admin' }).click();
			await page.getByRole('link', { name: 'Clients' }).click();
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader).toBeVisible();
			await expect(clientsHeader.getByTestId('create-client')).toBeVisible();
			await clientsHeader.getByTestId('create-client').click();
			await expect(page.getByTestId('create-client-dialog-title')).toBeVisible();
			await expect(page.getByTestId('create-client-dialog-title')).toHaveText('Create Client');

			const loginForm = page.getByTestId('create-client-dialog-form');
			await loginForm.getByTestId('create-client-dialog-form-name').fill(name);
			await loginForm.getByTestId('create-client-dialog-form-email').fill(email);
			await loginForm.getByTestId('create-client-dialog-form-phone').fill(phone);
			await loginForm.getByTestId('create-client-dialog-form-instagram').fill(instagram);
			await loginForm.getByTestId('create-client-dialog-form-submit').click();

			await expect(page.getByTestId('create-client-dialog-title')).not.toBeVisible();

			const clients = await page.getByTestId(/^client-row-/).all();

			await expect(clients[0].getByTestId(/^client-name-/)).toHaveText(name);
			await expect(clients[0].getByTestId(/^client-email-/)).toHaveText(email);
			await expect(clients[0].getByTestId(/^client-phone-/)).toHaveText(phone);
			await expect(clients[0].getByTestId(/^client-instagram-/)).toHaveText(instagram);
			await logoutUser(page);
		}
	}
});

test('admin unable to create user without name', async ({ page }) => {
	for (const testUser of testUsers) {
		console.log(testUser);
		if (testUser.roles.includes('Admin')) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const name = `${firstName} ${lastName}`;
			const email: string = faker.internet.email({ firstName, lastName });
			const phone = faker.string.numeric({ length: 11 });
			const instagram = faker.internet.userName({ firstName, lastName });

			await loginUser(page, testUser);
			await page.goto('/');
			await page.getByRole('link', { name: 'Admin' }).click();
			await page.getByRole('link', { name: 'Clients' }).click();
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader).toBeVisible();
			await expect(clientsHeader.getByTestId('create-client')).toBeVisible();
			await clientsHeader.getByTestId('create-client').click();
			await expect(page.getByTestId('create-client-dialog-title')).toBeVisible();
			await expect(page.getByTestId('create-client-dialog-title')).toHaveText('Create Client');

			const loginForm = page.getByTestId('create-client-dialog-form');
			// await loginForm.getByTestId('create-client-dialog-form-email').fill(email);
			// await loginForm.getByTestId('create-client-dialog-form-phone').fill(phone);
			// await loginForm.getByTestId('create-client-dialog-form-instagram').fill(instagram);
			await loginForm.getByTestId('create-client-dialog-form-submit').click();

			await expect(page.getByTestId('create-client-dialog-title')).toBeVisible();

			await expect(
				loginForm.getByTestId('create-client-dialog-form-name-validation')
			).toBeVisible();
			await expect(loginForm.getByTestId('create-client-dialog-form-name-validation')).toHaveText(
				'String must contain at least 2 character(s)'
			);

			await loginForm.getByTestId('create-client-dialog-form-name').fill(name);
			await loginForm.getByTestId('create-client-dialog-form-submit').click();

			const clients = await page.getByTestId(/^client-row-/).all();

			await expect(clients[0].getByTestId(/^client-name-/)).toBeVisible();
			await expect(clients[0].getByTestId(/^client-name-/)).toHaveText(name);
			await expect(clients[0].getByTestId(/^client-email-/)).not.toBeVisible();
			await expect(clients[0].getByTestId(/^client-phone-/)).not.toBeVisible();
			await expect(clients[0].getByTestId(/^client-instagram-/)).not.toBeVisible();
			await logoutUser(page);
		}
	}
});

test('admin unable to create user with invalid email', async ({ page }) => {
	for (const testUser of testUsers) {
		console.log(testUser);
		if (testUser.roles.includes('Admin')) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const name = `${firstName} ${lastName}`;
			const email: string = faker.internet.email({ firstName, lastName });
			const phone = faker.string.numeric({ length: 11 });
			const instagram = faker.internet.userName({ firstName, lastName });

			await loginUser(page, testUser);
			await page.goto('/');
			await page.getByRole('link', { name: 'Admin' }).click();
			await page.getByRole('link', { name: 'Clients' }).click();
			const clientsHeader = page.getByTestId('clients-header');
			await expect(clientsHeader).toBeVisible();
			await expect(clientsHeader.getByTestId('create-client')).toBeVisible();
			await clientsHeader.getByTestId('create-client').click();
			await expect(page.getByTestId('create-client-dialog-title')).toBeVisible();
			await expect(page.getByTestId('create-client-dialog-title')).toHaveText('Create Client');

			const loginForm = page.getByTestId('create-client-dialog-form');
			await loginForm.getByTestId('create-client-dialog-form-name').fill(name);
			await loginForm.getByTestId('create-client-dialog-form-email').fill(name);
			await loginForm.getByTestId('create-client-dialog-form-submit').click();

			await expect(page.getByTestId('create-client-dialog-title')).toBeVisible();

			await expect(
				loginForm.getByTestId('create-client-dialog-form-email-validation')
			).toBeVisible();
			await expect(loginForm.getByTestId('create-client-dialog-form-email-validation')).toHaveText(
				'Invalid email'
			);

			await loginForm.getByTestId('create-client-dialog-form-email').fill(email);
			await loginForm.getByTestId('create-client-dialog-form-submit').click();

			const clients = await page.getByTestId(/^client-row-/).all();

			await expect(clients[0].getByTestId(/^client-name-/)).toBeVisible();
			await expect(clients[0].getByTestId(/^client-name-/)).toHaveText(name);
			await expect(clients[0].getByTestId(/^client-email-/)).toBeVisible();
			await expect(clients[0].getByTestId(/^client-email-/)).toHaveText(email);
			await expect(clients[0].getByTestId(/^client-phone-/)).not.toBeVisible();
			await expect(clients[0].getByTestId(/^client-instagram-/)).not.toBeVisible();
			await logoutUser(page);
		}
	}
});
