import type { RequestEvent } from '@sveltejs/kit';

export function handleLoginRedirect(event: RequestEvent): string {
	const redirectTo: string = event.url.pathname + event.url.search;
	return `/login?redirectTo=${redirectTo}`;
}
