import { expect, test } from '@playwright/test';
import { loginUser, logoutUser } from './utils.js';
// import { type SeedUser, testUsers } from "../scripts/seed";

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
		console.log(testUser);
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
			const clientRows = clients.getByTestId(/^client-row/);

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
			await expect(clientsHeader).toBeAttached();
			await expect(clientsHeader.getByTestId('create-client')).toBeAttached();
			await expect(clientsHeader.getByTestId('create-client')).toBeVisible();
			await logoutUser(page);
		}
	}
});
