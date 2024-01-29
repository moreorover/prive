import { hairSchema, hairUpdateSchema } from '$lib/schema/hairSchema.js';
import {
	hairOrderSchema,
	selectClientSchema,
	setOrderStatusSchema,
	setOrderTotalSchema
} from '$lib/schema/orderSchema';
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

		await Promise.all(
			order.hair.map(async (h) => {
				h.updateForm = await superValidate(
					{
						hairId: h.id,
						title: h.title,
						description: h.description,
						weight: h.weight,
						length: h.length
					},
					hairUpdateSchema
				);
			})
		);

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
		order: event.params.hairOrderId ? await getOrder(event.params.hairOrderId) : null,
		clients: await getClients(),
		selectClientForm: await superValidate(
			{ id: event.params.hairOrderId ? (await getOrder(event.params.hairOrderId)).client : null },
			selectClientSchema
		),
		updateOrderForm: await superValidate(
			event.params.hairOrderId ? await getOrder(event.params.hairOrderId) : null,
			hairOrderSchema
		),
		setOrderStatusForm: await superValidate(
			{
				completed: event.params.hairOrderId
					? (
							await getOrder(event.params.hairOrderId)
					  ).completed
					: true
			},
			setOrderStatusSchema
		),
		setOrderTotalForm: await superValidate(
			{
				total: event.params.hairOrderId ? (await getOrder(event.params.hairOrderId)).total * -1 : 0
			},
			setOrderTotalSchema
		),
		createHairForm: await superValidate(hairSchema, { id: 'createHair' })
	};
};

export const actions = {
	updateOrder: async (event) => {
		const updateOrderForm = await superValidate(event, hairOrderSchema);

		if (!updateOrderForm.valid) {
			return fail(400, {
				updateContactForm: updateOrderForm
			});
		}

		const { error: updateOrderError } = await event.locals.supabase
			.from('orders')
			.update(updateOrderForm.data)
			.eq('id', event.params.hairOrderId);

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
			.eq('id', event.params.hairOrderId);

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
			.eq('id', event.params.hairOrderId);

		if (setOrderStatusError) {
			return setError(setOrderStatusForm, 'Error updating order, please try again later.');
		}

		return {
			setOrderStatusForm: setOrderStatusForm
		};
	},
	setOrderTotal: async (event) => {
		const order_id = event.params.hairOrderId;
		const session = await event.locals.getSession();

		const setOrderTotalForm = await superValidate(event, setOrderTotalSchema);

		if (!setOrderTotalForm.valid) {
			return fail(400, {
				setOrderTotalForm: setOrderTotalForm
			});
		}

		const { error: setOrderTotalError } = await event.locals.supabase
			.from('orders')
			.update({
				total:
					setOrderTotalForm.data.total > 0
						? setOrderTotalForm.data.total * -1
						: setOrderTotalForm.data.total,
				updated_at: new Date().toISOString(),
				updated_by: session.user.id
			})
			.eq('id', event.params.hairOrderId);

		if (setOrderTotalError) {
			return setError(setOrderTotalForm, 'Error updating order, please try again later.');
		}

		const { data: allOrderHair, error: allOrderHairError } = await event.locals.supabase
			.from('orders')
			.select('total, hair(*)')
			.eq('id', order_id)
			.single();

		if (allOrderHair?.total != 0) {
			const total_weight = allOrderHair?.hair.reduce((a, c) => {
				return a + c.weight;
			}, 0);

			const pricePerGram = allOrderHair?.total / total_weight;

			for (const h of allOrderHair?.hair) {
				const price = h.weight * pricePerGram;

				const { error: updateHairError } = await event.locals.supabase
					.from('hair')
					.update({
						price: price,
						updated_at: new Date().toISOString(),
						created_by: session.user.id
					})
					.eq('id', h.id);
				if (updateHairError) {
					console.error(`Error updating price for ${h.id}`);
					console.error(`updateHairError`);
				}
			}
		}

		return {
			setOrderTotalForm: setOrderTotalForm
		};
	},
	createHair: async (event) => {
		const order_id = event.params.hairOrderId;
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
			.insert({ hair_id: createHairData[0].id, order_id: event.params.hairOrderId });

		if (createHairToOrderError) {
			return setError(createHairForm, 'Error creating hair on order, please try again later.');
		}

		const { data: allOrderHair, error: allOrderHairError } = await event.locals.supabase
			.from('orders')
			.select('total, hair(*)')
			.eq('id', order_id)
			.single();

		if (allOrderHair?.total != 0) {
			const total_weight = allOrderHair?.hair.reduce((a, c) => {
				return a + c.weight;
			}, 0);

			const pricePerGram = allOrderHair?.total / total_weight;

			for (const h of allOrderHair?.hair) {
				const price = h.weight * pricePerGram;

				const { error: updateHairError } = await event.locals.supabase
					.from('hair')
					.update({
						price: price,
						updated_at: new Date().toISOString(),
						created_by: session.user.id
					})
					.eq('id', h.id);
				if (updateHairError) {
					console.error(`Error updating price for ${h.id}`);
					console.error(`updateHairError`);
				}
			}
		}

		return {
			createHairForm: createHairForm
		};
	},
	updateHair: async (event) => {
		const order_id = event.params.hairOrderId;
		const session = await event.locals.getSession();

		const updateHairForm = await superValidate(event, hairUpdateSchema);

		if (!updateHairForm.valid) {
			return fail(400, {
				updateHairForm: updateHairForm
			});
		}

		const { data: updateHairData, error: updateHairError } = await event.locals.supabase
			.from('hair')
			.update({
				title: updateHairForm.data.title,
				description: updateHairForm.data.description,
				length: updateHairForm.data.length,
				weight: updateHairForm.data.weight,
				updated_at: new Date().toISOString(),
				created_by: session.user.id
			})
			.eq('id', updateHairForm.data.hairId);

		if (updateHairError) {
			return setError(updateHairForm, 'Error creating hair on order, please try again later.');
		}

		const { data: allOrderHair, error: allOrderHairError } = await event.locals.supabase
			.from('orders')
			.select('total, hair(*)')
			.eq('id', order_id)
			.single();

		if (allOrderHair?.total != 0) {
			const total_weight = allOrderHair?.hair.reduce((a, c) => {
				return a + c.weight;
			}, 0);

			const pricePerGram = allOrderHair?.total / total_weight;

			for (const h of allOrderHair?.hair) {
				const price = h.weight * pricePerGram;

				const { error: updateHairError } = await event.locals.supabase
					.from('hair')
					.update({
						price: price,
						updated_at: new Date().toISOString(),
						created_by: session.user.id
					})
					.eq('id', h.id);
				if (updateHairError) {
					console.error(`Error updating price for ${h.id}`);
					console.error(`updateHairError`);
				}
			}
		}

		return {
			createHairForm: updateHairForm
		};
	}
};
