export type UserRole = "Admin" | "Moderator";

export const userHasRole = (userRoles: UserRole[], role: UserRole): boolean => {
	return userRoles.includes(role);
};
