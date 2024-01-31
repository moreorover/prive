import { test } from '@playwright/test';
import { loginUser, logoutUser, registerUser } from './utils.js';

const testUser = {
	full_name: 'Test User',
	email: 'test@example.com',
	password: 'password'
};

test.skip('user can register for an account', async ({ page }) => {
	await registerUser(page, testUser);
});

test.skip('user can login to their account', async ({ page }) => {
	await loginUser(page, testUser);
});

test.skip('user can logout of an account', async ({ page }) => {
	await loginUser(page, testUser);
	await logoutUser(page);
});
