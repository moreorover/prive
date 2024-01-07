export const load = async (event) => {
	const session = await event.locals.getSession();
	const roles = await event.locals.getRoles();

	return {
		session,
		roles
	};
};
