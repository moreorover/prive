import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '$lib/helpers';
import { clientSchema } from '$lib/schema/clientSchema';
import type { Session } from '@supabase/supabase-js';

export const load = async (event) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	async function getClient(client_id: string) {
		const { error: contactError, data: contact } = await event.locals.supabase
			.from('clients')
			.select('*')
			.eq('id', client_id)
			.limit(1)
			.maybeSingle();

		if (contactError) {
			error(500, 'Error fetching contact. Please try again later.');
		}
		if (!contact) {
			error(404, 'Contact not found.');
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

export const actions = {
	updateClient: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			error(401, 'Unauthorized');
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
