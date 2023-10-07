import { registerUserSchema } from "$lib/schemas";
import { userHasRoleAndPermission } from "$lib/server/authorization";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	const userRoles = await event.locals.getUserRolesWithPermissions(session.user.id);
	if (
		event.params.userId != session.user.id &&
		!userHasRoleAndPermission(userRoles, "admin", "profiles.view")
	) {
		console.warn(
			`User ${session.user.email} is trying to access /admin/users/${event.params.userId} without admin role or without "profiles.view" permission.`
		);
		throw redirect(302, "/");
	}

	return {
		form: superValidate(registerUserSchema)
	};
};
