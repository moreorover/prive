import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';

if (!dev) {
	injectSpeedInsights();
}
