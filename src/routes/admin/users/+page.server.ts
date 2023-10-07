import { supabaseAdmin } from "$lib/server/supabase-admin";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const { data: allUsers, error: allUsersError } = await event.locals.supabase.from("profiles")
		.select(`id,
			full_name,
			user_roles (role)
		`);

	if (allUsersError) {
		console.error(`Got error when trying to fetch profiles -> ${allUsersError}`);
	}

	const joinedProfilesWithAuth = await Promise.all(
		allUsers.map(async (user) => {
			const {
				data: { user: authUser },
				error: authUserError
			} = await supabaseAdmin.auth.admin.getUserById(user.id);
			if (authUserError || !authUser) {
				return;
			}

			return { ...user, email: authUser.email };
		})
	);

	return {
		allUsers: joinedProfilesWithAuth
	};
};
