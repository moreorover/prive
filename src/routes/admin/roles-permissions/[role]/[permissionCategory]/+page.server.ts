import { rolePermissionsSchema } from "$lib/schemas";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const role: string = event.params["role"];
	const permissionCategory: string = event.params["permissionCategory"];

	const { data: availablePermissions, error: availablePermissionsError } =
		await event.locals.supabase.rpc("get_permissions").returns<string[]>();

	const filteredAvailablePermissions = availablePermissions.filter((rolePermission) =>
		rolePermission.startsWith(`${permissionCategory}.`)
	);

	// console.log({ filteredAvailablePermissions });

	if (availablePermissionsError) {
		throw Error("Got error when trying to fetch available permissions.");
	}

	const { data: rolePermissions, error: rolePermissionsError } = await event.locals.supabase
		.from("role_permissions")
		.select("*")
		.eq("role", role);

	if (rolePermissionsError) {
		console.log({ rolePermissionsError });
		throw Error("Got error when trying to fetch available role permissions.");
	}

	const filteredRolePermissions = rolePermissions.filter((rolePermission) =>
		rolePermission.permission.startsWith(`${permissionCategory}.`)
	);

	// console.log({ filteredRolePermissions });

	const rp = filteredAvailablePermissions.map((rolePermission) => {
		return {
			permission: rolePermission,
			status: !!filteredRolePermissions.find((frp) => frp.permission === rolePermission),
			title: rolePermission.split(".")[1]
		};
	});

	return {
		form: superValidate({ rolePermissions: rp }, rolePermissionsSchema),
		role,
		permissionCategory
	};
};

export const actions: Actions = {
	updateRolePermissions: async (event) => {
		const role = event.params["role"];
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, "Unauthorized");
		}

		const updateRolePermissionsForm = await superValidate(event, rolePermissionsSchema);

		for (const rp of updateRolePermissionsForm.data.rolePermissions) {
			const { permission, status } = rp;

			if (status) {
				const { error } = await event.locals.supabase
					.from("role_permissions")
					.upsert({ role, permission }, { onConflict: ["role", "permission"] });

				if (error) {
					console.error(
						`Error inserting/updating permission: ${permission} on role: ${role}`,
						error
					);
					throw redirect(307, "/admin/roles-permissions");
				}
			} else {
				const { error } = await event.locals.supabase
					.from("role_permissions")
					.delete()
					.match({ role, permission });

				if (error) {
					console.error(`Error deleting permission: ${permission} on role: ${role}`, error);
					throw redirect(307, "/admin/roles-permissions");
				}
			}
		}
		throw redirect(302, "/admin/roles-permissions");
	}
};
