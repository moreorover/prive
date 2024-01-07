import { AuthError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schema/loginSchema';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const redirectTo = event.url.searchParams.get('redirectTo');
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: authError } = await event.locals.supabase.auth.signInWithPassword(form.data);

		if (authError) {
			if (authError instanceof AuthError && authError.status === 400) {
				setError(form, 'email', 'Invalid credentials');
				setError(form, 'password', 'Invalid credentials');
				return fail(400, { form });
			}
		}

		if (redirectTo) {
			redirect(302, `/${redirectTo.slice(1)}`);
		}

		redirect(302, '/');
	}
};
