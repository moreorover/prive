import type { RequestEvent } from '@sveltejs/kit';

export function handleLoginRedirect(event: RequestEvent): string {
	const redirectTo: string = event.url.pathname + event.url.search;
	return `/login?redirectTo=${redirectTo}`;
}

export function utcToReadableDate(utc: string) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
		// second: '2-digit',
		// timeZoneName: 'short'
	};
	const date = new Date(utc);
	return date.toLocaleDateString('en-UK', options);
}
