import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad, PageServerLoadEvent } from "./$types";

interface Permission {
	title: string;
	permission: string;
	state: boolean;
}

interface PermissionGroup {
	category: string;
	title: string;
	permissions: Permission[];
}

interface Role {
	title: string;
	role: string;
	permissionsGroup: PermissionGroup[];
}

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const { data: availableRoles, error: availableRolesError } = await event.locals.supabase
		.rpc("get_roles")
		.returns<string[]>();

	if (availableRolesError) {
		throw Error("Got error when trying to fetch available roles.");
	}

	const { data: availablePermissions, error: availablePermissionsError } =
		await event.locals.supabase.rpc("get_permissions").returns<string[]>();

	if (availablePermissionsError) {
		throw Error("Got error when trying to fetch available permissions.");
	}

	const { data: rolePermissions, error: rolePermissionsError } = await event.locals.supabase
		.from("role_permissions")
		.select("*");

	if (rolePermissionsError) {
		throw Error("Got error when trying to fetch avilable role permissions.");
	}

	const rolePermissionMap: Record<string, Record<string, boolean>> = rolePermissions.reduce(
		(acc, curr) => {
			const role = curr.role;
			const permission = curr.permission;
			if (!acc[role]) {
				acc[role] = {};
			}
			acc[role][permission] = true;
			return acc;
		},
		{}
	);

	const rolePermissionStructure: Role[] = availableRoles.map((role) => {
		const permissionsGroup: PermissionGroup[] = [];

		availablePermissions.forEach((permission) => {
			const [entity, action] = permission.split(".");
			const entityCapitalized = entity.charAt(0).toUpperCase() + entity.slice(1).replace("_", " ");
			const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);

			let category = permissionsGroup.find((p) => p.category === entity);
			if (!category) {
				category = {
					category: entity,
					title: entityCapitalized,
					permissions: []
				};
				permissionsGroup.push(category);
			}

			category.permissions.push({
				title: actionCapitalized,
				permission,
				state: !!rolePermissionMap[role] && !!rolePermissionMap[role][permission]
			});
		});

		const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);

		return {
			role,
			roleTitle,
			permissionsGroup
		};
	});

	// console.log(JSON.stringify(rolePermissionStructure, null, 2));

	return {
		rolePermissionStructure
	};
};

export const actions: Actions = {
	updateRolePermissions: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, "Unauthorized");
		}

		
	}
};