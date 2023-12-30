import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, PageServerLoadEvent } from './$types';
import { loginSchema } from '$lib/schema/loginSchema';

export const load: PageServerLoad = async ({ locals }: PageServerLoadEvent) => {
	const session = await locals.getSession();
	if (session) {
		throw redirect(302, '/');
	}
	return {
		form: await superValidate(loginSchema)
	};
};
