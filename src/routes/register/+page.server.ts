import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/schema/loginSchema';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const form = await superValidate(event, registerSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwords do not match');
		}

		const { error: authError } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					full_name: form.data.full_name ?? ''
				}
			}
		});

		if (authError) {
			console.log(`Received authError when trying to register ${form.data.email}`);
			console.log({ authError });
			return setError(form, '', 'An error occured while registering.');
		}

		return {
			form
		};
	}
};
