import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { clientSchema } from '$lib/schema/clientSchema';
import { fail, error } from '@sveltejs/kit';
export const load: PageServerLoad = () => {
	return {
		form: superValidate(clientSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, 'Unauthorized');
		}
		const form = await superValidate(event, clientSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { data: createClientData, error: createClientError } = await event.locals.supabase
			.from('clients')
			.insert({
				name: form.data.name,
				email: form.data.email,
				phone: form.data.phone,
				instagram: form.data.instagram,
				created_by: session.user.id
			})
			.select();
		if (createClientError) {
			return fail(400, {
				form
			});
		}
		return { form };
	}
};
