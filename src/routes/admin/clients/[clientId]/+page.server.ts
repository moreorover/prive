import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '$lib/helpers';
import { clientSchema } from '$lib/schema/clientSchema';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	async function getClient(client_id: string) {
		const { error: contactError, data: contact } = await event.locals.supabase
			.from('clients')
			.select('*')
			.eq('id', client_id)
			.limit(1)
			.maybeSingle();

		if (contactError) {
			throw error(500, 'Error fetching contact. Please try again later.');
		}
		if (!contact) {
			throw error(404, 'Contact not found.');
		}
		return contact;
	}
	return {
		client: event.params.clientId ? await getClient(event.params.clientId) : null,
		updateClientForm: await superValidate(
			event.params.clientId ? await getClient(event.params.clientId) : null,
			clientSchema
		)
	};
};

export const actions: Actions = {
	updateClient: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const updateContactForm = await superValidate(event, clientSchema);

		if (!updateContactForm.valid) {
			return fail(400, {
				updateContactForm
			});
		}

		const { error: updateContactError } = await event.locals.supabase
			.from('clients')
			.update(updateContactForm.data)
			.eq('id', event.params.clientId);

		if (updateContactError) {
			return setError(updateContactForm, 'Error updating contact, please try again later.');
		}

		return {
			updateContactForm
		};
	}
};
