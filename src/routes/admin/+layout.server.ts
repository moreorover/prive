import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	const userRoles = await event.locals.getRoles();
	if (!userRoles.includes("admin")) {
		console.warn(
			`User ${session.user.email} is trying to access /admin portal without admin role.`
		);
		throw redirect(302, "/");
	}

	return {
		userRoles
	};
};
