export const load = async ({ locals }) => {
	const session = await locals.getSession();
	const roles = await locals.getRoles();

	return {
		session,
		roles
	};
};
