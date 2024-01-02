import { error, fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '$lib/helpers';
import { selectClientSchema, orderSchema } from '$lib/schema/orderSchema';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	async function getOrder(order_id: string) {
		const { error: orderError, data: order } = await event.locals.supabase
			.from('orders')
			.select('*, clients(id, name)')
			.eq('id', order_id)
			.limit(1)
			.maybeSingle();

		if (orderError) {
			throw error(500, 'Error fetching order. Please try again later.');
		}
		if (!order) {
			throw error(404, 'Contact not found.');
		}
		return order;
	}

	async function getClients() {
		const { error: ClientsError, data: clients } = await event.locals.supabase
			.from('clients')
			.select('id, name');

		if (ClientsError) {
			throw error(500, 'Error fetching clients. Please try again later.');
		}
		if (!clients) {
			throw error(404, 'Clients not found.');
		}
		return [{ id: null, name: 'None Selected' }, ...clients];
	}

	return {
		order: event.params.orderId ? await getOrder(event.params.orderId) : null,
		clients: await getClients(),
		selectClientForm: await superValidate(
			{ id: event.params.orderId ? (await getOrder(event.params.orderId)).client : null },
			selectClientSchema
		),
		updateOrderForm: await superValidate(
			event.params.orderId ? await getOrder(event.params.orderId) : null,
			orderSchema
		)
	};
};

export const actions: Actions = {
	updateOrder: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const updateContactForm = await superValidate(event, orderSchema);

		if (!updateContactForm.valid) {
			return fail(400, {
				updateContactForm
			});
		}

		const { error: updateContactError } = await event.locals.supabase
			.from('orders')
			.update(updateContactForm.data)
			.eq('id', event.params.orderId);

		if (updateContactError) {
			return setError(updateContactForm, 'Error updating order, please try again later.');
		}

		return {
			updateContactForm
		};
	},
	selectClient: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const selectClientForm = await superValidate(event, selectClientSchema);

		if (!selectClientForm.valid) {
			return fail(400, {
				selectClientForm
			});
		}

		const { error: updateContactError } = await event.locals.supabase
			.from('orders')
			.update({ client: selectClientForm.data.id })
			.eq('id', event.params.orderId);

		if (updateContactError) {
			return setError(selectClientForm, 'Error updating order, please try again later.');
		}

		return {
			selectClientForm
		};
	}
};
