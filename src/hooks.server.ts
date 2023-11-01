import type { UserRole } from '$lib/server/authorization';
import { ENV } from '$lib/server/env';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
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

	event.locals.getUserRolesWithPermissions = async (user_id: string): Promise<UserRole[]> => {
		const { data: userRoles, error: userRolesError } = await event.locals.supabase
			.from('user_roles_mapping')
			.select('*')
			.eq('user_id', user_id);

		if (userRolesError) {
			console.error(`Failed to get User roles for ${user_id}`);
		}

		const roles: UserRole[] | undefined = userRoles?.map((role) => role.role_name as UserRole);

		return roles || [];
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
