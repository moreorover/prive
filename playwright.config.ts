import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { resolve } from 'path';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: 4173,
		reuseExistingServer: true
	},
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	globalSetup: resolve('tests/e2e/globalSetup.ts'),
	globalTeardown: resolve('tests/e2e/globalSetup.ts'),
	reporter: [['html', { open: 'never' }]]
};

export default config;
