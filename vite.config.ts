import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globalSetup: resolve('tests/integration/globalSetup.ts'),
		include: ['tests/integration/**/*.{test,spec}.{js,ts}']
	}
});
