import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const { data: availableRoles, error: availableRolesError } = await event.locals.supabase.rpc(
		"get_roles"
	);

	if (availableRolesError) {
		throw Error("Got error when trying to fetch avilable user roles.");
	}

	return {
		availableRoles
	};
};
