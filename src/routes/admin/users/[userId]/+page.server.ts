import { error } from "@sveltejs/kit";
import type { PageServerLoad, PageServerLoadEvent } from "../$types.js";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const { data: user, error: userError } = await event.locals.supabase
		.from("profiles")
		.select(
			`id,
			full_name,
			user_roles (role)
		`
		)
		.eq("id", event.params.userId)
		.limit(1)
		.single();

	if (userError || !user) {
		console.log(`Error fetching user: ${event.params.userId} -> ${userError}`);
		throw error(500, `Error fetching user ${event.params.userId}`);
	}
	return { user };
};
