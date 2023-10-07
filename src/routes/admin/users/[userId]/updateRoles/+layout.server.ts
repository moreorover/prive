import { userHasRoleAndPermission } from "$lib/server/authorization";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	const userRoles = await event.locals.getUserRolesWithPermissions(session.user.id);
	if (
		event.params.userId != session.user.id &&
		!userHasRoleAndPermission(userRoles, "admin", "user_roles.update")
	) {
		console.warn(
			`User ${session.user.email} is trying to access /admin/users/${event.params.userId}/updateRoles without admin role or without "user_roles.update" permission.`
		);
		throw redirect(302, "/");
	}
};
