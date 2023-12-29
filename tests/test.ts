import { expect, test } from '@playwright/test';

test('index page has expected navigation bar heading text', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Prive' })).toBeVisible();
});
