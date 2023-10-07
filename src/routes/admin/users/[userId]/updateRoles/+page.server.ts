import { updateUserRolesSchema } from "$lib/schemas.js";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad, PageServerLoadEvent } from "../$types.js";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const user_id = event.params.userId;

	const { data: profile, error: profileError } = await event.locals.supabase
		.from("profiles")
		.select(`full_name`)
		.eq("id", user_id);

	if (profileError || !profile) {
		console.log(`Error fetching profile: ${event.params.userId} -> ${profileError}`);
		console.log(profileError);
		throw error(500, `Error fetching profile ${event.params.userId}`);
	}

	const { data: availableRoles, error: availableRolesError } = await event.locals.supabase
		.rpc("get_roles")
		.returns<string[]>();

	if (availableRolesError) {
		throw Error("Got error when trying to fetch available roles.");
	}

	const { data: userRoles, error: userRolesError } = await event.locals.supabase
		.from("user_roles")
		.select(`role`)
		.eq("user_id", user_id);

	if (userRolesError || !userRoles) {
		console.log(`Error fetching user roles: ${event.params.userId} -> ${userRolesError}`);
		throw error(500, `Error fetching user roles ${event.params.userId}`);
	}

	const roles = availableRoles.map((role) => {
		return {
			role,
			status: !!userRoles.find((userRole) => userRole.role === role)
		};
	});

	return { form: superValidate({ roles }, updateUserRolesSchema) };
};
export const actions: Actions = {
	updateRoles: async (event) => {
		const user_id = event.params["userId"];
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, "Unauthorized");
		}

		const updateUserRolesForm = await superValidate(event, updateUserRolesSchema);

		for (const rp of updateUserRolesForm.data.roles) {
			const { role, status } = rp;

			if (status) {
				const { error } = await event.locals.supabase
					.from("user_roles")
					.upsert({ role, user_id }, { onConflict: ["role", "user_id"] });

				if (error) {
					console.error(`Error inserting/updating role: ${role} for user: ${user_id}`, error);
					throw redirect(307, `/admin/users/${user_id}`);
				}
			} else {
				const { error } = await event.locals.supabase
					.from("user_roles")
					.delete()
					.match({ role, user_id });

				if (error) {
					console.error(`Error deleting role: ${role} for user: ${user_id}`, error);
					throw redirect(307, `/admin/users/${user_id}`);
				}
			}
		}
		throw redirect(302, `/admin/users/${user_id}`);
	}
};
