import { expect, test } from '@playwright/test';
import { loginUser, logoutUser } from './utils.js';

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

test('admin user can access admin page', async ({ page }) => {
	for (const testUser of testUsers) {
		if (testUser.roles.includes('Admin')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
			await page.getByRole('link', { name: 'Admin' }).click();
			await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
			await logoutUser(page);
		}
	}
});

test('moderator user can not access admin page', async ({ page }) => {
	for (const testUser of testUsers) {
		if (!testUser.roles.includes('Admin') && testUser.roles.includes('Moderator')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
			await page.goto('/admin');
			await expect(page.getByRole('heading', { name: 'Admin' })).not.toBeVisible();
			await logoutUser(page);
		}
	}
});

test('guest user can not access admin page', async ({ page }) => {
	for (const testUser of testUsers) {
		if (!testUser.roles.includes('Admin') && !testUser.roles.includes('Moderator')) {
			await loginUser(page, testUser);
			await page.goto('/');
			await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
			await page.goto('/admin');
			await expect(page.getByRole('heading', { name: 'Admin' })).not.toBeVisible();
			await logoutUser(page);
		}
	}
});
