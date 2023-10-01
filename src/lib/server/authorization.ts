type Role = {
	permissions: string[];
};

export interface UserRolesPermissions {
	userRoles: string[];
	roles: Record<string, Role>;
}

export const userHasRole = (userRoles: UserRolesPermissions, role: string): boolean => {
	return userRoles.userRoles.includes(role);
};

export const userHasPermission = (userRoles: UserRolesPermissions, permission: string): boolean => {
	return userRoles.userRoles.some((role) => userRoles.roles[role].permissions.includes(permission));
};

export const userHasRoleAndPermission = (
	userRoles: UserRolesPermissions,
	role: string,
	permission: string
): boolean => {
	return (
		(userHasRole(userRoles, role) && userRoles.roles[role]?.permissions.includes(permission)) ??
		false
	);
};
