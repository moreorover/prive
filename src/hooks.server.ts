import { handleLoginRedirect } from '$lib/helpers';
import type { UserRole } from '$lib/server/authorization';
import { ENV } from '$lib/server/env';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

async function supabase({ event, resolve }) {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: ENV.PUBLIC_SUPABASE_URL,
		supabaseKey: ENV.PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getRoles = async (): Promise<UserRole[]> => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) {
			return [];
		}

		const { data: userRoles, error: userRolesError } = await event.locals.supabase
			.from('user_roles_mapping')
			.select('role_name')
			.eq('user_id', session.user.id);

		if (userRolesError) {
			console.log({ userRolesError });
			console.error(`Failed to get User roles for ${session.user.id}`);
		}

		const roles: UserRole[] | undefined = userRoles?.map((role) => role.role_name as UserRole);

		return roles || [];
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
}

async function authorization({ event, resolve }) {
	const session = await event.locals.getSession();

	if (session && event.url.pathname.startsWith('/login')) {
		redirect(303, '/');
	}

	if (!session && event.url.pathname.startsWith('/admin')) {
		redirect(303, handleLoginRedirect(event));
	}

	if (session && event.url.pathname.startsWith('/admin')) {
		const roles = await event.locals.getRoles();
		if (!roles.includes('Admin')) {
			// the user is not admin
			redirect(303, '/');
		}
	}

	if (!session && event.url.pathname.startsWith('/profile')) {
		redirect(303, handleLoginRedirect(event));
	}

	return resolve(event);
}

export const handle: Handle = sequence(supabase, authorization);
