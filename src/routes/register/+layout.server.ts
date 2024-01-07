import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/schema/loginSchema';
import { dev } from '$app/environment';

export const load = async (event) => {
	if (!dev) {
		redirect(302, '/');
	}
	const session = await event.locals.getSession();
	if (session) {
		redirect(302, '/');
	}
	return {
		form: await superValidate(registerSchema)
	};
};
