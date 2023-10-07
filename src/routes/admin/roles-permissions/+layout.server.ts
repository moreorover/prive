import { userHasPermission, userHasRoleAndPermission } from "$lib/server/authorization";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	const userRoles = await event.locals.getUserRolesWithPermissions(session.user.id);
	if (!userHasRoleAndPermission(userRoles, "admin", "role_permissions.view")) {
		console.warn(
			`User ${session.user.email} is trying to access /admin/roles-permissions portal without admin role.`
		);
		throw redirect(302, "/");
	}

	const userCanUpdate: boolean = userHasPermission(userRoles, "user_roles.update");

	return {
		userRoles,
		userCanUpdate
	};
};