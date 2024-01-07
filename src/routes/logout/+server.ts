import { error, redirect } from '@sveltejs/kit';

export const POST = async (event) => {
	const { error: logoutError } = await event.locals.supabase.auth.signOut();

	if (logoutError) {
		error(500, 'Error logging while logging out. Please try again.');
	}

	redirect(302, '/login');
};
