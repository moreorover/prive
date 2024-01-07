import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	const roles = await locals.getRoles();

	if (!roles.includes('Admin')) {
		redirect(302, '/');
	}

	return {
		session,
		roles
	};
};
