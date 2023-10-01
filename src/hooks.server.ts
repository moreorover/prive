import type { UserRolesPermissions } from "$lib/server/authorization";
import { ENV } from "$lib/server/env";
import { supabaseAdmin } from "$lib/server/supabase-admin";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

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

	event.locals.getRoles = async (user_id: string): Promise<UserRolesPermissions | null> => {
		const { data: userRolesWithPermissions, error: userRolesWithPermissionsError } =
			await supabaseAdmin
				.rpc("get_roles_and_permissions", { user_id })
				.returns<UserRolesPermissions>();

		if (userRolesWithPermissionsError) {
			console.error(`Failed to get User roles for ${user_id}`);
		}

		return userRolesWithPermissions;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range";
		}
	});
};
