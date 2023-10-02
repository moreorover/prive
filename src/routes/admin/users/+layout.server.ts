import { registerUserSchema } from "$lib/schemas";
import { userHasRole } from "$lib/server/authorization";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	const currentUserRoles = await event.locals.getUserRolesWithPermissions(session.user.id);

	if (!userHasRole(currentUserRoles, "admin")) {
		throw redirect(302, "/");
	}

	return {
		form: superValidate(registerUserSchema)
	};
};
