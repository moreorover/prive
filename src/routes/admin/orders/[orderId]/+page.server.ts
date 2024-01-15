import { hairSchema } from '$lib/schema/hairSchema.js';
import { orderSchema, selectClientSchema, setOrderStatusSchema } from '$lib/schema/orderSchema';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	async function getOrder(order_id: string) {
		const { error: orderError, data: order } = await event.locals.supabase
			.from('orders')
			.select('*, clients(id, name), hair(*), created_by(full_name), updated_by(full_name)')
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
		),
		createHairForm: await superValidate(hairSchema, { id: 'createHair' })
	};
};

export const actions = {
	updateOrder: async (event) => {
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
	},
	createHair: async (event) => {
		const session = await event.locals.getSession();

		const createHairForm = await superValidate(event, hairSchema);

		if (!createHairForm.valid) {
			return fail(400, {
				setOrderStatusForm: createHairForm
			});
		}

		const { data: createHairData, error: ceateHairError } = await event.locals.supabase
			.from('hair')
			.insert({
				...createHairForm.data,
				updated_at: new Date().toISOString(),
				created_by: session.user.id
			})
			.select();

		if (ceateHairError) {
			return setError(createHairForm, 'Error creating hair on order, please try again later.');
		}

		const { error: createHairToOrderError } = await event.locals.supabase
			.from('hair_order')
			.insert({ hair_id: createHairData[0].id, order_id: event.params.orderId });

		if (createHairToOrderError) {
			return setError(createHairForm, 'Error creating hair on order, please try again later.');
		}

		return {
			createHairForm: createHairForm
		};
	}
};
