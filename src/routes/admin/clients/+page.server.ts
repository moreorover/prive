import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { clientSchema } from '$lib/schema/clientSchema';
import { fail, error } from '@sveltejs/kit';
export const load: PageServerLoad = () => {
	return {
		createClientForm: superValidate(clientSchema, {
			id: 'createClient'
		})
	};
};

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(403, 'Unauthorized');
		}
		const createClientForm = await superValidate(event, clientSchema, { id: 'createClient' });
		if (!createClientForm.valid) {
			return fail(400, {
				form: createClientForm
			});
		}
		const { error: createClientError } = await event.locals.supabase
			.from('clients')
			.insert({
				...createClientForm.data,
				created_by: session.user.id
			})
			.select();
		if (createClientError) {
			console.log(createClientError);
			return setError(createClientForm, 'Error creating contact.');
		}
		return { createClientForm };
	}
};
