import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema/loginSchema';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) {
		redirect(302, '/');
	}
	return {
		form: await superValidate(loginSchema)
	};
};
