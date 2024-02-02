import { clientSchema } from '$lib/schema/clientSchema';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export async function load(event) {
	async function getClients() {
		const { data: clients, error: clientsError } = await event.locals.supabase
			.from('clients')
			.select('*')
			.order('created_at', { ascending: false });

		if (clientsError) {
			error(500, 'Error fetching clients, please try again later.');
		}
		return clients;
	}

	return {
		clients: await getClients(),
		createClientForm: await superValidate(clientSchema, {
			id: 'createClient'
		})
	};
}

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();

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
				created_by: session?.user.id
			})
			.select();
		if (createClientError) {
			console.log(createClientError);
			return setError(createClientForm, 'Error creating contact.');
		}
		return { createClientForm };
	}
};
