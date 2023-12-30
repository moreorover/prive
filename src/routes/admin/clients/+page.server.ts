import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { clientSchema } from '$lib/schema/clientSchema';
import { fail, error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/helpers';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	async function getClients() {
		const { data: clients, error: clientsError } = await event.locals.supabase
			.from('clients')
			.select('*')
			.order('created_at', { ascending: false });

		if (clientsError) {
			throw error(500, 'Error fetching clients, please try again later.');
		}
		return clients;
	}

	return {
		clients: await getClients(),
		createClientForm: await superValidate(clientSchema, {
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
