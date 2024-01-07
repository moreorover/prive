import { error, fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '$lib/helpers';
import { selectClientSchema, orderSchema, setOrderStatusSchema } from '$lib/schema/orderSchema';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	async function getOrder(order_id: string) {
		const { error: orderError, data: order } = await event.locals.supabase
			.from('orders')
			.select('*, clients(id, name), created_by(full_name), updated_by(full_name)')
			.eq('id', order_id)
			.limit(1)
			.maybeSingle();

		if (orderError) {
			error(500, 'Error fetching order. Please try again later.');
		}
		if (!order) {
			error(404, 'Contact not found.');
		}
		return order;
	}

	async function getClients() {
		const { error: ClientsError, data: clients } = await event.locals.supabase
			.from('clients')
			.select('id, name');

		if (ClientsError) {
			error(500, 'Error fetching clients. Please try again later.');
		}
		if (!clients) {
			error(404, 'Clients not found.');
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
		),
		setOrderStatusForm: await superValidate(
			{ completed: event.params.orderId ? (await getOrder(event.params.orderId)).completed : true },
			setOrderStatusSchema
		)
	};
};

export const actions: Actions = {
	updateOrder: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			error(401, 'Unauthorized');
		}

		const updateOrderForm = await superValidate(event, orderSchema);

		if (!updateOrderForm.valid) {
			return fail(400, {
				updateContactForm: updateOrderForm
			});
		}

		const { error: updateOrderError } = await event.locals.supabase
			.from('orders')
			.update(updateOrderForm.data)
			.eq('id', event.params.orderId);

		if (updateOrderError) {
			return setError(updateOrderForm, 'Error updating order, please try again later.');
		}

		return {
			updateOrderForm: updateOrderForm
		};
	},
	selectClient: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			error(401, 'Unauthorized');
		}

		const selectClientForm = await superValidate(event, selectClientSchema);

		if (!selectClientForm.valid) {
			return fail(400, {
				selectClientForm
			});
		}

		const { error: updateContactError } = await event.locals.supabase
			.from('orders')
			.update({
				client: selectClientForm.data.id,
				updated_at: new Date().toISOString(),
				updated_by: session.user.id
			})
			.eq('id', event.params.orderId);

		if (updateContactError) {
			return setError(selectClientForm, 'Error updating order, please try again later.');
		}

		return {
			selectClientForm
		};
	},
	setOrderStatus: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			error(401, 'Unauthorized');
		}

		const setOrderStatusForm = await superValidate(event, setOrderStatusSchema);

		if (!setOrderStatusForm.valid) {
			return fail(400, {
				setOrderStatusForm: setOrderStatusForm
			});
		}

		const { error: setOrderStatusError } = await event.locals.supabase
			.from('orders')
			.update({
				completed: setOrderStatusForm.data.completed,
				updated_at: new Date().toISOString(),
				updated_by: session.user.id
			})
			.eq('id', event.params.orderId);

		if (setOrderStatusError) {
			return setError(setOrderStatusForm, 'Error updating order, please try again later.');
		}

		return {
			setOrderStatusForm: setOrderStatusForm
		};
	}
};
