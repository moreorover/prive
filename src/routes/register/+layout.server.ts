import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
import { registerSchema } from '$lib/schema/loginSchema';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {
		form: superValidate(registerSchema)
	};
};